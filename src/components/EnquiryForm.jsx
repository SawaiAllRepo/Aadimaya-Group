import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Building2,
  Clock3,
  Check,
  User,
  Phone,
  Mail,
  BriefcaseBusiness,
} from "lucide-react";

import { saveLead } from "../data/siteData";

/* =========================================================
   PRADHIKARAN EARLY BIRD FORM
   ========================================================= */

function PradhikaranEarlyBirdForm() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    requirement: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Please enter your name.";
    } else if (
      !/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(form.name.trim())
    ) {
      newErrors.name = "Please enter a valid name.";
    }

    if (!form.mobile.trim()) {
      newErrors.mobile = "Please enter your mobile number.";
    } else if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) {
      newErrors.mobile =
        "Please enter a valid 10-digit mobile number.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!form.requirement) {
      newErrors.requirement = "Please select your requirement.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    saveLead({
      ...form,
      source: "pradhikaran-early-bird",
      submittedAt: new Date().toISOString(),
      id: Date.now(),
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="relative overflow-hidden rounded-[32px] border border-[#dfe7da] bg-gradient-to-br from-[#f4f8f1] to-white p-8 text-center shadow-[0_30px_90px_rgba(30,50,25,0.12)] md:p-14">
        <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#3d6b35]/5" />

        <div className="relative">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#3d6b35] shadow-[0_12px_30px_rgba(61,107,53,0.25)]">
            <CheckCircle2
              size={38}
              strokeWidth={2}
              className="!text-white"
            />
          </div>

          <h3 className="mt-7 text-3xl font-extrabold !text-[#202520]">
            Thank You!
          </h3>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 !text-[#626b60] md:text-base">
            Your interest has been registered successfully. Our
            team will contact you shortly with the latest project
            details and early bird offers.
          </p>

          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setForm({
                name: "",
                mobile: "",
                email: "",
                requirement: "",
              });
            }}
            className="mt-7 rounded-2xl bg-[#263f22] px-7 py-4 text-sm font-extrabold !text-white shadow-[0_12px_30px_rgba(38,63,34,0.2)] transition duration-300 hover:-translate-y-1 hover:bg-[#3d6b35]"
          >
            Submit Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  const benefits = [
    "Exclusive Early Bird Pricing",
    "Priority Selection of Commercial Spaces",
    "Pre-Launch Special Offers",
    "Flexible Payment Options",
    "Limited Period Benefits",
  ];

  return (
    <div className="overflow-hidden rounded-[32px] border border-[#dfe7da] bg-white shadow-[0_30px_90px_rgba(30,50,25,0.14)]">
      {/* HEADER */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#172019] via-[#243823] to-[#111712] px-6 py-10 md:px-12 md:py-14">
        <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full border border-white/10" />

        <div className="absolute -bottom-32 -right-10 h-64 w-64 rounded-full bg-[#9bb88d]/10 blur-2xl" />

        <div className="relative max-w-4xl">
          <div className="mb-5 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-extrabold tracking-[0.2em] !text-white/85 backdrop-blur-sm md:text-xs">
            WE ARE COMING SOON IN CHIKHALI
          </div>

          <h2 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight !text-white md:text-5xl">
            A New Commercial Destination
            <span className="block !text-[#b8cba9]">
              Is Taking Shape
            </span>
          </h2>

          <p className="mt-5 max-w-3xl text-sm leading-7 !text-white/65 md:text-base">
            Be among the first to discover our upcoming premium
            commercial project in Chikhali, designed for modern
            businesses, retail, dining, and investment
            opportunities.
          </p>
        </div>
      </div>

      {/* BODY */}
      <div className="px-5 py-7 md:px-10 md:py-10">
        {/* BENEFITS */}
        <div className="rounded-[24px] border border-[#dfe8da] bg-gradient-to-br from-[#f3f8ef] to-[#eaf2e5] p-6 md:p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#3d6b35] text-xl shadow-lg">
              🐦
            </div>

            <div>
              <p className="text-[10px] font-extrabold tracking-[0.2em] !text-[#3d6b35] md:text-xs">
                EARLY BIRD OFFER
              </p>

              <h3 className="mt-1 text-lg font-extrabold !text-[#202520] md:text-xl">
                SPECIAL BENEFITS FOR EARLY ENQUIRIES
              </h3>
            </div>
          </div>

          <div className="mt-7 grid gap-3 md:grid-cols-2">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="group flex items-center gap-3 rounded-2xl border border-[#e0e8dc] bg-white px-5 py-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(50,80,45,0.1)]"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#3d6b35]">
                  <Check
                    size={14}
                    strokeWidth={3}
                    className="!text-white"
                  />
                </span>

                <span className="text-sm font-semibold !text-[#4c554b]">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* PROJECT INFO */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="group rounded-[22px] border border-[#e2e8df] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eef5e9]">
              <MapPin
                size={21}
                className="!text-[#3d6b35]"
              />
            </div>

            <p className="mt-4 text-[10px] font-extrabold uppercase tracking-[0.16em] !text-[#929a90]">
              Project Location
            </p>

            <p className="mt-1 font-extrabold !text-[#202520]">
              Chikhali
            </p>
          </div>

          <div className="group rounded-[22px] border border-[#e2e8df] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eef5e9]">
              <Building2
                size={21}
                className="!text-[#3d6b35]"
              />
            </div>

            <p className="mt-4 text-[10px] font-extrabold uppercase tracking-[0.16em] !text-[#929a90]">
              Property Type
            </p>

            <p className="mt-1 font-extrabold !text-[#202520]">
              Premium Commercial Spaces
            </p>
          </div>

          <div className="group rounded-[22px] border border-[#e2e8df] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eef5e9]">
              <Clock3
                size={21}
                className="!text-[#3d6b35]"
              />
            </div>

            <p className="mt-4 text-[10px] font-extrabold uppercase tracking-[0.16em] !text-[#929a90]">
              Status
            </p>

            <p className="mt-1 font-extrabold !text-[#202520]">
              Coming Soon
            </p>
          </div>
        </div>

        {/* REGISTER */}
        <div className="mt-10 border-t border-[#e8ece6] pt-10">
          <div className="mb-7">
            <div className="inline-flex rounded-full bg-[#3d6b35]/10 px-4 py-2 text-[10px] font-extrabold tracking-[0.18em] !text-[#3d6b35] md:text-xs">
              LIMITED UNITS • LIMITED-TIME OFFER
            </div>

            <h3 className="mt-4 text-2xl font-extrabold !text-[#202520] md:text-3xl">
              Register Your Interest
            </h3>

            <p className="mt-2 text-sm leading-6 !text-[#697168]">
              Register your interest today and get early access
              to the project.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* NAME + MOBILE */}
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2.5 block text-sm font-bold !text-[#30352f]">
                  Name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    strokeWidth={2}
                    className="pointer-events-none absolute left-4 top-1/2 z-20 -translate-y-1/2 !text-[#3d6b35]"
                  />

                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      updateField("name", e.target.value)
                    }
                    placeholder="Enter your name"
                    className="w-full rounded-2xl border border-[#d5dfd0] bg-[#fbfcfa] !py-4 !pl-[52px] !pr-5 text-sm !text-[#202520] shadow-[0_5px_20px_rgba(0,0,0,0.03)] outline-none transition duration-300 placeholder:!text-[#7d8779] focus:border-[#3d6b35] focus:bg-white focus:shadow-[0_8px_25px_rgba(61,107,53,0.1)]"
                  />
                </div>

                {errors.name && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs !text-red-600">
                    <AlertCircle size={13} />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2.5 block text-sm font-bold !text-[#30352f]">
                  Mobile Number
                </label>

                <div className="relative">
                  <Phone
                    size={18}
                    strokeWidth={2}
                    className="pointer-events-none absolute left-4 top-1/2 z-20 -translate-y-1/2 !text-[#3d6b35]"
                  />

                  <input
                    type="tel"
                    maxLength={10}
                    value={form.mobile}
                    onChange={(e) =>
                      updateField(
                        "mobile",
                        e.target.value.replace(/\D/g, "")
                      )
                    }
                    placeholder="Enter 10-digit mobile number"
                    className="w-full rounded-2xl border border-[#d5dfd0] bg-[#fbfcfa] !py-4 !pl-[52px] !pr-5 text-sm !text-[#202520] shadow-[0_5px_20px_rgba(0,0,0,0.03)] outline-none transition duration-300 placeholder:!text-[#7d8779] focus:border-[#3d6b35] focus:bg-white focus:shadow-[0_8px_25px_rgba(61,107,53,0.1)]"
                  />
                </div>

                {errors.mobile && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs !text-red-600">
                    <AlertCircle size={13} />
                    {errors.mobile}
                  </p>
                )}
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="mb-2.5 block text-sm font-bold !text-[#30352f]">
                Email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  strokeWidth={2}
                  className="pointer-events-none absolute left-4 top-1/2 z-20 -translate-y-1/2 !text-[#3d6b35]"
                />

                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    updateField("email", e.target.value)
                  }
                  placeholder="Enter your email address"
                  className="w-full rounded-2xl border border-[#d5dfd0] bg-[#fbfcfa] !py-4 !pl-[52px] !pr-5 text-sm !text-[#202520] shadow-[0_5px_20px_rgba(0,0,0,0.03)] outline-none transition duration-300 placeholder:!text-[#7d8779] focus:border-[#3d6b35] focus:bg-white focus:shadow-[0_8px_25px_rgba(61,107,53,0.1)]"
                />
              </div>

              {errors.email && (
                <p className="mt-1.5 flex items-center gap-1 text-xs !text-red-600">
                  <AlertCircle size={13} />
                  {errors.email}
                </p>
              )}
            </div>

            {/* REQUIREMENT */}
            <div>
              <label className="mb-3 block text-sm font-bold !text-[#30352f]">
                Requirement
              </label>

              <div className="grid gap-3 sm:grid-cols-3">
                {["Shop", "Office", "Investment"].map(
                  (option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() =>
                        updateField("requirement", option)
                      }
                      className={`flex items-center justify-center gap-2 rounded-2xl border px-5 py-4 text-sm font-bold shadow-sm transition duration-300 hover:-translate-y-0.5 ${
                        form.requirement === option
                          ? "border-[#3d6b35] bg-[#3d6b35] !text-white shadow-[0_10px_25px_rgba(61,107,53,0.2)]"
                          : "border-[#d5dfd0] bg-[#fbfcfa] !text-[#4d554b] hover:border-[#3d6b35] hover:bg-white"
                      }`}
                    >
                      <span>
                        {form.requirement === option ? "☑" : "☐"}
                      </span>

                      {option}
                    </button>
                  )
                )}
              </div>

              {errors.requirement && (
                <p className="mt-1.5 text-xs !text-red-600">
                  {errors.requirement}
                </p>
              )}
            </div>

            {/* CTA */}
            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#314f2b] to-[#3d6b35] px-6 py-4 text-sm font-extrabold tracking-[0.08em] !text-white shadow-[0_15px_35px_rgba(61,107,53,0.25)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(61,107,53,0.32)]"
            >
              GET EARLY BIRD OFFER

              <ArrowRight
                size={18}
                className="!text-white transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </form>

          <p className="mt-5 text-center text-xs leading-5 !text-[#858c82]">
            Terms & conditions apply. Early Bird benefits are
            subject to availability and applicable project terms.
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   NORMAL ENQUIRY FORM
   ========================================================= */

function NormalEnquiryForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const services = [
    "Residential & Commercial",
    "Contracting",
    "Redevelopment",
    "Land Development",
    "Industrial Development",
  ];

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Please enter your name.";
    } else if (
      !/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(form.name.trim())
    ) {
      newErrors.name = "Please enter a valid name.";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
      newErrors.phone =
        "Please enter a valid 10-digit mobile number.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!form.service) {
      newErrors.service = "Please select a service.";
    }

    if (!form.message.trim()) {
      newErrors.message = "Please enter your message.";
    } else if (form.message.trim().length < 10) {
      newErrors.message =
        "Message must be at least 10 characters.";
    } else if (form.message.trim().length > 500) {
      newErrors.message =
        "Message must not exceed 500 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    saveLead({
      ...form,
      source: "contact-form",
      submittedAt: new Date().toISOString(),
      id: Date.now(),
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="relative overflow-hidden rounded-[32px] border border-[#dce6d7] bg-gradient-to-br from-[#f3f8ef] to-white p-8 text-center shadow-[0_25px_70px_rgba(45,70,40,0.12)] md:p-14">
        <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-[#3d6b35]/5" />

        <div className="relative">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#3d6b35] shadow-[0_12px_30px_rgba(61,107,53,0.25)]">
            <CheckCircle2
              size={38}
              strokeWidth={2}
              className="!text-white"
            />
          </div>

          <h3 className="mt-7 text-3xl font-extrabold !text-[#202520]">
            Enquiry Submitted!
          </h3>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 !text-[#626b60] md:text-base">
            Thank you for contacting Adimaya Group. Our team
            will get back to you shortly.
          </p>

          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setForm({
                name: "",
                phone: "",
                email: "",
                service: "",
                message: "",
              });
            }}
            className="mt-7 rounded-2xl bg-[#263f22] px-7 py-4 text-sm font-extrabold !text-white shadow-[0_12px_30px_rgba(38,63,34,0.2)] transition duration-300 hover:-translate-y-1 hover:bg-[#3d6b35]"
          >
            Submit Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-[#dce6d7] bg-gradient-to-br from-[#f3f8ef] via-[#eef5e9] to-[#e4eedf] p-6 shadow-[0_25px_70px_rgba(45,70,40,0.12)] md:p-10">
      {/* DECORATIVE ELEMENTS */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full border border-[#3d6b35]/10" />

      <div className="pointer-events-none absolute -bottom-32 -left-20 h-64 w-64 rounded-full bg-[#3d6b35]/5 blur-2xl" />

      <div className="relative">
        {/* HEADING */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#3d6b35]/10 px-4 py-2 text-[10px] font-extrabold tracking-[0.18em] !text-[#3d6b35] md:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3d6b35]" />
            PROJECT ENQUIRY
          </div>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight !text-[#172019] md:text-4xl">
            Send us an enquiry
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 !text-[#687167]">
            Tell us what you're looking for and our team will
            get in touch with you shortly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* NAME + PHONE */}
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2.5 block text-sm font-bold !text-[#30352f]">
                Your Name
              </label>

              <div className="relative">
                <User
                  size={18}
                  strokeWidth={2}
                  className="pointer-events-none absolute left-4 top-1/2 z-20 -translate-y-1/2 !text-[#3d6b35]"
                />

                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    updateField("name", e.target.value)
                  }
                  placeholder="Enter your name"
                  className="w-full rounded-2xl border border-[#d5dfd0] bg-white/95 !py-4 !pl-[52px] !pr-5 text-sm !text-[#202520] shadow-[0_5px_20px_rgba(0,0,0,0.03)] outline-none transition duration-300 placeholder:!text-[#7d8779] focus:border-[#3d6b35] focus:bg-white focus:shadow-[0_8px_25px_rgba(61,107,53,0.1)]"
                />
              </div>

              {errors.name && (
                <p className="mt-1.5 flex items-center gap-1 text-xs !text-red-600">
                  <AlertCircle size={13} />
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2.5 block text-sm font-bold !text-[#30352f]">
                Phone Number
              </label>

              <div className="relative">
                <Phone
                  size={18}
                  strokeWidth={2}
                  className="pointer-events-none absolute left-4 top-1/2 z-20 -translate-y-1/2 !text-[#3d6b35]"
                />

                <input
                  type="tel"
                  maxLength={10}
                  value={form.phone}
                  onChange={(e) =>
                    updateField(
                      "phone",
                      e.target.value.replace(/\D/g, "")
                    )
                  }
                  placeholder="Enter your phone number"
                  className="w-full rounded-2xl border border-[#d5dfd0] bg-white/95 !py-4 !pl-[52px] !pr-5 text-sm !text-[#202520] shadow-[0_5px_20px_rgba(0,0,0,0.03)] outline-none transition duration-300 placeholder:!text-[#7d8779] focus:border-[#3d6b35] focus:bg-white focus:shadow-[0_8px_25px_rgba(61,107,53,0.1)]"
                />
              </div>

              {errors.phone && (
                <p className="mt-1.5 flex items-center gap-1 text-xs !text-red-600">
                  <AlertCircle size={13} />
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          {/* EMAIL + SERVICE */}
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2.5 block text-sm font-bold !text-[#30352f]">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  strokeWidth={2}
                  className="pointer-events-none absolute left-4 top-1/2 z-20 -translate-y-1/2 !text-[#3d6b35]"
                />

                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    updateField("email", e.target.value)
                  }
                  placeholder="Enter your email address"
                  className="w-full rounded-2xl border border-[#d5dfd0] bg-white/95 !py-4 !pl-[52px] !pr-5 text-sm !text-[#202520] shadow-[0_5px_20px_rgba(0,0,0,0.03)] outline-none transition duration-300 placeholder:!text-[#7d8779] focus:border-[#3d6b35] focus:bg-white focus:shadow-[0_8px_25px_rgba(61,107,53,0.1)]"
                />
              </div>

              {errors.email && (
                <p className="mt-1.5 flex items-center gap-1 text-xs !text-red-600">
                  <AlertCircle size={13} />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2.5 block text-sm font-bold !text-[#30352f]">
                Select Service
              </label>

              <div className="relative">
                <BriefcaseBusiness
                  size={18}
                  strokeWidth={2}
                  className="pointer-events-none absolute left-4 top-1/2 z-20 -translate-y-1/2 !text-[#3d6b35]"
                />

                <select
                  value={form.service}
                  onChange={(e) =>
                    updateField("service", e.target.value)
                  }
                  className="w-full appearance-none rounded-2xl border border-[#d5dfd0] bg-white/95 !py-4 !pl-[52px] !pr-5 text-sm !text-[#202520] shadow-[0_5px_20px_rgba(0,0,0,0.03)] outline-none transition duration-300 focus:border-[#3d6b35] focus:bg-white focus:shadow-[0_8px_25px_rgba(61,107,53,0.1)]"
                >
                  <option
                    value=""
                    className="!text-[#7d8779]"
                  >
                    Select a service
                  </option>

                  {services.map((service) => (
                    <option
                      key={service}
                      value={service}
                      className="!text-[#202520]"
                    >
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              {errors.service && (
                <p className="mt-1.5 flex items-center gap-1 text-xs !text-red-600">
                  <AlertCircle size={13} />
                  {errors.service}
                </p>
              )}
            </div>
          </div>

          {/* MESSAGE */}
          <div>
            <div className="mb-2.5 flex items-center justify-between">
              <label className="block text-sm font-bold !text-[#30352f]">
                Message / Project Details
              </label>

              <span className="text-xs !text-[#8a9288]">
                {form.message.length}/500
              </span>
            </div>

            <textarea
              rows={5}
              maxLength={500}
              value={form.message}
              onChange={(e) =>
                updateField("message", e.target.value)
              }
              placeholder="Tell us about your project requirements..."
              className="w-full resize-none rounded-2xl border border-[#d5dfd0] bg-white/95 !px-5 !py-4 text-sm !text-[#202520] shadow-[0_5px_20px_rgba(0,0,0,0.03)] outline-none transition duration-300 placeholder:!text-[#7d8779] focus:border-[#3d6b35] focus:bg-white focus:shadow-[0_8px_25px_rgba(61,107,53,0.1)]"
            />

            {errors.message && (
              <p className="mt-1.5 flex items-center gap-1 text-xs !text-red-600">
                <AlertCircle size={13} />
                {errors.message}
              </p>
            )}
          </div>

          {/* SUBMIT */}
          <div className="pt-1">
            <button
              type="submit"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#263f22] to-[#3d6b35] px-7 py-4 text-sm font-extrabold tracking-[0.08em] !text-white shadow-[0_12px_30px_rgba(38,63,34,0.22)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(38,63,34,0.28)] md:w-auto"
            >
              SUBMIT ENQUIRY

              <ArrowRight
                size={18}
                className="!text-white transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

export default function EnquiryForm({
  isPradhikaran = false,
}) {
  if (isPradhikaran) {
    return <PradhikaranEarlyBirdForm />;
  }

  return <NormalEnquiryForm />;
}