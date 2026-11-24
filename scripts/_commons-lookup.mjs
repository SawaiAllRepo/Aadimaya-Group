// Dev utility: search Commons "Quality images" category for high-res landscape photos.
const QUERIES = {
  residential: ["apartment", "residential building"],
  contracting: ["construction site", "construction crane", "reinforced concrete"],
  redevelopment: ["renovation", "building renovation", "scaffolding"],
  land: ["land clearing", "earthworks", "excavation machine"],
};

for (const [key, terms] of Object.entries(QUERIES)) {
  console.log(`\n########## ${key.toUpperCase()} ##########`);
  for (const term of terms) {
    const params = new URLSearchParams({
      action: "query",
      format: "json",
      generator: "search",
      gsrsearch: `filetype:bitmap incategory:"Quality images" ${term}`,
      gsrnamespace: "6",
      gsrlimit: "30",
      gsrsort: "relevance",
      prop: "imageinfo",
      iiprop: "url|size|mime|extmetadata",
      iiurlwidth: "2000",
    });
    try {
      const res = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`, {
        headers: { "User-Agent": "AdimayaBuildcon/1.0 (image sourcing)" },
      });
      const data = await res.json();
      const list = Object.values(data?.query?.pages || {})
        .map((p) => {
          const info = p.imageinfo?.[0] || {};
          const meta = info.extmetadata || {};
          return {
            title: p.title,
            width: info.width,
            height: info.height,
            thumburl: info.thumburl,
            license: meta.LicenseShortName?.value || "",
          };
        })
        .filter((x) => x.width >= 1700 && x.width >= x.height)
        .sort((a, b) => b.width - a.width)
        .slice(0, 4);
      for (const s of list) {
        console.log(`[${term}] ${s.width}x${s.height} | ${s.license} | ${s.title.slice(0, 72)}`);
      }
      if (!list.length) console.log(`[${term}] (none >=1700px landscape)`);
    } catch (e) {
      console.log(`[${term}] ERR ${String(e).slice(0, 120)}`);
    }
  }
}