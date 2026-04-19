import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

export default function ThemePalette() {
  const { theme, setTheme, themes } = useTheme();
  const [open, setOpen]     = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (!e.target.closest(".theme-palette-root")) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div
      className="theme-palette-root"
      style={{
        position: "fixed",
        bottom: 82,          // sits between FloatingCTA (bottom 136) and BackToTop (bottom 28)
        right: 28,
        zIndex: 500,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
        pointerEvents: visible ? "all" : "none",
      }}
    >
      {/* Theme swatches panel */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          alignItems: "center",
          padding: open ? "12px 10px" : "0 10px",
          background: open ? "rgba(var(--bg-rgb),0.96)" : "transparent",
          border: open ? "1px solid rgba(var(--accent-rgb),0.18)" : "1px solid transparent",
          borderRadius: 30,
          backdropFilter: open ? "blur(12px)" : "none",
          maxHeight: open ? 240 : 0,
          overflowY: open ? "auto" : "hidden",
          overflowX: "hidden",
          transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
          marginBottom: open ? 4 : 0,
          boxShadow: open ? "0 8px 32px rgba(0,0,0,0.4)" : "none",
        }}
      >
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => { setTheme(t); setOpen(false); }}
            title={t.name}
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: t.swatch,
              border: theme.id === t.id
                ? `2.5px solid var(--text-primary)`
                : "2.5px solid transparent",
              outline: theme.id === t.id
                ? `1.5px solid ${t.swatch}`
                : "none",
              outlineOffset: 2,
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: `0 2px 10px ${t.glowColor || t.swatch}55`,
              flexShrink: 0,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.2)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
          />
        ))}
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle theme palette"
        title="Change theme"
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          border: "1.5px solid rgba(var(--accent-rgb),0.5)",
          background: open
            ? "rgba(var(--accent-rgb),0.15)"
            : "rgba(var(--bg-rgb),0.9)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--accent)",
          transition: "all 0.3s ease",
          backdropFilter: "blur(8px)",
          boxShadow: open ? "0 6px 24px rgba(var(--accent-rgb),0.25)" : "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(var(--accent-rgb),0.12)";
          e.currentTarget.style.borderColor = "var(--accent)";
          e.currentTarget.style.transform = "translateY(-3px)";
          e.currentTarget.style.boxShadow = "0 6px 24px rgba(var(--accent-rgb),0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = open
            ? "rgba(var(--accent-rgb),0.15)"
            : "rgba(var(--bg-rgb),0.9)";
          e.currentTarget.style.borderColor = "rgba(var(--accent-rgb),0.5)";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = open
            ? "0 6px 24px rgba(var(--accent-rgb),0.25)"
            : "none";
        }}
      >
        {/* Palette icon */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.35s ease" }}
        >
          <circle cx="13.5" cy="6.5" r="1.5"/>
          <circle cx="17.5" cy="10.5" r="1.5"/>
          <circle cx="8.5"  cy="7.5"  r="1.5"/>
          <circle cx="6.5"  cy="12.5" r="1.5"/>
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
        </svg>
      </button>
    </div>
  );
}
