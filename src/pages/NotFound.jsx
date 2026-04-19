import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div style={{
      background: "var(--bg)",
      color: "var(--text-primary)",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'DM Sans', sans-serif",
      textAlign: "center",
      padding: "0 24px",
    }}>
      <div style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: "clamp(96px, 20vw, 160px)",
        fontWeight: 900,
        color: "var(--accent)",
        lineHeight: 1,
        marginBottom: 8,
        opacity: 0.9,
      }}>
        404
      </div>

      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10,
        letterSpacing: 4,
        textTransform: "uppercase",
        color: "var(--text-dim)",
        marginBottom: 24,
      }}>
        Page Not Found
      </div>

      <p style={{
        fontSize: 15,
        color: "var(--text-muted)",
        lineHeight: 1.7,
        maxWidth: 340,
        marginBottom: 40,
      }}>
        The page you're looking for doesn't exist or may have moved.
        Let's get you back on track.
      </p>

      <button
        onClick={() => navigate("/")}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "var(--accent)",
          color: "var(--bg)",
          border: "none",
          borderRadius: 50,
          padding: "12px 28px",
          fontFamily: "'Outfit', sans-serif",
          fontSize: 14,
          fontWeight: 700,
          cursor: "pointer",
          transition: "opacity 0.2s ease",
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
        onMouseLeave={e => e.currentTarget.style.opacity = "1"}
      >
        <ArrowLeft size={16} strokeWidth={2.5} />
        Back to Portfolio
      </button>

      <div style={{
        marginTop: 60,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10,
        color: "var(--text-faint)",
        letterSpacing: 2,
      }}>
        John T. Korfeh — Mechanical Engineer & Researcher
      </div>
    </div>
  );
}
