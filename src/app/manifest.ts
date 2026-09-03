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
 */
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
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
