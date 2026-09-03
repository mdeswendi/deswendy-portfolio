/**
 * Generates in-article diagrams for journal posts.
 *
 *   npm run diagrams
 *
 * Separate from generate-journal-covers.mjs: covers are one-per-article and
 * driven by frontmatter, diagrams are hand-authored figures that only some
 * articles need.
 *
 * Satori is not a browser — every element with more than one child needs an
 * explicit `display`, and arrowheads/curves are not worth the trouble, so
 * connections are drawn as plain rules.
 */
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(path.join(ROOT, "package.json"));

const React = require("react");
const { ImageResponse } = require("next/og");

const OUT_DIR = path.join(ROOT, "public", "journal", "diagrams");
const FONT = path.join(ROOT, "assets", "Sora-Static.ttf");

const INK = "#111111";
const INK_SOFT = "#171717";
const CREAM = "#f4f4f2";
const MUTED = "#9b9b98";
const GOLD = "#c9a227";
const LINE = "#262626";

const WIDTH = 1200;
const HEIGHT = 750;

const h = React.createElement;

function frame(eyebrow, heading, body) {
  return h(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: INK,
        fontFamily: "Sora",
        padding: 64,
      },
    },
    h(
      "div",
      { style: { display: "flex", alignItems: "center" } },
      h("div", {
        style: { width: 40, height: 2, backgroundColor: GOLD, marginRight: 16 },
      }),
      h(
        "div",
        { style: { fontSize: 19, letterSpacing: 5, color: MUTED } },
        eyebrow,
      ),
    ),
    h(
      "div",
      {
        style: {
          display: "flex",
          fontSize: 42,
          fontWeight: 600,
          color: CREAM,
          letterSpacing: -1,
          marginTop: 22,
        },
      },
      heading,
    ),
    body,
  );
}

/* ---------------------------------------------------------------- loop --- */

const LOOP_STEPS = [
  ["01", "Membeli ebook atau kelas"],
  ["02", "Diarahkan membuat produk digital"],
  ["03", "Live TikTok, mencari pembeli"],
  ["04", "Pembeli itu menjadi penjual"],
];

function loopDiagram() {
  const cards = [];
  LOOP_STEPS.forEach(([num, text], i) => {
    if (i > 0) {
      cards.push(
        h("div", {
          key: `c${i}`,
          style: {
            width: 30,
            height: 2,
            backgroundColor: LINE,
            alignSelf: "center",
          },
        }),
      );
    }
    cards.push(
      h(
        "div",
        {
          key: `s${i}`,
          style: {
            display: "flex",
            flexDirection: "column",
            width: 240,
            height: 200,
            backgroundColor: INK_SOFT,
            border: `1px solid ${LINE}`,
            borderRadius: 14,
            padding: 24,
          },
        },
        h(
          "div",
          { style: { fontSize: 18, color: GOLD, marginBottom: 16 } },
          num,
        ),
        h(
          "div",
          { style: { fontSize: 23, color: CREAM, lineHeight: 1.35 } },
          text,
        ),
      ),
    );
  });

  return h(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        justifyContent: "center",
      },
    },
    h("div", { style: { display: "flex" } }, ...cards),
    h(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          marginTop: 40,
          border: `1px solid ${GOLD}`,
          borderRadius: 12,
          padding: "22px 26px",
        },
      },
      // Drawn, not typed: Sora has no ↺ glyph, and satori then tries to fetch
      // a fallback font from Google and fails.
      h("div", {
        style: {
          width: 10,
          height: 10,
          borderRadius: 10,
          backgroundColor: GOLD,
          marginRight: 18,
        },
      }),
      h(
        "div",
        { style: { fontSize: 23, color: CREAM } },
        "Kembali ke langkah 01 — dan jumlah penjual bertambah.",
      ),
    ),
  );
}

/* -------------------------------------------------------- survivorship --- */

const VISIBLE = [104, 156, 124, 184, 140, 166];
const HIDDEN = Array.from({ length: 26 }, (_, i) => 46 + ((i * 17) % 72));

// Dimmer than gold, but deliberately still countable: the point of the figure
// is how MANY are below the line, so they must not disappear into the ground.
const HIDDEN_BAR = "#3a3a36";

function survivorshipDiagram() {
  return h(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        justifyContent: "center",
      },
    },
    h(
      "div",
      { style: { display: "flex", fontSize: 19, color: GOLD, marginBottom: 14 } },
      "YANG MEMBUAT KONTEN — terlihat di FYP",
    ),
    h(
      "div",
      { style: { display: "flex", alignItems: "flex-end", height: 190 } },
      ...VISIBLE.map((height, i) =>
        h("div", {
          key: `v${i}`,
          style: {
            width: 52,
            height,
            marginRight: 18,
            backgroundColor: GOLD,
            borderRadius: 4,
          },
        }),
      ),
    ),
    h("div", {
      style: { height: 1, backgroundColor: GOLD, marginTop: 22 },
    }),
    h(
      "div",
      {
        style: {
          display: "flex",
          fontSize: 19,
          color: MUTED,
          marginTop: 14,
          marginBottom: 14,
        },
      },
      "YANG BERHENTI — tidak membuat konten, tidak terlihat",
    ),
    h(
      "div",
      { style: { display: "flex", alignItems: "flex-start", height: 120 } },
      ...HIDDEN.map((height, i) =>
        h("div", {
          key: `x${i}`,
          style: {
            width: 24,
            height,
            marginRight: 16,
            backgroundColor: HIDDEN_BAR,
            borderRadius: 3,
          },
        }),
      ),
    ),
  );
}

/* ------------------------------------------------------------------------ */

const figures = [
  {
    file: "pembeli-menjadi-penjual.png",
    node: frame("SIKLUS", "Dari pembeli menjadi penjual", loopDiagram()),
  },
  {
    file: "survivorship-bias.png",
    node: frame(
      "SURVIVORSHIP BIAS",
      "Yang terlihat, dan yang tidak",
      survivorshipDiagram(),
    ),
  },
];

const font = await readFile(FONT);
await mkdir(OUT_DIR, { recursive: true });

for (const figure of figures) {
  const response = new ImageResponse(figure.node, {
    width: WIDTH,
    height: HEIGHT,
    fonts: [{ name: "Sora", data: font, style: "normal", weight: 400 }],
  });
  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(path.join(OUT_DIR, figure.file), buffer);
  console.log(`  ${figure.file}  ${(buffer.length / 1024).toFixed(0)} KB`);
}

console.log(`\n${figures.length} diagram(s) written to public/journal/diagrams/`);
