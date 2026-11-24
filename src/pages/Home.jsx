import { useEffect } from "react";
import {
  ArrowRight,
} from "lucide-react";

import heroVideo from "../assets/hero-video.mp4";

/* =========================================
   HOME PAGE
========================================= */
export default function Home() {
  const go = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };


  return (
    <section
      id="home"
      className="
        relative
        min-h-[650px]
        overflow-hidden
        bg-[#edf2ed]
      "
    >

      {/* =====================================
          HERO BACKGROUND VIDEO
      ===================================== */}
      <div className="absolute inset-0">

        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="
            h-full
            w-full
            object-cover
            object-center
          "
        >
          <source
            src={heroVideo}
            type="video/mp4"
          />

          Your browser does not support the video tag.
        </video>


        {/* Light overlay for readable text */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-[#f7faf7]/95
            via-[#f7faf7]/65
            to-transparent
            lg:from-[#f7faf7]/96
            lg:via-[#f7faf7]/55
            lg:to-transparent
          "
        />


        {/* Subtle bottom overlay */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/10
            via-transparent
            to-transparent
          "
        />

      </div>


      {/* =====================================
          HERO CONTENT
      ===================================== */}
      <div
        className="
          container-site
          relative
          z-10
          flex
          min-h-[650px]
          items-center
        "
      >

        <div
          className="
            max-w-[610px]
            pb-28
            pt-20
          "
        >

          {/* Small Heading */}
          <div
            className="
              mb-5
              text-[11px]
              font-bold
              uppercase
              tracking-[.18em]
              text-brand-700
            "
          >
            Develop • Build • Transform
          </div>


          {/* Main Heading */}
          <h1
            className="
              text-5xl
              font-extrabold
              leading-[.95]
              tracking-[-0.055em]
              text-[#102017]
              sm:text-6xl
              lg:text-[68px]
            "
          >
            WE DEVELOP.
            <br />

            WE BUILD.
            <br />

            <span className="text-brand-600">
              WE TRANSFORM.
            </span>
          </h1>


          {/* Description */}
          <p
            className="
              mt-7
              max-w-[480px]
              text-base
              leading-7
              text-slate-700
            "
          >
            Creating value through{" "}
            <b>
              residential & commercial development, contracting, redevelopment and land development.
            </b>
          </p>


          {/* CTA Button */}
          <button
            type="button"
            onClick={() => go("services")}
            className="
              mt-8
              inline-flex
              items-center
              gap-4
              rounded-full
              bg-[#102017]
              px-6
              py-3.5
              text-[11px]
              font-extrabold
              tracking-wide
              text-white
              shadow-xl
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-brand-600
              hover:shadow-2xl
            "
          >
            EXPLORE OUR SERVICES

            <span
              className="
                grid
                h-7
                w-7
                place-items-center
                rounded-full
                bg-brand-500
                text-white
              "
            >
              <ArrowRight size={15} />
            </span>

          </button>

        </div>
      </div>


    </section>
  );
}
