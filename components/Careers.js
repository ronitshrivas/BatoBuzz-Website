"use client";

import { useState } from "react";
import Icon from "./Icon";
import Modal from "./Modal";
import { useContent } from "@/lib/useContent";
import { submitApplication, firebaseReady } from "@/lib/store";

export default function Careers() {
  const c = useContent("careers");
  const contact = useContent("contact");
  const jobs = c.jobs || [];
  const hasJobs = jobs.length > 0;

  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [cv, setCv] = useState(null);
  const [state, setState] = useState("idle");
  const [err, setErr] = useState("");

  function set(k, v) { setForm((f) => ({ ...f, [k]: v })); }

  function apply(jobTitle) {
    setRole(jobTitle || "");
    setForm({ name: "", email: "", message: "" });
    setCv(null);
    setState("idle");
    setErr("");
    setOpen(true);
  }

  async function submit(e) {
    e.preventDefault();
    setState("sending");
    setErr("");
    try {
      if (firebaseReady) {
        await submitApplication({ ...form, role, position: role || "General application" }, cv);
      } else {
        const body = `Name: ${form.name}%0AEmail: ${form.email}%0ARole: ${role}%0A%0A${form.message}%0A%0A(Please attach your CV to this email.)`;
        window.location.href = `mailto:${contact.email}?subject=Job application: ${encodeURIComponent(role || "General")}&body=${body}`;
      }
      setState("done");
    } catch (e2) {
      setErr(e2?.message || "Upload failed. Please email your CV to us instead.");
      setState("error");
    }
  }

  return (
    <section className="section" id="careers" aria-labelledby="careers-title">
      <div className="wrap">
        <div className="section-head center" data-fx>
          <span className="eyebrow eyebrow-center"><Icon name="briefcase" /> {c.eyebrow}</span>
          <h2 className="section-title" id="careers-title">{c.title}</h2>
          <p className="lead">{c.lead}</p>
        </div>

        {hasJobs ? (
          <div className="jobs-list">
            {jobs.map((j, i) => (
              <article className="job-row card" key={i} data-fx>
                <div className="job-main">
                  <h3 className="card-title">{j.title}</h3>
                  <div className="job-meta">
                    {j.type ? <span className="chip">{j.type}</span> : null}
                    {j.location ? <span className="chip">{j.location}</span> : null}
                  </div>
                  {j.description ? <p className="card-text">{j.description}</p> : null}
                </div>
                <button className="btn btn-primary" onClick={() => apply(j.title)}>
                  Apply now <Icon name="arrow" />
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="no-vacancy card" data-fx>
            <span className="es-icon"><Icon name="briefcase" /></span>
            <h3 className="card-title">{c.noVacancyTitle}</h3>
            <p className="card-text">{c.noVacancyText}</p>
            <button className="btn btn-primary" onClick={() => apply("")} style={{ marginTop: 18 }}>
              Send your CV <Icon name="upload" />
            </button>
          </div>
        )}
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={role ? `Apply: ${role}` : "Send us your CV"}
        subtitle="Tell us about yourself and attach your CV. We review every application."
      >
        {state === "done" ? (
          <div className="form-done">
            <span className="form-done-icon"><Icon name="check" /></span>
            <p>Thanks for applying. We have received your application and will be in touch if there is a fit.</p>
            <button className="btn btn-primary" onClick={() => setOpen(false)}>Close</button>
          </div>
        ) : (
          <form className="lead-form" onSubmit={submit}>
            <label className="fld">
              <span className="fld-label">Full name</span>
              <input type="text" required value={form.name} onChange={(e) => set("name", e.target.value)} />
            </label>
            <label className="fld">
              <span className="fld-label">Email</span>
              <input type="email" required value={form.email} onChange={(e) => set("email", e.target.value)} />
            </label>
            {!role && (
              <label className="fld">
                <span className="fld-label">Role you want to apply for</span>
                <input type="text" required value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Flutter Developer" />
              </label>
            )}
            <label className="fld">
              <span className="fld-label">CV / Resume {firebaseReady ? "(PDF or DOC)" : ""}</span>
              <input type="file" accept=".pdf,.doc,.docx" required={firebaseReady} onChange={(e) => setCv(e.target.files?.[0] || null)} />
              {!firebaseReady ? <span className="fld-hint">Attach your CV to the email that opens.</span> : null}
            </label>
            <label className="fld">
              <span className="fld-label">Message (optional)</span>
              <textarea rows={3} value={form.message} onChange={(e) => set("message", e.target.value)} />
            </label>
            {err ? <p className="danger-text">{err}</p> : null}
            <button className="btn btn-primary full-btn" type="submit" disabled={state === "sending"}>
              {state === "sending" ? "Submitting..." : "Submit application"}
              <Icon name="arrow" />
            </button>
          </form>
        )}
      </Modal>
    </section>
  );
}
