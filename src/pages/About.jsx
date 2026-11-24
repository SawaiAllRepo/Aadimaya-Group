import { CheckCircle2 } from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import aboutImage from "../assets/about.jpg";

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24">
      <div className="absolute -right-28 top-10 h-72 w-72 rounded-full bg-brand-50 blur-3xl"/>
      <div className="container-site grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
        <div>
          <SectionTitle label="Who we are" title={<>Building better spaces.<br/><span className="text-brand-600">Creating lasting value.</span></>} />
          <p className="mt-6 max-w-2xl leading-7 text-slate-600">Adimaya Group is focused on four core capabilities — residential & commercial development, contracting, redevelopment and land development. Our approach combines practical planning, disciplined execution and a strong focus on quality.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {["Quality & Safety", "Experienced Team", "On-Time Delivery", "Client Focused"].map(x => (
              <div key={x} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-4 text-sm font-bold shadow-sm"><CheckCircle2 size={19} className="text-brand-600"/>{x}</div>
            ))}
          </div>
        </div>
        <div className="relative min-h-[390px] overflow-hidden rounded-[28px] shadow-2xl">
          <img src={aboutImage} alt="Adimaya Group architecture and development" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071b10]/70 to-transparent" />
          <div className="absolute bottom-7 left-7 text-white"><div className="text-[10px] font-extrabold uppercase tracking-[.2em] text-brand-300">Our mindset</div><div className="mt-2 text-2xl font-extrabold">Plan with purpose. Build with precision.</div></div>
        </div>
      </div>
    </section>
  );
}
