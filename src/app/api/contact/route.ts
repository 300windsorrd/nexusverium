import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const WINDOW_MS = 60 * 1000;
const MAX_ATTEMPTS = 5;
const attempts = new Map<string, { count: number; timestamp: number }>();

function rateLimited(key: string) {
  const now = Date.now();
  const record = attempts.get(key);
  if (record && now - record.timestamp < WINDOW_MS) {
    if (record.count >= MAX_ATTEMPTS) return true;
    record.count += 1;
    attempts.set(key, record);
    return false;
  }
  attempts.set(key, { count: 1, timestamp: now });
  return false;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("true-client-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { message: "Too many requests, please try again shortly." },
      { status: 429 },
    );
  }

  const body = await req.json().catch(() => ({}));
  const { name, email, phone, company, subject, message, honeypot } = body;

  if (honeypot) {
    return NextResponse.json(
      { message: "Blocked by spam protection." },
      { status: 400 },
    );
  }

  if (!name || !email || !phone || !company || !subject || !message) {
    return NextResponse.json(
      { message: "Please complete all required fields." },
      { status: 400 },
    );
  }

  if (typeof message === "string" && message.length > 2000) {
    return NextResponse.json(
      { message: "Message is too long." },
      { status: 400 },
    );
  }

  // TODO: integrate Cloudflare Turnstile or reCAPTCHA verification here.
  const captchaToken = body.captchaToken;
  if (!captchaToken) {
    return NextResponse.json(
      { message: "CAPTCHA verification is required." },
      { status: 400 },
    );
  }

  // In a real deployment, route this to a queue, email, or CRM.
  console.info("Contact submission", {
    name,
    email,
    phone,
    company,
    subject,
    message,
    ip,
  });

  return NextResponse.json({ message: "Message received." });
}
