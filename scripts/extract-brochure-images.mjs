import fs from "node:fs";
import { createCanvas, loadImage } from "@napi-rs/canvas";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

const OUT = new URL("../public/project-images/", import.meta.url).pathname;
const wasmUrl = new URL("../node_modules/pdfjs-dist/wasm/", import.meta.url)
  .toString();

const TARGET_WIDTH = 1700;
const WEBP_QUALITY = 88;

async function pageText(page) {
  try {
    const tc = await page.getTextContent();
    const items = tc?.items ?? [];
    return items
      .map((it) => it.str ?? "")
      .join(" ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 120);
  } catch {
    return "";
  }
}

async function renderToWebp(page, viewport, w, h) {
  const canvas = createCanvas(w, h);
  await page.render({
    canvas,
    canvasContext: canvas.getContext("2d"),
    viewport,
  });

  // pdf.js paints asynchronously on the Skia surface (and the pure-JS
  // JPEG2000 decoder is slow), so sample PNG encodes until the canvas
  // stops growing and keep the most complete frame.
  let best = null;
  let bestLen = 0;
  for (let i = 0; i < 12; i++) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const b = await canvas.encode("png");
    if (b.length > bestLen) {
      bestLen = b.length;
      best = b;
    }
    if (bestLen > 40000 && i >= 2) break;
  }
  if (!best) {
    best = await canvas.encode("png");
  }

  const img = await loadImage(best);
  const out = createCanvas(img.width, img.height);
  out.getContext("2d").drawImage(img, 0, 0, img.width, img.height);
  return out.encode("webp", WEBP_QUALITY);
}

async function process(file, prefix) {
  const data = new Uint8Array(
    fs.readFileSync(new URL(`../public/brochures/${file}`, import.meta.url))
  );
  const doc = await (await getDocument({ data, wasmUrl })).promise;
  console.log(`\n## ${file} — ${doc.numPages} pages`);

  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const [x0, , x1] = page.view;
    const scale = Math.max(1.5, TARGET_WIDTH / (x1 - x0));
    const viewport = page.getViewport({ scale });
    const w = Math.max(1, Math.round(viewport.width));
    const h = Math.max(1, Math.round(viewport.height));
    const webp = await renderToWebp(page, viewport, w, h);
    const name = `${prefix}-brochure-${String(p).padStart(2, "0")}.webp`;
    fs.writeFileSync(
      new URL(`../public/project-images/${name}`, import.meta.url),
      webp
    );
    console.log(
      `${name}  ${w}x${h}  ${Math.round(webp.length / 1024)}KB  | ${await pageText(page)}`
    );
  }
  await doc.cleanup();
}

await process("Gulmohar-Residency-Brochure.pdf", "gulmohar-residency");
await process("Shubharambh-Clara-Brochure.pdf", "shubharambh-clara");
await process("Gravitas-Residency-Brochure.pdf", "gravitas-residency");