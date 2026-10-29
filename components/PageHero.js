import Wave from "./Wave";

// Compact navy hero band for inner pages.
export default function PageHero({ eyebrow, title, subtitle }) {
  return (
    <section className="section-ink page-hero has-wave">
      <div className="glow" />
      <div className="wrap above page-hero-inner">
        {eyebrow && <span className="eyebrow eyebrow-center">{eyebrow}</span>}
        <h1>{title}</h1>
        {subtitle && <p className="page-hero-sub">{subtitle}</p>}
      </div>
      <Wave to="bg" />
    </section>
  );
}
