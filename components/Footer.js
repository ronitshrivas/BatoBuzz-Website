"use client";

import { usePathname } from "next/navigation";
import { useContent } from "@/lib/useContent";

const LINKS = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Products", href: "/#products" },
  { label: "Projects", href: "/#projects" },
  { label: "Team", href: "/#team" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  const brand = useContent("brand");
  const contact = useContent("contact");
  const year = new Date().getFullYear();
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="section-ink footer">
      <div className="wrap">
        <div className="footer-top">
          <a className="foot-brand" href="/" aria-label={`${brand.name} - home`}>
            <img className="brand-logo" src="/logo-mark.png" alt={brand.name} width="34" height="36" />
            <span className="brand-text">
              <span className="brand-name">{brand.name} Technology</span>
              <span className="brand-sub">{contact.location}</span>
            </span>
          </a>
          <nav className="footer-links" aria-label="Footer">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </nav>
        </div>
        <div className="footer-bottom">
          <span className="copy">(c) {year} {brand.name} Technology</span>
        </div>
      </div>
    </footer>
  );
}
