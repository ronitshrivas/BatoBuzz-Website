"use client";

// Seamless auto-scrolling carousel. Repeats items enough to always overflow
// the viewport, then renders two identical halves and animates by -50% so the
// loop is continuous (items that leave on the left reappear on the right).
export default function Carousel({ items, renderItem, className = "", speed = 6 }) {
  if (!items?.length) return null;
  const reps = Math.max(2, Math.ceil(8 / items.length));
  const half = Array.from({ length: reps }, () => items).flat();
  const loop = [...half, ...half];
  return (
    <div className={`marquee ${className}`} aria-label="Carousel">
      <div
        className="marquee-track"
        style={{ animationDuration: `${Math.max(18, half.length * speed)}s` }}
      >
        {loop.map((it, i) => renderItem(it, i))}
      </div>
    </div>
  );
}
