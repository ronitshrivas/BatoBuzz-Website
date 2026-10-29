// NOTE: stat numbers are PLACEHOLDERS — update them to reflect real figures.
const STATS = [
  { num: "9+", label: "Apps & platforms" },
  { num: "5", label: "Core tech stacks" },
  { num: "2", label: "Countries served" },
  { num: "100%", label: "Built in-house" },
];

export default function Stats() {
  return (
    <section className="stats" aria-label="At a glance">
      <div className="wrap">
        {STATS.map((s) => (
          <div className="stat" key={s.label}>
            <div className="num">{s.num}</div>
            <div className="label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
