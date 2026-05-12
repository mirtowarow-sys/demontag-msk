/**
 * Downloads /animation/0001.jpg … /animation/0381.jpg and mobile-hero.mp4
 * from https://general-site.ru into public/animation/
 *
 * Run: node tools/download-general-animation-assets.mjs
 */
import fs from "node:fs";
import https from "node:https";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "animation");
const base = "https://general-site.ru";

function download(urlPath, dest) {
  return new Promise((resolve, reject) => {
    const destTmp = dest + ".tmp";
    const file = fs.createWriteStream(destTmp);
    https
      .get(base + urlPath, { headers: { "user-agent": "Mozilla/5.0 asset-mirror" } }, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          file.close();
          fs.unlink(destTmp, () => {});
          reject(new Error(`Redirect ${res.statusCode} for ${urlPath}`));
          return;
        }
        if (res.statusCode !== 200) {
          file.close();
          fs.unlink(destTmp, () => {});
          reject(new Error(`${res.statusCode} ${urlPath}`));
          return;
        }
        res.pipe(file);
        file.on("finish", () => {
          file.close(() => {
            fs.rename(destTmp, dest, (err) => (err ? reject(err) : resolve()));
          });
        });
      })
      .on("error", (err) => {
        file.close();
        fs.unlink(destTmp, () => {});
        reject(err);
      });
  });
}

async function pool(items, limit, worker) {
  let i = 0;
  const runners = new Array(Math.min(limit, items.length)).fill(0).map(async () => {
    while (i < items.length) {
      const idx = i++;
      await worker(items[idx], idx);
    }
  });
  await Promise.all(runners);
}

fs.mkdirSync(outDir, { recursive: true });

const frames = Array.from({ length: 381 }, (_, i) => {
  const n = String(i + 1).padStart(4, "0");
  return { url: `/animation/${n}.jpg`, file: `${n}.jpg` };
});

console.log("Downloading", frames.length, "frames to", outDir);
await pool(frames, 10, async (f) => {
  const dest = path.join(outDir, f.file);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 0) return;
  await download(f.url, dest);
  process.stdout.write(".");
});
console.log("\nDownloading mobile-hero.mp4");
const mp4Dest = path.join(outDir, "mobile-hero.mp4");
if (!fs.existsSync(mp4Dest) || fs.statSync(mp4Dest).size === 0) {
  await download("/animation/mobile-hero.mp4", mp4Dest);
}
console.log("Done.");
