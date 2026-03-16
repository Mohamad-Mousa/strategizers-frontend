/**
 * Sanitizes a title from API - replaces placeholder/invalid values with fallback.
 * The API may return "<string>" or empty values as placeholders.
 */
export function sanitizeTitle(title: string | undefined, fallback: string): string {
  if (!title || typeof title !== "string") return fallback;
  const trimmed = title.trim();
  if (trimmed === "" || trimmed === "<string>") return fallback;
  return trimmed;
}
