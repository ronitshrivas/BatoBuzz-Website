import Icon from "./Icon";

// Reusable closing call-to-action band for inner pages.
export default function CtaBand({
  title = "Have a project in mind? Let's talk.",
  text = "Tell us what you're building and we'll tell you how we'd approach it. The first consultation is free.",
}) {
  return (
    <section className="section-ink section cta-band">
      <div className="glow" />
      <div className="wrap above" style={{ textAlign: "center" }}>
        <h2 className="section-title" style={{ margin: "0 auto 12px" }}>
          {title}
        </h2>
        <p className="lead" style={{ maxWidth: "52ch", margin: "0 auto 26px" }}>
          {text}
        </p>
        <a className="btn btn-primary" href="/#contact">
          Start a project
          <Icon name="arrow" />
        </a>
      </div>
    </section>
  );
}
