export default function SectionTitle({ label, title, description, center = false }) {
  return (
    <div className={center ? "text-center" : ""}>
      <span className="section-label">{label}</span>
      <h2 className="mt-3 text-3xl font-extrabold tracking-[-.03em] sm:text-4xl">{title}</h2>
      {description && (
        <p className={`mt-3 max-w-2xl text-sm leading-6 text-slate-600 ${center ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </div>
  );
}