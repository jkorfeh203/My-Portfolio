export default function SectionHeader({ eyebrow, title, count, total }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10,
        color: "var(--accent)",
        letterSpacing: 3,
        textTransform: "uppercase",
        marginBottom: 8,
      }}>
        {eyebrow}
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <h2 style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 28,
          fontWeight: 800,
          color: "var(--text-primary)",
          margin: 0,
        }}>
          {title}
        </h2>
        {count !== undefined && total !== undefined && (
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: "var(--text-dim)",
            letterSpacing: 1,
          }}>
            {count} of {total} shown
          </span>
        )}
      </div>
    </div>
  );
}
