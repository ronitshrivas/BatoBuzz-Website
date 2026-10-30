"use client";

import { useState } from "react";
import Icon from "./Icon";
import { useContent } from "@/lib/useContent";

function TechLogo({ name, logo }) {
  const [broken, setBroken] = useState(false);
  return (
    <div className="tech-item" title={name}>
      <div className="tech-logo">
        {logo && !broken ? (
          <img src={logo} alt={name} width="34" height="34" loading="lazy" onError={() => setBroken(true)} />
        ) : (
          <span className="tech-fallback">{name?.[0] || "?"}</span>
        )}
      </div>
      <span className="tech-name">{name}</span>
    </div>
  );
}

export default function TechStack() {
  const t = useContent("techStack");

  return (
    <section className="section" id="stack" aria-labelledby="stack-title">
      <div className="wrap">
        <div className="section-head center" data-fx>
          <span className="eyebrow eyebrow-center">
            <Icon name="layers" /> {t.eyebrow}
          </span>
          <h2 className="section-title" id="stack-title">{t.title}</h2>
          <p className="lead">{t.lead}</p>
        </div>

        <div className="tech-groups">
          {t.groups?.map((g, i) => (
            <div className="tech-group" key={i} data-fx>
              <div className="tech-group-label">{g.label}</div>
              <div className="tech-grid">
                {g.items?.map((it, j) => (
                  <TechLogo key={j} name={it.name} logo={it.logo} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
