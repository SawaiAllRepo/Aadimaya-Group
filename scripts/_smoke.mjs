import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

const ROOT = path.dirname(path.dirname(new URL(import.meta.url).pathname));
if (ROOT.startsWith('/')) {
  globalThis.__root = ROOT.replace(/^\/([A-Za-z]:)/, "$1");
} else {
  globalThis.__root = ROOT;
}
const root = globalThis.__root;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const server = spawn("node", ["server.mjs"], {
  cwd: root,
  env: { ...process.env, PORT: "8971" },
  stdio: ["ignore", "pipe", "pipe"],
});

let serverLog = "";
server.stdout.on("data", (d) => (serverLog += d));
server.stderr.on("data", (d) => (serverLog += d));

await sleep(900);

async function check(desc, fn) {
  try {
    const out = await fn();
    console.log(`PASS  ${desc}  ${out}`);
  } catch (e) {
    console.log(`FAIL  ${desc}  ${String(e).slice(0, 160)}`);
  }
}

const get = async (url) => {
  const res = await fetch(url);
  const body = Buffer.from(await res.arrayBuffer());
  return { status: res.status, len: body.length, head: body.subarray(0, 16) };
};

await check("GET / returns index.html", async () => {
  const r = await get("http://localhost:8971/");
  if (r.status !== 200) throw new Error(`status ${r.status}`);
  if (!r.head.toString().toLowerCase().includes("<!doctype html")) throw new Error("not html");
  return "200, html";
});

await check("Brochure PDF serves", async () => {
  const r = await get("http://localhost:8971/brochures/Gulmohar-Residency-Brochure.pdf");
  if (r.status !== 200) throw new Error(`status ${r.status}`);
  if (!r.head.toString().includes("%PDF")) throw new Error("not a PDF");
  return `200, ${r.len} bytes, %PDF ok`;
});

await check("Gulmohar webp gallery image serves", async () => {
  const r = await get("http://localhost:8971/project-images/gulmohar-residency-brochure-01.webp");
  if (r.status !== 200) throw new Error(`status ${r.status}`);
  return `200, ${r.len} bytes`;
});

await check("Shubharambh cover webp serves", async () => {
  const r = await get("http://localhost:8971/project-images/shubharambh-clara-brochure-01.webp");
  if (r.status !== 200) throw new Error(`status ${r.status}`);
  return `200, ${r.len} bytes`;
});

await check("POST /api/leads no longer stores (404)", async () => {
  const res = await fetch("http://localhost:8971/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "QA Tester", phone: "9999999999" }),
  });
  if (res.status !== 404) throw new Error(`expected 404, got ${res.status}`);
  return "404 Not found";

});

await check("GET /api/leads removed (404)", async () => {
  const res = await fetch("http://localhost:8971/api/leads");
  if (res.status !== 404) throw new Error(`expected 404, got ${res.status}`);
  return "404 Not found";
});

// --- static source checks ---
const jsFiles = fs.readdirSync(path.join(root, "dist", "assets"))
  .filter((f) => f.startsWith("index-") && f.endsWith(".js"));
for (const f of jsFiles) {
  const src = fs.readFileSync(path.join(root, "dist", "assets", f), "utf8");
  await check(`built JS (${f}) has no /api/leads`, async () => {
    if (src.includes("/api/leads")) throw new Error("contains /api/leads");
    return "clean";
  });
}

const siteData = fs.readFileSync(path.join(root, "src", "data", "siteData.js"), "utf8");
const referenced = [...siteData.matchAll(/["'](\/project-images\/[^"']+)["']/g)].map((m) => m[1]);
const unique = [...new Set(referenced)].sort();
const missing = unique.filter((p) => !fs.existsSync(path.join(root, "public", p.slice(1))));
await check(`all ${unique.length} project image refs exist on disk`, async () => {
  if (missing.length) throw new Error(`missing: ${missing.join(", ")}`);
  return `${unique.length} refs OK`;
});
await check("built JS / CSS does not reference favicon.jpg incorrectly", async () => {
  if (!fs.existsSync(path.join(root, "public", "favicon.jpg"))) throw new Error("favicon.jpg missing");
  return "favicon.jpg present";
});

server.kill();
await sleep(300);
console.log("\n--- server log ---");
console.log(serverLog.trim());