import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpRight,
  MapPin,
  X,
  CheckCircle2,
  ShieldCheck,
  Send,
} from "lucide-react";

import ProjectCard from "../components/ProjectCard";
import EnquiryForm from "../components/EnquiryForm";
import ProjectGallery from "../components/ProjectGallery";

import { readProjects, saveLead } from "../data/siteData";

const tabs = [
  { id: "all", label: "All" },
  { id: "ongoing", label: "Ongoing" },
  { id: "completed", label: "Completed" },
  { id: "upcoming", label: "Upcoming" },
];

const types = [
  "All Types",
  "Residential & Commercial",
  "Contracting",
  "Redevelopment",
  "Land Development",
  "Industrial Development",
];

export default function Projects() {
  const [projectData, setProjectData] = useState(() =>
    readProjects()
  );

  const [active, setActive] = useState("all");
  const [type, setType] = useState("All Types");

  const getProjectFromUrl = (projects = projectData) => {
    const match = window.location.pathname.match(
      /^\/projects\/([^/]+)\/?$/i
    );

    if (!match) return null;

    const id = decodeURIComponent(match[1]);

    return (
      projects.find((project) => project.id === id) ||
      null
    );
  };

  const [selectedProject, setSelectedProject] = useState(() =>
    getProjectFromUrl()
  );

  const [action, setAction] = useState(() =>
    getProjectFromUrl() ? "enquiry" : "download"
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [formError, setFormError] = useState("");
  const [brochureNotice, setBrochureNotice] = useState("");
  const [submitting, setSubmitting] = useState(false);

  /* =========================
     PROJECT DATA REFRESH
  ========================= */

  useEffect(() => {
    const handler = () => {
      const updatedProjects = readProjects();

      setProjectData(updatedProjects);

      const currentProject =
        getProjectFromUrl(updatedProjects);

      if (currentProject) {
        setSelectedProject(currentProject);
        setAction("enquiry");
      }
    };

    window.addEventListener(
      "adimaya:data-change",
      handler
    );

    return () => {
      window.removeEventListener(
        "adimaya:data-change",
        handler
      );
    };
  }, []);

  /* =========================
     BACK / FORWARD
  ========================= */

  useEffect(() => {
    const handlePopState = () => {
      const project =
        getProjectFromUrl(projectData);

      if (project) {
        setSelectedProject(project);
        setAction("enquiry");
        setFormError("");

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        setSelectedProject(null);
        setAction("download");
        setFormError("");

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    };

    window.addEventListener(
      "popstate",
      handlePopState
    );

    return () => {
      window.removeEventListener(
        "popstate",
        handlePopState
      );
    };
  }, [projectData]);

  /* =========================
     NAVBAR FILTER
  ========================= */

  useEffect(() => {
    const handler = (event) => {
      const nextType = event.detail?.type;

      setActive("all");
      setType(nextType || "All Types");

      if (selectedProject) {
        window.history.pushState(
          {},
          "",
          "/projects"
        );

        window.dispatchEvent(
          new PopStateEvent("popstate")
        );

        setSelectedProject(null);
        setAction("download");

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    };

    window.addEventListener(
      "adimaya:project-filter",
      handler
    );

    return () => {
      window.removeEventListener(
        "adimaya:project-filter",
        handler
      );
    };
  }, [selectedProject]);

  /* =========================
     FILTER PROJECTS
  ========================= */

  const visibleProjects = useMemo(() => {
    return projectData.filter((project) => {
      const phaseMatch =
        active === "all" ||
        project.phase === active;

      const typeMatch =
        type === "All Types" ||
        project.type === type;

      return phaseMatch && typeMatch;
    });
  }, [projectData, active, type]);

  /* =========================
     OPEN PROJECT
  ========================= */

  const openProject = (project) => {
    const projectUrl =
      `/projects/${encodeURIComponent(
        project.id
      )}`;

    window.history.pushState(
      {},
      "",
      projectUrl
    );

    window.dispatchEvent(
      new PopStateEvent("popstate")
    );

    setSelectedProject(project);
    setAction("enquiry");
    setFormError("");

    setForm({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================
     CLOSE PROJECT
  ========================= */

  const closeProject = () => {
    window.history.pushState(
      {},
      "",
      "/projects"
    );

    window.dispatchEvent(
      new PopStateEvent("popstate")
    );

    setSelectedProject(null);
    setAction("download");
    setFormError("");

    setForm({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================
     BROCHURE FORM
  ========================= */

  const openBrochureForm = (project) => {
    setSelectedProject(project);
    setAction("download");
    setFormError("");
    setBrochureNotice("");

    setForm({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const closeBrochureForm = () => {
    const currentProject =
      getProjectFromUrl();

    if (currentProject) {
      setSelectedProject(currentProject);
      setAction("enquiry");
    } else {
      setSelectedProject(null);
      setAction("download");
    }

    setFormError("");

    setForm({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  /* =========================
     SUBMIT BROCHURE FORM
  ========================= */

  const submitBrochureForm = async (e) => {
    e.preventDefault();

    if (!selectedProject || submitting) return;

    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();

    if (!name || name.length < 2) {
      setFormError("Please enter your name.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      setFormError(
        "Please enter a valid 10-digit Indian mobile number."
      );
      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      setFormError(
        "Please enter a valid email address."
      );
      return;
    }

    setSubmitting(true);

    await saveLead({
      ...form,
      name,
      email,
      phone,
      project: selectedProject.title,

      source:
        action === "download" &&
        selectedProject.brochure
          ? "project-brochure"
          : "project-enquiry",

      status: "New",

      id:
        crypto?.randomUUID?.() ||
        `${Date.now()}-${Math.random()}`,
    });

    if (
      action === "download" &&
      selectedProject.brochure
    ) {
      const url =
        `${import.meta.env.BASE_URL}${selectedProject.brochure.replace(
          /^\//,
          ""
        )}`;

      const link = document.createElement("a");

      link.href = url;

      link.download =
        selectedProject.brochure.split("/").pop();

      document.body.appendChild(link);
      link.click();
      link.remove();

      setSubmitting(false);
      closeBrochureForm();

      return;
    }

    setSubmitting(false);
    closeBrochureForm();

    alert(
      "Thank you! Your enquiry has been submitted. Our team will contact you shortly."
    );
  };

  /* =====================================================
     PROJECT DETAIL PAGE
  ===================================================== */

  if (
    selectedProject &&
    action === "enquiry"
  ) {
    return (
      <section className="project-detail-standalone">

        <div className="project-detail-page-shell">

          <button
            type="button"
            className="project-detail-back"
            onClick={closeProject}
          >
            <ArrowUpRight
              size={16}
              style={{
                transform: "rotate(225deg)",
              }}
            />

            Back to Projects
          </button>

          {/* HERO */}

          <div className="project-detail-hero">

            <div className="project-detail-hero-media">

              <img
                src={selectedProject.image}
                alt={selectedProject.title}
              />

            </div>

            <div className="project-detail-hero-copy">

              <span className="projects-kicker">
                PROJECT DETAILS
              </span>

              <h1>
                {selectedProject.title}
              </h1>

              <div className="project-detail-meta">

                <span>
                  <MapPin size={15} />
                  {selectedProject.location}
                </span>

                <span>
                  {selectedProject.type}
                </span>

              </div>

              <p>
                {selectedProject.description}
              </p>

              {selectedProject.isConcept && (
                <div className="project-concept-note">

                  <strong>
                    Project note
                  </strong>

                  <span>
                    {selectedProject.conceptNote}
                  </span>

                </div>
              )}

            </div>

          </div>

          <div className="project-detail-body">

            {/* SPECIFICATIONS */}

            <section className="project-detail-section">

              <div className="projects-kicker">
                PROJECT SPECIFICATIONS
              </div>

              <h2>
                Project information
              </h2>

              <div className="project-spec-grid">

                <div>
                  <span>Project</span>

                  <strong>
                    {selectedProject.title}
                  </strong>
                </div>

                {selectedProject.bhk && (
                  <div>
                    <span>Configuration</span>

                    <strong>
                      {selectedProject.bhk}
                    </strong>
                  </div>
                )}

                <div>
                  <span>Location</span>

                  <strong>
                    {selectedProject.location}
                  </strong>
                </div>

                <div>
                  <span>Service</span>

                  <strong>
                    {selectedProject.type}
                  </strong>
                </div>

                {selectedProject.address && (
                  <div>
                    <span>Address</span>

                    <strong>
                      {selectedProject.address}
                    </strong>
                  </div>
                )}

                {selectedProject.subProjects?.[0]?.area && (
                  <div>
                    <span>Area</span>

                    <strong>
                      {
                        selectedProject
                          .subProjects[0]
                          .area
                      }
                    </strong>
                  </div>
                )}

                {selectedProject.subProjects?.[0]?.client && (
                  <div>
                    <span>Client</span>

                    <strong>
                      {
                        selectedProject
                          .subProjects[0]
                          .client
                      }
                    </strong>
                  </div>
                )}

              </div>

            </section>

            {/* SCOPE */}

            {selectedProject.scope?.length > 0 && (
              <section className="project-detail-section">

                <div className="projects-kicker">
                  DEVELOPMENT SCOPE
                </div>

                <h2>
                  Scope of work
                </h2>

                <div className="project-scope-list">

                  {selectedProject.scope.map(
                    (item) => (
                      <div key={item}>

                        <CheckCircle2 size={17} />

                        <span>
                          {item}
                        </span>

                      </div>
                    )
                  )}

                </div>

              </section>
            )}

            {/* RELATED PROJECT */}

            {selectedProject.subProjects?.length > 0 && (
              <section className="project-detail-section">

                <div className="projects-kicker">
                  RELATED PROJECT
                </div>

                <h2>
                  Sub-project
                </h2>

                {selectedProject.subProjects.map(
                  (sub) => (
                    <div
                      key={sub.title}
                      className="project-subproject-card project-subproject-card-large"
                    >

                      <img
                        src={sub.image}
                        alt={sub.title}
                      />

                      <div>

                        <strong>
                          {sub.title}
                        </strong>

                        <span>
                          {sub.location} ·{" "}
                          {sub.type}
                        </span>

                        <p>
                          {sub.description}
                        </p>

                        {sub.area && (
                          <small>
                            Area: {sub.area}

                            {sub.client
                              ? ` · Client: ${sub.client}`
                              : ""}
                          </small>
                        )}

                      </div>

                    </div>
                  )
                )}

              </section>
            )}

            {/* GALLERY */}

            <section className="project-detail-section">

              <div className="projects-kicker">
                PROJECT GALLERY
              </div>

              <h2>
                Gallery
              </h2>

              <ProjectGallery
                project={selectedProject}
              />

            </section>

            {/* BROCHURE-BASED HIGHLIGHTS */}

            {(selectedProject.highlights?.length ||
              selectedProject.amenities?.length ||
              selectedProject.specifications?.length) && (

              <section className="project-detail-section project-brochure-information">

                <div className="projects-kicker">
                  BROCHURE INFORMATION
                </div>

                <h2>
                  Designed for comfort &amp; everyday living
                </h2>

                {selectedProject.highlights?.length > 0 && (
                  <div className="project-highlight-grid">

                    {selectedProject.highlights.map(
                      (item) => (
                        <div key={item}>

                          <CheckCircle2 size={18} />

                          <span>
                            {item}
                          </span>

                        </div>
                      )
                    )}

                  </div>
                )}

                {selectedProject.amenities?.length > 0 && (
                  <div className="project-info-subsection">

                    <span className="project-info-subheading">
                      AMENITIES
                    </span>

                    <div className="project-detail-chip-list">

                      {selectedProject.amenities.map(
                        (item) => (
                          <span key={item}>
                            {item}
                          </span>
                        )
                      )}

                    </div>

                  </div>
                )}

                {selectedProject.specifications?.length > 0 && (
                  <div className="project-info-subsection">

                    <span className="project-info-subheading">
                      SPECIFICATIONS
                    </span>

                    <div className="project-specification-list">

                      {selectedProject.specifications.map(
                        (item) => (
                          <div key={item}>
                            {item}
                          </div>
                        )
                      )}

                    </div>

                  </div>
                )}

                {selectedProject.sourceNote && (
                  <p className="project-source-note">
                    {selectedProject.sourceNote}
                  </p>
                )}

              </section>
            )}

            {/* BROCHURE PREVIEW */}

            {selectedProject.brochure &&
              selectedProject.brochureCover && (

              <section className="project-detail-section project-brochure-preview-section">

                <div className="projects-kicker">
                  PROJECT BROCHURE
                </div>

                <h2>
                  See the {selectedProject.title} brochure
                </h2>

                <div className="project-brochure-preview-card">

                  <div className="project-brochure-preview-image">

                    <img
                      src={
                        selectedProject.brochureCover
                      }
                      alt={`${selectedProject.title} brochure cover`}
                    />

                  </div>

                  <div className="project-brochure-preview-copy">

                    <span className="project-info-subheading">
                      FIRST PAGE PREVIEW
                    </span>

                    <h3>
                      {selectedProject.title}
                    </h3>

                    <p>
                      The supplied brochure is available
                      directly inside this project page.
                      Open the complete PDF for the project
                      story, floor plan, amenities and
                      specifications.
                    </p>

                    <div className="project-brochure-preview-actions">

                      <button
                        type="button"
                        className="project-brochure-preview-cta"
                        onClick={() =>
                          openBrochureForm(
                            selectedProject
                          )
                        }
                      >
                        Get this brochure

                        <ArrowDownToLine
                          size={15}
                        />

                      </button>

                    </div>

                  </div>

                </div>

              </section>
            )}

            {/* =================================================
                PROJECT ENQUIRY
                PRADHIKARAN = EARLY BIRD
                OTHER PROJECTS = NORMAL FORM
            ================================================= */}

            <section className="project-detail-enquiry">

              <div className="projects-kicker">
                {selectedProject.id ===
                "pradhikaran-residential-commercial"
                  ? "EARLY BIRD OFFER"
                  : "PROJECT ENQUIRY"}
              </div>

              <h2>
                {selectedProject.id ===
                "pradhikaran-residential-commercial"
                  ? "Register Your Interest"
                  : "Interested in this project?"}
              </h2>

              <EnquiryForm
                isPradhikaran={
                  selectedProject.id ===
                  "pradhikaran-residential-commercial"
                }
              />

            </section>

            {/* BROCHURE */}

            <div className="project-detail-actions">

              <button
                type="button"
                className={`project-detail-brochure ${
                  !selectedProject.brochure
                    ? "is-unavailable"
                    : ""
                }`}
                onClick={() =>
                  openBrochureForm(
                    selectedProject
                  )
                }
              >

                {selectedProject.brochure
                  ? "Get Project Brochure"
                  : "Request Brochure"}

                <ArrowDownToLine size={16} />

              </button>

            </div>

          </div>

        </div>

      </section>
    );
  }

  /* =====================================================
     NORMAL PROJECT LISTING
  ===================================================== */

  return (
    <section
      id="projects"
      className="projects-phase-section"
    >

      <div className="container-site">

        <div className="projects-top-heading">

          <span className="projects-kicker">
            OUR PROJECTS
          </span>

          <h1>
            Projects that shape{" "}
            <em>
              better spaces.
            </em>
          </h1>

          <p>
            Explore Adimaya Group projects
            across ongoing, upcoming and
            completed phases.
          </p>

        </div>

        <div className="projects-toolbar">

          <div
            className="projects-tabs"
            role="tablist"
            aria-label="Project phases"
          >

            {tabs.map((tab) => {

              const count =
                tab.id === "all"
                  ? projectData.length
                  : projectData.filter(
                      (project) =>
                        project.phase === tab.id
                    ).length;

              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={
                    active === tab.id
                  }
                  onClick={() =>
                    setActive(tab.id)
                  }
                  className={`projects-tab ${
                    active === tab.id
                      ? "is-active"
                      : ""
                  }`}
                >

                  <span>
                    {tab.label}
                  </span>

                  <b>
                    {count}
                  </b>

                </button>
              );
            })}

          </div>

        </div>

        <div className="projects-filters">

          {types.map((item) => (
            <button
              key={item}
              type="button"
              className={
                type === item
                  ? "is-selected"
                  : ""
              }
              onClick={() =>
                setType(item)
              }
            >
              {item}
            </button>
          ))}

        </div>

        <div className="projects-phase-intro">

          <div className="projects-phase-copy">

            <span className="projects-current-phase">
              {active === "all"
                ? "ALL PROJECTS"
                : `${active.toUpperCase()} PROJECTS`}
            </span>

            <h2>
              {active === "ongoing"
                ? "Building today."
                : active === "upcoming"
                ? "Coming next."
                : active === "completed"
                ? "Delivered with purpose."
                : "A portfolio built to last."}
            </h2>

            <p>
              Discover project location,
              type, status, progress and
              brochure information in one
              place.
            </p>

          </div>

          <div className="projects-intro-mark">

            <span>
              ADIMAYA
            </span>

            <strong>
              {String(
                visibleProjects.length
              ).padStart(2, "0")}
            </strong>

            <small>
              matching projects
            </small>

          </div>

        </div>

        <div className="projects-grid">

          {visibleProjects.length ? (
            visibleProjects.map(
              (project) => (
                <article
                  key={`${project.phase}-${project.title}`}
                  className="project-item"
                >

                  <ProjectCard
                    project={project}
                    onView={() =>
                      openProject(project)
                    }
                  />

                  <div className="project-info-panel">

                    <div className="project-meta">

                      <span className="project-location">

                        <MapPin size={13} />

                        {project.location}

                      </span>

                      <span className="project-phase-label">
                        {project.phase}
                      </span>

                    </div>

                    <p>
                      {project.description}
                    </p>

                    {project.phase === "ongoing" && (
                      <div className="project-progress">

                        <div>

                          <span>
                            Construction Progress
                          </span>

                          <b>
                            {project.progress}%
                          </b>

                        </div>

                        <div className="project-progress-track">

                          <span
                            style={{
                              width: `${project.progress}%`,
                            }}
                          />

                        </div>

                      </div>
                    )}

                    <div className="project-actions">

                      <button
                        type="button"
                        onClick={() =>
                          openProject(project)
                        }
                        className="project-brochure-btn project-brochure-view"
                      >

                        View Project

                        <ArrowUpRight
                          size={14}
                        />

                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          openBrochureForm(project)
                        }
                        className={`project-brochure-btn project-brochure-download ${
                          !project.brochure
                            ? "is-unavailable"
                            : ""
                        }`}
                      >

                        {project.brochure
                          ? "Brochure"
                          : "Request Brochure"}

                        <ArrowDownToLine
                          size={14}
                        />

                      </button>

                    </div>

                  </div>

                </article>
              )
            )
          ) : (
            <div className="projects-empty">
              No projects match your current filters.
            </div>
          )}

        </div>

      </div>

      {/* BROCHURE MODAL */}

      {selectedProject &&
        action === "download" && (

        <div
          className="brochure-lead-backdrop"
          onMouseDown={closeBrochureForm}
        >

          <div
            className="brochure-lead-modal brochure-lead-modal-premium"
            role="dialog"
            aria-modal="true"
            onMouseDown={(e) =>
              e.stopPropagation()
            }
          >

            <button
              type="button"
              className="brochure-lead-close"
              onClick={closeBrochureForm}
              aria-label="Close brochure form"
            >
              <X size={18} />
            </button>

            <div className="brochure-lead-top">

              <div className="brochure-lead-icon">
                <ArrowDownToLine size={21} />
              </div>

              <div>

                <div className="brochure-lead-kicker">

                  {selectedProject.brochure
                    ? "PROJECT BROCHURE"
                    : "PROJECT ENQUIRY"}

                </div>

                <h3>

                  {selectedProject.brochure
                    ? "Get the brochure"
                    : "Request project details"}

                </h3>

                <p>

                  {selectedProject.brochure ? (
                    <>
                      Enter your details to access the{" "}
                      <strong>
                        {selectedProject.title}
                      </strong>{" "}
                      brochure instantly.
                    </>
                  ) : (
                    <>
                      The brochure is not available yet.
                      Share your details and our team will
                      contact you with{" "}
                      <strong>
                        {selectedProject.title}
                      </strong>{" "}
                      project information.
                    </>
                  )}

                </p>

              </div>

            </div>

            <div className="brochure-project-chip">

              <img
                src={selectedProject.image}
                alt=""
              />

              <div>

                <strong>
                  {selectedProject.title}
                </strong>

                <span>
                  {selectedProject.location} ·{" "}
                  {selectedProject.type}
                </span>

              </div>

            </div>

            <form
              onSubmit={submitBrochureForm}
              className="brochure-lead-form"
            >

              <div className="brochure-form-two-col">

                <label>

                  <span>
                    Full Name
                  </span>

                  <input
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                    placeholder="Enter your full name"
                    autoComplete="name"
                  />

                </label>

                <label>

                  <span>
                    Mobile Number
                  </span>

                  <input
                    required
                    value={form.phone}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        phone: e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10),
                      })
                    }
                    placeholder="10-digit mobile number"
                    inputMode="numeric"
                    maxLength={10}
                    autoComplete="tel"
                  />

                </label>

                <label>

                  <span>
                    Email Address
                  </span>

                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        email: e.target.value,
                      })
                    }
                    placeholder="you@example.com"
                    autoComplete="email"
                  />

                </label>

              </div>

              <label>

                <span>
                  Message{" "}
                  <em>
                    Optional
                  </em>
                </span>

                <textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      message: e.target.value,
                    })
                  }
                  placeholder="Tell us what you are looking for..."
                  rows="3"
                />

              </label>

              {formError && (
                <div className="brochure-lead-error">
                  {formError}
                </div>
              )}

              <button
                type="submit"
                className="brochure-lead-submit"
                disabled={submitting}
              >

                {selectedProject.brochure ? (
                  <>
                    <ArrowDownToLine size={16} />

                    Continue to Brochure
                  </>
                ) : (
                  <>
                    <Send size={16} />

                    Submit Enquiry
                  </>
                )}

              </button>

              <div className="brochure-lead-privacy">

                <ShieldCheck size={14} />

                Your details are used only for project
                enquiry follow-up.

              </div>

            </form>

          </div>

        </div>
      )}

    </section>
  );
}