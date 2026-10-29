import Icon from "./Icon";

const LINKS = [
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Projects", href: "/projects" },
  { label: "Career", href: "/career" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="section-ink footer">
      <div className="wrap">
        <div className="footer-top">
          <a className="foot-brand" href="/" aria-label="BatoBuzz Software — home">
            <img
              className="brand-logo"
              src="/logo-mark.png"
              alt="BatoBuzz"
              width="34"
              height="36"
            />
            <span className="brand-text">
              <span className="brand-name">BatoBuzz Software</span>
              <span className="brand-sub">Batobaj Technology · Tulsipur, Nepal</span>
            </span>
          </a>
          <nav className="footer-links" aria-label="Footer">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
          <a
            className="foot-gh"
            href="https://github.com/ronitshrivas"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Icon name="github" />
          </a>
        </div>
        <div className="footer-bottom">
          <span className="copy">© {year} Batobaj Technology</span>
          <span className="tagline">
            Flutter · .NET · Firebase · Next.js — built in Nepal.
          </span>
        </div>
      </div>
    </footer>
  );
}
