// Dev utility: search Openverse for service card images (no API key).
const QUERIES = {
  residential: "modern residential apartment building exterior",
  contracting: "construction site reinforced concrete high rise",
  redevelopment: "building renovation facade restoration construction",
  land: "land development site preparation aerial",
};

for (const [key, q] of Object.entries(QUERIES)) {
  const url =
    "https://api.openverse.org/v1/images/" +
    `?q=${encodeURIComponent(q)}` +
    "&license_type=commercial&mature=false&page_size=8&aspect_ratio=wide";
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "AdimayaBuildcon/1.0 (production image sourcing)",
        Accept: "application/json",
      },
    });
    if (!res.ok) {
      console.log(key, "HTTP", res.status);
      continue;
    }
    const data = await res.json();
    console.log(`\n## ${key} — ${data.result_count} results`);
    for (const r of (data.results || []).slice(0, 5)) {
      console.log(
        `- ${r.width}x${r.height} | ${r.license} | "${String(r.title).slice(0, 60)}" | ${r.url.slice(0, 90)}`
      );
    }
  } catch (e) {
    console.log(key, "ERR", String(e).slice(0, 120));
  }
}