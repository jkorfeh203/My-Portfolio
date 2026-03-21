import { useEffect, useState } from "react";

export default function Preloader({ onComplete }) {
  const [drawn, setDrawn] = useState(false);
  const [exit, setExit]   = useState(false);

  const r = 52;
  const circumference = +(2 * Math.PI * r).toFixed(1); // ≈ 326.7

  useEffect(() => {
    const t1 = setTimeout(() => setDrawn(true),  80);
    const t2 = setTimeout(() => setExit(true),  2300);
    const t3 = setTimeout(() => onComplete(),   2900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--bg)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: exit ? 0 : 1,
        transition: "opacity 0.6s ease",
        pointerEvents: exit ? "none" : "all",
      }}
    >
      {/* Circle + initials */}
      <div style={{ position: "relative", width: 130, height: 130 }}>
        {/* Dim track */}
        <svg width="130" height="130" style={{ position: "absolute", inset: 0 }}>
          <circle cx="65" cy="65" r={r} fill="none" stroke="rgba(var(--accent-rgb),0.1)" strokeWidth="1.5" />
        </svg>

        {/* Drawing arc */}
        <svg
          width="130" height="130"
          style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}
        >
          <defs>
            <linearGradient id="pl-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="var(--accent-dark)" />
              <stop offset="100%" stopColor="var(--accent-light)" />
            </linearGradient>
          </defs>
          <circle
            cx="65" cy="65" r={r}
            fill="none"
            stroke="url(#pl-grad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={drawn ? 0 : circumference}
            style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(0.4,0,0.2,1)" }}
          />
        </svg>

        {/* Glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(var(--accent-rgb),0.12) 0%, transparent 70%)",
            opacity: drawn ? 1 : 0,
            transition: "opacity 0.6s ease 0.8s",
          }}
        />

        {/* JK */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Outfit', sans-serif",
            fontSize: 40,
            fontWeight: 900,
            color: "var(--accent)",
            opacity: drawn ? 1 : 0,
            transform: drawn ? "scale(1)" : "scale(0.8)",
            transition: "opacity 0.4s ease 0.7s, transform 0.4s ease 0.7s",
          }}
        >
          JK
        </div>
      </div>

      {/* Name */}
      <div
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 16,
          fontWeight: 600,
          color: "var(--text-primary)",
          letterSpacing: 2,
          marginTop: 28,
          opacity: drawn ? 1 : 0,
          transform: drawn ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.5s ease 0.9s, transform 0.5s ease 0.9s",
        }}
      >
        John T. Korfeh
      </div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: "var(--text-dim)",
          letterSpacing: 3,
          marginTop: 6,
          textTransform: "uppercase",
          opacity: drawn ? 1 : 0,
          transition: "opacity 0.5s ease 1.1s",
        }}
      >
        Mechanical Engineer · Researcher
      </div>

      {/* Progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "rgba(var(--accent-rgb),0.08)",
        }}
      >
        <div
          style={{
            height: "100%",
            background: "linear-gradient(90deg, var(--accent), var(--accent-light))",
            width: drawn ? "100%" : "0%",
            transition: "width 2.1s ease 0.1s",
          }}
        />
      </div>
    </div>
  );
}
