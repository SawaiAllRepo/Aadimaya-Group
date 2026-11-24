import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import logo from "../assets/adimaya-logo2.jpg";

export default function Footer() {
  const go = (id, filter = null) => {
    window.dispatchEvent(new CustomEvent("adimaya:project-filter", { detail: { type: filter } }));
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const quickLinks = [
    { name: "Home", id: "home" },
    { name: "Projects", id: "projects" },
    { name: "Residential", id: "projects", filter: "Residential & Commercial" },
    { name: "Contracting", id: "projects", filter: "Contracting" },
    { name: "Services", id: "services" },
    { name: "Our Process", id: "process" },
    { name: "About Us", id: "about" },
    { name: "Get in Touch", id: "contact" },
    
  ];
  return (
    <footer className="bg-[#071b10] text-white">

      {/* ================= MAIN FOOTER ================= */}
      <div className="container-site grid gap-10 py-12 md:grid-cols-[1.2fr_.8fr_.8fr_1fr]">

        {/* ================= COMPANY ================= */}
        <div>
          <img
            src={logo}
            alt="Adimaya Group"
            className="h-14 w-auto object-contain"
          />

          <p className="mt-4 max-w-xs text-xs leading-5 text-white/65">
            We develop, build and transform spaces that create value
            and enrich communities.
          </p>

          {/* ================= SOCIAL MEDIA ================= */}
          <div className="mt-5 flex gap-3">

            {/* WhatsApp */}
            <a
              href="https://wa.me/919156100136"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="
                rounded-full
                border border-white/15
                p-2
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-brand-500
                hover:bg-brand-500/10
                hover:text-brand-500
              "
            >
              <FaWhatsapp size={18} className="text-[#25D366]" />
            </a>

          </div>
        </div>

        {/* ================= QUICK LINKS ================= */}
        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-wider">
            Quick Links
          </h4>

          <div className="mt-4 space-y-2 text-xs text-white/65">
            {quickLinks.map((link) => (
              <button
                key={`${link.id}-${link.name}`}
                type="button"
                onClick={() => go(link.id, link.filter)}
                className="
                  block
                  text-left
                  transition-all
                  duration-200
                  hover:translate-x-1
                  hover:text-brand-500
                "
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>

        {/* ================= SERVICES ================= */}
        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-wider">
            Our Services
          </h4>

          <div className="mt-4 space-y-2 text-xs text-white/65">

            <button
              type="button"
              onClick={() => go("services")}
              className="
                block
                text-left
                transition-all
                duration-200
                hover:translate-x-1
                hover:text-brand-500
              "
            >
              Residential & Commercial
            </button>

            <button
              type="button"
              onClick={() => go("services")}
              className="
                block
                text-left
                transition-all
                duration-200
                hover:translate-x-1
                hover:text-brand-500
              "
            >
              Contracting
            </button>

            <button
              type="button"
              onClick={() => go("services")}
              className="
                block
                text-left
                transition-all
                duration-200
                hover:translate-x-1
                hover:text-brand-500
              "
            >
              Redevelopment
            </button>

            <button type="button" onClick={() => go("services")} className="block text-left transition-all duration-200 hover:translate-x-1 hover:text-brand-500">
              Land Development
            </button>

          </div>
        </div>

        {/* ================= CONTACT ================= */}
        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-wider">
            Contact Us
          </h4>

          <div className="mt-4 space-y-3 text-xs text-white/70">

            {/* Phone */}
            <a
              href="tel:+919156100136"
              className="
                flex
                items-center
                gap-2
                transition
                hover:text-brand-500
              "
            >
              <Phone
                size={14}
                className="shrink-0 text-brand-500"
              />

              <span>+91 91561 00136</span>
            </a>

            {/* Email */}
            <a
              href="mailto:adimayabuildconllp@gmail.com"
              className="
                flex
                items-center
                gap-2
                transition
                hover:text-brand-500
              "
            >
              <Mail
                size={14}
                className="shrink-0 text-brand-500"
              />

              <span>adimayabuildconllp@gmail.com</span>
            </a>

            {/* Location */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=Pune,Maharashtra,India"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                items-start
                gap-2
                transition
                hover:text-brand-500
              "
            >
              <MapPin
                size={14}
                className="mt-0.5 shrink-0 text-brand-500"
              />

              <span>Pune, Maharashtra, India</span>
            </a>

          </div>
        </div>

      </div>

      {/* ================= BOTTOM FOOTER ================= */}
      <div
        className="
          container-site
          flex
          flex-col
          gap-2
          border-t
          border-white/10
          py-4
          text-[10px]
          text-white/45
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >

        <span>
          © 2026 Adimaya Group. All Rights Reserved.
        </span>

        <button
          type="button"
          onClick={() => go("home")}
          className="
            transition
            hover:text-brand-500
          "
        >
          Back to Top ↑
        </button>

      </div>

    </footer>
  );
}
