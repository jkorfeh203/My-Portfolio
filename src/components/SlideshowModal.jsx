import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function SlideshowModal({ item, onClose }) {
  const [index, setIndex]   = useState(0);
  const [fading, setFading] = useState(false);

  const images = item.images;
  const total  = images.length;

  const goTo = useCallback((next) => {
    if (fading || next === index) return;
    setFading(true);
    setTimeout(() => {
      setIndex(next);
      setFading(false);
    }, 220);
  }, [fading, index]);

  const prev = () => goTo((index - 1 + total) % total);
  const next = () => goTo((index + 1) % total);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, fading, onClose]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 8500,
        background: "rgba(2,1,0,0.95)",
        backdropFilter: "blur(6px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
      }}
    >
      {/* Header */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 900,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
          padding: "0 4px",
        }}
      >
        <div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>
            {item.label}
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "var(--text-dim)", marginTop: 2 }}>
            {item.caption}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {total > 1 && (
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "var(--accent)" }}>
              {index + 1} / {total}
            </span>
          )}
          <button
            onClick={onClose}
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              border: "1px solid rgba(var(--accent-rgb),0.3)",
              background: "rgba(var(--accent-rgb),0.06)",
              color: "var(--text-muted)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(var(--accent-rgb),0.3)"; e.currentTarget.style.color = "var(--text-muted)"; }}
          >
            <X size={12} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Image area */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 900,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
        }}
      >
        {/* Prev arrow */}
        {total > 1 && (
          <button
            onClick={prev}
            style={{
              width: 44, height: 44, borderRadius: "50%",
              border: "1px solid rgba(var(--accent-rgb),0.3)",
              background: "rgba(var(--bg-rgb),0.85)", color: "var(--accent)",
              cursor: "pointer", display: "flex", alignItems: "center",
              justifyContent: "center", flexShrink: 0, transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(var(--accent-rgb),0.12)"; e.currentTarget.style.borderColor = "var(--accent)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(var(--bg-rgb),0.85)"; e.currentTarget.style.borderColor = "rgba(var(--accent-rgb),0.3)"; }}
          >
            <ChevronLeft size={16} strokeWidth={2.5} />
          </button>
        )}

        {/* Image or Video */}
        <div
          style={{
            flex: 1, maxHeight: "70vh", borderRadius: 12, overflow: "hidden",
            border: "1px solid rgba(var(--accent-rgb),0.12)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(var(--bg-rgb),0.9)",
          }}
        >
          {images[index].endsWith(".mp4") ? (
            <video
              key={images[index]}
              src={images[index]}
              controls
              autoPlay
              style={{
                width: "100%",
                maxHeight: "70vh",
                display: "block",
                opacity: fading ? 0 : 1,
                transition: "opacity 0.22s ease",
              }}
            />
          ) : (
            <img
              src={images[index]}
              alt={`${item.label} ${index + 1}`}
              style={{
                width: "100%",
                maxHeight: "70vh",
                objectFit: "contain",
                display: "block",
                opacity: fading ? 0 : 1,
                transition: "opacity 0.22s ease",
              }}
            />
          )}
        </div>

        {/* Next arrow */}
        {total > 1 && (
          <button
            onClick={next}
            style={{
              width: 44, height: 44, borderRadius: "50%",
              border: "1px solid rgba(var(--accent-rgb),0.3)",
              background: "rgba(var(--bg-rgb),0.85)", color: "var(--accent)",
              cursor: "pointer", display: "flex", alignItems: "center",
              justifyContent: "center", flexShrink: 0, transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(var(--accent-rgb),0.12)"; e.currentTarget.style.borderColor = "var(--accent)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(var(--bg-rgb),0.85)"; e.currentTarget.style.borderColor = "rgba(var(--accent-rgb),0.3)"; }}
          >
            <ChevronRight size={16} strokeWidth={2.5} />
          </button>
        )}
      </div>

      {/* Dot indicators */}
      {total > 1 && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{ display: "flex", gap: 7, marginTop: 20 }}
        >
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === index ? 20 : 7,
                height: 7,
                borderRadius: 4,
                border: "none",
                background: i === index ? "var(--dot-active, var(--accent))" : "var(--dot-inactive, rgba(var(--accent-rgb),0.2))",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: 0,
              }}
            />
          ))}
        </div>
      )}

      {/* Keyboard hint */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: "var(--text-faint)",
          marginTop: 16,
          letterSpacing: 0.5,
        }}
      >
        ← → navigate · ESC close
      </div>
    </div>
  );
}
