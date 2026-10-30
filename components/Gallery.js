"use client";

import Icon from "./Icon";
import Carousel from "./Carousel";
import { useContent } from "@/lib/useContent";

export default function Gallery() {
  const g = useContent("gallery");
  if (!g?.items?.length) return null;
  return (
    <section className="section section-ink has-wave sec-carousel" id="gallery" aria-labelledby="gallery-title">
      <div className="wrap">
        <div className="section-head center">
          <span className="eyebrow eyebrow-center"><Icon name="spark" /> {g.eyebrow}</span>
          <h2 className="section-title" id="gallery-title">{g.title}</h2>
          <p className="lead">{g.lead}</p>
        </div>
      </div>
      <Carousel
        items={g.items}
        className="gallery-marquee"
        renderItem={(it, i) => (
          <figure className={`gallery-slide ${it.image ? "" : "no-img"}`} key={i}>
            {it.image ? (
              <img src={it.image} alt={it.caption || ""} loading="lazy" />
            ) : (
              <span className="gallery-placeholder"><Icon name="spark" /></span>
            )}
            {it.caption ? <figcaption>{it.caption}</figcaption> : null}
          </figure>
        )}
      />
      <div className="wave">
        <svg viewBox="0 0 1440 72" preserveAspectRatio="none">
          <path className="fill-bg" d="M0,38 C300,70 600,10 900,30 C1140,46 1290,60 1440,40 L1440,72 L0,72 Z" />
        </svg>
      </div>
    </section>
  );
}
