"use client";

import { useContent } from "@/lib/useContent";

export default function Stats() {
  const stats = useContent("stats");
  if (!stats?.length) return null;

  return (
    <section className="stats" aria-label="By the numbers">
      <div className="wrap">
        {stats.map((s, i) => (
          <div className="stat" key={i}>
            <div className="num" data-count>{s.num}</div>
            <div className="label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
