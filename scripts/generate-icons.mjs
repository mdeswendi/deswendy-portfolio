/**
 * Generates every app icon from the portrait photo.
 *
 *   npm run icons
 *
 * Re-run this after replacing public/about/portrait.jpg.
 *
 * Two crops are produced on purpose:
 *  - `any`      a tight crop, so the face still reads at 48px on a home screen
 *  - `maskable` a looser crop that bleeds to the edges, because Android masks
 *               icons to a circle or squircle and only the centre ~80% is
 *               guaranteed to survive. Shrinking the tight crop onto a flat
 *               background instead would leave a visible border.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(path.join(ROOT, "package.json"));
const sharp = require("sharp");

const SRC = path.join(ROOT, "public", "about", "portrait.jpg");
const APP_DIR = path.join(ROOT, "src", "app");
const ICON_DIR = path.join(ROOT, "public", "icons");

// Face position in the source, as a fraction of width/height.
const FACE_X = 0.47;
const FACE_Y = 0.33;

const meta = await sharp(SRC).metadata();

/** Square crop of `side` px, centred so the face sits at `faceAt` vertically. */
function square(side, faceAt) {
  const s = Math.min(side, meta.width, meta.height);
  const left = Math.max(
    0,
    Math.min(Math.round(meta.width * FACE_X - s / 2), meta.width - s),
  );
  const top = Math.max(
    0,
    Math.min(Math.round(meta.height * FACE_Y - s * faceAt), meta.height - s),
  );
  return { left, top, width: s, height: s };
}

const TIGHT = square(520, 0.42);
const MASKABLE = square(640, 0.35);

async function png(crop, size, dest) {
  const info = await sharp(SRC)
    .extract(crop)
    .resize(size, size, { fit: "cover" })
    .png({ compressionLevel: 9 })
    .toFile(dest);
  console.log(
    `  ${path.relative(ROOT, dest).replace(/\\/g, "/").padEnd(38)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`,
  );
}

/**
 * Wraps a PNG in an ICO container. ICO permits PNG-compressed entries, which
 * every current browser reads — and sharp cannot write .ico itself. Without
 * this, bare /favicon.ico requests would 404.
 */
function pngToIco(pngBuffer, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // one image

  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0); // 0 means 256
  entry.writeUInt8(size >= 256 ? 0 : size, 1);
  entry.writeUInt8(0, 2); // palette
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // colour planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(pngBuffer.length, 8);
  entry.writeUInt32LE(header.length + entry.length, 12);

  return Buffer.concat([header, entry, pngBuffer]);
}

await mkdir(ICON_DIR, { recursive: true });

// Browser tab + PWA
await png(TIGHT, 512, path.join(APP_DIR, "icon.png"));
await png(TIGHT, 180, path.join(APP_DIR, "apple-icon.png"));
await png(TIGHT, 192, path.join(ICON_DIR, "icon-192.png"));
await png(TIGHT, 512, path.join(ICON_DIR, "icon-512.png"));
await png(MASKABLE, 512, path.join(ICON_DIR, "icon-maskable-512.png"));

const icoPng = await sharp(SRC)
  .extract(TIGHT)
  .resize(256, 256, { fit: "cover" })
  // ensureAlpha is required: the source is a JPEG with no alpha channel, and
  // Turbopack's ICO decoder rejects a non-RGBA PNG inside the container.
  .ensureAlpha()
  .png({ compressionLevel: 9 })
  .toBuffer();
const ico = pngToIco(icoPng, 256);
await writeFile(path.join(APP_DIR, "favicon.ico"), ico);
console.log(
  `  src/app/favicon.ico                    256x256  ${(ico.length / 1024).toFixed(0)} KB`,
);

console.log("\nDone. Icons regenerate from public/about/portrait.jpg.");
