/**
 * List /uslugi/* slugs present in src/content/pages.ts that are NOT canonicalServiceSlugs.
 * Run: node tools/audit-noncanonical-uslugi.mjs
 */
import fs from "node:fs";

const canonicalSrc = fs.readFileSync(
  new URL("../src/content/canonical.ts", import.meta.url),
  "utf8",
);
const canonMatch = canonicalSrc.match(
  /export const canonicalServiceSlugs = \[\s*([\s\S]*?)\s*\] as const;/,
);
if (!canonMatch) throw new Error("canonicalServiceSlugs not found");
const canonical = new Set([...canonMatch[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]));

const pagesSrc = fs.readFileSync(new URL("../src/content/pages.ts", import.meta.url), "utf8");
const urls = [...pagesSrc.matchAll(/\burl:\s*"([^"]+)"/g)].map((m) => m[1]);
const uslugi = urls
  .filter((u) => u.startsWith("/uslugi/"))
  .map((u) => u.replace("/uslugi/", ""))
  .filter(Boolean);

const uniq = [...new Set(uslugi)].sort();
const nonCanonical = uniq.filter((s) => !canonical.has(s));

console.log("total /uslugi slugs in pages.ts:", uniq.length);
console.log("canonical slugs:", canonical.size);
console.log("non-canonical slugs:", nonCanonical.length);
console.log("---");
console.log(nonCanonical.map((s) => `/uslugi/${s}`).join("\n"));
