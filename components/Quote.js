"use client";

import { useContent } from "@/lib/useContent";

export default function Quote() {
  const q = useContent("quote");
  if (!q?.text) return null;

  return (
    <section className="section quote-section" aria-label="Quote">
      <div className="wrap">
        <figure className="quote-block" data-fx>
          <span className="quote-mark" aria-hidden="true">&ldquo;</span>
          <blockquote>{q.text}</blockquote>
          <figcaption>
            <span className="quote-author">{q.author}</span>
            {q.role ? <span className="quote-role">{q.role}</span> : null}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
