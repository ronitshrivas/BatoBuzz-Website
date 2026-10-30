"use client";

import { useEffect } from "react";

// Animates the stat numbers when they enter view. No content-hiding reveal
// (that previously fought with React re-renders and could blank out sections).
export default function ScrollFX() {
  useEffect(() => {
    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

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
    parsed.forEach(({ el, info }) => { if (info) el.textContent = info.prefix + "0" + info.suffix; });

    const countUp = (el, info) => {
      const dur = 1100, start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = info.prefix + Math.round(info.target * eased) + info.suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const hit = parsed.find((x) => x.el === e.target);
          if (hit && hit.info) countUp(hit.el, hit.info);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.6 });
    parsed.forEach(({ el }) => io.observe(el));
  }, []);

  return null;
}
