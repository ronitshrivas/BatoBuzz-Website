"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Icon from "./Icon";
import { useModal } from "./ModalProvider";

// Sticky bottom-right "start a project" button that appears after scrolling
// past the hero (BizzClan-style floating contact bubble).
export default function FloatingCta() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  const { openSchedule } = useModal();
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <button
      className={`fab ${show ? "show" : ""}`}
      onClick={openSchedule}
      aria-label="Start a project"
    >
      <Icon name="spark" style={{ width: 18, height: 18 }} />
      <span className="fab-label">Start a project</span>
    </button>
  );
}
