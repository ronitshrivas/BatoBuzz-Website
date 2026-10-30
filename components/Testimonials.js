"use client";

import Icon from "./Icon";
import { useContent } from "@/lib/useContent";

export default function Testimonials() {
  const t = useContent("testimonials");
  if (!t?.items?.length) return null;

  return (
    <section className="section" id="testimonials" aria-labelledby="testi-title">
      <div className="wrap">
        <div className="section-head center">
          <span className="eyebrow eyebrow-center"><Icon name="spark" /> {t.eyebrow}</span>
          <h2 className="section-title" id="testi-title">{t.title}</h2>
          <p className="lead">{t.lead}</p>
        </div>
        <div className="grid grid-3">
          {t.items.map((it, i) => (
            <figure className="card testi-card" key={i}>
              <span className="testi-mark" aria-hidden="true">&ldquo;</span>
              <blockquote>{it.quote}</blockquote>
              <figcaption>
                <span className="testi-avatar">
                  {it.photo ? <img src={it.photo} alt={it.author} loading="lazy" /> : (it.author || "?").charAt(0)}
                </span>
                <span className="testi-who">
                  <span className="testi-author">{it.author}</span>
                  {it.role ? <span className="testi-role">{it.role}</span> : null}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
