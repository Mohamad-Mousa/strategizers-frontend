/**
 * Base URL for images. Derives from API URL or uses env override.
 */
const getImageBaseUrl = (): string => {
  const env = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
  if (env) return env.replace(/\/$/, "");

  return "https://api.strategizers-me.com";
};

/**
 * Build full image URL from a relative path.
 * Handles paths that are already full URLs.
 * Pattern: https://api.strategizers-me.com/{path} when NEXT_PUBLIC_IMAGE_BASE_URL is unset
 */
export function getImageUrl(path: string | undefined | null): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const base = getImageBaseUrl();
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
