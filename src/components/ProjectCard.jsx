export default function ProjectCard({ title, period, role, points, tools, delay, visible, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "linear-gradient(135deg, var(--bg-card), rgba(var(--bg-rgb),0.98))",
        border: "1px solid rgba(var(--accent-rgb),0.12)",
        borderRadius: 8,
        padding: "32px 28px",
        transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)",
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        position: "relative",
        overflow: "hidden",
        cursor: onClick ? "pointer" : "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(var(--accent-rgb),0.4)";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(var(--accent-rgb),0.08)";
        if (onClick) e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(var(--accent-rgb),0.12)";
        e.currentTarget.style.boxShadow = "none";
        if (onClick) e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 2,
          background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: 12,
        }}
      >
        <h3
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 18,
            fontWeight: 600,
            color: "var(--text-primary)",
            margin: 0,
            lineHeight: 1.4,
            maxWidth: "75%",
          }}
        >
          {title}
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              color: "var(--accent)",
              whiteSpace: "nowrap",
            }}
          >
            {period}
          </span>
          {onClick && (
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                color: "rgba(var(--accent-rgb),0.5)",
                letterSpacing: 1.5,
                textTransform: "uppercase",
                border: "1px solid rgba(var(--accent-rgb),0.2)",
                padding: "3px 8px",
                borderRadius: 4,
                whiteSpace: "nowrap",
              }}
            >
              Details ↗
            </span>
          )}
        </div>
      </div>
      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: "var(--text-dim)",
          margin: "0 0 16px",
          textTransform: "uppercase",
          letterSpacing: 1.5,
        }}
      >
        {role}
      </p>
      {points.map((p, i) => (
        <p
          key={i}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            color: "var(--text-muted)",
            lineHeight: 1.7,
            margin: "0 0 8px",
            paddingLeft: 16,
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: 0,
              top: 8,
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--accent)",
              opacity: 0.6,
            }}
          />
          {p}
        </p>
      ))}
      {tools && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
          {tools.map((t, i) => (
            <span
              key={i}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: "var(--accent)",
                background: "rgba(var(--accent-rgb),0.08)",
                padding: "4px 10px",
                borderRadius: 4,
                border: "1px solid rgba(var(--accent-rgb),0.18)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
