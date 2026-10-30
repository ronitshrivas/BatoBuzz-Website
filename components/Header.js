"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Icon from "./Icon";
import { useContent } from "@/lib/useContent";
import { useModal } from "./ModalProvider";

export default function Header() {
  const brand = useContent("brand");
  const services = useContent("services");
  const { openSchedule } = useModal();

  const [theme, setTheme] = useState("dark");
  const [open, setOpen] = useState(false);
  const [acc, setAcc] = useState(null);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const hidden = pathname?.startsWith("/admin");

  useEffect(() => {
    setMounted(true);
    setTheme(document.documentElement.getAttribute("data-theme") || "dark");
  }, []);
  useEffect(() => { setOpen(false); setAcc(null); }, [pathname]);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("bb-theme", next); } catch (e) {}
  }

  if (hidden) return null;

  const serviceItems = (services.items || []).slice(0, 8);
  const work = [
    { label: "Projects", href: "/#projects", desc: "Work we have designed and shipped" },
    { label: "Success stories", href: "/#success", desc: "Results from real products" },
    { label: "Our products", href: "/#products", desc: "myBaato and myBaato Merchant" },
  ];
  const who = [
    { label: "About us", href: "/#about", desc: "Who we are and how we work" },
    { label: "Our team", href: "/#team", desc: "The people behind BatoBuzz" },
    { label: "Careers", href: "/#careers", desc: "Join us or send your CV" },
  ];

  return (
    <header className="header">
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="wrap">
        <div className="bar">
          <a className="brand" href="/" aria-label={`${brand.name} - home`}>
            <img className="brand-logo" src="/logo-mark.png" alt={brand.name} width="38" height="40" />
            <span className="brand-text">
              <span className="brand-name">{brand.name}</span>
              <span className="brand-sub">{brand.sub}</span>
            </span>
          </a>

          <nav className="nav" aria-label="Primary">
            <div className="nav-item">
              <a className="nav-trigger" href="/#services">What we do <Icon name="chevron" /></a>
              <div className="nav-dropdown mega">
                <div className="mega-grid">
                  {serviceItems.map((s, i) => (
                    <a className="mega-link" href="/#services" key={i}>
                      <span className="mega-ico"><Icon name={s.icon || "spark"} /></span>
                      <span className="mega-text">
                        <span className="mega-title">{s.title}</span>
                        <span className="mega-desc">{s.text}</span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="nav-item">
              <a className="nav-trigger" href="/#projects">Our work <Icon name="chevron" /></a>
              <div className="nav-dropdown">
                <div className="drop-list">
                  {work.map((w) => (
                    <a className="drop-link" href={w.href} key={w.href}>
                      <span className="mega-text">
                        <span className="mega-title">{w.label}</span>
                        <span className="mega-desc">{w.desc}</span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="nav-item">
              <a className="nav-trigger" href="/#about">Who we are <Icon name="chevron" /></a>
              <div className="nav-dropdown">
                <div className="drop-list">
                  {who.map((w) => (
                    <a className="drop-link" href={w.href} key={w.href}>
                      <span className="mega-text">
                        <span className="mega-title">{w.label}</span>
                        <span className="mega-desc">{w.desc}</span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <a className="nav-trigger solo" href="/#contact">Contact</a>
          </nav>

          <div className="header-actions">
            <button className="theme-toggle" onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} title="Toggle theme">
              {mounted && <Icon name={theme === "dark" ? "sun" : "moon"} />}
            </button>
            <button className="btn btn-primary schedule-btn" onClick={openSchedule}>
              Schedule Call <Icon name="arrow" />
            </button>
            <button className="hamburger" onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu" aria-expanded={open}>
              <Icon name={open ? "close" : "menu"} />
            </button>
          </div>
        </div>

        <nav className={`mobile-nav ${open ? "open" : ""}`} aria-label="Mobile">
          <button className={`m-acc ${acc === "do" ? "open" : ""}`} onClick={() => setAcc(acc === "do" ? null : "do")}>
            What we do <Icon name="chevron" />
          </button>
          {acc === "do" && <div className="m-sub">{serviceItems.map((s, i) => <a key={i} href="/#services">{s.title}</a>)}</div>}

          <button className={`m-acc ${acc === "work" ? "open" : ""}`} onClick={() => setAcc(acc === "work" ? null : "work")}>
            Our work <Icon name="chevron" />
          </button>
          {acc === "work" && <div className="m-sub">{work.map((w) => <a key={w.href} href={w.href}>{w.label}</a>)}</div>}

          <button className={`m-acc ${acc === "who" ? "open" : ""}`} onClick={() => setAcc(acc === "who" ? null : "who")}>
            Who we are <Icon name="chevron" />
          </button>
          {acc === "who" && <div className="m-sub">{who.map((w) => <a key={w.href} href={w.href}>{w.label}</a>)}</div>}

          <a href="/#contact">Contact</a>
          <button className="btn btn-primary" onClick={() => { setOpen(false); openSchedule(); }}>
            Schedule Call <Icon name="arrow" />
          </button>
        </nav>
      </div>
    </header>
  );
}
