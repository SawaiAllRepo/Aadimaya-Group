// Dev utility: land-development specific lookup.
const params = new URLSearchParams({
  action: "query",
  format: "json",
  generator: "search",
  gsrsearch: "filetype:bitmap incategory:\"Quality images\" excavator OR bulldozer OR earthmoving OR motor grader",
  gsrnamespace: "6",
  gsrlimit: "40",
  gsrsort: "relevance",
  prop: "imageinfo",
  iiprop: "url|size|mime|extmetadata",
  iiurlwidth: "2000",
});
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
      license: meta.LicenseShortName?.value || "",
    };
  })
  .filter((x) => x.width >= 1800 && x.width >= x.height)
  .sort((a, b) => b.width - a.width)
  .slice(0, 14);
for (const s of list) {
  console.log(`${s.width}x${s.height} | ${s.license} | ${s.title.slice(0, 85)}`);
}
console.log("count", list.length);