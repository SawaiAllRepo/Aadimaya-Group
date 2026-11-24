import { ArrowUpRight } from "lucide-react";

export default function ProjectCard({ project, onView }) {
  return (
    <button
      type="button"
      className={`project-card project-card-button project-card-${project.type
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")}`}
      onClick={onView}
      aria-label={`View ${project.title}`}
    >
      {/* IMAGE AREA */}
      <div className="relative h-full w-full overflow-hidden bg-white">
        {/* SOFT BLURRED BACKGROUND */}
        <img
          src={project.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-110 object-cover blur-xl"
          style={{ opacity: 0.18 }}
        />

        {/* MAIN PROJECT IMAGE */}
        <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-3">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-contain object-center"
          />
        </div>

        {/* OVERLAY */}
        <div className="project-card-overlay" />

        {/* PROJECT TYPE */}
        <div className="project-card-type">
          {project.type}
        </div>

        {/* CONTENT */}
        <div className="project-card-content">
          <h3>{project.title}</h3>

          <div className="project-card-link">
            View project

            <span>
              <ArrowUpRight size={15} />
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}