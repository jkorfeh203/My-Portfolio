export default function FilterBtn({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      style={{
        background: active ? "var(--accent)" : "transparent",
        color: active ? "var(--bg)" : "var(--text-dim)",
        border: `1px solid ${active ? "var(--accent)" : "rgba(var(--accent-rgb),0.2)"}`,
        borderRadius: 50,
        padding: "7px 18px",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10,
        letterSpacing: 1.2,
        textTransform: "uppercase",
        cursor: "pointer",
        transition: "all 0.2s ease",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = "rgba(var(--accent-rgb),0.5)"; e.currentTarget.style.color = "var(--text-secondary)"; }}}
      onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = "rgba(var(--accent-rgb),0.2)"; e.currentTarget.style.color = "var(--text-dim)"; }}}
    >
      {label}
    </button>
  );
}
