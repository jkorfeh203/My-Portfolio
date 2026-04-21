export default function SectionTabs({ active, onChange, schCount, trendCount }) {
  const tabs = [
    { id: "scholarships", label: "Scholarships", count: schCount },
    { id: "trends", label: "Trends", count: trendCount },
  ];

  return (
    <div style={{
      display: "flex",
      borderBottom: "1px solid rgba(var(--accent-rgb),0.12)",
      marginBottom: 40,
      overflowX: "auto",
      scrollbarWidth: "none",
      msOverflowStyle: "none",
    }}>
      {tabs.map(tab => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            style={{
              background: "none",
              border: "none",
              borderBottom: isActive ? "2px solid var(--accent)" : "2px solid transparent",
              marginBottom: -1,
              padding: "14px 28px",
              fontFamily: "'Outfit', sans-serif",
              fontSize: 15,
              fontWeight: isActive ? 700 : 500,
              color: isActive ? "var(--text-primary)" : "var(--text-dim)",
              cursor: "pointer",
              transition: "all 0.2s ease",
              display: "flex",
              alignItems: "center",
              gap: 8,
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = "var(--text-secondary)"; }}
            onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = "var(--text-dim)"; }}
          >
            {tab.label}
            <span style={{
              background: isActive ? "rgba(var(--accent-rgb),0.15)" : "rgba(var(--accent-rgb),0.06)",
              color: isActive ? "var(--accent)" : "var(--text-dim)",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              padding: "2px 8px",
              borderRadius: 50,
              transition: "all 0.2s ease",
            }}>
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
