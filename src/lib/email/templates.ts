import { createHash } from "crypto";

export type ContactEmailData = {
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

export type EmailTemplate = {
  subject: string;
  html: string;
  text: string;
};

const USER_SUBJECTS = [
  "Hemos recibido tu mensaje",
  "Gracias por contactarnos, {name}",
  "Tu mensaje esta en camino",
];

export function buildInternalEmail(data: ContactEmailData): EmailTemplate {
  const html = `
<!doctype html>
<html>
  <body style="margin:0;background:#f3f4f6;font-family:Arial,sans-serif;color:#111827;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="padding:20px 24px;border-bottom:1px solid #e5e7eb;">
                <h1 style="margin:0;font-size:18px;">Nuevo registro de contacto</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 24px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
                  ${rowHtml("Nombre", data.name)}
                  ${rowHtml("Correo", data.email)}
                  ${rowHtml("Compania", data.company)}
                  ${rowHtml("Mensaje", data.message, true)}
                </table>
                <div style="margin-top:20px;padding-top:16px;border-top:1px solid #e5e7eb;">
                  <div style="font-size:12px;color:#6b7280;font-weight:bold;text-transform:uppercase;letter-spacing:0.08em;">
                    Metadata
                  </div>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:12px;color:#374151;margin-top:8px;">
                    ${rowHtml("ID", data.id)}
                    ${rowHtml("Created at", data.createdAt ?? "unknown")}
                    ${rowHtml("User agent", data.userAgent ?? "unknown")}
                    ${rowHtml("Source", data.source ?? "unknown")}
                    ${rowHtml("Environment", data.environment ?? "unknown")}
                  </table>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

  const text = [
    "Nuevo registro de contacto",
    "",
    `Nombre: ${data.name}`,
    `Correo: ${data.email}`,
    `Compania: ${data.company}`,
    `Mensaje: ${data.message}`,
    "",
    "Metadata:",
    `- ID: ${data.id}`,
    `- Created at: ${data.createdAt ?? "unknown"}`,
    `- User agent: ${data.userAgent ?? "unknown"}`,
    `- Source: ${data.source ?? "unknown"}`,
    `- Environment: ${data.environment ?? "unknown"}`,
  ].join("\n");

  return {
    subject: "Nuevo Registro de Contacto",
    html,
    text,
  };
}

export function buildUserEmail(data: ContactEmailData): EmailTemplate {
  const subject = pickSubject(data.id, data.name);
  const html = `
<!doctype html>
<html>
  <body style="margin:0;background:#f9fafb;font-family:Arial,sans-serif;color:#111827;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="padding:28px 32px;">
                <h1 style="margin:0 0 12px 0;font-size:20px;">Gracias por contactarnos, ${escapeHtml(
                  data.name,
                )}</h1>
                <p style="margin:0 0 12px 0;font-size:15px;line-height:1.6;color:#374151;">
                  Hemos recibido tu mensaje sobre ${escapeHtml(
                    data.company,
                  )}. Nuestro equipo lo revisara y te responderemos en 24-48h habiles.
                </p>
                <p style="margin:0 0 12px 0;font-size:15px;line-height:1.6;color:#374151;">
                  Si deseas agregar informacion adicional, responde a este correo.
                </p>
                <div style="margin-top:20px;padding-top:16px;border-top:1px solid #e5e7eb;color:#6b7280;font-size:12px;line-height:1.5;">
                  Este correo es informativo. Si no solicitaste contacto, puedes ignorarlo.
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

  const text = [
    `Gracias por contactarnos, ${data.name}`,
    "",
    `Hemos recibido tu mensaje sobre ${data.company}.`,
    "Nuestro equipo lo revisara y te responderemos en 24-48h habiles.",
    "Si deseas agregar informacion adicional, responde a este correo.",
    "",
    "Este correo es informativo. Si no solicitaste contacto, puedes ignorarlo.",
  ].join("\n");

  return { subject, html, text };
}

function rowHtml(label: string, value: string, preserveWhitespace = false) {
  const content = preserveWhitespace
    ? `<pre style="margin:0;white-space:pre-wrap;font-family:inherit;">${escapeHtml(
        value,
      )}</pre>`
    : escapeHtml(value);

  return `
<tr>
  <td style="padding:8px 0;border-bottom:1px solid #f3f4f6;width:140px;color:#6b7280;vertical-align:top;">${escapeHtml(
    label,
  )}</td>
  <td style="padding:8px 0;border-bottom:1px solid #f3f4f6;vertical-align:top;">${content}</td>
</tr>`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function pickSubject(id: string, name: string) {
  const digest = createHash("sha256").update(id).digest("hex");
  const index = parseInt(digest.slice(0, 8), 16) % USER_SUBJECTS.length;
  const subject = USER_SUBJECTS[index] ?? USER_SUBJECTS[0];
  return subject.replace("{name}", name);
}
