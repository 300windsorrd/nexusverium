export type ConnectedEmailRow = {
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

export type EmailTemplate = {
  subject: string;
  html: string;
  text: string;
};

export function renderSenderEmail(row: ConnectedEmailRow): EmailTemplate {
  const subjectLine = "We received your connection request";
  const message = row.message?.trim() || "No message provided.";
  const connectionSubject = row.subject?.trim() || "Connection request";
  const createdAt = row.created_at ?? "unknown";

  const html = `
<!doctype html>
<html>
  <body style="margin:0;background:#f8fafc;font-family:Arial,sans-serif;color:#0f172a;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="padding:22px 26px;border-bottom:1px solid #e2e8f0;">
                <h1 style="margin:0;font-size:18px;">We received your connection request</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 26px;">
                <p style="margin:0 0 12px 0;font-size:15px;line-height:1.6;color:#334155;">
                  Hi ${escapeHtml(row.sender_name)}, thanks for reaching out. We have notified ${escapeHtml(
                    row.receiver_name,
                  )}.
                </p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
                  ${rowHtml("Subject", connectionSubject)}
                  ${rowHtml("Sender", `${row.sender_name} <${row.sender_email}>`)}
                  ${rowHtml("Receiver", `${row.receiver_name} <${row.receiver_email}>`)}
                  ${rowHtml("Message", message, true)}
                </table>
                ${metadataBlock(row)}
                <div style="margin-top:18px;font-size:12px;color:#64748b;">
                  Reference ID: ${escapeHtml(row.id)}<br />
                  Created at: ${escapeHtml(createdAt)}
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
    subjectLine,
    "",
    `Subject: ${connectionSubject}`,
    `Sender: ${row.sender_name} <${row.sender_email}>`,
    `Receiver: ${row.receiver_name} <${row.receiver_email}>`,
    `Message: ${message}`,
    "",
    `Reference ID: ${row.id}`,
    `Created at: ${createdAt}`,
  ];

  const metadataText = metadataTextBlock(row);
  if (metadataText) {
    text.push("", "Metadata:", metadataText);
  }

  return {
    subject: subjectLine,
    html,
    text: text.join("\n"),
  };
}

export function renderReceiverEmail(row: ConnectedEmailRow): EmailTemplate {
  const subjectLine = `You received a new connection from ${row.sender_name}`;
  const message = row.message?.trim() || "No message provided.";
  const connectionSubject = row.subject?.trim() || "Connection request";
  const createdAt = row.created_at ?? "unknown";

  const html = `
<!doctype html>
<html>
  <body style="margin:0;background:#f8fafc;font-family:Arial,sans-serif;color:#0f172a;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="padding:22px 26px;border-bottom:1px solid #e2e8f0;">
                <h1 style="margin:0;font-size:18px;">You received a new connection</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 26px;">
                <p style="margin:0 0 12px 0;font-size:15px;line-height:1.6;color:#334155;">
                  ${escapeHtml(
                    row.sender_name,
                  )} is requesting a connection with you.
                </p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
                  ${rowHtml("Subject", connectionSubject)}
                  ${rowHtml("Sender", `${row.sender_name} <${row.sender_email}>`)}
                  ${rowHtml("Receiver", `${row.receiver_name} <${row.receiver_email}>`)}
                  ${rowHtml("Message", message, true)}
                </table>
                ${metadataBlock(row)}
                <div style="margin-top:18px;font-size:12px;color:#64748b;">
                  Reference ID: ${escapeHtml(row.id)}<br />
                  Created at: ${escapeHtml(createdAt)}
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
    subjectLine,
    "",
    `Subject: ${connectionSubject}`,
    `Sender: ${row.sender_name} <${row.sender_email}>`,
    `Receiver: ${row.receiver_name} <${row.receiver_email}>`,
    `Message: ${message}`,
    "",
    `Reference ID: ${row.id}`,
    `Created at: ${createdAt}`,
  ];

  const metadataText = metadataTextBlock(row);
  if (metadataText) {
    text.push("", "Metadata:", metadataText);
  }

  return {
    subject: subjectLine,
    html,
    text: text.join("\n"),
  };
}

function rowHtml(label: string, value: string, preserveWhitespace = false) {
  const content = preserveWhitespace
    ? `<pre style="margin:0;white-space:pre-wrap;font-family:inherit;">${escapeHtml(
        value,
      )}</pre>`
    : escapeHtml(value);

  return `
<tr>
  <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;width:140px;color:#64748b;vertical-align:top;">${escapeHtml(
    label,
  )}</td>
  <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;vertical-align:top;">${content}</td>
</tr>`;
}

function metadataBlock(row: ConnectedEmailRow) {
  if (!row.metadata || Object.keys(row.metadata).length === 0) {
    return "";
  }
  const metadata = escapeHtml(JSON.stringify(row.metadata, null, 2));

  return `
<div style="margin-top:18px;padding-top:12px;border-top:1px solid #e2e8f0;">
  <div style="font-size:12px;color:#64748b;font-weight:bold;text-transform:uppercase;letter-spacing:0.08em;">
    Metadata
  </div>
  <pre style="margin:8px 0 0 0;font-size:12px;color:#475569;white-space:pre-wrap;">${metadata}</pre>
</div>`;
}

function metadataTextBlock(row: ConnectedEmailRow) {
  if (!row.metadata || Object.keys(row.metadata).length === 0) {
    return "";
  }
  try {
    return JSON.stringify(row.metadata, null, 2);
  } catch {
    return "";
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
