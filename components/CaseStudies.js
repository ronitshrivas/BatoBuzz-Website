import Icon from "./Icon";
import Wave from "./Wave";

const CASES = [
  {
    icon: "shield",
    sector: "Defence",
    name: "Secure Officer Vault",
    challenge:
      "A national institution needed a hardened way to manage officer devices and endpoints with a strict, auditable trail.",
    did: "Built a security-management platform with device/endpoint management, two-factor auth, role-based access, and a tamper-evident hash-chain audit log, driven from a Flutter console.",
    outcome:
      "A locked-down platform where every privileged action is verified and permanently recorded.",
    stack: [".NET 7", "PostgreSQL", "Flutter"],
  },
  {
    icon: "cart",
    sector: "E-commerce",
    name: "SabMero",
    challenge:
      "Run a multi-vendor marketplace and repair service where many vendors sell, fulfil, and get paid out correctly.",
    did: "Delivered vendor KYC onboarding, commission and settlement payouts, QR-based payments, and push notifications across customer, vendor, and admin apps.",
    outcome:
      "A full marketplace where vendors self-onboard and settlements are handled without manual reconciliation.",
    stack: ["Flutter", ".NET 7", "PostgreSQL"],
  },
  {
    icon: "megaphone",
    sector: "Advertising",
    name: "AdvertTech",
    challenge:
      "An overseas client had an unfinished ad-business app and needed it taken to a launch-ready MVP.",
    did: "Picked up the existing foundation and built it into shippable Flutter apps over a Node.js backend, wiring in Meta, Google, and TikTok ad integrations.",
    outcome:
      "A launch-ready product the client could take to market, built on a maintainable codebase.",
    stack: ["Flutter", "Node.js", "Ad APIs"],
  },
];

export default function CaseStudies() {
  return (
    <section
      className="section has-wave"
      id="case-studies"
      aria-labelledby="cases-title"
    >
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Case studies</span>
          <h2 className="section-title" id="cases-title">
            A closer look at what we&apos;ve shipped
          </h2>
          <p className="lead">
            Three projects that show how we take something ambiguous and turn it
            into software people depend on.
          </p>
        </div>
        <div className="grid grid-3">
          {CASES.map((c) => (
            <article className="card case-card" key={c.name}>
              <div className="case-head">
                <span className="sector-icon">
                  <Icon name={c.icon} />
                </span>
                <div>
                  <span className="badge badge-sector">{c.sector}</span>
                  <div className="card-title" style={{ marginTop: 6 }}>
                    {c.name}
                  </div>
                </div>
              </div>
              <div>
                <div className="case-block">
                  <div className="cb-label">Challenge</div>
                  <div className="cb-text">{c.challenge}</div>
                </div>
                <div className="case-block">
                  <div className="cb-label">What we did</div>
                  <div className="cb-text">{c.did}</div>
                </div>
                <div className="case-block outcome">
                  <div className="cb-label">Outcome</div>
                  <div className="cb-text">{c.outcome}</div>
                </div>
              </div>
              <div className="chip-row">
                {c.stack.map((s) => (
                  <span className="chip" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
      <Wave to="ink" />
    </section>
  );
}
