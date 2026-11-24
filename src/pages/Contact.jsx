import { Clock3, Handshake, ShieldCheck, Users } from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import EnquiryForm from "../components/EnquiryForm";

const benefits = [
  [ShieldCheck, "Quality & Safety", "Commitment to high standards in quality and safety."],
  [Users, "Experienced Team", "Skilled professionals delivering expertise at every step."],
  [Clock3, "On-Time Delivery", "Timely execution with better planning and coordination."],
  [Handshake, "Client Focused", "We build lasting relationships through trust and transparency."]
];

export default function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="container-site grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <SectionTitle
            label="Why choose Adimaya Group?"
            title={<>Practical execution.<br/><span className="text-brand-600">Reliable partnership.</span></>}
          />
          <div className="mt-9 grid grid-cols-2 gap-6">
            {benefits.map(([Icon, title, text]) => (
              <div key={title} className="border-l border-brand-200 pl-4">
                <Icon className="text-brand-600" size={31} strokeWidth={1.5}/>
                <h3 className="mt-3 text-sm font-extrabold uppercase">{title}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
        <EnquiryForm />
      </div>
    </section>
  );
}