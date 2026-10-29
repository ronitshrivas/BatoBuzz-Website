import Icon from "./Icon";

const SERVICES = [
  {
    icon: "mobile",
    title: "Mobile app development",
    text: "Cross-platform apps that feel native, with clean state management and offline-aware flows.",
    stack: "Flutter · Dart · Riverpod",
  },
  {
    icon: "web",
    title: "Web development",
    text: "Fast, SEO-friendly marketing sites and web apps — server-rendered where it matters.",
    stack: "Next.js · React · Flutter Web",
  },
  {
    icon: "backend",
    title: "Backend engineering",
    text: "Server-authoritative APIs with the business logic, auth, and data integrity on the server.",
    stack: ".NET 7 · ASP.NET · Node.js",
  },
  {
    icon: "cloud",
    title: "Cloud & DevOps",
    text: "Containerised deploys, automated pipelines, and reverse proxies that keep things online.",
    stack: "Docker · CI/CD · nginx",
  },
  {
    icon: "security",
    title: "Security & platforms",
    text: "Token auth, two-factor, and role-based access built in from the first commit.",
    stack: "JWT · 2FA · RBAC",
  },
  {
    icon: "desktop",
    title: "Desktop & ERP tools",
    text: "Windows desktop utilities and ERP tooling with document and PDF generation.",
    stack: "Flutter Desktop · PDF",
  },
];

export default function Work() {
  return (
    <section className="section-ink section" id="work" aria-labelledby="work-title">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">What we do</span>
          <h2 className="section-title" id="work-title">
            Every kind of software work, under one roof
          </h2>
          <p className="lead">
            One team covering the whole surface — so your product stays coherent
            from the UI down to the database.
          </p>
        </div>
        <div className="grid grid-3">
          {SERVICES.map((s) => (
            <div className="card work-card" key={s.title}>
              <span className="sector-icon">
                <Icon name={s.icon} />
              </span>
              <div className="card-title" style={{ marginTop: 16 }}>
                {s.title}
              </div>
              <p className="card-text">{s.text}</p>
              <div className="chip-row" style={{ marginTop: 16 }}>
                <span className="chip">{s.stack}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
