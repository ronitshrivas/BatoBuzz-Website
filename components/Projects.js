"use client";

import Icon from "./Icon";
import Carousel from "./Carousel";
import { useContent } from "@/lib/useContent";

function Card({ it }) {
  const inner = (
    <>
      <div className="pc-top">
        <span className="badge badge-sector">{it.category}</span>
        {it.url ? <span className="pc-link"><Icon name="external" /></span> : null}
      </div>
      {it.image ? (
        <div className="pc-logo"><img src={it.image} alt={it.name} loading="lazy" /></div>
      ) : null}
      <h3 className="card-title pc-name">{it.name}</h3>
      <div className="role">{it.role}</div>
      <p className="card-text">{it.description}</p>
      {it.outcome ? (
        <div className="pc-outcome"><span className="cb-label">Outcome</span><p className="cb-text">{it.outcome}</p></div>
      ) : null}
      {it.tags?.length ? (
        <div className="chip-row">{it.tags.slice(0, 4).map((t, j) => <span className="chip" key={j}>{t}</span>)}</div>
      ) : null}
    </>
  );
  return it.url ? (
    <a className="scroll-card linkable" href={it.url} target="_blank" rel="noopener noreferrer">{inner}</a>
  ) : (
    <article className="scroll-card">{inner}</article>
  );
}

export default function Projects() {
  const p = useContent("projects");
  return (
    <section className="section section-ink has-wave sec-carousel" id="projects" aria-labelledby="projects-title">
      <div className="glow" />
      <div className="wrap above">
        <div className="section-head center">
          <span className="eyebrow eyebrow-center"><Icon name="rocket" /> {p.eyebrow}</span>
          <h2 className="section-title" id="projects-title">{p.title}</h2>
          <p className="lead">{p.lead}</p>
        </div>
      </div>
      <Carousel items={p.items} renderItem={(it, i) => <Card it={it} key={i} />} />
      <div className="wave">
        <svg viewBox="0 0 1440 72" preserveAspectRatio="none">
          <path className="fill-bg" d="M0,40 C240,72 480,8 720,28 C960,48 1200,72 1440,38 L1440,72 L0,72 Z" />
        </svg>
      </div>
    </section>
  );
}
