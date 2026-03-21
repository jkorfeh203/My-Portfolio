import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Back to top"
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        zIndex: 500,
        width: 44,
        height: 44,
        borderRadius: "50%",
        border: "1.5px solid rgba(var(--accent-rgb),0.5)",
        background: hovered ? "rgba(var(--accent-rgb),0.12)" : "rgba(var(--bg-rgb),0.9)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--accent)",
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? "translateY(-3px)" : "translateY(0)"
          : "translateY(20px)",
        transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
        pointerEvents: visible ? "all" : "none",
        boxShadow: hovered ? "0 6px 24px rgba(var(--accent-rgb),0.2)" : "none",
        backdropFilter: "blur(8px)",
      }}
    >
      <svg
        width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor"
        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}
