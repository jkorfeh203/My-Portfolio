export default function Footer() {
  return (
    <footer
      style={{
        padding: "40px 24px",
        borderTop: "1px solid rgba(var(--accent-rgb),0.08)",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 14,
          fontWeight: 600,
          color: "var(--text-footer)",
          marginBottom: 8,
        }}
      >
        John T. Korfeh
      </div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: "var(--text-dim)",
          letterSpacing: 1,
        }}
      >
        Mechanical Engineer | Energy Systems Researcher
      </div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: "var(--text-faint)",
          marginTop: 16,
        }}
      >
        © 2026 John T. Korfeh. All rights reserved.
      </div>
    </footer>
  );
}
