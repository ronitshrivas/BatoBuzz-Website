import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import Icon from "@/components/Icon";

export const metadata = {
  title: "Career — BatoBuzz Software",
  description:
    "Build real production software with BatoBuzz Software in Tulsipur, Nepal. Full-stack exposure, real ownership, and a remote-friendly team.",
};

const PERKS = [
  { icon: "layers", title: "Full-stack exposure", text: "Work across mobile, web, and backend on real products — not one narrow slice." },
  { icon: "rocket", title: "Real ownership", text: "Ship features that reach real users, and own them end to end." },
  { icon: "web", title: "Remote-friendly", text: "We collaborate with people across Nepal and abroad, with flexible ways of working." },
  { icon: "grad", title: "Mentorship & growth", text: "Learn from hands-on reviews and the same workshops we run for the community." },
];

// Open roles. Add objects here to list positions, e.g.
// { title: "Flutter Engineer", type: "Full-time · Tulsipur / Remote" }
const ROLES = [];

export default function CareerPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Careers"
        title="Build real products with us"
        subtitle="We're a small, full-stack team in Nepal shipping software that real businesses depend on."
      />

      <section className="section">
        <div className="wrap">
          <div className="section-head center">
            <span className="eyebrow">Why join</span>
            <h2 className="section-title">What you get here</h2>
          </div>
          <div className="grid grid-2">
            {PERKS.map((p) => (
              <div className="card" key={p.title}>
                <span className="sector-icon">
                  <Icon name={p.icon} />
                </span>
                <div className="card-title" style={{ marginTop: 16 }}>
                  {p.title}
                </div>
                <p className="card-text">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-ink section">
        <div className="wrap">
          <div className="section-head center">
            <span className="eyebrow">Open roles</span>
            <h2 className="section-title">Positions</h2>
          </div>
          {ROLES.length > 0 ? (
            <div className="faq-list">
              {ROLES.map((r) => (
                <div className="faq-item role-row" key={r.title}>
                  <div>
                    <div className="card-title">{r.title}</div>
                    <div className="rr-type">{r.type}</div>
                  </div>
                  <a className="btn btn-ghost" href="/#contact">
                    Apply
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span className="es-icon">
                <Icon name="spark" />
              </span>
              <p className="lead" style={{ marginBottom: 20 }}>
                No open roles right now — but we're always keen to meet talented
                developers. Send us your work and we'll keep you in mind.
              </p>
              <a className="btn btn-primary" href="/#contact">
                Introduce yourself
                <Icon name="arrow" />
              </a>
            </div>
          )}
        </div>
      </section>

      <CtaBand
        title="Think you'd be a good fit?"
        text="Tell us what you've built and how you like to work — we'd love to hear from you."
      />
    </main>
  );
}
