import { useState, useEffect, useRef, useCallback } from "react";
import SectionTitle from "./SectionTitle";
import drRamesh from "../assets/testimonials/dr-ramesh.jpeg";
import drBhavesh from "../assets/testimonials/dr-bhavesh.jpeg";
import drMith from "../assets/testimonials/dr-mith.jpeg";
import anand from "../assets/testimonials/anand.jpeg";
import lahai from "../assets/testimonials/lahai.jpeg";

const TESTIMONIALS = [
  {
    quote:
      "I had the opportunity of Co supervising John on all his projects in our department and I must say John Korfeh is precisely the kind of engineering student that this field needs more of. He is rigorous in his thinking, tireless in his effort, and deeply motivated by purpose beyond personal achievement. He graduated with a First Class with Distinction degree and ranking Top 5 percent in his batch and Top 25 percent in the college of Engineering at Marwadi University. this is a reflection not just of his intelligence, but of his character. I recommend him without hesitation and with complete confidence.",
    name: "Dr. Ramesh Bhoraniya",
    title: "Professor, Dept. of Mechanical Engineering",
    institution: "Marwadi University",
    initials: "RB",
    photo: drRamesh,
  },
  {
    quote:
      "Supervising John's funded capstone research was one of the most rewarding academic experiences of my career. He brought graduate-level thinking to an undergraduate project, navigating complex thermal systems and computational challenges with a maturity and independence that genuinely surprised me. What makes John exceptional is that his ambition is matched equally by his ability. He is not simply a promising student. He is a future leader in energy research.",
    name: "Dr. Bhavesh Kanabar",
    title: "Associate Professor, Dept. of Mechanical Engineering",
    institution: "Marwadi University",
    initials: "BK",
    photo: drBhavesh,
  },
  {
    quote:
      "Across the many students I have taught and mentored, few have impressed me the way John has. His quadcopter project, which I supervised, was not simply a mechanical exercise. It was a demonstration of systems thinking, precision engineering, and a relentless drive to get things right. John does not just complete work. He owns it. Any institution fortunate enough to have him as a graduate researcher will quickly understand what I mean.",
    name: "Dr. Mit Sheth",
    title: "Assistant Professor, Dept. of Mechanical Engineering",
    institution: "Marwadi University",
    initials: "MS",
    photo: drMith,
  },
  {
    quote:
      "Working alongside John during our research was a genuinely rewarding experience. From the moment he began learning ANSYS Fluent, it was clear he was not just picking up a tool. He was developing a methodology. He absorbed complex simulation concepts quickly, asked the right technical questions, and applied what he learned with a precision that would impress engineers well beyond his level. John has the mindset of a researcher and the discipline of a professional. I have no doubt he will thrive in any advanced research environment.",
    name: "Anand Gondchawar",
    title: "Junior Research Fellow & PhD Candidate",
    institution: "Dept. of Mechanical Engineering, Marwadi University",
    initials: "AG",
    photo: anand,
  },
  {
    quote:
      "John's leadership of Y-LEAD Liberia reflects his commitment to community impact beyond the laboratory. He mentors students with genuine dedication and an infectious passion for engineering.",
    name: "Lahai S. Kamara",
    title: "National Coordinator",
    institution: "Y-LEAD Liberia",
    initials: "LK",
    photo: lahai,
  },
];

const AUTO_DELAY = 5000; // ms between auto-advances

