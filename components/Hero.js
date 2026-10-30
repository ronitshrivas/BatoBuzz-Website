"use client";

import Icon from "./Icon";
import { useContent } from "@/lib/useContent";
import { useModal } from "./ModalProvider";

export default function Hero() {
  const hero = useContent("hero");
  const { openSchedule } = useModal();

  return (
    <section className="hero2 section-ink" aria-labelledby="hero-title">
      <div className="hero2-bg" />
      <div className="wrap hero2-inner">
        <div className="hero-badges">
          {hero.badges?.map((b, i) => (
            <span className="hero-badge" key={i}>
              <span className="dot" />
              {b}
            </span>
          ))}
        </div>

        <h1 id="hero-title">{hero.title}</h1>
        <p className="hero2-lead">{hero.lead}</p>

        <div className="hero2-cta">
          <button className="btn btn-primary" onClick={openSchedule}>
            {hero.primaryCta?.label || "Start a project"}
            <Icon name="arrow" />
          </button>
          <a className="btn btn-ghost" href={hero.secondaryCta?.href || "#projects"}>
            {hero.secondaryCta?.label || "View our work"}
          </a>
        </div>

        <div className="hero-chips">
          {hero.chips?.map((c, i) => (
            <span className="hero-chip" key={i}>
              {c.logo ? (
                <img src={c.logo} alt="" width="18" height="18" loading="lazy" />
              ) : null}
              {c.name}
            </span>
          ))}
        </div>

        <div className="hero-flow" aria-hidden="true">
          <span className="flow-node">Idea</span>
          <span className="flow-arrow"><Icon name="arrow" /></span>
          <span className="flow-node">Architecture</span>
          <span className="flow-arrow"><Icon name="arrow" /></span>
          <span className="flow-node">Build</span>
          <span className="flow-arrow"><Icon name="arrow" /></span>
          <span className="flow-node accent-node">Launch</span>
        </div>
      </div>

      <div className="wave">
        <svg viewBox="0 0 1440 72" preserveAspectRatio="none">
          <path
            className="fill-bg"
            d="M0,40 C240,80 480,0 720,24 C960,48 1200,80 1440,36 L1440,72 L0,72 Z"
          />
        </svg>
      </div>
    </section>
  );
}
