import SectionTitle from "../components/SectionTitle";
import ProcessCard from "../components/ProcessCard";

const process = [
  ["01", "Enquiry", "Understand the project opportunity and requirement."],
  ["02", "Assessment", "Review site, scope, technical and practical considerations."],
  ["03", "Planning", "Prepare feasibility, estimate, proposal and execution plan."],
  ["04", "Execution", "Coordinate construction and monitor quality and progress."],
  ["05", "Handover", "Complete the project and hand over the finished asset."]
];

export default function Process() {
  return (
    <section id="process" className="bg-[#f4f8f1] py-20">
      <div className="container-site">
        <SectionTitle
          center
          label="How we work"
          title="From Opportunity to Handover"
          description="A clear, structured process helps us move every opportunity from the first conversation to project completion."
        />
        <div className="mt-10 grid gap-3 md:grid-cols-5">
          {process.map((item, i) => <ProcessCard key={item[0]} item={item} last={i === process.length - 1} />)}
        </div>
      </div>
    </section>
  );
}