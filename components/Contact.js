"use client";

import { useRef, useState } from "react";
import Icon from "./Icon";

// PLACEHOLDER email — replace with your real address.
const EMAIL = "hello@batobaj.tech";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const emailRef = useRef(null);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // Clipboard blocked — fall back to selecting the text so the user can copy manually.
      const el = emailRef.current;
      if (el) {
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  }

  return (
    <section className="section-ink section" id="contact" aria-labelledby="contact-title">
      <div className="glow" />
      <div className="wrap above">
        <div className="contact-grid">
          <div>
            <span className="eyebrow">Contact</span>
            <h2 className="section-title" id="contact-title">
              Have a project in mind? Let&apos;s talk.
            </h2>
            <p className="lead">
              Tell us what you&apos;re building and we&apos;ll tell you how
              we&apos;d approach it. The first consultation is free — no
              commitment, just a clear conversation about your idea.
            </p>
            <div className="hero-cta" style={{ marginTop: 28 }}>
              <a className="btn btn-primary" href={`mailto:${EMAIL}`}>
                Email us
                <Icon name="arrow" />
              </a>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-item">
              <span className="ci-icon">
                <Icon name="mail" />
              </span>
              <div className="ci-body">
                <div className="ci-label">Email</div>
                <div className="ci-value" ref={emailRef}>
                  {EMAIL}
                </div>
              </div>
              <button
                className={`copy-btn ${copied ? "copied" : ""}`}
                onClick={copyEmail}
                aria-label="Copy email address"
              >
                <Icon name={copied ? "check" : "copy"} />
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            <div className="contact-item">
              <span className="ci-icon">
                <Icon name="pin" />
              </span>
              <div className="ci-body">
                <div className="ci-label">Location</div>
                <div className="ci-value">Tulsipur, Lumbini, Nepal</div>
              </div>
            </div>

            <div className="contact-item">
              <span className="ci-icon">
                <Icon name="github" />
              </span>
              <div className="ci-body">
                <div className="ci-label">GitHub</div>
                <div className="ci-value">
                  <a
                    href="https://github.com/ronitshrivas"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    github.com/ronitshrivas
                  </a>
                </div>
              </div>
              <a
                className="copy-btn"
                href="https://github.com/ronitshrivas"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open GitHub in a new tab"
              >
                <Icon name="external" />
                Open
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
