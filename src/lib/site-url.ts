import { site } from "@/lib/site";

/**
 * SERVER ONLY — reads a non-public environment variable, which is replaced
 * with an empty string in client bundles. Import this from metadata exports,
 * route handlers and image routes; never from a Client Component.
 *
 * Vercel sets VERCEL_PROJECT_PRODUCTION_URL to the project's production
 * domain: the shortest custom domain once one is attached, otherwise the
 * *.vercel.app domain. It stays the production domain on preview deployments
 * too, which is what canonical URLs and OG tags should point at.
 *
 * Off Vercel (local dev, `next build` on your machine) it falls back to
 * `site.url`.
 */
export function getSiteUrl(): string {
  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return vercelUrl ? `https://${vercelUrl}` : site.url;
}

/** Same value with the scheme stripped — for display, e.g. on the OG image. */
export function getSiteHost(): string {
  return getSiteUrl().replace(/^https?:\/\//, "");
}
