import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

/**
 * Android reads the home-screen icon from here, not from <link rel="icon">.
 * Without a manifest it falls back to a generic placeholder.
 *
 * Two icon purposes are declared deliberately: `any` for launchers that show
 * the icon as-is, and `maskable` for Android, which crops icons to a circle or
 * squircle. A maskable icon must bleed to the edges with its subject inside the
 * centre ~80%, so the two entries use different crops of the same photo.
 *
 * `ICON_VERSION` is a cache-buster on the icon URLs. Android freezes a PWA's
 * home-screen icon at install time and only refreshes it when the manifest
 * changes; bump this whenever the photo behind the icons changes so an
 * already-installed app picks up the new icon on its next launch.
 */
const ICON_VERSION = "2";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.role}`,
    short_name: "Deswendi",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#111111",
    theme_color: "#111111",
    icons: [
      {
        src: `/icons/icon-192.png?v=${ICON_VERSION}`,
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `/icons/icon-512.png?v=${ICON_VERSION}`,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `/icons/icon-maskable-512.png?v=${ICON_VERSION}`,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
