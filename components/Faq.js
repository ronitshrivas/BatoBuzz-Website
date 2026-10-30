"use client";

import { useState } from "react";
import { useContent } from "@/lib/useContent";

export default function Faq() {
  const faq = useContent("faq");
  const [open, setOpen] = useState(0);
  if (!faq?.items?.length) return null;

  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="wrap">
        <div className="section-head center" data-fx>
          <span className="eyebrow eyebrow-center">{faq.eyebrow}</span>
          <h2 className="section-title" id="faq-title">{faq.title}</h2>
        </div>

        <div className="faq-list">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div className={`faq-item ${isOpen ? "open" : ""}`} key={i} data-fx>
                <button
                  className="faq-q"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  {item.q}
                  <span className="pm" aria-hidden="true">+</span>
                </button>
                <div className="faq-a" style={{ maxHeight: isOpen ? "400px" : "0" }}>
                  <div className="faq-a-inner">{item.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
