"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Icon from "./Icon";

// Top-level pages — edit labels/targets here.
const NAV = [
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Projects", href: "/projects" },
  { label: "Career", href: "/career" },
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  const [theme, setTheme] = useState("dark");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const current =
      document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(current);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("bb-theme", next);
    } catch (e) {}
  }

  const isActive = (href) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header className="header">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="wrap">
        <div className="bar">
          <a className="brand" href="/" aria-label="BatoBuzz Software — home">
            <img
              className="brand-logo"
              src="/logo-mark.png"
              alt="BatoBuzz"
              width="38"
              height="40"
            />
            <span className="brand-text">
              <span className="brand-name">BatoBuzz</span>
              <span className="brand-sub">Software · Batobaj Technology</span>
            </span>
          </a>

          <nav className="nav" aria-label="Primary">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                aria-current={isActive(n.href) ? "page" : undefined}
                className={isActive(n.href) ? "active" : undefined}
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              title="Toggle theme"
            >
              {mounted && <Icon name={theme === "dark" ? "sun" : "moon"} />}
            </button>
            <a className="btn btn-primary" href="/#contact">
              Start a project
            </a>
            <button
              className="hamburger"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <Icon name={open ? "close" : "menu"} />
            </button>
          </div>
        </div>

        <nav className={`mobile-nav ${open ? "open" : ""}`} aria-label="Mobile">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              aria-current={isActive(n.href) ? "page" : undefined}
            >
              {n.label}
            </a>
          ))}
          <a className="btn btn-primary" href="/#contact">
            Start a project
          </a>
        </nav>
      </div>
    </header>
  );
}
