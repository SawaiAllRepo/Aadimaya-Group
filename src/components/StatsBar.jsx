import { useEffect, useState } from "react";
import { Building2, ShieldCheck, Users } from "lucide-react";

function CountUp({ end, plus = false }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const duration = 1800;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;

      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easedProgress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
    return () => {
      startTime = null;
    };
  }, [end]);

  return <>{count}{count === end && plus ? "+" : ""}</>;
}

export default function StatsBar() {
  const stats = [
    [ShieldCheck, 10, "PROJECTS", "COMPLETED", true],
    [Building2, 2, "MN", "SQ. FT.", false],
    [Users, 180, "HAPPY", "CLIENTS", true],
  ];

  return (
    <section
      aria-label="Adimaya Group experience statistics"
      className="relative z-20 bg-white shadow-[0_8px_30px_rgba(0,0,0,.06)]"
    >
      <div className="container-site grid grid-cols-3 divide-x divide-slate-200">
        {stats.map(([Icon, number, a, b, plus]) => (
          <div
            key={number}
            className="flex items-center gap-3 px-3 py-4 sm:px-7 sm:py-5"
          >
            <Icon className="text-brand-600" size={28} strokeWidth={1.5} />

            <div>
              <div className="text-2xl font-extrabold tracking-tight text-[#102017]">
                <CountUp end={number} plus={plus} />
              </div>

              <div className="text-[8px] font-bold leading-3 tracking-wider text-slate-500">
                {a}
                <br />
                {b}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
