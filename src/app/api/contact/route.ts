import { storeContactSubmission } from "@/lib/contactStore";
import type { ContactSubmission } from "@/types/contact";

function getFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  if (!value) {
    return "";
  }
  if (typeof value === "string") {
    return value.trim();
  }
  return "";
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const honeypot = formData.get("honeypot");
  if (typeof honeypot === "string" && honeypot.trim().length > 0) {
    return Response.json(
      { message: "Blocked by spam protection." },
      { status: 400 },
    );
  }

  const submission: ContactSubmission = {
    name: getFormValue(formData, "name"),
    email: getFormValue(formData, "email"),
    phone: getFormValue(formData, "phone"),
    company: getFormValue(formData, "company"),
    message: getFormValue(formData, "message"),
    captchaToken: getFormValue(formData, "captchaToken") || "captcha-placeholder",
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
