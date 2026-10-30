"use client";

import Icon from "./Icon";
import { useContent } from "@/lib/useContent";

export default function About() {
  const a = useContent("about");
  const contact = useContent("contact");

  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="wrap">
        <div className="about-grid">
          <div className="about-main" data-fx>
            <span className="eyebrow"><Icon name="spark" /> {a.eyebrow}</span>
            <h2 className="section-title" id="about-title">{a.title}</h2>
            {a.paragraphs?.map((p, i) => (
              <p className="about-p" key={i}>{p}</p>
            ))}
          </div>
          <aside className="about-side" data-fx>
            <div className="about-fact">
              <Icon name="pin" />
              <div>
                <div className="af-label">Based in</div>
                <div className="af-value">{contact.location}</div>
              </div>
            </div>
            <div className="about-fact">
              <Icon name="layers" />
              <div>
                <div className="af-label">What we are</div>
                <div className="af-value">Full-stack product studio</div>
              </div>
            </div>
            <div className="about-fact">
              <Icon name="grad" />
              <div>
                <div className="af-label">We also</div>
                <div className="af-value">Teach and grow developers in Nepal</div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
