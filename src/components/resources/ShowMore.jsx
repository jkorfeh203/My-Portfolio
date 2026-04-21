const btnStyle = {
  background: "transparent",
  border: "1px solid rgba(var(--accent-rgb),0.3)",
  borderRadius: 50,
  padding: "10px 28px",
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 10,
  letterSpacing: 1.2,
  textTransform: "uppercase",
  color: "var(--accent)",
  cursor: "pointer",
  transition: "all 0.2s ease",
};

const onEnter = e => { e.currentTarget.style.background = "rgba(var(--accent-rgb),0.08)"; e.currentTarget.style.borderColor = "rgba(var(--accent-rgb),0.6)"; };
const onLeave = e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(var(--accent-rgb),0.3)"; };

export default function ShowMore({ visible, total, onMore, onLess, label = "results" }) {
  if (total === 0) return null;
  const hasMore = visible < total;
  const hasExpanded = visible > 6;
  return (
    <div style={{ textAlign: "center", marginTop: 32 }}>
      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "var(--text-dim)", letterSpacing: 1, marginBottom: 14 }}>
        Showing {Math.min(visible, total)} of {total} {label}
      </p>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        {hasMore && (
          <button style={btnStyle} onMouseEnter={onEnter} onMouseLeave={onLeave} onClick={onMore}>
            Load more
          </button>
        )}
        {hasExpanded && (
          <button style={btnStyle} onMouseEnter={onEnter} onMouseLeave={onLeave} onClick={onLess}>
            Show less
          </button>
        )}
      </div>
    </div>
  );
}
