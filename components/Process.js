import Icon from "./Icon";
import Wave from "./Wave";

const STEPS = [
  { num: "01", icon: "search", title: "Discover", text: "We dig into the idea, the users, and the constraints — and research what already exists before writing code." },
  { num: "02", icon: "pen", title: "Prototype", text: "You see it before we build it. A working prototype aligns everyone on scope and feel early." },
  { num: "03", icon: "rocket", title: "Build", text: "We ship in increments with weekly check-ins, so progress is visible and direction stays yours." },
  { num: "04", icon: "wrench", title: "Deploy & maintain", text: "CI/CD pipelines, monitoring, and ongoing support — we stay on after launch to keep it healthy." },
];

export default function Process({ wave = "bg" }) {
  return (
    <section className="section-ink section has-wave" aria-labelledby="process-title">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">How we work</span>
          <h2 className="section-title" id="process-title">
            From idea to a product you can trust
          </h2>
          <p className="lead">
            A simple, transparent path — the same one we use on our own
            products.
          </p>
        </div>
        <div className="grid grid-2">
          {STEPS.map((s) => (
            <div className="card process-card" key={s.num}>
              <span className="step-num">{s.num}</span>
              <div className="card-title">{s.title}</div>
              <p className="card-text">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
      <Wave to={wave} />
    </section>
  );
}
