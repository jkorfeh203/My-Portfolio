import { useState } from "react";
import { Menu, X } from "lucide-react";
import { SECTIONS } from "../constants";

export default function Nav({ activeSection, scrolled, scrollTo }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    padding: scrolled ? "12px 0" : "20px 0",
    background: scrolled ? "rgba(var(--bg-rgb),0.95)" : "transparent",
    backdropFilter: scrolled ? "blur(16px)" : "none",
    borderBottom: scrolled ? "1px solid rgba(var(--accent-rgb),0.1)" : "none",
    transition: "all 0.4s ease",
  };

  const handleNav = (section) => {
    scrollTo(section);
    setMenuOpen(false);
  };

  return (
    <>
      <nav style={navStyle}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <div
            style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
            onClick={() => handleNav("home")}
          >
            {/* Inline SVG logo — inherits CSS variable accent color */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              fill="none"
              style={{ width: 36, height: 36, flexShrink: 0, transition: "color 0.4s ease" }}
            >
              <rect x="3" y="3" width="42" height="42" rx="9" ry="9"
                stroke="var(--accent)" strokeWidth="2.5" fill="none" />
              <text x="8" y="33"
                fontFamily="Outfit, sans-serif"
                fontSize="22"
                fontWeight="800"
                fill="var(--accent)"
                letterSpacing="-1">JK</text>
            </svg>
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 15,
                fontWeight: 600,
                color: "var(--text-primary)",
                letterSpacing: 1,
              }}
            >
              JOHN T. KORFEH
            </span>
          </div>

          {/* Desktop nav links */}
          <div className="nav-links">
            {SECTIONS.map((s) => (
              <button
                key={s}
                onClick={() => handleNav(s)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  padding: "6px 12px",
                  borderRadius: 4,
                  color: activeSection === s ? "var(--accent)" : "var(--text-dim)",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== s) e.currentTarget.style.color = "var(--text-muted)";
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== s) e.currentTarget.style.color = "var(--text-dim)";
                }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Hamburger — mobile only */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} strokeWidth={2} />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay menu */}
      <div className={`nav-mobile-overlay${menuOpen ? " open" : ""}`}>
        {/* Close button */}
        <button
          className="nav-mobile-close"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <X size={28} strokeWidth={2} />
        </button>

        {/* Logo inside overlay */}
        <div
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: "var(--text-dim)",
            letterSpacing: 3,
            textTransform: "uppercase",
            marginBottom: 32,
          }}
        >
          Navigation
        </div>

        {/* Nav items */}
        {SECTIONS.map((s, i) => (
          <button
            key={s}
            onClick={() => handleNav(s)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "'Outfit', sans-serif",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: -0.5,
              textTransform: "capitalize",
              padding: "10px 24px",
              color: activeSection === s ? "var(--accent)" : "var(--text-primary)",
              transition: "color 0.2s ease, transform 0.2s ease",
              opacity: 0,
              animation: menuOpen ? `fadeUp 0.4s ease ${i * 60}ms forwards` : "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--accent)";
              e.currentTarget.style.transform = "translateX(8px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = activeSection === s ? "var(--accent)" : "var(--text-primary)";
              e.currentTarget.style.transform = "translateX(0)";
            }}
          >
            {s}
          </button>
        ))}

        {/* Bottom accent */}
        <div
          style={{
            marginTop: 40,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div style={{ width: 30, height: 1, background: "var(--accent)", opacity: 0.4 }} />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: "var(--text-dim)",
              letterSpacing: 2,
            }}
          >
            JK · 2026
          </span>
          <div style={{ width: 30, height: 1, background: "var(--accent)", opacity: 0.4 }} />
        </div>
      </div>
    </>
  );
}
