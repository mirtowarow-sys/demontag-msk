/**
 * List canonical services which have no body in tildaBodies.
 * Run: node tools/audit-missing-service-bodies.mjs
 */
import fs from "node:fs";

const canonical = fs.readFileSync(new URL("../src/content/canonical.ts", import.meta.url), "utf8");
const canonMatch = canonical.match(
  /export const canonicalServiceSlugs = \[\s*([\s\S]*?)\s*\] as const;/,
);
if (!canonMatch) throw new Error("canonicalServiceSlugs not found");
const canonicalServiceSlugs = [...canonMatch[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);

const bodies = fs.readFileSync(new URL("../src/content/tildaBodies.ts", import.meta.url), "utf8");
const bodyKeys = new Set([...bodies.matchAll(/^\s*"([^"]+)":/gm)].map((m) => m[1]));

const missing = canonicalServiceSlugs.filter((slug) => !bodyKeys.has(`/uslugi/${slug}`));
console.log("canonical services:", canonicalServiceSlugs.length);
console.log("missing bodies:", missing.length);
console.log(missing.map((s) => `/uslugi/${s}`).join("\n"));
