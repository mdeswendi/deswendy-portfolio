import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { site } from "@/lib/site";
import { getSiteHost } from "@/lib/site-url";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Satori cannot read woff2, which is all next/font emits, so the OG card needs
 * its own TTF committed under assets/.
 *
 * Satori also requires every element with more than one child to declare an
 * explicit `display`, and it does not lay out mixed text + <span> content the
 * way a browser does — hence each line below is its own single-text-child div.
 */
const sora = await readFile(join(process.cwd(), "assets/Sora-Static.ttf"));

// Embedded as a data URI: satori has no server to resolve a relative path from.
const portrait = await readFile(
  join(process.cwd(), "public/about/portrait.jpg"),
);
const portraitSrc = `data:image/jpeg;base64,${portrait.toString("base64")}`;

const INK = "#111111";
const CREAM = "#f4f4f2";
const MUTED = "#9b9b98";
const GOLD = "#c9a227";
const LINE = "#262626";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: INK,
          fontFamily: "Sora",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "72px 64px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: 40,
                height: 2,
                backgroundColor: GOLD,
                marginRight: 16,
              }}
            />
            <div style={{ fontSize: 19, letterSpacing: 5, color: MUTED }}>
              {site.role.toUpperCase()}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 64,
                fontWeight: 600,
                color: CREAM,
                letterSpacing: -1.5,
              }}
            >
              {site.name}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 26,
                fontSize: 27,
                lineHeight: 1.4,
                color: MUTED,
              }}
            >
              <div>Building digital solutions through</div>
              <div>code, creativity, and</div>
              <div style={{ color: GOLD }}>continuous learning.</div>
            </div>
          </div>

          <div style={{ display: "flex", fontSize: 19, color: MUTED }}>
            {getSiteHost()}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            width: 440,
            borderLeft: `1px solid ${LINE}`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={portraitSrc}
            alt=""
            width={440}
            height={630}
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Sora", data: sora, style: "normal", weight: 400 }],
    },
  );
}
