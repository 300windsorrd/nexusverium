import { createHash, createHmac, timingSafeEqual } from "crypto";

import { renderReceiverEmail, renderSenderEmail } from "@/lib/email/connectedTemplates";
import { sendResendEmail } from "@/lib/email/resendClient";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

type SupabaseWebhookPayload = {
  type?: string;
  table?: string;
  schema?: string;
  record?: Record<string, unknown>;
  old_record?: Record<string, unknown> | null;
};

type ConnectedRecord = {
  id: string;
  created_at: string | null;
  sender_name: string;
  sender_email: string;
  receiver_name: string;
  receiver_email: string;
  subject?: string | null;
  message?: string | null;
  metadata?: Record<string, unknown> | null;
};

type SendState = {
  sender_email_sent_at: string | null;
  receiver_email_sent_at: string | null;
};

const TABLE_NAME = process.env.CONNECTED_TABLE_NAME?.trim() || "Connected";
const FROM_EMAIL = process.env.FROM_EMAIL?.trim() || "";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const MAX_MESSAGE_LENGTH = 4000;
const MAX_SUBJECT_LENGTH = 200;

export async function POST(request: Request) {
  const rawBody = await request.text();
  const secret = process.env.CONNECTED_WEBHOOK_SECRET?.trim();

  if (!secret) {
    console.error("CONNECTED_WEBHOOK_SECRET is missing.");
    return Response.json({ message: "Server misconfigured." }, { status: 500 });
  }

  if (!authorizeWebhook(request.headers, rawBody, secret)) {
    return Response.json({ message: "Unauthorized." }, { status: 401 });
  }

  let payload: SupabaseWebhookPayload;
  try {
    payload = JSON.parse(rawBody) as SupabaseWebhookPayload;
  } catch (error) {
    console.error("Invalid JSON payload.", error);
    return Response.json({ message: "Invalid payload." }, { status: 400 });
  }

  // Expected Supabase DB webhook payload:
  // { type: "INSERT", table: "Connected", schema: "public", record: { ... }, old_record: null }
  if ((payload.type ?? "").toUpperCase() !== "INSERT") {
    return Response.json({ ok: true, ignored: true });
  }

  const table = (payload.table ?? "").toLowerCase();
  if (table && table !== TABLE_NAME.toLowerCase()) {
    return Response.json({ ok: true, ignored: true });
  }

  const record = (payload.record ?? {}) as Record<string, unknown>;
  const connected = sanitizeConnected(mapConnectedRecord(record));

  if (!connected.id) {
    return Response.json({ message: "Missing connection id." }, { status: 400 });
  }

  if (!FROM_EMAIL) {
    console.error("FROM_EMAIL is missing.");
    return Response.json({ message: "Server misconfigured." }, { status: 500 });
  }

  const supabase = getSupabaseAdmin();
  let sendState: SendState | null = null;
  try {
    sendState = await claimSendLock(supabase, connected.id);
  } catch (error) {
    console.error("Failed to claim connected send lock.", error);
    return Response.json({ message: "Unable to process webhook." }, { status: 500 });
  }
  if (!sendState) {
    return Response.json({ ok: true, status: "already_sent_or_sending" });
  }

  const validationError = validateConnected(connected);
  if (validationError) {
    await updateConnectedStatus(supabase, connected.id, {
      email_status: "failed",
      last_error: validationError,
    });
    console.warn("Connected webhook validation failed.", safeLogContext(connected));
    return Response.json({ ok: true, status: "failed" });
  }

  const templates = {
    sender: renderSenderEmail(connected),
    receiver: renderReceiverEmail(connected),
  };

  let senderSent = Boolean(sendState.sender_email_sent_at);
  let receiverSent = Boolean(sendState.receiver_email_sent_at);
  const errors: string[] = [];

  if (!senderSent) {
    try {
      await sendResendEmail({
        to: connected.sender_email,
        from: FROM_EMAIL,
        subject: templates.sender.subject,
        html: templates.sender.html,
        text: templates.sender.text,
      });
      senderSent = true;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Sender email failed.";
      errors.push(`sender:${message}`);
    }
  }

  if (!receiverSent) {
    try {
      await sendResendEmail({
        to: connected.receiver_email,
        from: FROM_EMAIL,
        subject: templates.receiver.subject,
        html: templates.receiver.html,
        text: templates.receiver.text,
        replyTo: connected.sender_email,
      });
      receiverSent = true;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Receiver email failed.";
      errors.push(`receiver:${message}`);
    }
  }

  const now = new Date().toISOString();
  const status = senderSent && receiverSent ? "sent" : "failed";
  await updateConnectedStatus(supabase, connected.id, {
    email_status: status,
    sender_email_sent_at: senderSent
      ? sendState.sender_email_sent_at ?? now
      : sendState.sender_email_sent_at ?? null,
    receiver_email_sent_at: receiverSent
      ? sendState.receiver_email_sent_at ?? now
      : sendState.receiver_email_sent_at ?? null,
    email_sent_at: senderSent && receiverSent ? now : null,
    last_error: status === "sent" ? null : errors.join(" | ").slice(0, 1000),
  });

  if (status !== "sent") {
    console.error("Connected webhook email failed.", {
      ...safeLogContext(connected),
      errors,
    });
    return Response.json({ ok: false, status }, { status: 500 });
  }

  console.info("Connected webhook processed.", safeLogContext(connected));
  return Response.json({ ok: true, status });
}

