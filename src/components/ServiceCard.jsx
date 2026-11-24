
import { ArrowRight } from "lucide-react";

export default function ServiceCard({ service, onLearnMore }) {
  return (
    <article className="service-card group relative min-h-[420px] overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_12px_35px_rgba(16,32,23,.06)]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={service.image}
          alt={service.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#071b10]/95 via-[#071b10]/35 to-transparent" />
      </div>

      {/* Card Content */}
      <div className="relative z-10 flex min-h-[420px] flex-col p-6 text-white">
        {/* Service Number */}
        <div className="text-4xl font-extrabold text-white/35">
          {service.no}
        </div>

        {/* Bottom Content */}
        <div className="mt-auto">
          {/* Accent Line */}
          <div className="mb-3 h-px w-10 bg-brand-500" />

          {/* Service Title */}
          <h3 className="min-h-[2.4em] max-w-[280px] text-2xl font-extrabold uppercase leading-tight tracking-[-.02em]">
            {service.title}
          </h3>

          {/* Service Description */}

<p className="mt-3 min-h-[120px] w-full max-w-none text-sm leading-6 text-white/90 [overflow-wrap:normal]">
  {service.text}
</p>
        

          {/* Explore Button */}
          <button
            type="button"
            onClick={() => onLearnMore(service)}
            className="mt-5 inline-flex w-fit items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-white"
          >
            Explore service

            <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-600 transition-colors duration-300 group-hover:bg-brand-500">
              <ArrowRight size={14} />
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}
