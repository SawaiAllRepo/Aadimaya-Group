import { useEffect, useState } from "react";
import { BarChart3, Building2, Download, FileText, ImagePlus, LogOut, MessageSquareQuote, Pencil, Plus, Save, Settings, Trash2, Users, X } from "lucide-react";
import { defaultProjects, defaultTestimonials, readData, readProjects, writeData, fetchLeads } from "../data/siteData";

const SESSION_KEYS = {
  admin: "adimaya_admin_session",
  developer: "adimaya_developer_session",
};

// Change these credentials before production deployment.
const CREDENTIALS = {
  admin: { email: "admin@adimayagroup.com", password: "Adimaya@Admin2026" },
  developer: { email: "developer@adimayagroup.com", password: "Adimaya@Dev2026" },
};

const ROLE_DETAILS = {
  admin: {
    title: "Admin Portal",
    description: "Full access to projects, testimonials, enquiries and brochures.",
    label: "ADMIN",
  },
  developer: {
    title: "Developer Portal",
    description: "Manage project content, monitor enquiries and check website information.",
    label: "DEVELOPER",
  },
};

const emptyProject = { id: "", phase: "upcoming", type: "Contracting", title: "", location: "", image: "", description: "", brochure: "/Adimaya-Group-Project-Brochure.pdf", progress: 0 };
const emptyTestimonial = { id: "", quote: "", name: "", role: "" };

function getLeads() {
  const unified = readData("adimaya_leads", null);
  if (Array.isArray(unified)) return unified;
  return readData("adimaya_project_leads", []).concat(readData("adimaya_brochure_leads", []));
}

