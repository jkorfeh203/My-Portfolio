import { useRef, useState } from "react";
import { Children } from "react";

export default function MobileCarousel({ children }) {
  const scrollRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const items = Children.toArray(children);
  const total = items.length;
  const currentIndex = Math.min(Math.round(progress * (total - 1)), total - 1);

  const handleScroll = (e) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.target;
    const maxScroll = scrollWidth - clientWidth;
    setProgress(maxScroll > 0 ? scrollLeft / maxScroll : 0);
  };

  if (total === 0) return null;

  return (
    <div className="mobile-carousel-wrapper">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="mobile-carousel-track"
      >
        {items.map((child, i) => (
          <div key={i} className="mobile-carousel-slide">
            {child}
          </div>
        ))}
      </div>

      {/* Counter + progress bar */}
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: "var(--text-dim)",
          letterSpacing: 1.5,
        }}>
          {currentIndex + 1} / {total}
        </span>
        <div style={{
          width: 64,
          height: 2,
          background: "rgba(var(--accent-rgb),0.12)",
          borderRadius: 2,
          margin: "8px auto 0",
          overflow: "hidden",
        }}>
          <div style={{
            width: `${((currentIndex + 1) / total) * 100}%`,
            height: "100%",
            background: "var(--accent)",
            borderRadius: 2,
            transition: "width 0.2s ease",
          }} />
        </div>
      </div>
    </div>
  );
}
