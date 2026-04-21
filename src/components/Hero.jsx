import { useState, useEffect, useRef } from "react";
import { Mail, Linkedin, Facebook } from "lucide-react";
import TurbineSVG from "./TurbineSVG";
import FlowLines from "./FlowLines";
import Typewriter from "./Typewriter";

const ROLES = [
  "Mechanical Engineer",
  "Energy Systems Researcher",
  "Thermal Energy Storage",
  "Hybrid Energy Harvesting",
  "ANSYS Simulation Enthusiast",
  "Sustainable Energy Innovator",
  { prefix: "Founder & CEO — ", subPhrases: ["Y-LEAD Liberia", "KDARC Study Abroad"] },
  "Engineering for Global Impact",
];
import johnPhoto from "../assets/john-photo.jpeg";

const STATS = [
  { val: 2,   suffix: "",   label: "Papers Under Review" },
  { val: 3,   suffix: "",   label: "Research Projects" },
  { val: 7,   suffix: "+",  label: "Years Machinery Exp." },
  { val: 200, suffix: "+",  label: "Students Mentored" },
];

function AnimatedCounter({ target, suffix, visible }) {
  const ref = useRef(null);
  const frame = useRef(null);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 1400;
    const startTime = performance.now();
    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * target);
      if (ref.current) ref.current.textContent = start + suffix;
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [visible, target, suffix]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>
      0{suffix}
    </span>
  );
}

const SOCIAL_LINKS = [
  {
    href: "mailto:johnkorfeh2017@gmail.com",
    label: "Email",
    icon: <Mail size={17} strokeWidth={2} />,
  },
  {
    href: "https://linkedin.com/in/john-korfeh-a2087029b/",
    label: "LinkedIn",
    icon: <Linkedin size={17} />,
  },
  {
    href: "https://orcid.org/0009-0004-7323-3507",
    label: "ORCID",
    // No lucide equivalent — using a minimal link icon substitute
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
    ),
  },
  {
    href: "https://www.facebook.com/share/1B93DNL26P/?mibextid=wwXIfr",
    label: "Facebook",
    icon: <Facebook size={17} />,
  },
  {
    href: "https://www.researchgate.net/profile/John-Korfeh",
    label: "ResearchGate",
    // No lucide equivalent — brand text mark
    icon: (
      <svg width="20" height="16" viewBox="0 0 20 16" fill="currentColor">
        <text x="0" y="14" fontFamily="'Outfit', sans-serif" fontSize="15" fontWeight="800" letterSpacing="-1">RG</text>
      </svg>
    ),
  },
];

/* ── Corner bracket (L-shape) ── */
function Bracket({ size = 22, thickness = 2, color = "var(--accent)", opacity = 0.7, flip = false }) {
  const s = size;
  const t = thickness;
  const h = flip ? "scale(-1,1)" : "scale(1,1)";
  const v = "scale(1,1)";
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <path
        d={`M${t / 2} ${s} L${t / 2} ${t / 2} L${s} ${t / 2}`}
        fill="none"
        stroke={color}
        strokeWidth={t}
        strokeLinecap="square"
        opacity={opacity}
        transform={`${h}`}
      />
    </svg>
  );
}

