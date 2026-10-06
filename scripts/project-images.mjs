/* Self-hosts the project screenshots that live in Supabase Storage.
 *
 * The site used Supabase's /render/image/ endpoint to resize them on the fly.
 * That endpoint caches a resized image for an hour, and this site doesn't get
 * enough traffic to keep it warm, so most visitors paid for a fresh resize:
 * PageSpeed (Oct 2026) measured 3–4.4 s to fetch a ~110 KB screenshot, the
 * LCP of every case study, plus a second connection to supabase.co.
 *
 * This downloads each original once, encodes WebP at a few widths with
 * cwebp, and writes them to public/img/work/ with a content hash in the name,
 * so Vercel can serve them from the same origin with an immutable cache
 * (see vercel.json). src/constants/project-images.json maps each Supabase
 * URL to its local copies; utils/img.js prefers those and falls back to
 * Supabase for any image not in the manifest yet.
 *
 * Run it after adding or replacing a project image in src/constants:
 *
 *   npm run images:projects
 *
 * Needs cwebp on PATH (macOS: `brew install webp`). It is not a build step:
 * Vercel's build image has no cwebp, and the output is committed.
 */

import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(root, "src");
const OUT_DIR = join(root, "public", "img", "work");
const PUBLIC_PREFIX = "/img/work";
const CACHE = join(root, "node_modules", ".cache", "project-images");
const MANIFEST = join(SRC, "constants", "project-images.json");

// 480 and 800 cover phones, 1200 and 1600 cover desktop cards and the
// case-study hero. Anything wider than the original is skipped, not upscaled.
const WIDTHS = [480, 800, 1200, 1600];
const QUALITY = 75;

const URL_RE = /https:\/\/[a-z0-9]+\.supabase\.co\/storage\/v1\/object\/public\/[^"'`\s)]+/g;

try {
  execFileSync("cwebp", ["-version"], { stdio: "ignore" });
} catch {
  console.error("project-images: cwebp not found. Install it (macOS: brew install webp) and re-run.");
  process.exit(1);
}

const walk = async (dir) => {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if ([".js", ".jsx"].includes(extname(e.name))) out.push(p);
  }
  return out;
};

/* Width and height from the file header. PNG keeps them in IHDR; JPEG in
   the first SOFn segment. */
const dimensions = (buf) => {
  if (buf.readUInt32BE(0) === 0x89504e47) return [buf.readUInt32BE(16), buf.readUInt32BE(20)];
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length) {
      const marker = buf[i + 1];
      const len = buf.readUInt16BE(i + 2);
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return [buf.readUInt16BE(i + 7), buf.readUInt16BE(i + 5)];
      }
      i += 2 + len;
    }
  }
  throw new Error("unsupported image format (expected PNG or JPEG)");
};

const urls = new Set();
for (const file of await walk(SRC)) {
  for (const m of (await readFile(file, "utf8")).matchAll(URL_RE)) urls.add(m[0]);
}

await mkdir(CACHE, { recursive: true });
await mkdir(OUT_DIR, { recursive: true });

const manifest = {};
const keep = new Set();

for (const url of [...urls].sort()) {
  const name = decodeURIComponent(url.split("/").pop());
  const stem = name.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "-");
  const original = join(CACHE, name);
  if (!existsSync(original)) {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`project-images: skipped ${url} (HTTP ${res.status})`);
      continue;
    }
    await writeFile(original, Buffer.from(await res.arrayBuffer()));
  }

  const [w, h] = dimensions(await readFile(original));
  const widths = [...new Set([...WIDTHS.filter((x) => x < w), Math.min(w, WIDTHS.at(-1))])];
  const srcset = [];
  for (const width of widths) {
    const tmp = join(CACHE, `${stem}-${width}.webp`);
    execFileSync("cwebp", ["-quiet", "-q", String(QUALITY), "-m", "6", "-sharp_yuv", "-resize", String(width), "0", original, "-o", tmp]);
    const data = await readFile(tmp);
    const file = `${stem}-${width}.${createHash("sha256").update(data).digest("hex").slice(0, 8)}.webp`;
    await writeFile(join(OUT_DIR, file), data);
    keep.add(file);
    srcset.push([width, `${PUBLIC_PREFIX}/${file}`]);
  }
  manifest[url] = { width: w, height: h, srcset };
}

// Drop copies of images that were replaced or removed from the site.
for (const f of await readdir(OUT_DIR)) if (!keep.has(f)) await rm(join(OUT_DIR, f));

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`project-images: ${Object.keys(manifest).length} images, ${keep.size} files → public/img/work/`);
