/**
 * Base URL for images. Derives from API URL or uses env override.
 * Use http for localhost to avoid certificate issues.
 */
const getImageBaseUrl = (): string => {
  const env = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
  if (env) return env.replace(/\/$/, "");

  const apiUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api/v1";
  const base = apiUrl.replace(/\/api\/v\d*\/?$/, "");
  return base || "http://localhost:4000";
};

/**
 * Build full image URL from a relative path.
 * Handles paths that are already full URLs.
 */
export function getImageUrl(path: string | undefined | null): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const base = getImageBaseUrl();
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${base}/${cleanPath}`;
}
