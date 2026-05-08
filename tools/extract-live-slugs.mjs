import https from "node:https";

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => resolve(data));
      })
      .on("error", reject);
  });
}

function uniqSorted(arr) {
  return [...new Set(arr)].sort();
}

function extractSlugs(html, pathPrefix) {
  const out = [];
  const re = /\bhref\s*=\s*(["'])([^"']+)\1/gi;
  let m;
  while ((m = re.exec(html))) {
    const href = m[2] ?? "";
    if (!href) continue;
    if (href.includes("#") || href.includes("?")) continue;

    // Accept either absolute or relative
    const rel = href.startsWith("http") ? new URL(href).pathname : href;
    if (!rel.startsWith(pathPrefix)) continue;
    out.push(rel.slice(pathPrefix.length));
  }
  return uniqSorted(out.filter(Boolean));
}

const site = "https://demontagmsk.ru";
const servicesIndexUrl = `${site}/uslugi`;
const articlesIndexUrl = `${site}/articles`;

const servicesPrefix = "/uslugi/";
const articlesPrefix = "/articles/";

const usl = await get(servicesIndexUrl);
const art = await get(articlesIndexUrl);

const services = extractSlugs(usl, servicesPrefix);
const articles = extractSlugs(art, articlesPrefix);

process.stdout.write(JSON.stringify({ services, articles }, null, 2));
