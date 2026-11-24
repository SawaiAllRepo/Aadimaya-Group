// Dev utility: fetch CC-licensed images from Wikimedia Commons for the four
// Core Development Service cards and save them into src/assets/.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(
  path.dirname(fileURLToPath(import.meta.url))
);
const OUT_DIR = path.join(ROOT, "src", "assets");
fs.mkdirSync(OUT_DIR, { recursive: true });

const TARGETS = [
  {
    file: "service-residential.jpg",
    match: "Friedrich-Dittes-Straße 6-18",
    search: '"Friedrich-Dittes-Straße 6-18"',
  },
  {
    file: "service-contracting.jpg",
    match: "hormigón y grùas de construcciòn",
    search: '"hormigón y grùas de construcciòn"',
  },
  {
    file: "service-redevelopment.jpg",
    match: "Roof renovation of Residência Universitária Manuel da Maia",
    search: '"Roof renovation of Residência Universitária Manuel da Maia"',
  },
  {
    file: "service-land-development.jpg",
    match: "Caterpillar 330 excavator on a pile of dirt",
    search: '"Caterpillar 330 excavator on a pile of dirt"',
  },
];

const UA = "AdimayaBuildcon/1.0 (production image sourcing)";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

for (const t of TARGETS) {
  try {
    const params = new URLSearchParams({
      action: "query",
      format: "json",
      generator: "search",
      gsrsearch: `filetype:bitmap ${t.search}`,
      gsrnamespace: "6",
      gsrlimit: "5",
      prop: "imageinfo",
      iiprop: "url|size|mime|extmetadata",
      iiurlwidth: "2000",
    });
    const res = await fetch(
      `https://commons.wikimedia.org/w/api.php?${params}`,
      { headers: { "User-Agent": UA } }
    );
    if (!res.ok) throw new Error(`Commons HTTP ${res.status}`);
    const data = await res.json();
    const pages = Object.values(data?.query?.pages || {});
    const hit = pages
      .map((p) => {
        const info = p.imageinfo?.[0] || {};
        const meta = info.extmetadata || {};
        return {
          title: p.title,
          width: info.width,
          height: info.height,
          mime: info.mime,
          thumburl: info.thumburl,
          license: meta.LicenseShortName?.value || "",
          artist: String(meta.Artist?.value || "").replace(/<[^>]+>/g, "").trim().slice(0, 60),
          source: String(meta.ObjectName?.value || info.descriptionurl || ""),
        };
      })
      .find((x) => x.mime === "image/jpeg" && x.title.includes(t.match));
    if (!hit) throw new Error("no matching file found");

    const imgRes = await fetch(hit.thumburl, { headers: { "User-Agent": UA } });
    if (!imgRes.ok) throw new Error(`image HTTP ${imgRes.status}`);
    const bytes = new Uint8Array(await imgRes.arrayBuffer());
    const outPath = path.join(OUT_DIR, t.file);
    fs.writeFileSync(outPath, bytes);
    console.log(
      `SAVED ${t.file}  ${hit.width}x${hit.height} (thumb) -> ${bytes.length} bytes\n` +
        `      ${hit.title}\n` +
        `      ${hit.license} | ${hit.artist}`
    );
  } catch (e) {
    console.log(`FAIL  ${t.file}  ${String(e).slice(0, 200)}`);
  }
  await sleep(800);
}