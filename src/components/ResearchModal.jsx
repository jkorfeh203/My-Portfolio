import { useEffect } from "react";

export default function ResearchModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 8000,
        background: "rgba(4,3,1,0.88)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
        animation: "fadeIn 0.25s ease",
      }}
    >
      <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "linear-gradient(145deg, rgba(var(--bg-rgb),0.99), rgba(var(--bg-rgb),0.99))",
          border: "1px solid rgba(var(--accent-rgb),0.22)",
          borderRadius: 14,
          padding: "36px 32px",
          maxWidth: 680,
          width: "100%",
          maxHeight: "85vh",
          overflowY: "auto",
          position: "relative",
          boxShadow: "0 20px 80px rgba(0,0,0,0.7), 0 0 60px rgba(var(--accent-rgb),0.06)",
          animation: "slideUp 0.3s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <style>{`@keyframes slideUp { from { transform: translateY(24px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>

        {/* Top accent line */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, var(--accent), transparent)", borderRadius: "14px 14px 0 0" }} />

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: "1px solid rgba(var(--accent-rgb),0.25)",
            background: "rgba(var(--accent-rgb),0.06)",
            color: "var(--text-muted)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(var(--accent-rgb),0.25)"; e.currentTarget.style.color = "var(--text-muted)"; }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Period badge */}
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--accent)", letterSpacing: 1.5, textTransform: "uppercase" }}>
          {project.period}
        </span>

        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(17px,2.2vw,22px)", fontWeight: 700, color: "var(--text-primary)", margin: "12px 0 6px", lineHeight: 1.35, paddingRight: 40 }}>
          {project.title}
        </h2>

        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 24 }}>
          {project.role}
        </p>

        <div style={{ width: 40, height: 1, background: "rgba(var(--accent-rgb),0.3)", marginBottom: 24 }} />

        <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 700, color: "var(--accent)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>
          Key Contributions
        </h4>

        {project.points.map((p, i) => (
          <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", opacity: 0.7, marginTop: 7, flexShrink: 0 }} />
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "var(--text-muted)", lineHeight: 1.75, margin: 0 }}>
              {p}
            </p>
          </div>
        ))}

        {project.tools && (
          <>
            <div style={{ width: 40, height: 1, background: "rgba(var(--accent-rgb),0.3)", margin: "24px 0 16px" }} />
            <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 700, color: "var(--accent)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>
              Tools & Methods
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {project.tools.map((t, i) => (
                <span key={i} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--accent)", background: "rgba(var(--accent-rgb),0.08)", padding: "5px 12px", borderRadius: 4, border: "1px solid rgba(var(--accent-rgb),0.18)" }}>
                  {t}
                </span>
              ))}
            </div>
          </>
        )}

        {project.abstract && (
          <>
            <div style={{ width: 40, height: 1, background: "rgba(var(--accent-rgb),0.3)", margin: "24px 0 16px" }} />
            <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 700, color: "var(--accent)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>
              Description
            </h4>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "var(--text-dim)", lineHeight: 1.8, margin: 0, fontStyle: "italic" }}>
              {project.abstract}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
