"use client";

import Icon from "./Icon";
import Carousel from "./Carousel";
import { useContent } from "@/lib/useContent";

function StoryCard({ it }) {
  const inner = (
    <>
      <div className="story-logo-wrap">
        {it.image ? (
          <img className="story-logo" src={it.image} alt={it.client} loading="lazy" />
        ) : (
          <span className="story-logo-fallback">{(it.client || "?").charAt(0)}</span>
        )}
        {it.url ? <span className="pc-link light"><Icon name="external" /></span> : null}
      </div>
      <div className="story-client">{it.client}</div>
      <h3 className="card-title">{it.title}</h3>
      {it.story ? <p className="card-text">{it.story}</p> : null}
      {it.result ? (
        <div className="story-result"><span className="cb-label">Result</span><p className="cb-text">{it.result}</p></div>
      ) : null}
    </>
  );
  return it.url ? (
    <a className="success-card linkable" href={it.url} target="_blank" rel="noopener noreferrer">{inner}</a>
  ) : (
    <article className="success-card">{inner}</article>
  );
}

export default function SuccessStories() {
  const s = useContent("successStories");
  if (!s?.items?.length) return null;
  return (
    <section className="section sec-carousel" id="success" aria-labelledby="success-title">
      <div className="wrap">
        <div className="section-head center">
          <span className="eyebrow eyebrow-center"><Icon name="spark" /> {s.eyebrow}</span>
          <h2 className="section-title" id="success-title">{s.title}</h2>
          <p className="lead">{s.lead}</p>
        </div>
      </div>
      <Carousel items={s.items} renderItem={(it, i) => <StoryCard it={it} key={i} />} />
    </section>
  );
}
