import Wave from "./Wave";

const PROJECTS = [
  { num: "01", name: "Secure Officer Vault", sector: "Defence", stack: ".NET 7 · PostgreSQL · Flutter" },
  { num: "02", name: "Grow With Roja", sector: "Coaching", stack: "Next.js 14 · Firebase" },
  { num: "03", name: "OrderBoard", sector: "Trading", stack: "Flutter · Real-time" },
  { num: "04", name: "AdvertTech", sector: "Nigeria", stack: "Flutter · Node.js" },
  { num: "05", name: "Becky Pinder Yoga", sector: "Web", stack: "Next.js · Vercel" },
];

export default function Projects() {
  return (
    <section className="section-ink section has-wave" aria-labelledby="projects-title">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Selected work</span>
          <h2 className="section-title" id="projects-title">
            Projects we&apos;ve delivered
          </h2>
          <p className="lead">
            A sample across sectors and stacks — client platforms and products
            we have taken to real users.
          </p>
        </div>
        <div>
          {PROJECTS.map((p) => (
            <div className="project-row" key={p.num}>
              <span className="pr-num">{p.num}</span>
              <div className="pr-main">
                <div className="pr-name">{p.name}</div>
                <div className="pr-stack">{p.stack}</div>
              </div>
              <div className="pr-right">
                <span className="badge badge-sector">{p.sector}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Wave to="bg" />
    </section>
  );
}
