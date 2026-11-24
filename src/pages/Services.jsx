
import { useState } from "react";
import {
  Building2,
  HardHat,
  RefreshCw,
  LandPlot,
  Factory,
  X,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import SectionTitle from "../components/SectionTitle";
import ServiceCard from "../components/ServiceCard";

import residentialImage from "../assets/core-services/residential-commercial.jpg";
import constructionImage from "../assets/core-services/construction.jpg";
import redevelopmentImage from "../assets/core-services/redevelopment.jpg";
import landDevelopmentImage from "../assets/core-services/land.jpg";

const services = [
  {
    no: "01",
    title: "Residential & Commercial",
    icon: Building2,
    text: "Thoughtful residential and commercial development focused on practical planning, quality execution and long-term value.",
    image: residentialImage,
    detail:
      "We support residential and commercial opportunities from early planning and feasibility through coordinated execution and handover. The approach is built around clear scope, practical design coordination, quality control and dependable delivery.",
    points: [
      "Residential apartments & housing projects",
      "Commercial complexes & office spaces",
      "Site and execution coordination",
      "Quality-focused project delivery",
    ],
  },
  {
    no: "02",
    title: "Contracting",
    icon: HardHat,
    text: "End-to-end contracting support with strong attention to execution, safety, coordination, quality and timelines.",
    image: constructionImage,
    detail:
      "Our contracting workflow covers scope understanding, estimation, planning, site execution, progress coordination, quality checks and final handover. The supplied Adimaya Buildcon LLP brochure also highlights RCC works, residential apartments, commercial spaces, high-rise towers and sustainable construction solutions.",
    points: [
      "RCC construction execution",
      "Residential & commercial projects",
      "High-rise construction",
      "Site coordination & progress monitoring",
    ],
  },
  {
    no: "03",
    title: "Redevelopment",
    icon: RefreshCw,
    text: "Transforming existing properties through structured assessment, planning, execution and value-focused redevelopment.",
    image: redevelopmentImage,
    detail:
      "Redevelopment begins with property assessment, surveys and feasibility, followed by planning, stakeholder coordination, approvals, execution and possession. Every stage is structured to reduce uncertainty and improve project clarity.",
    points: [
      "Property assessment & feasibility",
      "Planning and proposal development",
      "Approvals and execution coordination",
      "Modernization and value creation",
    ],
  },
  {
    no: "04",
    title: "Land Development",
    icon: LandPlot,
    text: "Structured land development planning focused on site organization, infrastructure readiness and future development potential.",
    image: landDevelopmentImage,
    detail:
      "Land Development covers the early-stage work required to turn land into a well-organized development opportunity: understanding the site, planning access and circulation, coordinating infrastructure requirements, defining development phases and preparing the site for its intended use. Project-specific facts are added only when verified.",
    points: [
      "Site and land assessment",
      "Access & circulation planning",
      "Infrastructure coordination",
      "Development phasing",
      "Future-ready site planning",
    ],
  },
  {
    no: "05",
    title: "Industrial Development",
    icon: Factory,
    text: "Planned industrial development focused on efficient site utilization, infrastructure readiness and long-term operational value.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=85",
    detail:
      "Our Industrial Development approach focuses on planning and coordinating industrial spaces with attention to site utilization, access, infrastructure, construction execution and future scalability. Each development is structured around practical requirements and efficient use of the available site.",
    points: [
      "Industrial site planning",
      "Infrastructure & utility coordination",
      "Factory and warehouse development",
      "Access & circulation planning",
      "Development phasing & execution",
    ],
  },
];

export default function Services() {
  const [selected, setSelected] = useState(null);

  const discuss = () => {
    setSelected(null);

    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section id="services" className="bg-[#fbfcfa] py-20">
      <div className="container-site">
        <SectionTitle
          center
          label="What we provide"
          title="Our Core Development Services"
        />

        {/* Services Grid */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.no}
              service={service}
              onLearnMore={setSelected}
            />
          ))}
        </div>
      </div>

      {/* Service Details Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[80] grid place-items-center overflow-y-auto bg-black/50 p-5 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
            className="my-auto w-full max-w-xl rounded-2xl bg-white p-7 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-extrabold uppercase tracking-widest text-brand-600">
                  {selected.no}
                </div>

                <h3
                  id="service-modal-title"
                  className="mt-2 text-2xl font-extrabold"
                >
                  {selected.title}
                </h3>
              </div>

              <button
                type="button"
                aria-label="Close service details"
                onClick={() => setSelected(null)}
                className="shrink-0 rounded-full border border-slate-200 p-2 transition hover:bg-slate-100"
              >
                <X size={17} />
              </button>
            </div>

            {/* Service Description */}
            <p className="mt-5 leading-7 text-slate-600">
              {selected.detail}
            </p>

            {/* Service Features */}
            <div className="mt-6 grid gap-3">
              {selected.points.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-3 text-sm text-slate-700"
                >
                  <CheckCircle2
                    size={17}
                    className="mt-0.5 shrink-0 text-brand-600"
                  />

                  <span>{point}</span>
                </div>
              ))}
            </div>

            {/* Contact Button */}
            <button
              type="button"
              onClick={discuss}
              className="mt-6 inline-flex items-center gap-3 rounded-full bg-brand-600 px-5 py-3 text-xs font-extrabold text-white transition hover:opacity-90"
            >
              DISCUSS YOUR PROJECT
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