function mapConnectedRecord(record: Record<string, unknown>): ConnectedRecord {
  const pick = (keys: string[]) => {
    for (const key of keys) {
      const value = record[key];
      if (typeof value === "string") {
        return value;
      }
    }
    return "";
  };

  const metadataValue = record.metadata;
  const metadata =
    metadataValue && typeof metadataValue === "object" && !Array.isArray(metadataValue)
      ? (metadataValue as Record<string, unknown>)
      : null;

  return {
    id: pick(["id"]),
    created_at: pick(["created_at", "createdAt"]) || null,
    sender_name: pick(["sender_name", "senderName"]),
    sender_email: pick(["sender_email", "senderEmail"]),
    receiver_name: pick(["receiver_name", "receiverName"]),
    receiver_email: pick(["receiver_email", "receiverEmail"]),
    subject: pick(["subject"]),
    message: pick(["message"]),
    metadata,
  };
}

function sanitizeConnected(connected: ConnectedRecord): ConnectedRecord {
  return {
    ...connected,
    created_at: connected.created_at?.trim() || null,
    sender_name: sanitizeInline(connected.sender_name),
    sender_email: connected.sender_email.trim().toLowerCase(),
    receiver_name: sanitizeInline(connected.receiver_name),
    receiver_email: connected.receiver_email.trim().toLowerCase(),
    subject: connected.subject?.trim() || "",
    message: connected.message?.trim() || "",
  };
}

function sanitizeInline(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function validateConnected(connected: ConnectedRecord) {
  if (!connected.sender_name) {
    return "sender_name is required.";
  }
  if (!connected.sender_email || !EMAIL_REGEX.test(connected.sender_email)) {
    return "sender_email is invalid.";
  }
  if (!connected.receiver_name) {
    return "receiver_name is required.";
  }
  if (!connected.receiver_email || !EMAIL_REGEX.test(connected.receiver_email)) {
    return "receiver_email is invalid.";
  }
  if (connected.subject && connected.subject.length > MAX_SUBJECT_LENGTH) {
    return `subject exceeds ${MAX_SUBJECT_LENGTH} chars.`;
  }
  if (connected.message && connected.message.length > MAX_MESSAGE_LENGTH) {
    return `message exceeds ${MAX_MESSAGE_LENGTH} chars.`;
  }
  return null;
}

function safeLogContext(connected: ConnectedRecord) {
  return {
    connectionId: connected.id,
    senderEmailHash: hashValue(connected.sender_email),
    receiverEmailHash: hashValue(connected.receiver_email),
    messageLength: connected.message?.length ?? 0,
  };
}

function hashValue(value: string) {
  return createHash("sha256").update(value).digest("hex").slice(0, 16);
}

async function claimSendLock(
  supabase: ReturnType<typeof getSupabaseAdmin>,
  connectionId: string,
): Promise<SendState | null> {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update({ email_status: "sending", last_error: null })
    .eq("id", connectionId)
    .is("email_sent_at", null)
    .or("email_status.is.null,email_status.eq.pending,email_status.eq.failed")
    .select("sender_email_sent_at, receiver_email_sent_at");

  if (error) {
    console.error("Unable to claim send lock.", error);
    throw error;
  }

  if (!data || data.length === 0) {
    return null;
  }

  const row = data[0] as SendState;
  return {
    sender_email_sent_at: row.sender_email_sent_at ?? null,
    receiver_email_sent_at: row.receiver_email_sent_at ?? null,
  };
}

async function updateConnectedStatus(
  supabase: ReturnType<typeof getSupabaseAdmin>,
  connectionId: string,
  patch: Record<string, unknown>,
) {
  const { error } = await supabase
    .from(TABLE_NAME)
    .update(patch)
    .eq("id", connectionId);

  if (error) {
    console.error("Failed to update connected status.", error);
  }
}

function authorizeWebhook(headers: Headers, rawBody: string, secret: string) {
  const signatureHeader =
    headers.get("x-supabase-signature") ?? headers.get("x-webhook-signature");
  if (signatureHeader) {
    return verifySignature(rawBody, secret, signatureHeader);
  }

  const secretHeader = headers.get("x-webhook-secret");
  if (secretHeader) {
    return safeEquals(secretHeader, secret);
  }

  return false;
}

function verifySignature(rawBody: string, secret: string, signature: string) {
  const normalized = signature.startsWith("sha256=")
    ? signature.slice(7)
    : signature;
  const digest = createHmac("sha256", secret).update(rawBody).digest("hex");
  return safeEquals(normalized, digest);
}

function safeEquals(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);
  if (aBuffer.length !== bBuffer.length) {
    return false;
  }
  return timingSafeEqual(aBuffer, bBuffer);
}
