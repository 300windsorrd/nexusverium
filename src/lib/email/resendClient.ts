import { Resend } from "resend";

export type ResendEmailPayload = {
  to: string;
  from: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

export async function sendResendEmail(payload: ResendEmailPayload) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is missing.");
  }

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from: payload.from,
    to: payload.to,
    subject: payload.subject,
    html: payload.html,
    text: payload.text,
    replyTo: payload.replyTo,
  });

  if (error) {
    throw new Error(error.message || "Resend request failed.");
  }

  return data;
}
