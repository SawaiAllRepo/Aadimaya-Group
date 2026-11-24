import { Quote, Star } from "lucide-react";
import { defaultTestimonials, readData } from "../data/siteData";
import { useEffect, useState } from "react";
import SectionTitle from "../components/SectionTitle";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(() => readData("adimaya_testimonials", defaultTestimonials));
  useEffect(() => {
    const handler = () => setTestimonials(readData("adimaya_testimonials", defaultTestimonials));
    window.addEventListener("adimaya:data-change", handler);
    return () => window.removeEventListener("adimaya:data-change", handler);
  }, []);

  return (
    <section id="testimonials" className="bg-[#f4f8f1] py-20">
      <div className="container-site">
        <SectionTitle
          center
          label="Client feedback"
          title="What Our Clients Say"
          description="Trust is built through communication, quality and consistent execution."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.name} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex gap-1 text-brand-600">
                  {[1,2,3,4,5].map((star) => <Star key={star} size={14} fill="currentColor" />)}
                </div>
                <Quote size={28} className="text-brand-200" />
              </div>
              <p className="mt-5 text-sm leading-6 text-slate-600">“{item.quote}”</p>
              <div className="mt-6 border-t border-slate-100 pt-4">
                <div className="text-sm font-extrabold text-[#102017]">{item.name}</div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-brand-600">{item.role}</div>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-7 text-center text-[11px] text-slate-400">
          Testimonial section layout inspired by modern real-estate project presentation styles.
        </p>
      </div>
    </section>
  );
}
