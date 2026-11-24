import { useState } from "react";

import {
  ArrowRight,
  Download,
  FileText,
  ShieldCheck,
  X,
  CheckCircle2,
} from "lucide-react";

import { saveLead } from "../data/siteData";

const brochureFiles = {
  "Grandeur Residency": "/brochures/Grandeur-Residency-Brochure.pdf",
  "Gravitas Residency": "/brochures/Gravitas-Residency-Brochure.pdf",
  "Gulmohar Residency": "/brochures/Gulmohar-Residency-Brochure.pdf",
  "Shubharambh Clara by Aadimaya Buildcon":
    "/brochures/Shubharambh-Clara-Brochure.pdf",
  "Adimaya Buildcon LLP Portfolio":
    "/brochures/Adimaya-Buildcon-LLP-Portfolio.pdf",
};

const initialForm = {
  name: "",
  phone: "",
  email: "",
  project: "Gravitas Residency",
};

export default function BrochurePanel() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState(initialForm);

  const brochureUrl = `${import.meta.env.BASE_URL}${brochureFiles[
    form.project
  ].replace(/^\/+/, "")}`;

  const close = () => {
    setOpen(false);
    setSubmitted(false);
    setError("");
    setForm(initialForm);
  };

  const downloadBrochure = () => {
    const link = document.createElement("a");

    link.href = brochureUrl;
    link.download = brochureFiles[form.project].split("/").pop();

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const submit = async (e) => {
    e.preventDefault();

    if (pending) return;

    setError("");

    if (!form.name.trim()) {
      return setError("Please enter your full name.");
    }

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      return setError("Please enter a valid 10-digit mobile number.");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return setError("Please enter a valid email address.");
    }

    setPending(true);

    await saveLead({
      ...form,
      source: "brochure-download",
      status: "New",
      message: "Brochure download request",
      submittedAt: new Date().toISOString(),
      id:
        globalThis.crypto?.randomUUID?.() ||
        `${Date.now()}-${Math.random()}`,
    });

    setPending(false);
    setSubmitted(true);

    setTimeout(downloadBrochure, 250);
  };

  return (
    <>
      {/* About Adimaya Group Section */}
      <section className="py-16">
        <div className="container-site overflow-hidden rounded-[28px] bg-[#171b24] px-8 py-12 text-white shadow-xl md:px-14 md:py-14">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
              Know more about Adimaya Group
            </h2>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-white/65 md:text-base">
              Adimaya Group is committed to delivering quality spaces with
              thoughtful planning and practical execution.
            </p>

            <p className="max-w-3xl text-sm leading-7 text-white/65 md:text-base">
              We focus on creating reliable, well-designed developments that
              add long-term value.
            </p>

            <p className="max-w-3xl text-sm leading-7 text-white/65 md:text-base">
              With a strong focus on quality and customer satisfaction, we turn
              ideas into lasting spaces.
            </p>
          </div>
        </div>
      </section>

      {/* Brochure Modal */}
      {open && (
        <div
          className="brochure-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Get project brochure"
        >
          <div className="brochure-modal">
            <button
              type="button"
              onClick={close}
              className="brochure-modal-close"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {!submitted ? (
              <div className="brochure-modal-layout">
                <div className="brochure-modal-intro">
                  <div className="brochure-modal-icon">
                    <FileText size={24} />
                  </div>

                  <div className="brochure-modal-kicker">
                    {form.project}
                  </div>

                  <h3>Get the project brochure</h3>

                  <p>
                    Share your details and get instant access to the complete
                    project brochure.
                  </p>

                  <div className="brochure-benefits">
                    <span>
                      <CheckCircle2 size={15} />
                      Project highlights & specifications
                    </span>

                    <span>
                      <CheckCircle2 size={15} />
                      Amenities & connectivity
                    </span>

                    <span>
                      <CheckCircle2 size={15} />
                      Floor plans & project details
                    </span>
                  </div>
                </div>

                <form onSubmit={submit} className="brochure-form">
                  <div className="brochure-form-title">Your details</div>

                  <label>
                    Full Name
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
                    Mobile Number
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
                    Email Address
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

                  <label>
                    Project
                    <select
                      value={form.project}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          project: e.target.value,
                        })
                      }
                    >
                      <option>Grandeur Residency</option>
                      <option>Gravitas Residency</option>
                      <option>Gulmohar Residency</option>
                      <option>
                        Shubharambh Clara by Aadimaya Buildcon
                      </option>
                      <option>
                        Adimaya Buildcon LLP Portfolio
                      </option>
                    </select>
                  </label>

                  {error && (
                    <div className="brochure-form-error">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="brochure-form-submit"
                    disabled={pending}
                  >
                    CONTINUE TO BROCHURE
                    <ArrowRight size={16} />
                  </button>

                  <div className="brochure-privacy">
                    <ShieldCheck size={14} />
                    Your details are used only for project enquiry
                    follow-up.
                  </div>
                </form>
              </div>
            ) : (
              <div className="brochure-success">
                <div className="brochure-success-icon">
                  <ShieldCheck size={30} />
                </div>

                <div className="brochure-modal-kicker">
                  REQUEST RECEIVED
                </div>

                <h3>Thank you, {form.name}!</h3>

                <p>
                  Your details have been captured successfully. The
                  brochure download has started.
                </p>

                <div className="brochure-success-actions">
                  <button
                    type="button"
                    onClick={downloadBrochure}
                    className="brochure-form-submit"
                  >
                    <Download size={16} />
                    DOWNLOAD PDF AGAIN
                  </button>

                  <button
                    type="button"
                    onClick={close}
                    className="brochure-close-link"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}