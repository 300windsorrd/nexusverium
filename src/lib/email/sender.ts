export type EmailPayload = {
  to: string;
  from: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

type Provider = "resend" | "sendgrid";

type ProviderResponse = {
  ok: boolean;
  status: number;
  body: string;
  requestId?: string;
};

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const SENDGRID_ENDPOINT = "https://api.sendgrid.com/v3/mail/send";

export async function sendEmail(payload: EmailPayload) {
  const provider = resolveProvider();

  const send =
    provider.name === "resend"
      ? () => sendWithResend(provider.key, payload)
      : () => sendWithSendGrid(provider.key, payload);

  return sendWithRetries(send, provider.name);
}

function resolveProvider(): { name: Provider; key: string } {
  const requested = process.env.EMAIL_PROVIDER?.trim().toLowerCase();
  const resendKey = process.env.RESEND_API_KEY?.trim();
  const sendgridKey = process.env.SENDGRID_API_KEY?.trim();

  if (requested === "resend" && resendKey) {
    return { name: "resend", key: resendKey };
  }
  if (requested === "sendgrid" && sendgridKey) {
    return { name: "sendgrid", key: sendgridKey };
  }
  if (resendKey) {
    return { name: "resend", key: resendKey };
  }
  if (sendgridKey) {
    return { name: "sendgrid", key: sendgridKey };
  }

  throw new Error("Missing RESEND_API_KEY or SENDGRID_API_KEY.");
}

async function sendWithResend(
  apiKey: string,
  payload: EmailPayload,
): Promise<ProviderResponse> {
  const body = JSON.stringify({
    from: payload.from,
    to: payload.to,
    subject: payload.subject,
    html: payload.html,
    text: payload.text,
    reply_to: payload.replyTo,
  });

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body,
  });

  const responseBody = await safeText(response);
  let requestId: string | undefined;
  if (response.ok) {
    try {
      const parsed = JSON.parse(responseBody) as { id?: string };
      requestId = parsed?.id;
    } catch {
      requestId = undefined;
    }
  }

  return {
    ok: response.ok,
    status: response.status,
    body: responseBody,
    requestId,
  };
}

async function sendWithSendGrid(
  apiKey: string,
  payload: EmailPayload,
): Promise<ProviderResponse> {
  const body = JSON.stringify({
    personalizations: [
      {
        to: [{ email: payload.to }],
        subject: payload.subject,
      },
    ],
    from: { email: payload.from },
    reply_to: payload.replyTo ? { email: payload.replyTo } : undefined,
    content: [
      { type: "text/plain", value: payload.text },
      { type: "text/html", value: payload.html },
    ],
  });

  const response = await fetch(SENDGRID_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body,
  });

  return {
    ok: response.ok,
    status: response.status,
    body: await safeText(response),
  };
}

async function sendWithRetries(
  send: () => Promise<ProviderResponse>,
  provider: Provider,
) {
  const maxAttempts = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const response = await send();
      if (response.ok) {
        return {
          provider,
          requestId: response.requestId,
          status: response.status,
        };
      }

      const retryable = isRetryableStatus(response.status);
      lastError = new Error(
        `Email provider error (${provider}) status=${response.status} body=${truncate(
          response.body,
          300,
        )}`,
      );
      if (!retryable || attempt === maxAttempts) {
        throw lastError;
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Unknown error");
      if (attempt === maxAttempts) {
        throw lastError;
      }
    }

    await delay(backoffMs(attempt));
  }

  throw lastError ?? new Error("Email provider error.");
}

function isRetryableStatus(status: number) {
  return status === 429 || status >= 500;
}

function backoffMs(attempt: number) {
  const base = 500 * Math.pow(2, attempt - 1);
  const jitter = Math.floor(Math.random() * 250);
  return Math.min(4000, base + jitter);
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function truncate(value: string, max: number) {
  if (value.length <= max) {
    return value;
  }
  return `${value.slice(0, max)}...`;
}

async function safeText(response: Response) {
  try {
    return await response.text();
  } catch {
    return "";
  }
}
