import { ArrowRight } from "lucide-react";

export default function ProcessCard({ item, last }) {
  const [no, title, text] = item;
  return (
    <div className="relative rounded-2xl border border-brand-100 bg-white p-5 shadow-sm">
      <div className="text-3xl font-extrabold text-brand-600">{no}</div>
      <h3 className="mt-5 font-extrabold">{title}</h3>
      <p className="mt-2 text-xs leading-5 text-slate-600">{text}</p>
      {!last && <ArrowRight className="absolute -right-5 top-1/2 z-10 hidden -translate-y-1/2 bg-[#f4f8f1] text-brand-600 md:block" size={24}/>}
    </div>
  );
}