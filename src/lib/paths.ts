function normalizeBasePath(raw?: string | null) {
  if (!raw) return "";
  const trimmed = raw.trim();
  if (!trimmed || trimmed === "/") return "";
  return `/${trimmed.replace(/^\/+|\/+$/g, "")}`;
}

function deriveBasePath() {
  const fromEnv = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);
  if (fromEnv) return fromEnv;

  const siteUrl = process.env.SITE_URL;
  if (!siteUrl) return "";

  try {
    const parsed = new URL(siteUrl);
    return normalizeBasePath(parsed.pathname);
  } catch {
    return "";
  }
}

const normalizedBasePath = deriveBasePath();

export const basePath = normalizedBasePath;

export function withBasePath(path: string) {
  if (!path) return path;
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }

  const normalized = path.startsWith("/") ? path : `/${path}`;

  if (!basePath) {
    return normalized;
  }

  if (normalized.startsWith(`${basePath}/`) || normalized === basePath) {
    return normalized;
  }

  return `${basePath}${normalized}`;
}
