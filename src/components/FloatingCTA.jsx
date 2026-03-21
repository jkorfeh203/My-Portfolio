import { useEffect, useState } from "react";

export default function FloatingCTA({ scrollTo }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => scrollTo("contact")}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed",
        bottom: 136,
        right: 28,
        zIndex: 500,
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: hovered ? "12px 22px" : "12px 16px",
        borderRadius: 50,
        background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
        border: "none",
        cursor: "pointer",
        color: "var(--bg)",
        fontFamily: "'Outfit', sans-serif",
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: 0.5,
        boxShadow: hovered
          ? "0 8px 32px rgba(var(--accent-rgb),0.45)"
          : "0 4px 20px rgba(var(--accent-rgb),0.25)",
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? "translateY(-3px)" : "translateY(0)"
          : "translateY(20px)",
        transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
        pointerEvents: visible ? "all" : "none",
        whiteSpace: "nowrap",
        overflow: "hidden",
        maxWidth: hovered ? 160 : 44,
      }}
    >
      {/* Mail icon */}
      <svg
        width="16" height="16" viewBox="0 0 24 24"
        fill="none" stroke="currentColor"
        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        style={{ flexShrink: 0 }}
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
      <span
        style={{
          opacity: hovered ? 1 : 0,
          maxWidth: hovered ? 100 : 0,
          transition: "all 0.3s ease",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        Let's Talk
      </span>
    </button>
  );
}
