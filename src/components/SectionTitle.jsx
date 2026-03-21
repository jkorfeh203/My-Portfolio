export default function SectionTitle({ label, number }) {
  return (
    <div style={{ position: "relative", marginBottom: 56 }}>
      {/* Ghost watermark text — behind everything */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          transform: "translateY(-50%)",
          fontFamily: "'Outfit', sans-serif",
          fontSize: "clamp(64px, 9vw, 110px)",
          fontWeight: 900,
          color: "transparent",
          WebkitTextStroke: "1px rgba(var(--accent-rgb),0.07)",
          letterSpacing: -2,
          textTransform: "uppercase",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </div>

      {/* Actual heading row */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, position: "relative", zIndex: 1 }}>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            color: "var(--accent)",
            letterSpacing: 2,
          }}
        >
          {String(number).padStart(2, "0")}
        </span>
        <div
          style={{
            width: 40,
            height: 1,
            background: "linear-gradient(90deg, var(--accent), transparent)",
          }}
        />
        <h2
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(26px, 3.5vw, 40px)",
            fontWeight: 800,
            color: "var(--text-primary)",
            letterSpacing: -1,
            margin: 0,
            textTransform: "uppercase",
          }}
        >
          {label}
        </h2>
      </div>
    </div>
  );
}
