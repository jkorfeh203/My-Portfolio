export default function TimelineItem({ title, org, period, points, delay, visible }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 24,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s ease",
        transitionDelay: `${delay}ms`,
        position: "relative",
        paddingLeft: 28,
        paddingBottom: 36,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 6,
          width: 12,
          height: 12,
          borderRadius: "50%",
          border: "2px solid var(--accent)",
          background: "var(--bg)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 5,
          top: 18,
          width: 2,
          height: "calc(100% - 18px)",
          background: "rgba(var(--accent-rgb),0.15)",
        }}
      />
      <div>
        <h4
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 17,
            fontWeight: 600,
            color: "var(--text-primary)",
            margin: "0 0 4px",
          }}
        >
          {title}
        </h4>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "var(--text-muted)" }}>
            {org}
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: "var(--accent)",
            }}
          >
            {period}
          </span>
        </div>
        {points.map((p, i) => (
          <p
            key={i}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              color: "var(--text-muted)",
              lineHeight: 1.7,
              margin: "0 0 6px",
            }}
          >
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}
