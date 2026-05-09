/**
 * Find legacy URLs in src/content/pages.ts that don't match current app routes.
 * Run: node tools/audit-legacy-urls.mjs
 */
import fs from "node:fs";

const src = fs.readFileSync(new URL("../src/content/pages.ts", import.meta.url), "utf8");

const blocks = src.split(/\n\s*\{\s*\n/g);
const out = [];

for (const b of blocks) {
  const url = b.match(/\burl:\s*"([^"]+)"/)?.[1];
  const type = b.match(/\btype:\s*"([^"]+)"/)?.[1] ?? "unknown";
  if (!url) continue;
  out.push({ url, type });
}

const routed = new Set(["/", "/uslugi", "/articles", "/contact"]);
const nonRouted = out.filter(
  (x) => !x.url.startsWith("/uslugi/") && !x.url.startsWith("/articles/") && !routed.has(x.url),
);

console.log("nonRouted total:", nonRouted.length);
console.log("nonRouted services:", nonRouted.filter((x) => x.type === "service").length);
console.log("nonRouted articles:", nonRouted.filter((x) => x.type === "article").length);
console.log("---");
for (const x of nonRouted.sort((a, b) => a.url.localeCompare(b.url))) {
  console.log(`${x.type}\t${x.url}`);
}