function ProfilePhoto() {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 430,
        height: 430,
        animation: "hero-float 5s ease-in-out infinite",
      }}
    >
      {/* ── Layer 1: ambient radial glow (breathes) ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 50% 65%, rgba(var(--accent-rgb),0.42) 0%, rgba(var(--accent-rgb),0.18) 42%, transparent 68%)",
          filter: "blur(24px)",
          animation: "hero-breathe 4s ease-in-out infinite",
        }}
      />

      {/* ── Layer 2: primary conic-gradient spinning arc ring ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          margin: "auto",
          width: 376,
          height: 376,
          borderRadius: "50%",
          background:
            "conic-gradient(from 0deg, transparent 0%, rgba(var(--accent-rgb),0.08) 15%, rgba(var(--accent-rgb),0.95) 50%, rgba(var(--accent-rgb),0.08) 85%, transparent 100%)",
          WebkitMask:
            "radial-gradient(farthest-side, transparent calc(100% - 2px), #fff calc(100% - 2px))",
          mask:
            "radial-gradient(farthest-side, transparent calc(100% - 2px), #fff calc(100% - 2px))",
          animation: "hero-spin 7s linear infinite",
        }}
      />

      {/* ── Layer 3: slower counter-rotating secondary arc ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          margin: "auto",
          width: 344,
          height: 344,
          borderRadius: "50%",
          background:
            "conic-gradient(from 200deg, transparent 0%, rgba(var(--accent-rgb),0.04) 25%, rgba(var(--accent-rgb),0.4) 50%, rgba(var(--accent-rgb),0.04) 75%, transparent 100%)",
          WebkitMask:
            "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #fff calc(100% - 1.5px))",
          mask:
            "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #fff calc(100% - 1.5px))",
          animation: "hero-spin-reverse 13s linear infinite",
        }}
      />

      {/* ── Layer 4: static reference ring ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          margin: "auto",
          width: 314,
          height: 314,
          borderRadius: "50%",
          border: "1px solid rgba(var(--accent-rgb),0.1)",
        }}
      />

      {/* ── Layer 5: photo frame ── */}
      <div
        style={{
          width: 292,
          height: 292,
          borderRadius: "50%",
          border: "2.5px solid rgba(var(--accent-rgb),0.75)",
          position: "relative",
          overflow: "hidden",
          boxShadow:
            "0 0 60px rgba(var(--accent-rgb),0.2), 0 0 20px rgba(var(--accent-rgb),0.12), inset 0 0 30px rgba(0,0,0,0.35)",
          flexShrink: 0,
        }}
      >
        <img
          src={johnPhoto}
          alt="John T. Korfeh"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
          }}
        />
        {/* Bottom vignette blend */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(var(--bg-rgb),0.38) 0%, transparent 48%)",
          }}
        />
      </div>

      {/* ── Corner brackets — L-shaped engineering accents ── */}
      {/* Top-left */}
      <div style={{ position: "absolute", top: 52, left: 52 }}>
        <Bracket />
      </div>
      {/* Top-right */}
      <div style={{ position: "absolute", top: 52, right: 52, transform: "scaleX(-1)" }}>
        <Bracket />
      </div>
      {/* Bottom-left */}
      <div style={{ position: "absolute", bottom: 52, left: 52, transform: "scaleY(-1)" }}>
        <Bracket />
      </div>
      {/* Bottom-right */}
      <div style={{ position: "absolute", bottom: 52, right: 52, transform: "scale(-1,-1)" }}>
        <Bracket />
      </div>

      {/* ── Floating role badge ── */}
      <div
        style={{
          position: "absolute",
          bottom: 6,
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(var(--bg-rgb),0.96)",
          border: "1px solid rgba(var(--accent-rgb),0.5)",
          borderRadius: 24,
          padding: "8px 20px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          whiteSpace: "nowrap",
          boxShadow: "0 4px 24px rgba(var(--accent-rgb),0.15)",
        }}
      >
        <div
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "var(--accent)",
            boxShadow: "0 0 8px rgba(var(--accent-rgb),0.95)",
            animation: "hero-breathe 2.5s ease-in-out infinite",
          }}
        />
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: "var(--accent)",
            letterSpacing: 2.5,
            textTransform: "uppercase",
          }}
        >
          Mech. Engineer
        </span>
      </div>
    </div>
  );
}

