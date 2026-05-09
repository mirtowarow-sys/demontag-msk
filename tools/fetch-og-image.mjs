/**
 * Fetch og:image from a URL.
 * Usage: node tools/fetch-og-image.mjs https://example.com/path
 */
import https from "node:https";

const url = process.argv[2];
if (!url) {
  console.error("Usage: node tools/fetch-og-image.mjs <url>");
  process.exit(1);
}

function get(u) {
  return new Promise((resolve, reject) => {
    https
      .get(u, { headers: { "user-agent": "Mozilla/5.0 demontagmsk-migration" } }, (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => resolve(data));
      })
      .on("error", reject);
  });
}

const html = await get(url);
const m1 = html.match(/property\s*=\s*["']og:image["']\s+content\s*=\s*["']([^"']+)["']/i);
const m2 = html.match(/content\s*=\s*["']([^"']+)["']\s+property\s*=\s*["']og:image["']/i);
const og = m1?.[1] ?? m2?.[1] ?? null;
console.log(og);
