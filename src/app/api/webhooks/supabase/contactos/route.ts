import { createHash, createHmac, timingSafeEqual } from "crypto";

import { sendEmail } from "@/lib/email/sender";
import { buildInternalEmail, buildUserEmail } from "@/lib/email/templates";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

type SupabaseWebhookPayload = {
  type?: string;
  table?: string;
  schema?: string;
  record?: Record<string, unknown>;
  old_record?: Record<string, unknown> | null;
};

type ContactRecord = {
  id: string;
  createdAt: string | null;
  name: string;
  email: string;
  company: string;
  message: string;
  userAgent?: string | null;
  source?: string | null;
  environment?: string | null;
};

const TABLE_NAME = process.env.CONTACT_TABLE_NAME?.trim() || "Contacted";
const INTERNAL_EMAIL =
  process.env.INTERNAL_NOTIFICATION_EMAIL?.trim() || "example@gmail.com";
const FROM_EMAIL = process.env.FROM_EMAIL?.trim() || "";
const MAX_MESSAGE_LENGTH = 2000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export async function POST(request: Request) {
  const rawBody = await request.text();
  const secret = process.env.WEBHOOK_SECRET?.trim();

  if (!secret) {
    console.error("WEBHOOK_SECRET is missing.");
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

  if ((payload.type ?? "").toUpperCase() !== "INSERT") {
    return Response.json({ ok: true, ignored: true });
  }

  const table = (payload.table ?? "").toLowerCase();
  if (table && table !== TABLE_NAME.toLowerCase()) {
    return Response.json({ ok: true, ignored: true });
  }

  const record = (payload.record ?? {}) as Record<string, unknown>;
  const contact = sanitizeContact(mapContactRecord(record));

  if (!contact.id) {
    return Response.json({ message: "Missing contact id." }, { status: 400 });
  }

  if (!FROM_EMAIL) {
    console.error("FROM_EMAIL is missing.");
    return Response.json({ message: "Server misconfigured." }, { status: 500 });
  }

  const supabase = getSupabaseAdmin();
  const { data: existing, error: existingError } = await supabase
    .from(TABLE_NAME)
    .select("id, email_sent_internal_at, email_sent_user_at, email_status")
    .eq("id", contact.id)
    .single();

  if (existingError || !existing) {
    console.error("Unable to fetch contact record.", existingError);
    return Response.json({ message: "Contact not found." }, { status: 404 });
  }

  if (existing.email_sent_internal_at && existing.email_sent_user_at) {
    return Response.json({ ok: true, status: "already_sent" });
  }

  const validationError = validateContact(contact);
  if (validationError) {
    await updateContactStatus(contact.id, {
      email_status: "failed",
      last_error: validationError,
    });
    console.warn("Contact validation failed.", safeLogContext(contact));
    return Response.json({ ok: true, status: "failed" });
  }

  const templates = {
    internal: buildInternalEmail(contact),
    user: buildUserEmail(contact),
  };

  let internalSent = Boolean(existing.email_sent_internal_at);
  let userSent = Boolean(existing.email_sent_user_at);
  const errors: string[] = [];

  if (!internalSent) {
    try {
      await sendEmail({
        to: INTERNAL_EMAIL,
        from: FROM_EMAIL,
        subject: templates.internal.subject,
        html: templates.internal.html,
        text: templates.internal.text,
        replyTo: contact.email,
      });
      internalSent = true;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Internal email failed.";
      errors.push(`internal:${message}`);
    }
  }

  if (!userSent) {
    try {
      await sendEmail({
        to: contact.email,
        from: FROM_EMAIL,
        subject: templates.user.subject,
        html: templates.user.html,
        text: templates.user.text,
      });
      userSent = true;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "User email failed.";
      errors.push(`user:${message}`);
    }
  }

  const status = internalSent && userSent ? "sent" : "failed";
  await updateContactStatus(contact.id, {
    email_status: status,
    email_sent_internal_at: internalSent
      ? existing.email_sent_internal_at ?? new Date().toISOString()
      : existing.email_sent_internal_at ?? null,
    email_sent_user_at: userSent
      ? existing.email_sent_user_at ?? new Date().toISOString()
      : existing.email_sent_user_at ?? null,
    last_error: status === "sent" ? null : errors.join(" | ").slice(0, 1000),
  });

  console.info("Contact webhook processed.", {
    ...safeLogContext(contact),
    status,
  });

  return Response.json({ ok: true, status });
}

function mapContactRecord(record: Record<string, unknown>): ContactRecord {
  const pick = (keys: string[]) => {
    for (const key of keys) {
      const value = record[key];
      if (typeof value === "string") {
        return value;
      }
      if (typeof value === "number") {
        return String(value);
      }
    }
    return "";
  };

  return {
    id: pick(["id", "contact_id"]),
    createdAt: pick(["created_at", "createdAt"]),
    name: pick(["nombre_persona", "name", "nombrePersona"]),
    email: pick(["correo_usuario", "email", "correoUsuario"]),
    company: pick(["nombre_compania", "company", "nombreCompania"]),
    message: pick([
      "mensaje_contacto",
      "Message",
      "message",
      "mensajeContacto",
    ]),
    userAgent: pick(["user_agent", "userAgent"]),
    source: pick(["source"]),
    environment: pick(["environment"]),
  };
}

function sanitizeContact(contact: ContactRecord): ContactRecord {
  return {
    ...contact,
    createdAt: contact.createdAt?.trim() || null,
    name: sanitizeInline(contact.name),
    email: contact.email.trim().toLowerCase(),
    company: sanitizeInline(contact.company),
    message: sanitizeMessage(contact.message),
    userAgent: contact.userAgent?.trim() || null,
    source: contact.source?.trim() || null,
    environment: contact.environment?.trim() || null,
  };
}

function sanitizeInline(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function sanitizeMessage(value: string) {
  return value.trim();
}

function validateContact(contact: ContactRecord) {
  if (!contact.name) {
    return "nombre_persona is required.";
  }
  if (!contact.email || !EMAIL_REGEX.test(contact.email)) {
    return "correo_usuario is invalid.";
  }
  if (!contact.company) {
    return "nombre_compania is required.";
  }
  if (!contact.message) {
    return "mensaje_contacto is required.";
  }
  if (contact.message.length > MAX_MESSAGE_LENGTH) {
    return `mensaje_contacto exceeds ${MAX_MESSAGE_LENGTH} chars.`;
  }
  return null;
}

function safeLogContext(contact: ContactRecord) {
  return {
    contactId: contact.id,
    emailHash: hashValue(contact.email),
    messageHash: hashValue(contact.message),
    messageLength: contact.message.length,
  };
}

function hashValue(value: string) {
  return createHash("sha256").update(value).digest("hex").slice(0, 16);
}

async function updateContactStatus(
  contactId: string,
  patch: Record<string, unknown>,
) {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from(TABLE_NAME)
    .update(patch)
    .eq("id", contactId);

  if (error) {
    console.error("Failed to update contact status.", error);
  }
}

function authorizeWebhook(
  headers: Headers,
  rawBody: string,
  secret: string,
) {
  const allowlist = parseAllowlist(
    process.env.WEBHOOK_IP_ALLOWLIST?.trim(),
  );
  const clientIp = extractClientIp(headers);
  if (allowlist.length > 0) {
    if (!clientIp || !allowlist.includes(clientIp)) {
      return false;
    }
  }

  const signatureHeader =
    headers.get("x-supabase-signature") ??
    headers.get("x-webhook-signature");
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

function parseAllowlist(value?: string) {
  if (!value) {
    return [];
  }
  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function extractClientIp(headers: Headers) {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim();
  }
  return headers.get("x-real-ip")?.trim() ?? "";
}
