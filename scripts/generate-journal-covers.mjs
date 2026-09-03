/**
 * Generates the typographic cover image for each journal article.
 *
 *   npm run covers
 *
 * Adding a new article:
 *   1. Write src/content/journal/<slug>.mdx with its frontmatter.
 *   2. Add a `<slug>` entry to QUOTES below — pick a line from the article
 *      worth putting on the cover, and mark the closing line `gold: true`.
 *   3. Run `npm run covers`.
 *
 * Category and reading time are read from the MDX frontmatter, so they never
 * drift from the article itself. Only the pull quote is authored here.
 *
 * The cover deliberately does NOT repeat the article title: the page renders
 * the title as an H1 directly above the cover, so a quote adds something a
 * repeated title would not.
 *
 * If an article has a real photo or screenshot, prefer it — just drop the file
 * at public/journal/<slug>.png and remove that slug from QUOTES.
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(path.join(ROOT, "package.json"));

const React = require("react");
const matter = require("gray-matter");
const { ImageResponse } = require("next/og");

const CONTENT_DIR = path.join(ROOT, "src", "content", "journal");
const OUT_DIR = path.join(ROOT, "public", "journal");
const FONT = path.join(ROOT, "assets", "Sora-Static.ttf");

// Keep in step with src/lib/site.ts — that file is TypeScript, so a plain
// node script cannot import it.
const AUTHOR = "Muhammad Deswendi";

// Design tokens, mirroring src/app/globals.css.
const INK = "#111111";
const CREAM = "#f4f4f2";
const MUTED = "#9b9b98";
const GOLD = "#c9a227";
const LINE = "#262626";

const WIDTH = 1200;
const HEIGHT = 750; // 16:10 — matches the card and article hero frames.

/** slug -> pull-quote lines. The `gold` line is the payoff. */
const QUOTES = {
  "website-desa-wanasari-journey": [
    { text: "Most articles about going digital" },
    { text: "start with the technology." },
    { text: "This one starts with a filing cabinet.", gold: true },
  ],
  "from-industrial-to-software": [
    { text: "I traded one set of systems" },
    { text: "for another. The tools are different." },
    { text: "The thinking is not.", gold: true },
  ],
  "kerja-remote-produk-digital-jual-sekop": [
    { text: "Apakah saya sedang belajar" },
    { text: "mencari emas, atau sebenarnya" },
    { text: "sedang membeli sekop?", gold: true },
  ],
};

const h = React.createElement;

/**
 * Satori is not a browser: every element with more than one child needs an
 * explicit `display`, and mixed text + inline elements are not supported —
 * hence one div per line.
 */
function cover({ category, quote, readingTime }) {
  return h(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: INK,
        fontFamily: "Sora",
        padding: "60px 72px",
      },
    },
    h(
      "div",
      { style: { display: "flex", alignItems: "center" } },
      h("div", {
        style: { width: 44, height: 2, backgroundColor: GOLD, marginRight: 18 },
      }),
      h(
        "div",
        { style: { fontSize: 21, letterSpacing: 6, color: MUTED } },
        category.toUpperCase(),
      ),
    ),
    h(
      "div",
      { style: { display: "flex" } },
      h("div", {
        style: {
          width: 3,
          backgroundColor: GOLD,
          marginRight: 34,
          borderRadius: 2,
        },
      }),
      h(
        "div",
        { style: { display: "flex", flexDirection: "column" } },
        ...quote.map((line, i) =>
          h(
            "div",
            {
              key: i,
              style: {
                fontSize: 50,
                fontWeight: 600,
                lineHeight: 1.28,
                letterSpacing: -1.2,
                color: line.gold ? GOLD : CREAM,
              },
            },
            line.text,
          ),
        ),
      ),
    ),
    h(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          borderTop: `1px solid ${LINE}`,
          paddingTop: 26,
          fontSize: 21,
          color: MUTED,
        },
      },
      h("div", {}, AUTHOR),
      h("div", {}, readingTime),
    ),
  );
}

const font = await readFile(FONT);
const slugs = (await readdir(CONTENT_DIR))
  .filter((file) => file.endsWith(".mdx"))
  .map((file) => file.replace(/\.mdx$/, ""));

let written = 0;
const skipped = [];

for (const slug of slugs) {
  const quote = QUOTES[slug];
  if (!quote) {
    skipped.push(slug);
    continue;
  }

  const { data } = matter(
    await readFile(path.join(CONTENT_DIR, `${slug}.mdx`), "utf8"),
  );

  const response = new ImageResponse(
    cover({
      category: data.category,
      readingTime: data.readingTime,
      quote,
    }),
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [{ name: "Sora", data: font, style: "normal", weight: 400 }],
    },
  );

  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(path.join(OUT_DIR, `${slug}.png`), buffer);
  console.log(`  ${slug}.png  ${(buffer.length / 1024).toFixed(0)} KB`);
  written += 1;
}

console.log(`\n${written} cover(s) written to public/journal/`);

if (skipped.length > 0) {
  console.log(
    `\nNo QUOTES entry (left untouched — add one, or supply a real image):\n  ${skipped.join(
      "\n  ",
    )}`,
  );
}
