"use client";

import Icon from "./Icon";
import { useContent } from "@/lib/useContent";

function initials(name) {
  return (name || "").split(" ").map((w) => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
}

export default function Team() {
  const t = useContent("team");
  // Hierarchical order: lower level number shows first.
  const members = [...(t.members || [])].sort((a, b) => (a.level || 99) - (b.level || 99));

  return (
    <section className="section" id="team" aria-labelledby="team-title">
      <div className="wrap">
        <div className="section-head center" data-fx>
          <span className="eyebrow eyebrow-center">{t.eyebrow}</span>
          <h2 className="section-title" id="team-title">{t.title}</h2>
          <p className="lead">{t.lead}</p>
        </div>

        <div className="team-grid">
          {members.map((m, i) => (
            <article className="card team-card" key={i} data-fx>
              <div className="team-card-top">
                <div className="team-avatar">
                  {m.photo ? <img src={m.photo} alt={m.name} loading="lazy" /> : <span>{initials(m.name)}</span>}
                </div>
                {m.linkedin ? (
                  <a className="team-linkedin" href={m.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} on LinkedIn`}>
                    <Icon name="linkedin" />
                  </a>
                ) : null}
              </div>
              <h3 className="card-title team-name">{m.name}</h3>
              <div className="role">{m.role}</div>
              {m.bio ? <p className="card-text">{m.bio}</p> : null}
              {m.tags?.length ? (
                <div className="chip-row">
                  {m.tags.map((tag, j) => (<span className="chip" key={j}>{tag}</span>))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