export default function Hero({ heroVisible, scrollTo, onCvDownload }) {
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    if (!heroVisible) return;
    // Stats bar fades in after 0.6s delay + 1s transition = 1.6s.
    // Start the counter 200ms after it's fully visible.
    const t = setTimeout(() => setStatsVisible(true), 1800);
    return () => clearTimeout(t);
  }, [heroVisible]);

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        padding: "120px 24px 80px",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes hero-spin         { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
        @keyframes hero-spin-reverse { from { transform: rotate(0deg);   } to { transform: rotate(-360deg); } }
        @keyframes hero-float        { 0%,100% { transform: translateY(0px);  } 50% { transform: translateY(-14px); } }
        @keyframes hero-breathe      { 0%,100% { opacity: 0.8; transform: scale(1);    } 50% { opacity: 1; transform: scale(1.07); } }
      `}</style>

      <TurbineSVG />
      <FlowLines style={{ position: "absolute", left: "3%", bottom: "20%", opacity: 0.2 }} />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Two-column layout */}
        <div
          className="hero-grid"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {/* LEFT ─ text */}
          <div className="hero-text-block">
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                fontWeight: 600,
                color: "var(--accent)",
                letterSpacing: 4,
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Hello!
            </div>

            <h1
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(38px, 5.5vw, 72px)",
                fontWeight: 900,
                lineHeight: 1.08,
                margin: "0 0 16px",
                letterSpacing: -2,
              }}
            >
              <span style={{ color: "var(--text-primary)" }}>I'm </span>
              <span
                style={{
                  background: "linear-gradient(135deg, var(--accent) 30%, var(--accent-light) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                John T. Korfeh
              </span>
            </h1>

            <div
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(15px, 1.8vw, 20px)",
                fontWeight: 500,
                color: "var(--accent)",
                marginBottom: 20,
                letterSpacing: 0.5,
                minHeight: "1.6em",
              }}
            >
              <Typewriter phrases={ROLES} />
            </div>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(14px, 1.5vw, 17px)",
                color: "var(--text-muted)",
                maxWidth: 500,
                lineHeight: 1.8,
                marginBottom: 40,
              }}
            >
              Building geothermal-solar hybrid prototypes for off-grid African
              communities — part experiment, part ANSYS simulation, part fieldwork.
            </p>

            {/* CTA Buttons */}
            <div className="hero-buttons">
              <button
                onClick={() => scrollTo("research")}
                style={{
                  background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                  color: "var(--bg)",
                  border: "none",
                  padding: "14px 34px",
                  borderRadius: 50,
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  letterSpacing: 0.5,
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 24px rgba(var(--accent-rgb),0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(var(--accent-rgb),0.45)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 24px rgba(var(--accent-rgb),0.3)";
                }}
              >
                View Research
              </button>

              <button
                onClick={() => onCvDownload && onCvDownload()}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "transparent",
                  color: "var(--accent)",
                  border: "1.5px solid rgba(var(--accent-rgb),0.5)",
                  padding: "14px 34px",
                  borderRadius: 50,
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  letterSpacing: 0.5,
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.background = "rgba(var(--accent-rgb),0.08)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 24px rgba(var(--accent-rgb),0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(var(--accent-rgb),0.5)";
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <svg
                  width="15" height="15" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor"
                  strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Request CV
              </button>

              <button
                onClick={() => scrollTo("contact")}
                style={{
                  background: "transparent",
                  color: "var(--text-muted)",
                  border: "1.5px solid rgba(255,255,255,0.08)",
                  padding: "14px 34px",
                  borderRadius: 50,
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  letterSpacing: 0.5,
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(var(--accent-rgb),0.3)";
                  e.currentTarget.style.color = "var(--accent)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.color = "var(--text-muted)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Contact Me
              </button>
            </div>

            {/* Social icons */}
            <div className="hero-socials">
              {SOCIAL_LINKS.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    border: "1.5px solid rgba(var(--accent-rgb),0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    background: "rgba(var(--accent-rgb),0.04)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.color = "var(--accent)";
                    e.currentTarget.style.background = "rgba(var(--accent-rgb),0.1)";
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(var(--accent-rgb),0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(var(--accent-rgb),0.25)";
                    e.currentTarget.style.color = "var(--text-muted)";
                    e.currentTarget.style.background = "rgba(var(--accent-rgb),0.04)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT ─ profile photo */}
          <div className="hero-profile-col">
            <div className="profile-scale-wrap">
              <ProfilePhoto />
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: 1,
            marginTop: 64,
            background: "rgba(var(--accent-rgb),0.07)",
            borderRadius: 12,
            overflow: "hidden",
            border: "1px solid rgba(var(--accent-rgb),0.1)",
            opacity: heroVisible ? 1 : 0,
            transition: "opacity 1s ease 0.6s",
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              style={{
                padding: "26px 20px",
                textAlign: "center",
                background: "rgba(var(--bg-rgb),0.7)",
                transition: "background 0.3s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(var(--accent-rgb),0.06)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(var(--bg-rgb),0.7)")}
            >
              <div
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 30,
                  fontWeight: 800,
                  color: "var(--accent)",
                  lineHeight: 1,
                }}
              >
                <AnimatedCounter target={s.val} suffix={s.suffix} visible={statsVisible} />
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: "var(--text-dim)",
                  marginTop: 8,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
