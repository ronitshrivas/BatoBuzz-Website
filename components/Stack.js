// Each row: a category label + its chips. A chip marked `soon: true`
// renders dashed as an upcoming/"soon" capability.
import Wave from "./Wave";

const ROWS = [
  {
    label: "Mobile",
    items: [
      { t: "Flutter" }, { t: "Dart" }, { t: "Riverpod" }, { t: "GoRouter" },
      { t: "Dio" }, { t: "React Native · 2026", soon: true },
    ],
  },
  {
    label: "Web",
    items: [{ t: "Next.js 14" }, { t: "React" }, { t: "App Router / SSR" }, { t: "Flutter Web" }],
  },
  {
    label: "Backend",
    items: [
      { t: ".NET 7 / C#" }, { t: "ASP.NET Core" }, { t: "Node.js" },
      { t: "Express" }, { t: "EF Core" }, { t: "Firebase Cloud Functions" },
    ],
  },
  {
    label: "Data",
    items: [{ t: "PostgreSQL" }, { t: "Cloud Firestore" }, { t: "Firebase" }, { t: "Npgsql" }],
  },
  {
    label: "Cloud & DevOps",
    items: [
      { t: "Docker" }, { t: "GitHub Actions" }, { t: "DigitalOcean" },
      { t: "Railway" }, { t: "Firebase Hosting" }, { t: "Vercel" }, { t: "nginx" },
    ],
  },
  {
    label: "Security",
    items: [
      { t: "JWT" }, { t: "TOTP 2FA" }, { t: "RBAC" }, { t: "PBKDF2" },
      { t: "Google Auth" }, { t: "Biometric login" },
    ],
  },
  {
    label: "Services",
    items: [
      { t: "FCM Push" }, { t: "Brevo Email" }, { t: "QR Payments" },
      { t: "Python / FastAPI", soon: true },
    ],
  },
];

export default function Stack() {
  return (
    <section className="section has-wave" id="stack" aria-labelledby="stack-title">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Technology</span>
          <h2 className="section-title" id="stack-title">
            Every stack we work in
          </h2>
          <p className="lead">
            The tools we reach for, grouped by layer. Dashed items are coming
            online soon.
          </p>
        </div>
        <div>
          {ROWS.map((r) => (
            <div className="stack-row" key={r.label}>
              <div className="sr-label">{r.label}</div>
              <div className="chip-row">
                {r.items.map((it) => (
                  <span className={`chip ${it.soon ? "soon" : ""}`} key={it.t}>
                    {it.t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Wave to="ink" />
    </section>
  );
}
