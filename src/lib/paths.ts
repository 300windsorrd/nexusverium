const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const normalizedBasePath =
  rawBasePath && rawBasePath !== "/"
    ? `/${rawBasePath.replace(/^\/+|\/+$/g, "")}`
    : "";

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
