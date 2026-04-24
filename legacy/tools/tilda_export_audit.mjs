import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const DOCS_DIR = path.join(ROOT, "_docs");
const MAIN_PAGE = "page35311880.html"; // DirectoryIndex from htaccess

const RE_HEX = /(?<![0-9a-fA-F])#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})(?![0-9a-fA-F])/g;
const RE_URL = /url\(\s*(['"]?)(.+?)\1\s*\)/gi;

function readText(p) {
  return fs.readFileSync(p, "utf8");
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function cleanUrl(u) {
  let s = String(u ?? "").trim();
  if (!s) return s;
  if (s.startsWith("//")) s = `https:${s}`;
  return s;
}

function isExternalUrl(u) {
  return u.startsWith("http://") || u.startsWith("https://") || u.startsWith("//");
}

function normSpace(s) {
  return String(s)
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function iterTagAttr(html, tag, attr) {
  const re = new RegExp(
    `<\\s*${tag}\\b[^>]*?\\b${attr}\\s*=\\s*(['"])(.*?)\\1`,
    "gis",
  );
  const out = [];
  for (const m of html.matchAll(re)) out.push(m[2]);
  return out;
}

function extractSections(html) {
  const sections = [];
  const recRe = /<div\b[^>]*\bid\s*=\s*(['"])rec(\d+)\1[^>]*>/gis;
  for (const m of html.matchAll(recRe)) {
    const recId = m[2];
    const openTag = m[0];
    const getAttr = (name) => {
      const mm = openTag.match(new RegExp(`\\b${name}\\s*=\\s*(['"])(.*?)\\1`, "is"));
      return mm?.[2] ?? null;
    };
    sections.push({
      rec_id: recId,
      record_type: getAttr("data-record-type"),
      data_hook: getAttr("data-hook"),
    });
  }
  // De-dupe while preserving order (concatenated HTML may contain duplicates)
  const seen = new Set();
  const out = [];
  for (const s of sections) {
    const key = `${s.rec_id}|${s.record_type ?? ""}|${s.data_hook ?? ""}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(s);
  }
  return out;
}

function extractFonts(html, cssTexts) {
  const fonts = new Set();
  const googleLinks = new Set();

  for (const hrefRaw of iterTagAttr(html, "link", "href")) {
    const href = cleanUrl(hrefRaw);
    if (href.includes("fonts.googleapis.com") || href.includes("fonts.gstatic.com")) {
      googleLinks.add(href);
    }
  }

  const combined = `${cssTexts.join("\n")}\n${html}`;
  const re = /font-family\s*:\s*([^;}{]+)/gis;
  for (const m of combined.matchAll(re)) {
    const val = m[1];
    for (const partRaw of val.split(",")) {
      const part = partRaw.trim().replace(/^['"]|['"]$/g, "");
      if (!part) continue;
      const low = part.toLowerCase();
      if (["serif", "sans-serif", "monospace", "cursive", "fantasy", "system-ui"].includes(low)) continue;
      fonts.add(part);
    }
  }

  return {
    fonts: Array.from(fonts).sort((a, b) => a.localeCompare(b, "ru", { sensitivity: "base" })),
    google_fonts_links: Array.from(googleLinks).sort(),
  };
}

function extractColors(html, cssTexts) {
  const combined = `${cssTexts.join("\n")}\n${html}`;
  const counts = new Map();
  const normHex = (h) => {
    const s = h.toLowerCase();
    if (s.length === 4) return `#${s[1]}${s[1]}${s[2]}${s[2]}${s[3]}${s[3]}`;
    return s;
  };
  for (const m of combined.matchAll(RE_HEX)) {
    const h = normHex(m[0]);
    counts.set(h, (counts.get(h) ?? 0) + 1);
  }
  return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 20);
}

function extractForms(html) {
  const forms = [];
  const re = /<form\b([^>]*)>(.*?)<\/form>/gis;
  for (const m of html.matchAll(re)) {
    const attrs = m[1];
    const body = m[2];
    const attr = (name) => {
      const mm = attrs.match(new RegExp(`\\b${name}\\s*=\\s*(['"])(.*?)\\1`, "is"));
      return mm?.[2] ?? null;
    };
    const inputs = new Set();
    const textareas = new Set();
    const buttons = new Set();

    // Remove script/style noise inside form before extracting texts
    const bodyClean = body.replace(/<(script|style)\b.*?<\/\1>/gis, " ");

    for (const im of bodyClean.matchAll(/<input\b[^>]*\bname\s*=\s*(['"])(.*?)\1/gi)) inputs.add(im[2]);
    for (const tm of bodyClean.matchAll(/<textarea\b[^>]*\bname\s*=\s*(['"])(.*?)\1/gi)) textareas.add(tm[2]);

    for (const bm of bodyClean.matchAll(/<button\b[^>]*>(.*?)<\/button>/gis)) {
      const t = normSpace(bm[1].replace(/<[^>]+>/g, " "));
      if (t) buttons.add(t);
    }
    for (const sm of bodyClean.matchAll(/<input\b[^>]*\btype\s*=\s*(['"])submit\1[^>]*\bvalue\s*=\s*(['"])(.*?)\2/gi)) {
      const t = normSpace(sm[3]);
      if (t) buttons.add(t);
    }

    forms.push({
      id: attr("id"),
      action: attr("action"),
      method: attr("method"),
      inputs: Array.from(inputs).filter(Boolean).sort(),
      textareas: Array.from(textareas).filter(Boolean).sort(),
      buttons: Array.from(buttons).filter(Boolean).sort(),
    });
  }
  return forms;
}

function extractExternalScripts(html) {
  const out = new Set();
  for (const srcRaw of iterTagAttr(html, "script", "src")) {
    const src = cleanUrl(srcRaw);
    if (isExternalUrl(src)) out.add(src);
  }
  for (const m of html.matchAll(/\bhttps?:\/\/[^\s"'<>]+/gi)) {
    const u = cleanUrl(m[0].replace(/[).,;]+$/g, ""));
    if (u) out.add(u);
  }
  const scriptish = [];
  for (const u of out) {
    const low = u.toLowerCase();
    if (
      ["tilda", "google", "yandex", "gtag", "tagmanager", "facebook", "vk", "metric", "analytics", "recaptcha", "cloudflare"].some(
        (x) => low.includes(x),
      )
    ) {
      scriptish.push(u);
    }
  }
  return Array.from(new Set(scriptish)).sort();
}

function extractImages(html, cssTexts) {
  const urls = new Set();
  const isImageUrl = (u) => /\.(png|jpe?g|webp|gif|svg|ico)(\?|$)/i.test(u);

  const attrs = ["src", "data-original", "data-img-zoom-url", "data-bgimg", "href"];
  for (const a of attrs) {
    const re = new RegExp(`\\b${a}\\s*=\\s*(['"])(.*?)\\1`, "gis");
    for (const m of html.matchAll(re)) {
      const u = cleanUrl(m[2]);
      if (!u) continue;
      if (isImageUrl(u)) urls.add(u);
    }
  }

  for (const m of html.matchAll(/\bsrcset\s*=\s*(['"])(.*?)\1/gi)) {
    const parts = m[2].split(",").map((x) => x.trim().split(" ")[0]);
    for (const p of parts) {
      const u = cleanUrl(p);
      if (u && isImageUrl(u)) urls.add(u);
    }
  }

  for (const sm of html.matchAll(/\bstyle\s*=\s*(['"])(.*?)\1/gis)) {
    for (const um of sm[2].matchAll(RE_URL)) {
      const u = cleanUrl(um[2]);
      if (u) urls.add(u);
    }
  }

  for (const css of cssTexts) {
    for (const um of css.matchAll(RE_URL)) {
      const u = cleanUrl(um[2]);
      if (!u) continue;
      if (isImageUrl(u)) urls.add(u);
    }
  }

  const out = [];
  for (const u of Array.from(urls).sort()) {
    if (isImageUrl(u)) out.push(u);
  }
  return out;
}

function stripVisibleText(html) {
  let s = html;
  s = s.replace(/<(script|style|noscript)\b.*?<\/\1>/gis, " ");
  s = s.replace(/<!--.*?-->/gis, " ");
  s = s.replace(/<\s*br\s*\/?\s*>/gi, "\n");
  s = s.replace(/<\/\s*(p|div|section|header|footer|li|ul|ol|h[1-6]|article|main|nav|button|a|span|label|textarea)\s*>/gi, "\n");
  s = s.replace(/<[^>]+>/g, " ");
  s = s.replace(/&nbsp;/gi, " ");
  // decode a few common entities; keep it dependency-free
  s = s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

  const lines = s
    .split("\n")
    .map((x) => normSpace(x))
    .filter(Boolean);

  const seen = new Set();
  const out = [];
  for (const ln of lines) {
    // Drop obvious machine configs (JSON blobs, Tilda lead field configs)
    if (/^\s*[\[{]/.test(ln) && /[}\]]\s*$/.test(ln) && /"[^"]+"\s*:/.test(ln)) continue;
    if (ln.includes('"lid"') || ln.includes('"li_type"') || ln.includes('"li_masktype"')) continue;
    if (seen.has(ln)) continue;
    seen.add(ln);
    out.push(ln);
  }
  return out;
}

function resolveLocalAssets(html) {
  const cssPaths = new Set();
  const jsPaths = new Set();

  for (const hrefRaw of iterTagAttr(html, "link", "href")) {
    let href = cleanUrl(hrefRaw);
    if (isExternalUrl(href)) continue;
    if (href.startsWith("/")) href = href.slice(1);
    if (!href.toLowerCase().endsWith(".css")) continue;
    const p = path.resolve(ROOT, href);
    if (fs.existsSync(p)) cssPaths.add(p);
  }

  for (const srcRaw of iterTagAttr(html, "script", "src")) {
    let src = cleanUrl(srcRaw);
    if (isExternalUrl(src)) continue;
    if (src.startsWith("/")) src = src.slice(1);
    if (!src.toLowerCase().endsWith(".js")) continue;
    const p = path.resolve(ROOT, src);
    if (fs.existsSync(p)) jsPaths.add(p);
  }

  return {
    css: Array.from(cssPaths).sort(),
    js: Array.from(jsPaths).sort(),
  };
}

function writeMd(relPath, content) {
  ensureDir(DOCS_DIR);
  fs.writeFileSync(path.join(DOCS_DIR, relPath), content, "utf8");
}

function rel(p) {
  return path.relative(ROOT, p).replace(/\\/g, "/");
}

function main() {
  const mainHtmlPath = path.join(ROOT, MAIN_PAGE);
  if (!fs.existsSync(mainHtmlPath)) {
    console.error(`Main page not found: ${mainHtmlPath}`);
    process.exit(1);
  }

  const htmlText = readText(mainHtmlPath);
  const bodyCandidate = path.join(ROOT, "files", `${path.parse(MAIN_PAGE).name}body.html`);
  const bodyText = fs.existsSync(bodyCandidate) ? readText(bodyCandidate) : "";
  const htmlAll = `${htmlText}\n${bodyText}`;

  const { css: cssPaths, js: jsPaths } = resolveLocalAssets(htmlText);
  const cssTexts = cssPaths.map((p) => readText(p));

  const sections = extractSections(htmlAll);
  const fontsInfo = extractFonts(htmlAll, cssTexts);
  const colors = extractColors(htmlAll, cssTexts);
  const forms = extractForms(htmlAll);
  const externalScripts = extractExternalScripts(htmlAll);
  const images = extractImages(htmlAll, cssTexts);
  const contentLines = stripVisibleText(htmlAll);

  const audit = [];
  audit.push("## Источник\n");
  audit.push(`- **Главная страница**: \`${MAIN_PAGE}\``);
  audit.push(`- **Body-файл**: ${bodyText ? `\`${rel(bodyCandidate)}\`` : "отсутствует"}`);

  audit.push("\n## Секции (Tilda blocks)\n");
  if (sections.length) {
    sections.forEach((s, idx) => {
      const parts = [`**${idx + 1}. rec${s.rec_id}**`];
      if (s.record_type) parts.push(`record-type \`${s.record_type}\``);
      if (s.data_hook) parts.push(`hook \`${s.data_hook}\``);
      audit.push(`- ${parts.join(" — ")}`);
    });
  } else {
    audit.push("- (не найдено `rec...` блоков)");
  }

  audit.push("\n## Шрифты\n");
  if (fontsInfo.fonts.length) {
    audit.push("- **font-family (из CSS/inline)**:");
    fontsInfo.fonts.forEach((f) => audit.push(`  - \`${f}\``));
  } else {
    audit.push("- **font-family**: (не найдено)");
  }
  if (fontsInfo.google_fonts_links.length) {
    audit.push("\n- **Подключения Google Fonts**:");
    fontsInfo.google_fonts_links.forEach((u) => audit.push(`  - \`${u}\``));
  }

  audit.push("\n## Основные цвета (HEX)\n");
  if (colors.length) {
    audit.push("Топ-20 по частоте в HTML+CSS (включая фоны/границы/тени):\n");
    colors.forEach(([hex, cnt]) => audit.push(`- \`${hex}\` — ${cnt}`));
  } else {
    audit.push("- (не найдено HEX-цветов)");
  }

  audit.push("\n## Формы захвата\n");
  if (forms.length) {
    forms.forEach((f, i) => {
      audit.push(`- **Форма ${i + 1}**`);
      audit.push(`  - **id**: ${f.id ? `\`${f.id}\`` : "(нет)"}`);
      audit.push(`  - **action**: ${f.action ? `\`${f.action}\`` : "(нет)"}`);
      audit.push(`  - **method**: ${f.method ? `\`${f.method}\`` : "(нет)"}`);
      audit.push(`  - **inputs[name]**: ${f.inputs.length ? "" : "(нет)"}`);
      f.inputs.forEach((n) => audit.push(`    - \`${n}\``));
      audit.push(`  - **textareas[name]**: ${f.textareas.length ? "" : "(нет)"}`);
      f.textareas.forEach((n) => audit.push(`    - \`${n}\``));
      audit.push(`  - **кнопки submit/label**: ${f.buttons.length ? "" : "(не найдено)"}`);
      f.buttons.forEach((t) => audit.push(`    - ${t}`));
    });
  } else {
    audit.push("- (формы `<form>` не найдены)");
  }

  audit.push("\n## Внешние скрипты / интеграции (по URL)\n");
  if (externalScripts.length) externalScripts.forEach((u) => audit.push(`- \`${u}\``));
  else audit.push("- (не найдено внешних `script src` или характерных URL)");

  audit.push("\n## Локальные CSS/JS, подключенные на главной\n");
  audit.push("- **CSS**:");
  if (cssPaths.length) cssPaths.forEach((p) => audit.push(`  - \`${rel(p)}\``));
  else audit.push("  - (не найдено)");
  audit.push("\n- **JS**:");
  if (jsPaths.length) jsPaths.forEach((p) => audit.push(`  - \`${rel(p)}\``));
  else audit.push("  - (не найдено)");

  writeMd("site-audit.md", `${audit.join("\n").trim()}\n`);

  const contentMd = ["## Текстовый контент (без HTML)\n", ...contentLines.map((ln) => `- ${ln}`)].join("\n");
  writeMd("content.md", `${contentMd.trim()}\n`);

  const assets = [];
  assets.push("## Ссылки на изображения\n");
  const local = images.filter((u) => !isExternalUrl(u));
  const tilda = images.filter((u) => u.toLowerCase().includes("tildacdn.com"));
  const otherExt = images.filter((u) => isExternalUrl(u) && !u.toLowerCase().includes("tildacdn.com"));

  assets.push("### Локальные\n");
  if (local.length) local.forEach((u) => assets.push(`- \`${u}\``));
  else assets.push("- (нет)");
  assets.push("\n### tildacdn.com\n");
  if (tilda.length) tilda.forEach((u) => assets.push(`- \`${u}\``));
  else assets.push("- (нет)");
  assets.push("\n### Прочие внешние\n");
  if (otherExt.length) otherExt.forEach((u) => assets.push(`- \`${u}\``));
  else assets.push("- (нет)");

  writeMd("assets-list.md", `${assets.join("\n").trim()}\n`);

  console.log("OK");
}

main();

