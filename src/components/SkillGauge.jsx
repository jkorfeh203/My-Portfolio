export default function SkillGauge({ label, level, delay, visible }) {
  const dotColor = level > 80 ? "var(--accent)" : level > 60 ? "var(--accent-mid)" : "var(--accent-soft)";
  const dotShadow =
    level > 80
      ? "rgba(var(--accent-rgb),0.5)"
      : level > 60
        ? "rgba(var(--accent-rgb),0.4)"
        : "rgba(var(--accent-rgb),0.4)";
  const barGradient =
    level > 80
      ? "linear-gradient(90deg, var(--accent), var(--accent-light))"
      : level > 60
        ? "linear-gradient(90deg, var(--accent-mid), var(--accent-xlight))"
        : "linear-gradient(90deg, var(--accent-soft), var(--accent))";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-20px)",
        transition: "all 0.5s ease",
        transitionDelay: `${delay}ms`,
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: dotColor,
          boxShadow: `0 0 8px ${dotShadow}`,
        }}
      />
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          color: "var(--text-secondary)",
          minWidth: 160,
        }}
      >
        {label}
      </span>
      <div
        style={{
          flex: 1,
          height: 4,
          background: "rgba(var(--accent-rgb),0.06)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: visible ? `${level}%` : "0%",
            height: "100%",
            borderRadius: 2,
            background: barGradient,
            transition: "width 1.2s cubic-bezier(0.16,1,0.3,1)",
            transitionDelay: `${delay + 200}ms`,
          }}
        />
      </div>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: "var(--text-dim)",
          minWidth: 30,
          textAlign: "right",
        }}
      >
        {level}%
      </span>
    </div>
  );
}
