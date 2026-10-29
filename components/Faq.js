"use client";

import { useRef, useState } from "react";
import Wave from "./Wave";

// Honest Q&A about how the studio works — edit freely.
const FAQS = [
  {
    q: "What kind of software do you build?",
    a: "Full-stack products end to end: Flutter mobile apps, Next.js / React / Flutter web apps, and .NET 7 or Node.js backends, with PostgreSQL or Firebase/Firestore for data. We also build Windows desktop and ERP tooling.",
  },
  {
    q: "How does a project start?",
    a: "We begin with discovery — understanding the idea, the users, and the constraints — then build a working prototype so you can see and feel it before we commit to the full build.",
  },
  {
    q: "How do you run the build?",
    a: "In increments, with weekly check-ins. You see progress continuously and can adjust direction as we go, rather than waiting for one big reveal at the end.",
  },
  {
    q: "Do you work with clients outside Nepal?",
    a: "Yes. We've delivered work for clients abroad, including an advertising platform for an overseas client, and we collaborate remotely with founders and teams in different regions.",
  },
  {
    q: "How do you handle security?",
    a: "Security is built in from the first commit — token-based auth (JWT), two-factor (TOTP), role-based access control, and server-authoritative logic so critical decisions happen on the backend, not the client.",
  },
  {
    q: "Do you maintain the app after launch?",
    a: "Yes. We set up CI/CD pipelines and stay on after launch for monitoring, updates, and ongoing support to keep the product healthy.",
  },
  {
    q: "Who owns the code?",
    a: "You do. The codebase and all deliverables are yours.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(-1);
  const refs = useRef([]);

  return (
    <section className="section has-wave" id="faq" aria-labelledby="faq-title">
      <div className="wrap">
        <div className="section-head center">
          <span className="eyebrow">FAQ</span>
          <h2 className="section-title" id="faq-title">
            Frequently asked questions
          </h2>
          <p className="lead">
            A few things people usually want to know before starting.
          </p>
        </div>
        <div className="faq-list">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div className={`faq-item ${isOpen ? "open" : ""}`} key={f.q}>
                <button
                  className="faq-q"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  {f.q}
                  <span className="pm" aria-hidden="true">
                    +
                  </span>
                </button>
                <div
                  className="faq-a"
                  ref={(el) => (refs.current[i] = el)}
                  style={{
                    maxHeight: isOpen
                      ? (refs.current[i]?.scrollHeight || 500) + "px"
                      : 0,
                  }}
                >
                  <div className="faq-a-inner">{f.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Wave to="ink" />
    </section>
  );
}
