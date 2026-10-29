"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";

// Sticky bottom-right "start a project" button that appears after scrolling
// past the hero (BizzClan-style floating contact bubble).
export default function FloatingCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      className={`fab ${show ? "show" : ""}`}
      href="#contact"
      aria-label="Start a project"
    >
      <Icon name="spark" style={{ width: 18, height: 18 }} />
      <span className="fab-label">Start a project</span>
    </a>
  );
}
