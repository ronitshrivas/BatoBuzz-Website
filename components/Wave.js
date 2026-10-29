// Curved divider placed at the bottom of a section. `to` is the background
// color of the NEXT section ("ink", "bg", or "surface") so the sections blend.
export default function Wave({ to = "bg" }) {
  const cls = to === "ink" ? "fill-ink" : to === "surface" ? "fill-surface" : "fill-bg";
  return (
    <div className="wave" aria-hidden="true">
      <svg viewBox="0 0 1440 72" preserveAspectRatio="none">
        <path
          className={cls}
          d="M0,32 C240,80 480,80 720,48 C960,16 1200,16 1440,40 L1440,72 L0,72 Z"
        />
      </svg>
    </div>
  );
}
