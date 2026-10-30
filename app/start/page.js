"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import { useContent } from "@/lib/useContent";
import { submitProjectInquiry, firebaseReady } from "@/lib/store";

const NEED_TYPES = [
  { icon: "spark", label: "I have a new project" },
  { icon: "wrench", label: "I need support for an existing product" },
  { icon: "grad", label: "I want a dedicated team alongside mine" },
];

const EXPECT = [
  { icon: "chart", title: "Walk away with", text: "An honest read on your project, the main risks, and a rough scope to act on." },
  { icon: "grad", title: "You speak with", text: "A senior developer and product thinker, not a salesperson." },
  { icon: "shield", title: "Your idea stays yours", text: "Happy to keep the first conversation confidential, standard practice." },
  { icon: "rocket", title: "No cost, no obligation", text: "If we are not the right fit, we will tell you and point you the right way." },
];

const STEPS = [
  { time: "~ 2 min", title: "You submit the form", text: "Just enough for us to come prepared and route you to the right person." },
  { time: "within a day", title: "We reply", text: "We get back to you to set up a time that works, by call or video." },
  { time: "~ 30 mins", title: "The call", text: "We talk through your idea, the shape of the build, and what it would take." },
  { time: "same week", title: "A clear next step", text: "Either a path to a proposal, or honest advice on where to go next." },
];

export default function StartProject() {
  const services = useContent("services");
  const contact = useContent("contact");
  const serviceOptions = (services.items || []).map((s) => s.title);

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", needType: "", details: "",
  });
  const [picked, setPicked] = useState([]);
  const [state, setState] = useState("idle");
  const [err, setErr] = useState("");

  function set(k, v) { setForm((f) => ({ ...f, [k]: v })); }
  function toggleService(name) {
    setPicked((p) => (p.includes(name) ? p.filter((x) => x !== name) : [...p, name]));
  }

  async function submit(e) {
    e.preventDefault();
    setState("sending"); setErr("");
    const payload = {
      name: `${form.firstName} ${form.lastName}`.trim(),
      ...form,
      services: picked,
    };
    try {
      if (firebaseReady) {
        await submitProjectInquiry(payload);
      } else {
        const body = `Name: ${payload.name}%0AEmail: ${form.email}%0APhone: ${form.phone}%0AType: ${form.needType}%0AServices: ${picked.join(", ")}%0A%0A${form.details}`;
        window.location.href = `mailto:${contact.email}?subject=Project inquiry&body=${body}`;
      }
      setState("done");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e2) {
      setErr(e2?.message || "Something went wrong. Please email us instead.");
      setState("error");
    }
  }

  return (
    <main id="main">
      <section className="section-ink start-hero">
        <div className="glow" />
        <div className="wrap above">
          <span className="eyebrow eyebrow-center"><Icon name="phone" /> Schedule a call</span>
          <h1 className="start-title">Let us talk about what you are building</h1>
          <p className="start-sub">
            Tell us a bit about your project and we will get back to you to set up a free
            30-minute call, a real conversation about your idea, not a sales pitch.
          </p>
        </div>
      </section>

      <section className="section start-body">
        <div className="wrap start-grid">
          <div className="start-form-wrap">
            {state === "done" ? (
              <div className="card start-done">
                <span className="form-done-icon"><Icon name="check" /></span>
                <h2 className="card-title">Thank you. Your request is in.</h2>
                <p className="card-text">We have received your details and will be in touch shortly to set up your call.</p>
                <a className="btn btn-primary" href="/">Back to home <Icon name="arrow" /></a>
              </div>
            ) : (
              <form className="card start-form" onSubmit={submit}>
                <div className="two-col">
                  <label className="fld"><span className="fld-label">First name *</span>
                    <input type="text" required value={form.firstName} onChange={(e) => set("firstName", e.target.value)} /></label>
                  <label className="fld"><span className="fld-label">Last name *</span>
                    <input type="text" required value={form.lastName} onChange={(e) => set("lastName", e.target.value)} /></label>
                </div>
                <div className="two-col">
                  <label className="fld"><span className="fld-label">Email *</span>
                    <input type="email" required value={form.email} onChange={(e) => set("email", e.target.value)} /></label>
                  <label className="fld"><span className="fld-label">Phone *</span>
                    <input type="tel" required value={form.phone} onChange={(e) => set("phone", e.target.value)} /></label>
                </div>

                <div className="fld">
                  <span className="fld-label">What best describes what you need? *</span>
                  <div className="radio-cards">
                    {NEED_TYPES.map((n) => (
                      <button type="button" key={n.label}
                        className={`radio-card ${form.needType === n.label ? "active" : ""}`}
                        onClick={() => set("needType", n.label)}>
                        <Icon name={n.icon} />
                        <span>{n.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="fld">
                  <span className="fld-label">What do you need help with?</span>
                  <span className="fld-hint">Select all that apply.</span>
                  <div className="check-chips">
                    {serviceOptions.map((s) => (
                      <button type="button" key={s}
                        className={`check-chip ${picked.includes(s) ? "active" : ""}`}
                        onClick={() => toggleService(s)}>
                        {picked.includes(s) ? <Icon name="check" /> : null} {s}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="fld"><span className="fld-label">Project details *</span>
                  <textarea rows={5} required value={form.details} onChange={(e) => set("details", e.target.value)}
                    placeholder="What are you building, and what would success look like?" /></label>

                {err ? <p className="danger-text">{err}</p> : null}
                <button className="btn btn-primary full-btn" type="submit" disabled={state === "sending"}>
                  {state === "sending" ? "Sending..." : "Request my call"} <Icon name="arrow" />
                </button>
              </form>
            )}
          </div>

          <aside className="start-aside">
            <h2 className="aside-title">What to expect</h2>
            <div className="expect-list">
              {EXPECT.map((e) => (
                <div className="expect-item" key={e.title}>
                  <span className="expect-ico"><Icon name={e.icon} /></span>
                  <div>
                    <div className="expect-h">{e.title}</div>
                    <p className="expect-t">{e.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="section section-ink">
        <div className="wrap">
          <div className="section-head center">
            <span className="eyebrow eyebrow-center">How it works</span>
            <h2 className="section-title">From form to first call</h2>
          </div>
          <div className="grid grid-4">
            {STEPS.map((s, i) => (
              <article className="card process-card" key={i}>
                <div className="step-num">{String(i + 1).padStart(2, "0")}</div>
                <div className="step-time">{s.time}</div>
                <h3 className="card-title">{s.title}</h3>
                <p className="card-text">{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
