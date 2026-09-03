/**
 * Client-safe formatting helpers. Kept out of `mdx.ts` on purpose: that module
 * imports `node:fs`, so a Client Component must never pull a value from it.
 */

/** "2026-08-15" -> "August 15, 2026" */
export function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);

  if (Number.isNaN(date.getTime())) {
    return iso;
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}
