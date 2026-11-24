import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import logo from "../assets/adimaya-logo.jpg";

const links = [
  ["HOME", "home", null],
  ["PROJECTS", "projects", null],
  ["RESIDENTIAL", "projects", "Residential & Commercial"],
  ["CONTRACTING", "projects", "Contracting"],
  ["SERVICES", "services", null],
  ["OUR PROCESS", "process", null],
  ["ABOUT US", "about", null],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const go = (id, filter = null) => {
    const onProjectDetail = /^\/projects\/[^/]+\/?$/i.test(window.location.pathname);
    if (onProjectDetail) {
      window.history.pushState({}, "", "/");
      window.dispatchEvent(new PopStateEvent("popstate"));
      window.setTimeout(() => {
        window.dispatchEvent(new CustomEvent("adimaya:project-filter", { detail: { type: filter } }));
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 30);
    } else {
      window.dispatchEvent(new CustomEvent("adimaya:project-filter", { detail: { type: filter } }));
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setOpen(false);
  };
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur">
      <div className="container-site flex h-[76px] items-center justify-between">
        <button type="button" onClick={() => go("home")} aria-label="Go to Home">
          <img src={logo} alt="Adimaya Group" className="h-14 w-auto object-contain" />
        </button>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
          {links.map(([label, id, filter]) => (
            <button key={`${id}-${label}`} type="button" onClick={() => go(id, filter)}
              className="text-[13px] font-bold text-slate-900 transition hover:text-brand-600">{label}</button>
          ))}
        </nav>
        <button type="button" onClick={() => go("contact")}
          className="hidden items-center gap-3 rounded-full bg-brand-600 px-5 py-2.5 text-[11px] font-extrabold text-white md:flex">
          GET IN TOUCH <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-brand-600"><ArrowRight size={15} /></span>
        </button>
        <button type="button" onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-lg border lg:hidden" aria-label="Toggle menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && <div className="border-t bg-white px-6 py-4 lg:hidden">
        {links.map(([label, id, filter]) => (
          <button key={`${id}-${label}`} type="button" onClick={() => go(id, filter)}
            className="block w-full border-b border-slate-100 py-3 text-left text-sm font-bold">{label}</button>
        ))}
        <button type="button" onClick={() => go("contact")} className="mt-4 w-full rounded-full bg-brand-600 px-5 py-3 text-center text-sm font-extrabold text-white">GET IN TOUCH</button>
      </div>}
    </header>
  );
}
