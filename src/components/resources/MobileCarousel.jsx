import { useRef, useState, useEffect } from "react";
import { Children } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function MobileCarousel({ children }) {
  const scrollRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [hasSwiped, setHasSwiped] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const items = Children.toArray(children);
  const total = items.length;
  const currentIndex = Math.min(Math.round(progress * (total - 1)), total - 1);
  const isLast = currentIndex === total - 1;

  useEffect(() => {
    const track = scrollRef.current;
    if (!track || total <= 1) return;

    const check = () => {
      const firstSlide = track.querySelector(".mobile-carousel-slide");
      if (!firstSlide) return;
      // Show arrow only when next card is NOT visible (track barely wider than one slide)
      setShowArrow(track.clientWidth < firstSlide.offsetWidth * 1.15);
    };

    const raf = requestAnimationFrame(check);
    const ro = new ResizeObserver(check);
    ro.observe(track);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [total]);

  const handleScroll = (e) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.target;
    const maxScroll = scrollWidth - clientWidth;
    const newProgress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
    setProgress(newProgress);
    if (!hasSwiped && newProgress > 0.01) setHasSwiped(true);
  };

  if (total === 0) return null;

  const arrowStyle = {
    position: "absolute",
    top: "35%",
    background: "rgba(var(--accent-rgb),0.12)",
    border: "1px solid rgba(var(--accent-rgb),0.25)",
    borderRadius: "50%",
    width: 32,
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--accent)",
    pointerEvents: "none",
    animation: hasSwiped
      ? "none"
      : `${isLast ? "carouselNudgeLeft" : "carouselNudgeRight"} 1.2s ease-in-out infinite`,
    zIndex: 2,
  };

  return (
    <div className="mobile-carousel-wrapper">

      {/* Track wrapper — arrow is relative to this div, not the full carousel */}
      <div style={{ position: "relative" }}>
        {showArrow && (
          <div style={{ ...arrowStyle, [isLast ? "left" : "right"]: -12 }}>
            {isLast
              ? <ChevronLeft size={16} strokeWidth={2.5} />
              : <ChevronRight size={16} strokeWidth={2.5} />
            }
          </div>
        )}

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
      </div>

      {/* Counter + progress bar */}
      <div style={{ textAlign: "center", marginTop: 12 }}>
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
