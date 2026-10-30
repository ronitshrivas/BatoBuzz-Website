"use client";

import Icon from "./Icon";
import { useContent } from "@/lib/useContent";

export default function Services() {
  const s = useContent("services");

  return (
    <section className="section section-ink has-wave" id="services" aria-labelledby="services-title">
      <div className="glow" />
      <div className="wrap above">
        <div className="section-head center" data-fx>
          <span className="eyebrow eyebrow-center">
            <Icon name="layers" /> {s.eyebrow}
          </span>
          <h2 className="section-title" id="services-title">{s.title}</h2>
          <p className="lead">{s.lead}</p>
        </div>

        <div className="grid grid-4">
          {s.items?.map((it, i) => (
            <article className="card work-card sector-card" key={i} data-fx>
              <span className="sector-icon">
                <Icon name={it.icon || "spark"} />
              </span>
              <h3 className="card-title">{it.title}</h3>
              <p className="card-text">{it.text}</p>
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
