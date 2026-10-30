"use client";

import Icon from "./Icon";
import { useContent } from "@/lib/useContent";

function StoreButton({ kind, url, live }) {
  const isApple = kind === "apple";
  const badge = isApple ? "/badges/app-store.svg" : "/badges/google-play.svg";
  const label = isApple ? "App Store" : "Google Play";

  if (!live) {
    return (
      <span className="store-badge store-badge-soon" title={`${label}: coming soon`}>
        <img src={badge} alt="" width="160" height="48" />
        <span className="soon-tag">Coming soon</span>
      </span>
    );
  }
  return (
    <a className="store-badge" href={url || "#"} target="_blank" rel="noopener noreferrer" aria-label={`Get ${label}`}>
      <img src={badge} alt={`Get it on ${label}`} width="160" height="48" />
    </a>
  );
}

export default function Products() {
  const p = useContent("products");

  return (
    <section className="section" id="products" aria-labelledby="products-title">
      <div className="wrap">
        <div className="section-head center" data-fx>
          <span className="eyebrow eyebrow-center">
            <Icon name="mobile" /> {p.eyebrow}
          </span>
          <h2 className="section-title" id="products-title">{p.title}</h2>
          <p className="lead">{p.lead}</p>
        </div>

        <div className="grid grid-2">
          {p.items?.map((it, i) => (
            <article className="card product-card" key={i} data-fx>
              <div className="product-top">
                <div>
                  <h3 className="card-title">{it.name}</h3>
                  <div className="role">{it.role}</div>
                </div>
                <span className="product-glyph">
                  <Icon name="mobile" />
                </span>
              </div>
              <p className="card-text">{it.description}</p>

              {it.tags?.length ? (
                <div className="chip-row">
                  {it.tags.map((t, j) => (
                    <span className="chip" key={j}>{t}</span>
                  ))}
                </div>
              ) : null}

              <div className="store-row">
                <StoreButton kind="google" url={it.playStoreUrl} live={it.playStoreLive} />
                <StoreButton kind="apple" url={it.appStoreUrl} live={it.appStoreLive} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
