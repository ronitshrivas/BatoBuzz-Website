import Icon from "./Icon";
import Wave from "./Wave";

const TRUST = [
  { icon: "layers", text: "9+ apps shipped" },
  { icon: "pin", text: "Nepal & abroad" },
  { icon: "check", text: "Full-stack, in-house" },
];

export default function Hero() {
  return (
    <section className="section-ink hero2 has-wave" id="top">
      <div className="hero2-bg" />
      <div className="glow" />
      <div className="wrap above hero2-inner">
        <span className="eyebrow eyebrow-center">
          <Icon name="spark" style={{ width: 13, height: 13 }} />
          Full-stack software studio · Nepal
        </span>
        <h1>
          We build <span className="accent">production apps</span> end to end —
          mobile, web, and the backends behind them.
        </h1>
        <p className="hero2-lead">
          BatoBuzz Software is a full-stack development studio in Tulsipur,
          Nepal. From the first prototype to a deployed app your users rely on,
          we design, build, and maintain the whole thing — frontend, backend,
          and infrastructure.
        </p>
        <div className="hero2-cta">
          <a className="btn btn-primary" href="#contact">
            Discuss your project
            <Icon name="arrow" />
          </a>
          <a className="btn btn-ghost" href="#products">
            See our products
          </a>
        </div>
        <div className="hero2-trust">
          {TRUST.map((t) => (
            <span className="item" key={t.text}>
              <Icon name={t.icon} />
              {t.text}
            </span>
          ))}
        </div>
      </div>
      <a className="scroll-ind" href="#work" aria-label="Scroll to content">
        <span className="mouse">
          <span className="wheel" />
        </span>
      </a>
      <Wave to="surface" />
    </section>
  );
}