export default function Admin({ role = "admin" }) {
  const roleKey = role === "developer" ? "developer" : "admin";
  const details = ROLE_DETAILS[roleKey];
  const sessionKey = SESSION_KEYS[roleKey];
  const credentials = CREDENTIALS[roleKey];

  const [logged, setLogged] = useState(() => sessionStorage.getItem(sessionKey) === "1");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState("dashboard");
  const [projects, setProjects] = useState(() => readProjects());
  const [testimonials, setTestimonials] = useState(() => readData("adimaya_testimonials", defaultTestimonials));
  const [projectEdit, setProjectEdit] = useState(null);
  const [testimonialEdit, setTestimonialEdit] = useState(null);
  const [message, setMessage] = useState("");
  const [leadVersion, setLeadVersion] = useState(0);

  useEffect(() => {
    const refresh = () => {
      setLeadVersion((v) => v + 1);
      setProjects(readProjects());
      setTestimonials(readData("adimaya_testimonials", defaultTestimonials));
    };
    window.addEventListener("storage", refresh);
    window.addEventListener("adimaya:data-change", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("adimaya:data-change", refresh);
    };
  }, []);

  const [serverLeads, setServerLeads] = useState(() => getLeads());
  const leads = serverLeads;

  useEffect(() => {
    let active = true;
    const load = async () => {
      const next = await fetchLeads();
      if (active && Array.isArray(next)) setServerLeads(next);
    };
    load();
    const timer = setInterval(load, 5000);
    return () => { active = false; clearInterval(timer); };
  }, [leadVersion, tab]);

  const login = (e) => {
    e.preventDefault();
    if (email.trim().toLowerCase() === credentials.email && password === credentials.password) {
      sessionStorage.setItem(sessionKey, "1");
      setLogged(true);
      setMessage("");
      return;
    }
    setMessage(`Invalid ${roleKey} email or password.`);
  };

  const logout = () => {
    sessionStorage.removeItem(sessionKey);
    setLogged(false);
    setEmail("");
    setPassword("");
  };

  const saveProjects = (next) => {
    setProjects(next);
    writeData("adimaya_projects", next);
    setMessage("Project changes saved.");
  };

  const saveTestimonials = (next) => {
    setTestimonials(next);
    writeData("adimaya_testimonials", next);
    setMessage("Testimonial changes saved.");
  };

  const uploadImage = (e, setter) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2.5 * 1024 * 1024) return setMessage("Please use an image below 2.5 MB.");
    const reader = new FileReader();
    reader.onload = () => setter(reader.result);
    reader.readAsDataURL(file);
  };

  if (!logged) {
    return (
      <div className="admin-login-page">
        <div className="admin-login-card">
          <div className="admin-brand">ADIMAYA <span>GROUP</span></div>
          <div className="admin-role-badge">{details.label}</div>
          <h1>{details.title}</h1>
          <p>{details.description}</p>
          <form onSubmit={login}>
            <input autoFocus type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={`${details.label.toLowerCase()} email`} autoComplete="username" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" autoComplete="current-password" />
            <button>LOGIN TO {details.label} PANEL</button>
          </form>
          {message && <div className="admin-error">{message}</div>}
          <a href="/">← Back to website</a>
        </div>
      </div>
    );
  }

  const commonNav = [
    ["dashboard", "Dashboard", BarChart3],
    ["projects", "Projects", Building2],
    ["leads", "Enquiries", Users],
    ["system", "Website Info", Settings],
  ];
  const adminOnlyNav = [
    ["testimonials", "Testimonials", MessageSquareQuote],
    ["brochures", "Brochures", FileText],
  ];
  const nav = roleKey === "admin" ? [commonNav[0], commonNav[1], adminOnlyNav[0], commonNav[2], adminOnlyNav[1]] : commonNav;

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-logo">ADIMAYA <small>GROUP</small><span className="admin-sidebar-role">{details.label}</span></div>
        <nav>{nav.map(([id, label, Icon]) => <button key={id} className={tab === id ? "active" : ""} onClick={() => setTab(id)}><Icon size={17} />{label}</button>)}</nav>
        <button className="admin-logout" onClick={logout}><LogOut size={16} /> Logout</button>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div><span>{details.label} CONTROL CENTER</span><h1>{nav.find(x => x[0] === tab)?.[1]}</h1></div>
          <a href="/" className="admin-view-site">View Website ↗</a>
        </header>
        {message && <div className="admin-success">{message}<button onClick={() => setMessage("")}><X size={14} /></button></div>}

        {tab === "dashboard" && (
          <section className="admin-grid">
            <Stat icon={Building2} label="Projects" value={projects.length} />
            <Stat icon={Users} label="Enquiries" value={leads.length} />
            {roleKey === "admin" && <Stat icon={MessageSquareQuote} label="Testimonials" value={testimonials.length} />}
            {roleKey === "admin" && <Stat icon={FileText} label="Brochures" value={5} />}
            <div className="admin-panel admin-wide">
              <div className="admin-dashboard-heading"><div><h2>{roleKey === "admin" ? "Admin controls" : "Developer controls"}</h2><p>{roleKey === "admin" ? "Full website content and enquiry management." : "Safe day-to-day project and enquiry management without admin-only sections."}</p></div><span className="admin-access-chip">{details.label} ACCESS</span></div>
              <div className="quick-actions">
                <button onClick={() => { setTab("projects"); setProjectEdit({ ...emptyProject, id: crypto.randomUUID() }); }}><Plus /> Add Project</button>
                <button onClick={() => setTab("leads")}><Users /> View Enquiries</button>
                {roleKey === "admin" && <button onClick={() => setTab("brochures")}><Download /> Brochure Center</button>}
                {roleKey === "developer" && <button onClick={() => setTab("system")}><Settings /> Website Info</button>}
              </div>
            </div>
            {roleKey === "developer" && <DeveloperInfo />}
          </section>
        )}

        {tab === "projects" && (
          <section className="admin-panel">
            <div className="admin-panel-head"><div><h2>Project Management</h2><p>Update phase, progress, images, descriptions and brochure links.</p></div><button className="admin-primary" onClick={() => setProjectEdit({ ...emptyProject, id: crypto.randomUUID() })}><Plus size={16} /> Add Project</button></div>
            <div className="admin-table">{projects.map(p => <div className="admin-row" key={p.id}><div className="admin-project-thumb">{p.image ? <img src={p.image} alt="" /> : <ImagePlus size={18} />}</div><div><b>{p.title}</b><small>{p.location} · {p.type}</small></div><span className={`admin-pill ${p.phase}`}>{p.phase}</span><strong>{p.progress || 0}%</strong><div className="admin-row-actions"><button onClick={() => setProjectEdit(p)}><Pencil size={15} /></button>{roleKey === "admin" && <button onClick={() => saveProjects(projects.filter(x => x.id !== p.id))}><Trash2 size={15} /></button>}</div></div>)}</div>
          </section>
        )}

        {tab === "testimonials" && roleKey === "admin" && (
          <section className="admin-panel">
            <div className="admin-panel-head"><div><h2>Testimonials</h2><p>Manage client feedback shown on the website.</p></div><button className="admin-primary" onClick={() => setTestimonialEdit({ ...emptyTestimonial, id: crypto.randomUUID() })}><Plus size={16} /> Add Testimonial</button></div>
            {testimonials.map(t => <div className="admin-quote-row" key={t.id}><MessageSquareQuote /><div><b>{t.name}</b><small>{t.role}</small><p>“{t.quote}”</p></div><div className="admin-row-actions"><button onClick={() => setTestimonialEdit(t)}><Pencil size={15} /></button><button onClick={() => saveTestimonials(testimonials.filter(x => x.id !== t.id))}><Trash2 size={15} /></button></div></div>)}
          </section>
        )}

        {tab === "leads" && (
          <section className="admin-panel">
            <div className="admin-panel-head"><div><h2>Enquiry Inbox</h2><p>Project and brochure enquiries captured from the website.</p></div><button className="admin-secondary" onClick={() => { const blob = new Blob([JSON.stringify(leads, null, 2)], { type: "application/json" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "adimaya-enquiries.json"; a.click(); }}><Download size={16} /> Export</button></div>
            <div className="admin-leads">{leads.length ? leads.slice().reverse().map((l, i) => <div className="admin-lead" key={i}><div><b>{l.name || "Unknown"}</b><small>{l.project || "General enquiry"} · {l.submittedAt ? new Date(l.submittedAt).toLocaleString() : ""}</small></div><a href={`tel:${l.phone}`}>{l.phone || "—"}</a><a href={`mailto:${l.email}`}>{l.email || "—"}</a><p>{l.message || "Brochure request"}</p></div>) : <div className="admin-empty">No enquiries yet.</div>}</div>
          </section>
        )}

        {tab === "brochures" && roleKey === "admin" && (
          <section className="admin-panel">
            <div className="admin-panel-head"><div><h2>Brochure Center</h2><p>These brochure files are included in the website’s public folder.</p></div></div>
            <div className="brochure-admin-grid"><Brochure name="Grandeur Residency Brochure" file="/brochures/Grandeur-Residency-Brochure.pdf" /><Brochure name="Gravitas Residency Brochure" file="/brochures/Gravitas-Residency-Brochure.pdf" /><Brochure name="Gulmohar Residency Brochure (by Adimaya)" file="/brochures/Gulmohar-Residency-Brochure.pdf" /><Brochure name="Shubharambh Clara Brochure" file="/brochures/Shubharambh-Clara-Brochure.pdf" /><Brochure name="Adimaya Buildcon LLP Portfolio" file="/brochures/Adimaya-Buildcon-LLP-Portfolio.pdf" /></div>
            <div className="admin-note">For production, upload brochures through a backend/storage service so all admins and visitors receive the same updated file.</div>
          </section>
        )}

        {tab === "system" && roleKey === "developer" && <DeveloperInfo full />}
      </main>

      {projectEdit && <ProjectEditor value={projectEdit} onClose={() => setProjectEdit(null)} onSave={(value) => { const next = projects.some(x => x.id === value.id) ? projects.map(x => x.id === value.id ? value : x) : [...projects, value]; saveProjects(next); setProjectEdit(null); }} onImage={(img) => setProjectEdit({ ...projectEdit, image: img })} uploadImage={uploadImage} />}
      {testimonialEdit && roleKey === "admin" && <TestimonialEditor value={testimonialEdit} onClose={() => setTestimonialEdit(null)} onSave={(value) => { const next = testimonials.some(x => x.id === value.id) ? testimonials.map(x => x.id === value.id ? value : x) : [...testimonials, value]; saveTestimonials(next); setTestimonialEdit(null); }} />}
    </div>
  );
}

