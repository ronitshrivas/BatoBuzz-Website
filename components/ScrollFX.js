"use client";

import { useEffect } from "react";

// Adds scroll-reveal animations to sections/cards and counts up the stat
// numbers when they enter view. Progressive enhancement: with JS off, or
// reduced-motion on, everything is simply shown at its final value.
export default function ScrollFX() {
  useEffect(() => {
    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---- reveal ----
    const nodes = Array.from(
      document.querySelectorAll(
        ".section-head, .card, .project-row, .stack-row, .stat, .faq-item, .hero2-inner > *"
      )
    );
    // stagger within each parent group
    const groups = new Map();
    nodes.forEach((el) => {
      el.setAttribute("data-fx", "");
      const key = el.parentElement;
      const i = groups.get(key) || 0;
      el.style.transitionDelay = (i % 8) * 55 + "ms";
      groups.set(key, i + 1);
    });
    document.body.classList.add("fx-ready");

    if (reduce) {
      nodes.forEach((el) => el.classList.add("fx-in"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("fx-in");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
      );
      nodes.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.92) el.classList.add("fx-in");
        else io.observe(el);
      });
    }

    // ---- counters ----
    const nums = Array.from(document.querySelectorAll(".stat .num"));
    const parse = (raw) => {
      const m = raw.match(/([\d,]+)/);
      if (!m) return null;
      return {
        prefix: raw.slice(0, m.index),
        target: parseInt(m[1].replace(/,/g, ""), 10),
        suffix: raw.slice(m.index + m[1].length),
      };
    };
    const parsed = nums.map((el) => ({ el, info: parse(el.textContent.trim()) }));

    if (!reduce) {
      parsed.forEach(({ el, info }) => {
        if (info) el.textContent = info.prefix + "0" + info.suffix;
      });
      const countUp = (el, info) => {
        const dur = 1100;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = Math.round(info.target * eased);
          el.textContent = info.prefix + val + info.suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      };
      const cio = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              const hit = parsed.find((x) => x.el === e.target);
              if (hit && hit.info) countUp(hit.el, hit.info);
              cio.unobserve(e.target);
            }
          });
        },
        { threshold: 0.6 }
      );
      parsed.forEach(({ el }) => cio.observe(el));
    }
  }, []);

  return null;
}
