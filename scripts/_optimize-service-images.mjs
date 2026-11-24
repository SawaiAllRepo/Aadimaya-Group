// Dev utility: downscale + re-encode the fetched service images for web use.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createCanvas, loadImage } from "@napi-rs/canvas";

const ASSETS = path.join(
  path.dirname(path.dirname(fileURLToPath(import.meta.url))),
  "src",
  "assets"
);

const FILES = [
  "service-residential.jpg",
  "service-contracting.jpg",
  "service-redevelopment.jpg",
  "service-land-development.jpg",
];

const MAX_W = 1680;
const QUALITY = 85;

for (const f of FILES) {
  const srcPath = path.join(ASSETS, f);
  try {
    const img = await loadImage(srcPath);
    const scale = Math.min(1, MAX_W / img.width);
    const w = Math.max(1, Math.round(img.width * scale));
    const h = Math.max(1, Math.round(img.height * scale));
    const canvas = createCanvas(w, h);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, w, h);
    const out = await canvas.encode("jpeg", QUALITY);
    fs.writeFileSync(srcPath, out);
    console.log(
      `${f}  ${img.width}x${img.height} -> ${w}x${h}  ${Math.round((out.length / 1024))}KB`
    );
  } catch (e) {
    console.log(`FAIL ${f}  ${String(e).slice(0, 140)}`);
  }
}