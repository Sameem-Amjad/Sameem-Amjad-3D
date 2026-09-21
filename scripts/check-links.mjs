/* Checks every outbound link in src/ and reports the dead ones.
 *
 * Run it on demand — `npm run check:links` — not as part of the build.
 * Two reasons it is not a build step: a flaky network or a rate-limiting
 * host would fail a deploy that has nothing wrong with it, and the check
 * takes far longer than the build itself.
 *
 * It also cannot run in the browser: a page cannot test a cross-origin URL,
 * because CORS hides the response status from JavaScript. "Hide the badge if
 * the link is dead" is therefore a maintenance job, not a runtime feature —
 * this is that job, automated.
 *
 * Exit code is always 0. This reports; it does not gate anything.
 */

import { readdir, readFile } from "node:fs/promises";
import { join, resolve, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const SRC = resolve(dirname(fileURLToPath(import.meta.url)), "..", "src");

const TIMEOUT_MS = 15000;
const CONCURRENCY = 6;

// Real browser UA. Several hosts (Apple, Cloudflare-fronted sites) serve a
// challenge or a 403 to anything that looks automated, which would otherwise
// read as a dead link.
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

// Hosts that answer bots with a block rather than the page. A non-2xx from
// these says nothing about whether the link works in a browser, so they are
// reported separately instead of as failures.
const BOT_HOSTILE = [/(^|\.)fiverr\.com$/, /(^|\.)linkedin\.com$/];

const walk = async (dir) => {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if ([".js", ".jsx", ".ts", ".tsx"].includes(extname(e.name))) out.push(p);
  }
  return out;
};

/* Collect url -> the files it appears in. */
const collect = async () => {
  const found = new Map();
  for (const file of await walk(SRC)) {
    const text = await readFile(file, "utf8");
    for (const m of text.matchAll(/https?:\/\/[^\s"'`)\\]+/g)) {
      const url = m[0].replace(/[.,;:]+$/, "");
      let host;
      try {
        host = new URL(url).hostname;
      } catch {
        continue;
      }
      // Namespaces and asset hosts, not links a visitor can click.
      if (/^(www\.)?w3\.org$/.test(host) || host === "schema.org") continue;
      if (host.endsWith("supabase.co") || host.endsWith("googleapis.com")) continue;
      if (!found.has(url)) found.set(url, new Set());
      found.get(url).add(file.slice(SRC.length - 3));
    }
  }
  return found;
};

const check = async (url) => {
  const attempt = async (method) => {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(url, {
        method,
        redirect: "follow",
        signal: ctl.signal,
        headers: { "user-agent": UA, accept: "*/*" },
      });
      return { status: res.status };
    } finally {
      clearTimeout(t);
    }
  };

  try {
    // Some hosts reject HEAD but serve GET, so a HEAD failure is not final.
    let r = await attempt("HEAD");
    if (r.status >= 400) r = await attempt("GET");
    return r;
  } catch (err) {
    return { status: 0, error: err.name === "AbortError" ? "timeout" : err.message };
  }
};

/* Fixed pool of workers over one shared iterator — a burst of parallel
   requests to the same host is what produced spurious 429s by hand. */
const run = async (urls) => {
  const it = urls[Symbol.iterator]();
  const results = [];
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      for (const url of it) results.push([url, await check(url)]);
    })
  );
  return results;
};

const found = await collect();
console.log(`checking ${found.size} outbound links…\n`);

const results = await run([...found.keys()]);
results.sort((a, b) => a[0].localeCompare(b[0]));

const dead = [];
const blocked = [];

for (const [url, r] of results) {
  const host = new URL(url).hostname;
  const ok = r.status >= 200 && r.status < 400;
  if (ok) continue;
  (BOT_HOSTILE.some((re) => re.test(host)) ? blocked : dead).push([url, r]);
}

const label = (r) => (r.status === 0 ? `ERR ${r.error}` : r.status);

if (dead.length) {
  console.log(`✗ ${dead.length} link${dead.length > 1 ? "s" : ""} not responding:\n`);
  for (const [url, r] of dead) {
    console.log(`  ${String(label(r)).padEnd(14)} ${url}`);
    for (const f of found.get(url)) console.log(`  ${"".padEnd(14)}   ${f}`);
  }
  console.log("");
} else {
  console.log("✓ every link responded\n");
}

if (blocked.length) {
  console.log("ℹ blocked to bots — check by hand, probably fine:\n");
  for (const [url, r] of blocked) console.log(`  ${String(label(r)).padEnd(14)} ${url}`);
  console.log("");
}

// Also flag plain http://, which is a downgrade even when it answers.
const insecure = results.filter(([u]) => u.startsWith("http://"));
if (insecure.length) {
  console.log("⚠ served over http:// — try the https:// form:\n");
  for (const [u] of insecure) console.log(`  ${u}`);
  console.log("");
}
