import { storeContactSubmission } from "@/lib/contactStore";
import type { ContactSubmission } from "@/types/contact";

type RawPayload = Record<string, unknown>;

async function parsePayload(request: Request): Promise<RawPayload> {
  const contentType = (request.headers.get("content-type") ?? "").toLowerCase();
  if (contentType.includes("application/json")) {
    try {
      const parsed = await request.json();
      if (parsed && typeof parsed === "object") {
        return parsed as RawPayload;
      }
    } catch (error) {
      console.error("Unable to parse JSON payload", error);
    }
    return {};
  }

  const formData = await request.formData();
  const payload: RawPayload = {};
  formData.forEach((value, key) => {
    payload[key] = value;
  });
  return payload;
}

function getValue(payload: RawPayload, key: string) {
  const value = payload[key];
  if (typeof value === "string") {
    return value.trim();
  }
  return "";
}

export async function POST(request: Request) {
  const payload = await parsePayload(request);
  const honeypot = getValue(payload, "honeypot");
  if (honeypot) {
    return Response.json(
      { message: "Blocked by spam protection." },
      { status: 400 },
    );
  }

  const submission: ContactSubmission = {
    name: getValue(payload, "name"),
    email: getValue(payload, "email"),
    phone: getValue(payload, "phone"),
    company: getValue(payload, "company"),
    message: getValue(payload, "message"),
    captchaToken: getValue(payload, "captchaToken") || "captcha-placeholder",
  };

  if (
    !submission.name ||
    !submission.email ||
    !submission.phone ||
    !submission.company ||
    !submission.message
  ) {
    return Response.json(
      { message: "Missing required fields." },
      { status: 400 },
    );
  }

  try {
    await storeContactSubmission(submission);
    return Response.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to store the message.";
    return Response.json({ message }, { status: 500 });
  }
}
