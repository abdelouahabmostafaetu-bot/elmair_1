// Build a URL-friendly slug. Keeps Arabic letters and adds a short random
// suffix so titles stay unique even when they repeat.
export function slugify(input: string): string {
  const base = (input || "")
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^\u0600-\u06FFa-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
  const suffix = Math.random().toString(36).slice(2, 7)
  return `${base || "post"}-${suffix}`
}
