"use client";

import Icon from "./Icon";
import { useContent } from "@/lib/useContent";

const HIGHLIGHTS = [
  { label: "Experience", text: "Production apps that real people use every single day." },
  { label: "Expertise", text: "Full-stack: mobile, web, backend, networking and IT." },
  { label: "Proven", text: "Live on the Google Play Store and the Apple App Store." },
];

export default function Credibility() {
  const c = useContent("credibility");

  return (
    <section className="section section-ink has-wave cred" id="why" aria-labelledby="why-title">
      <div className="glow" />
      <div className="wrap above">
        <div className="section-head center" data-fx>
          <span className="eyebrow eyebrow-center"><Icon name="spark" /> {c.eyebrow}</span>
          <h2 className="section-title cred-title" id="why-title">{c.title}</h2>
          <p className="lead">{c.lead}</p>
        </div>

        <div className="cred-highlights" data-fx>
          {HIGHLIGHTS.map((h, i) => (
            <div className="cred-hl" key={i}>
              <span className="cred-hl-label">{h.label}</span>
              <p className="cred-hl-text">{h.text}</p>
            </div>
          ))}
        </div>

        <div className="cred-grid">
          {c.points?.map((p, i) => (
            <article className="cred-card" key={i} data-fx>
              <div className="cred-card-top">
                <span className="cred-ico"><Icon name={p.icon || "spark"} /></span>
                <span className="cred-num">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="cred-card-title">{p.title}</h3>
              <p className="cred-card-text">{p.text}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="wave">
        <svg viewBox="0 0 1440 72" preserveAspectRatio="none">
          <path className="fill-bg" d="M0,36 C360,72 720,0 1080,28 C1260,42 1350,54 1440,40 L1440,72 L0,72 Z" />
        </svg>
      </div>
    </section>
  );
}
