"use client";

import { useEffect } from "react";

export default function RedirectPage() {
  useEffect(() => {
    window.location.replace("/#about");
  }, []);
  return (
    <main id="main" style={{ minHeight: "60vh", display: "grid", placeItems: "center" }}>
      <p style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}>
        Redirecting...
      </p>
    </main>
  );
}
