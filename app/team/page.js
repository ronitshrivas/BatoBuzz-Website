import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import Icon from "@/components/Icon";

export const metadata = {
  title: "Team — BatoBuzz Software",
  description:
    "The disciplines behind BatoBuzz Software — mobile, web, backend, cloud, security, and design, all in-house.",
};

// Disciplines the team covers in-house.
const DISCIPLINES = [
  { icon: "mobile", title: "Mobile engineering", text: "Flutter apps for Android and iOS, with clean state management and offline-aware flows." },
  { icon: "web", title: "Web engineering", text: "Next.js, React, and Flutter Web — fast, SEO-friendly sites and web apps." },
  { icon: "backend", title: "Backend & APIs", text: "Server-authoritative APIs on .NET 7 and Node.js, with the logic where it belongs." },
  { icon: "cloud", title: "Cloud & DevOps", text: "Containerised deploys, CI/CD pipelines, and reverse proxies that keep things online." },
  { icon: "security", title: "Security", text: "JWT, 2FA, RBAC, and secure-by-default platform design from the first commit." },
  { icon: "spark", title: "Product & design", text: "UI/UX, prototyping, and the product thinking that keeps a build coherent." },
];

const WAYS = [
  "Small team, direct communication — you talk to the people building your product.",
  "Weekly check-ins and incremental delivery, so progress is always visible.",
  "Remote-friendly: we've worked with clients in Nepal and abroad.",
  "You own the code and all deliverables, always.",
];

// To list named people, fill this array (name, role, bio, optional initials)
// and render a grid below — e.g. { name: "Jane Doe", role: "Mobile Lead", bio: "..." }.
const MEMBERS = [];

export default function TeamPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Our team"
        title="The people behind the work"
        subtitle="A compact, full-stack team — the same people design the screens and build the backends."
      />

      <section className="section">
        <div className="wrap">
          <div className="section-head center">
            <span className="eyebrow">In-house disciplines</span>
            <h2 className="section-title">Everything under one roof</h2>
            <p className="lead">
              Rather than splitting work across vendors, we cover the whole stack
              ourselves — so nothing gets lost in the hand-off.
            </p>
          </div>
          <div className="grid grid-3">
            {DISCIPLINES.map((d) => (
              <div className="card work-card" key={d.title}>
                <span className="sector-icon">
                  <Icon name={d.icon} />
                </span>
                <div className="card-title" style={{ marginTop: 16 }}>
                  {d.title}
                </div>
                <p className="card-text">{d.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-ink section">
        <div className="wrap">
          <div className="section-head center">
            <span className="eyebrow">Ways of working</span>
            <h2 className="section-title">What it's like to work with us</h2>
          </div>
          <div className="check-list" style={{ maxWidth: 680, margin: "0 auto" }}>
            {WAYS.map((w) => (
              <div className="check-item" key={w}>
                <span className="tick">
                  <Icon name="check" />
                </span>
                <span className="ct">{w}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Want to meet the team?"
        text="Get in touch and we'll introduce the people who would work on your project."
      />
    </main>
  );
}
