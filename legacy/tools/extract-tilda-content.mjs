import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const tildaDir = path.join(repoRoot, "legacy", "tilda-export");
const pagesPath = path.join(repoRoot, "src", "content", "pages.ts");
const outPath = path.join(repoRoot, "src", "content", "tildaBodies.ts");

function readText(p) {
  return fs.readFileSync(p, "utf8");
}

function htmlDecodeBasic(s) {
  return s
    .replaceAll("&quot;", '"')
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&nbsp;", " ");
}

function cleanupHtml(html) {
  let s = htmlDecodeBasic(html);
  s = s.replaceAll("\r\n", "\n");
  s = s.replaceAll("<br />", "\n").replaceAll("<br/>", "\n").replaceAll("<br>", "\n");
  s = s.replace(/<\/(p|div|li|h[1-6])>\s*/gi, "\n\n");
  s = s.replace(/<li[^>]*>/gi, "• ");
  s = s.replace(/<\/?ul[^>]*>/gi, "\n");
  s = s.replace(/<\/?ol[^>]*>/gi, "\n");
  s = s.replace(/<strong[^>]*>/gi, "<strong>").replace(/<\/strong>/gi, "</strong>");
  s = s.replace(/<[^>]+>/g, "");
  s = s
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .join("\n");
  return s;
}

function extractCandidates(fileHtml) {
  const candidates = [];
  const patterns = [/field="descr">([\s\S]*?)<\/div>/gi, /field="text">([\s\S]*?)<\/div>/gi];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(fileHtml))) {
      candidates.push(m[1]);
    }
  }
  return candidates;
}

function pickMainContent(fileHtml) {
  const cands = extractCandidates(fileHtml)
    .map(cleanupHtml)
    .filter((x) => x.length >= 200)
    .filter((x) => !x.includes("Мы онлайн"))
    .filter((x) => !x.includes("Демонтаж МСК"))
    .filter((x) => !x.includes("Контакты"))
    .filter((x) => !x.includes("©"));

  if (!cands.length) return null;
  cands.sort((a, b) => b.length - a.length);
  return cands[0];
}

function loadPages() {
  const src = readText(pagesPath);
  const listMatch = src.match(/export const pages: PageDef\[] = \[([\s\S]*?)\];/m);
  if (!listMatch) throw new Error("Could not locate pages array in pages.ts");

  const listSrc = listMatch[1];
  const pages = [];

  // Very small parser: look for object blocks that contain url + file.
  // Works for our generated TS where url/file are plain strings.
  const objRe = /\{([\s\S]*?)\}/g;
  let m;
  while ((m = objRe.exec(listSrc))) {
    const chunk = m[1];
    const url = chunk.match(/\burl:\s*"([^"]+)"/)?.[1];
    const file = chunk.match(/\bfile:\s*"([^"]+)"/)?.[1];
    if (!url || !file) continue;
    pages.push({ url, file });
  }

  return pages;
}

const pages = loadPages();
const targets = pages.filter((p) => p.url.startsWith("/articles/") || p.url.startsWith("/uslugi/"));

const bodies = {};
for (const p of targets) {
  const filePath = path.join(tildaDir, p.file);
  if (!fs.existsSync(filePath)) continue;
  const html = readText(filePath);
  const content = pickMainContent(html);
  if (!content) continue;
  bodies[p.url] = content;
}

const banner = `// AUTO-GENERATED from legacy/tilda-export/*.html
// Run: node legacy/tools/extract-tilda-content.mjs
// Do not edit manually.
`;

const serialized = JSON.stringify(bodies, null, 2);
const out = `${banner}\nexport const tildaBodies: Record<string, string> = ${serialized} as const;\n`;
fs.writeFileSync(outPath, out, "utf8");

console.log(`Wrote ${Object.keys(bodies).length} bodies to ${path.relative(repoRoot, outPath)}`);
