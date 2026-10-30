"use client";

import { useContent } from "@/lib/useContent";

export default function Process() {
  const p = useContent("process");

  return (
    <section className="section section-ink" id="process" aria-labelledby="process-title">
      <div className="wrap">
        <div className="section-head center" data-fx>
          <span className="eyebrow eyebrow-center">{p.eyebrow}</span>
          <h2 className="section-title" id="process-title">{p.title}</h2>
          <p className="lead">{p.lead}</p>
        </div>

        <div className="grid grid-3">
          {p.steps?.map((s, i) => (
            <article className="card process-card" key={i} data-fx>
              <div className="step-num">{String(i + 1).padStart(2, "0")}</div>
              <div className="step-time">{s.time}</div>
              <h3 className="card-title">{s.title}</h3>
              <p className="card-text">{s.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