function Stat({ icon: Icon, label, value }) { return <div className="admin-stat"><Icon /><span>{label}</span><strong>{value}</strong></div>; }
function Brochure({ name, file }) { return <div className="brochure-admin-card"><FileText /><div><b>{name}</b><small>{file}</small></div><a href={file} target="_blank" rel="noreferrer"><Download size={15} /></a></div>; }
function DeveloperInfo({ full = false }) { return <div className={`admin-panel admin-developer-info ${full ? "admin-wide" : ""}`}><div className="admin-panel-head"><div><h2>Website & Developer Access</h2><p>Developer access is intentionally limited to operational website work.</p></div><Settings size={22} /></div><div className="admin-permission-grid"><div><b>✓ Projects</b><span>Add and edit projects, images, progress and descriptions.</span></div><div><b>✓ Enquiries</b><span>View enquiry details and export enquiry data.</span></div><div><b>✓ Website Info</b><span>Check the current frontend and project data setup.</span></div><div className="restricted"><b>🔒 Admin only</b><span>Delete projects, manage testimonials, brochure center and full administrative controls.</span></div></div></div>; }
function ProjectEditor({ value, onClose, onSave, onImage, uploadImage }) { const [form, setForm] = useState(value); const set = (k, v) => setForm({ ...form, [k]: v }); return <Modal title={value.title ? "Edit Project" : "Add Project"} onClose={onClose}><div className="admin-form-grid"><label>Project Title<input value={form.title} onChange={e => set("title", e.target.value)} /></label><label>Location<input value={form.location} onChange={e => set("location", e.target.value)} /></label><label>Phase<select value={form.phase} onChange={e => set("phase", e.target.value)}><option value="ongoing">Ongoing</option><option value="upcoming">Upcoming</option><option value="completed">Completed</option></select></label><label>Type<select value={form.type} onChange={e => set("type", e.target.value)}><option>Residential & Commercial</option><option>Contracting</option><option>Redevelopment</option><option>Land Development</option></select></label><label>Progress %<input type="number" min="0" max="100" value={form.progress || 0} onChange={e => set("progress", Number(e.target.value))} /></label><label>Brochure path<input value={form.brochure} onChange={e => set("brochure", e.target.value)} placeholder="/Your-Brochure.pdf" /></label><label className="admin-full">Description<textarea value={form.description} onChange={e => set("description", e.target.value)} /></label><label className="admin-full">Project image<input type="file" accept="image/*" onChange={e => uploadImage(e, onImage)} /></label></div>{form.image && <img className="admin-editor-preview" src={form.image} alt="Preview" />}<div className="admin-modal-actions"><button className="admin-secondary" onClick={onClose}>Cancel</button><button className="admin-primary" onClick={() => onSave(form)}><Save size={15} /> Save Project</button></div></Modal>; }
function TestimonialEditor({ value, onClose, onSave }) { const [form, setForm] = useState(value); return <Modal title={value.name ? "Edit Testimonial" : "Add Testimonial"} onClose={onClose}><div className="admin-form-grid"><label className="admin-full">Quote<textarea value={form.quote} onChange={e => setForm({ ...form, quote: e.target.value })} /></label><label>Name<input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></label><label>Role<input value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} /></label></div><div className="admin-modal-actions"><button className="admin-secondary" onClick={onClose}>Cancel</button><button className="admin-primary" onClick={() => onSave(form)}><Save size={15} /> Save Testimonial</button></div></Modal>; }
function Modal({ title, onClose, children }) { return <div className="admin-modal-bg"><div className="admin-modal"><button className="admin-modal-close" onClick={onClose}><X /></button><h2>{title}</h2>{children}</div></div>; }