export default function Testimonials({ tesRef, tesVis }) {
  const [current, setCurrent]     = useState(0);
  const [outgoing, setOutgoing]   = useState(null); // index of card sliding out
  const [direction, setDirection] = useState("next"); // "next" | "prev"
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused]       = useState(false);

  const timerRef         = useRef(null);
  const progressRef      = useRef(null);
  const advanceRef       = useRef(null);  // always-current ref to avoid stale closure
  const timerKey         = useRef(0);     // bumped on manual nav to restart interval
  const progressStartRef = useRef(null);  // Date.now() when current card's bar started
  const pausedAtRef      = useRef(0);     // % (0-100) where bar was frozen
  const resumeTimeoutRef = useRef(null);  // one-shot timeout for partial resume

  const N = TESTIMONIALS.length;

  // ── Core advance function ───────────────────────────────────────────────────
  const advance = useCallback(
    (dir) => {
      if (animating) return;
      setDirection(dir);
      setOutgoing(current);
      setAnimating(true);
      setCurrent(
        dir === "next"
          ? (current + 1) % N
          : (current - 1 + N) % N
      );
      setTimeout(() => {
        setOutgoing(null);
        setAnimating(false);
      }, 620);
    },
    [animating, current, N]
  );

  // Keep advanceRef current so the interval never has a stale closure
  advanceRef.current = advance;

  // ── Interval timer — restarts from remaining time when resuming from pause ──
  useEffect(() => {
    if (!tesVis || paused) {
      clearInterval(timerRef.current);
      clearTimeout(resumeTimeoutRef.current);
      return;
    }
    clearInterval(timerRef.current);
    clearTimeout(resumeTimeoutRef.current);

    // If resuming mid-bar, fire the first advance after the remaining duration
    const pct = pausedAtRef.current;
    const remaining = pct > 0 ? Math.max(0, AUTO_DELAY * (1 - pct / 100)) : AUTO_DELAY;

    resumeTimeoutRef.current = setTimeout(() => {
      advanceRef.current("next");
      timerRef.current = setInterval(() => {
        advanceRef.current("next");
      }, AUTO_DELAY);
    }, remaining);

    return () => {
      clearInterval(timerRef.current);
      clearTimeout(resumeTimeoutRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tesVis, paused, timerKey.current]);

  // ── Progress bar — resets once per card change ──────────────────────────────
  useEffect(() => {
    if (!progressRef.current || !tesVis || paused) return;
    pausedAtRef.current = 0; // fresh card, clear any stored pause position
    const el = progressRef.current;
    el.style.transition = "none";
    el.style.width = "0%";
    void el.offsetWidth; // force reflow
    el.style.transition = `width ${AUTO_DELAY}ms linear`;
    el.style.width = "100%";
    progressStartRef.current = Date.now(); // record when this bar started
  }, [current, tesVis]);

  // ── Freeze / resume progress bar on pause toggle ────────────────────────────
  useEffect(() => {
    if (!progressRef.current || !tesVis) return;
    const el = progressRef.current;
    if (paused) {
      // Calculate exact % from elapsed time for precision
      const elapsed = progressStartRef.current ? Date.now() - progressStartRef.current : 0;
      const pct = Math.min(100, (elapsed / AUTO_DELAY) * 100);
      pausedAtRef.current = pct;
      el.style.transition = "none";
      el.style.width = `${pct}%`;
    } else {
      // Resume from the stored position, animate only the remaining portion
      const pct = pausedAtRef.current;
      const remaining = Math.max(0, AUTO_DELAY * (1 - pct / 100));
      el.style.transition = "none";
      el.style.width = `${pct}%`;
      void el.offsetWidth;
      el.style.transition = `width ${remaining}ms linear`;
      el.style.width = "100%";
      // Adjust the logical start time so future pauses compute correctly
      progressStartRef.current = Date.now() - (AUTO_DELAY * pct / 100);
    }
  }, [paused, tesVis]);

  // Manual nav — bump timerKey to restart interval cleanly from scratch
  const restartTimer = () => {
    timerKey.current += 1;
    pausedAtRef.current = 0; // fresh start — don't resume from a stored position
    clearTimeout(resumeTimeoutRef.current);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      advanceRef.current("next");
    }, AUTO_DELAY);
  };

  const handlePrev = () => {
    if (animating) return;
    advance("prev");
    if (!paused) restartTimer();
  };
  const handleNext = () => {
    if (animating) return;
    advance("next");
    if (!paused) restartTimer();
  };
  const handleDot = (i) => {
    if (animating || i === current) return;
    advance(i > current ? "next" : "prev");
    if (!paused) restartTimer();
  };

  // ── Slide keyframe names based on direction ─────────────────────────────────
  // incoming: slides in from right (next) or left (prev)
  // outgoing: slides out to left (next) or right (prev)
  const inKF  = direction === "next" ? "tes-slide-in-right"  : "tes-slide-in-left";
  const outKF = direction === "next" ? "tes-slide-out-left"  : "tes-slide-out-right";

  return (
    <section
      id="testimonials"
      ref={tesRef}
      className="section-pad"
      style={{ background: "rgba(var(--bg-rgb),0.6)" }}
    >
      <style>{`
        @keyframes tes-slide-in-right  { from { transform: translateX(80px);  opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes tes-slide-in-left   { from { transform: translateX(-80px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes tes-slide-out-left  { from { transform: translateX(0); opacity: 1; } to { transform: translateX(-80px); opacity: 0; } }
        @keyframes tes-slide-out-right { from { transform: translateX(0); opacity: 1; } to { transform: translateX(80px);  opacity: 0; } }
      `}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionTitle label="References & Testimonials" number={6} />

        <div
          style={{
            opacity: tesVis ? 1 : 0,
            transform: tesVis ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
            maxWidth: 760,
            margin: "0 auto",
          }}
        >
          {/* ── Card stage ── */}
          <div
            style={{ position: "relative", overflow: "hidden", borderRadius: 16, minHeight: 320 }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Outgoing card */}
            {outgoing !== null && (
              <div
                key={`out-${outgoing}`}
                style={{
                  position: "absolute",
                  inset: 0,
                  animation: `${outKF} 0.6s cubic-bezier(0.16,1,0.3,1) forwards`,
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              >
                <Card data={TESTIMONIALS[outgoing]} />
              </div>
            )}

            {/* Incoming / current card */}
            <div
              key={`in-${current}`}
              style={{
                animation: animating
                  ? `${inKF} 0.6s cubic-bezier(0.16,1,0.3,1) forwards`
                  : "none",
                position: "relative",
                zIndex: 2,
              }}
            >
              <Card data={TESTIMONIALS[current]} />
            </div>

            {/* Auto-progress bar — lives inside the card stage */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                height: 2,
                width: "100%",
                background: "rgba(var(--accent-rgb),0.08)",
                zIndex: 10,
                borderRadius: "0 0 16px 16px",
              }}
            >
              <div
                ref={progressRef}
                style={{
                  height: "100%",
                  width: "0%",
                  background: "linear-gradient(90deg, var(--accent-dark), var(--accent), var(--accent-light))",
                  borderRadius: "0 0 16px 16px",
                  boxShadow: "0 0 6px rgba(var(--accent-rgb),0.5)",
                }}
              />
            </div>

            {/* Pause indicator */}
            {paused && (
              <div
                style={{
                  position: "absolute",
                  top: 14,
                  right: 16,
                  zIndex: 20,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9,
                  color: "rgba(var(--accent-rgb),0.45)",
                  letterSpacing: 2,
                  textTransform: "uppercase",
                }}
              >
                ⏸ paused
              </div>
            )}
          </div>

          {/* ── Navigation ── */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginTop: 28 }}>
            {/* Prev */}
            <NavButton onClick={handlePrev} disabled={animating}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </NavButton>

            {/* Dots */}
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleDot(i)}
                  style={{
                    width: i === current ? 22 : 7,
                    height: 7,
                    borderRadius: 4,
                    border: "none",
                    background: i === current ? "var(--accent)" : "rgba(var(--accent-rgb),0.2)",
                    cursor: "pointer",
                    transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                    padding: 0,
                    outline: "none",
                  }}
                />
              ))}
            </div>

            {/* Next */}
            <NavButton onClick={handleNext} disabled={animating}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </NavButton>
          </div>

          {/* Counter label */}
          <div
            style={{
              textAlign: "center",
              marginTop: 14,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: "rgba(var(--accent-rgb),0.3)",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            {current + 1} / {N}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Reusable card UI ────────────────────────────────────────────────────────
function Card({ data }) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, rgba(var(--bg-rgb),0.97), rgba(var(--bg-rgb),0.99))",
        border: "1px solid rgba(var(--accent-rgb),0.14)",
        borderRadius: 16,
        padding: "44px 40px 40px",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 8px 40px rgba(0,0,0,0.35)",
        minHeight: 320,
      }}
    >
      {/* Top accent line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }} />

      {/* Large decorative quote mark */}
      <div
        style={{
          position: "absolute",
          top: 14,
          left: 26,
          fontFamily: "'Georgia', serif",
          fontSize: 110,
          lineHeight: 1,
          color: "rgba(var(--accent-rgb),0.06)",
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        "
      </div>

      {/* Quote text */}
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "clamp(15px, 1.8vw, 18px)",
          color: "var(--text-body)",
          lineHeight: 1.85,
          margin: "0 0 34px",
          fontStyle: "italic",
          position: "relative",
          zIndex: 1,
        }}
      >
        "{data.quote}"
      </p>

      {/* Author row */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(var(--accent-rgb),0.18), rgba(var(--accent-rgb),0.06))",
            border: "1.5px solid rgba(var(--accent-rgb),0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Outfit', sans-serif",
            fontSize: 15,
            fontWeight: 700,
            color: "var(--accent)",
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          {data.photo ? (
            <img
              src={data.photo}
              alt={data.name}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
            />
          ) : (
            data.initials
          )}
        </div>
        <div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 3 }}>
            {data.name}
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "var(--accent)", letterSpacing: 1.5, textTransform: "uppercase" }}>
            {data.title}
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "var(--text-dim)", marginTop: 2 }}>
            {data.institution}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Nav arrow button ────────────────────────────────────────────────────────
function NavButton({ onClick, disabled, children }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 38,
        height: 38,
        borderRadius: "50%",
        border: "1px solid rgba(var(--accent-rgb),0.3)",
        background: "rgba(var(--accent-rgb),0.05)",
        color: disabled ? "rgba(var(--accent-rgb),0.25)" : "var(--accent)",
        cursor: disabled ? "default" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s ease",
        outline: "none",
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        e.currentTarget.style.background = "rgba(var(--accent-rgb),0.12)";
        e.currentTarget.style.borderColor = "var(--accent)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(var(--accent-rgb),0.05)";
        e.currentTarget.style.borderColor = "rgba(var(--accent-rgb),0.3)";
      }}
    >
      {children}
    </button>
  );
}
