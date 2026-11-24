import { useEffect, useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from "lucide-react";

export default function ProjectGallery({ project }) {
  const slides = useMemo(() => {
    const gallery =
      Array.isArray(project.gallery) && project.gallery.length > 0
        ? project.gallery
        : project.image
        ? [project.image]
        : [];

    return gallery
      .map((item, index) => {
        if (typeof item === "string") {
          return {
            src: item,
            label: `View ${index + 1}`,
          };
        }

        if (item && item.src) {
          return {
            src: item.src,
            label: item.label || `View ${index + 1}`,
          };
        }

        return null;
      })
      .filter(Boolean);
  }, [project]);

  const [active, setActive] = useState(0);

  /* Reset gallery when project changes */
  useEffect(() => {
    setActive(0);
  }, [project.id]);

  /* Auto slide */
  useEffect(() => {
    if (slides.length <= 1) return undefined;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  const previous = () => {
    setActive((current) =>
      current === 0 ? slides.length - 1 : current - 1
    );
  };

  const next = () => {
    setActive((current) => (current + 1) % slides.length);
  };

  if (!slides.length) {
    return null;
  }

  const current = slides[active];

  return (
    <div className="project-gallery-slider">

      {/* =========================
          MAIN IMAGE
      ========================== */}
      <div
        className="project-gallery-stage"
        style={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f5f5",
        }}
      >
        {/* IMAGE WRAPPER */}
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
          }}
        >
          <img
            key={current.src}
            src={current.src}
            alt={`${project.title} — ${current.label}`}
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              maxWidth: "100%",
              objectFit: "contain",
              objectPosition: "center",
            }}
          />
        </div>

        {/* =========================
            CAPTION
        ========================== */}
        <div className="project-gallery-caption">
          <span>{current.label}</span>

          <span>
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(slides.length).padStart(2, "0")}
          </span>
        </div>

        {/* =========================
            LEFT / RIGHT ARROWS
        ========================== */}
        {slides.length > 1 && (
          <>
            <button
              type="button"
              className="project-gallery-arrow project-gallery-arrow-left"
              onClick={previous}
              aria-label="Previous gallery image"
            >
              <ChevronLeft size={21} />
            </button>

            <button
              type="button"
              className="project-gallery-arrow project-gallery-arrow-right"
              onClick={next}
              aria-label="Next gallery image"
            >
              <ChevronRight size={21} />
            </button>
          </>
        )}

        {/* =========================
            EXPAND BUTTON
        ========================== */}
        <a
          className="project-gallery-expand"
          href={current.src}
          target="_blank"
          rel="noreferrer"
          aria-label="Open gallery image"
        >
          <Maximize2 size={17} />
        </a>
      </div>

      {/* =========================
          THUMBNAILS
      ========================== */}
      {slides.length > 1 && (
        <div
          className="project-gallery-thumbs"
          aria-label="Project gallery thumbnails"
        >
          {slides.map((slide, index) => (
            <button
              type="button"
              key={`${slide.src}-${index}`}
              className={`project-gallery-thumb ${
                index === active ? "is-active" : ""
              }`}
              onClick={() => setActive(index)}
              aria-label={`Show ${slide.label}`}
              aria-current={
                index === active ? "true" : undefined
              }
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  background: "#f5f5f5",
                }}
              >
                <img
                  src={slide.src}
                  alt=""
                  style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    objectPosition: "center",
                  }}
                />
              </div>

              <span>{slide.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}