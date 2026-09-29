/* Tells Bing (and the other IndexNow engines: Yandex, Seznam, Naver) that
 * the site's pages changed, instead of waiting for a crawl. ChatGPT search
 * and Copilot draw on Bing's index, so this is the fastest way for a new
 * or updated page to become citable there.
 *
 * Run AFTER a deploy is live — it reads the deployed sitemap, and the
 * engines fetch the key file from the live site to verify ownership:
 *
 *   npm run indexnow
 *
 * The key is public by design (it is served at /<key>.txt); it only proves
 * the submitter controls the host. Google does not use IndexNow — for
 * Google, submit the sitemap in Search Console.
 */

const HOST = "sameemamjad.com";
const KEY = "1863ee501a908f90768ffc81fc29fca9";
const ORIGIN = `https://${HOST}`;

const sitemap = await (await fetch(`${ORIGIN}/sitemap.xml`)).text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urlList.length) throw new Error("indexnow: no <loc> entries in the live sitemap");

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${ORIGIN}/${KEY}.txt`, urlList }),
});

// 200 = accepted, 202 = accepted and the key is still being verified.
console.log(`indexnow: submitted ${urlList.length} URLs → HTTP ${res.status}`);
if (res.status >= 400) {
  console.error(await res.text());
  process.exit(1);
}
