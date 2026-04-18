import { useState, useEffect } from "react";
import { ExternalLink, Calendar, MapPin, GraduationCap, Zap, BookOpen, Filter } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ThemePalette from "../components/ThemePalette";
import BackToTop from "../components/BackToTop";
import Cursor from "../components/Cursor";
import ScrollProgress from "../components/ScrollProgress";
import scholarships from "../data/scholarships.json";
import trends from "../data/trends.json";

const LAST_UPDATED = "April 2026";

// ── Deadline helper ───────────────────────────────────────────
function deadlineInfo(deadline) {
  if (!deadline || deadline === "Rolling" || deadline === "Varies") {
    return { label: deadline || "Rolling", color: "var(--text-dim)", bg: "rgba(var(--accent-rgb),0.06)" };
  }
  const days = Math.ceil((new Date(deadline) - new Date()) / 86400000);
  if (days < 0)  return { label: "Closed",         color: "#6b7280", bg: "rgba(107,114,128,0.08)" };
  if (days < 30) return { label: `${days}d left`,  color: "#ef4444", bg: "rgba(239,68,68,0.08)" };
  if (days < 60) return { label: `${days}d left`,  color: "#f59e0b", bg: "rgba(245,158,11,0.08)" };
  return {
    label: new Date(deadline).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    color: "var(--text-dim)",
    bg: "rgba(var(--accent-rgb),0.06)",
  };
}

// ── Scholarship card ──────────────────────────────────────────
function ScholarshipCard({ s }) {
  const dl = deadlineInfo(s.deadline);
  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid rgba(var(--accent-rgb),0.12)",
        borderRadius: 14,
        padding: "24px 22px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        transition: "all 0.3s ease",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = "rgba(var(--accent-rgb),0.35)";
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 10px 32px rgba(var(--accent-rgb),0.08)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "rgba(var(--accent-rgb),0.12)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Tags row */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        <span style={tagStyle("region")}><MapPin size={9} strokeWidth={2} style={{ marginRight: 3 }} />{s.region}</span>
        <span style={tagStyle("field")}>{s.field}</span>
        {s.degree.map(d => (
          <span key={d} style={tagStyle("degree")}>{d}</span>
        ))}
      </div>

      {/* Name + org */}
      <div>
        <h3 style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 17,
          fontWeight: 800,
          color: "var(--text-primary)",
          marginBottom: 4,
          lineHeight: 1.3,
        }}>
          {s.name}
        </h3>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: "var(--text-dim)",
          letterSpacing: 0.5,
        }}>
          {s.organization}
        </p>
      </div>

      {/* Amount */}
      <div style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: 20,
        fontWeight: 800,
        color: "var(--accent)",
      }}>
        {s.amount}
      </div>

      {/* Description */}
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 13,
        color: "var(--text-muted)",
        lineHeight: 1.7,
        flex: 1,
      }}>
        {s.description}
      </p>

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginTop: "auto" }}>
        <span style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: dl.color,
          background: dl.bg,
          padding: "4px 10px",
          borderRadius: 50,
          letterSpacing: 0.5,
        }}>
          <Calendar size={10} strokeWidth={2} />
          {dl.label}
        </span>
        <a
          href={s.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
            color: "var(--bg)",
            textDecoration: "none",
            padding: "8px 16px",
            borderRadius: 50,
            fontFamily: "'Outfit', sans-serif",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 0.4,
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          Apply <ExternalLink size={11} strokeWidth={2.5} />
        </a>
      </div>
    </div>
  );
}

// ── Trend card ────────────────────────────────────────────────
function TrendCard({ t }) {
  const isAI = t.category === "ai";
  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid rgba(var(--accent-rgb),0.12)",
        borderRadius: 14,
        padding: "24px 22px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        transition: "all 0.3s ease",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = "rgba(var(--accent-rgb),0.35)";
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 10px 32px rgba(var(--accent-rgb),0.08)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "rgba(var(--accent-rgb),0.12)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Category + source */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
        <span style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          letterSpacing: 1.5,
          textTransform: "uppercase",
          color: isAI ? "#818cf8" : "var(--accent)",
          background: isAI ? "rgba(129,140,248,0.1)" : "rgba(var(--accent-rgb),0.1)",
          padding: "3px 10px",
          borderRadius: 50,
        }}>
          {isAI ? <Zap size={9} strokeWidth={2} /> : <BookOpen size={9} strokeWidth={2} />}
          {isAI ? "AI & Engineering" : "Mechanical"}
        </span>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          color: "var(--text-dim)",
          letterSpacing: 0.5,
        }}>
          {t.source}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: 15,
        fontWeight: 800,
        color: "var(--text-primary)",
        lineHeight: 1.4,
      }}>
        {t.title}
      </h3>

      {/* Summary */}
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 13,
        color: "var(--text-muted)",
        lineHeight: 1.75,
        flex: 1,
      }}>
        {t.summary}
      </p>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {t.tags.map(tag => (
          <span key={tag} style={tagStyle("tag")}>{tag}</span>
        ))}
      </div>

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: "var(--text-dim)",
        }}>
          {new Date(t.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
        </span>
        <a
          href={t.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: "var(--accent)",
            textDecoration: "none",
            letterSpacing: 1,
            textTransform: "uppercase",
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          Read <ExternalLink size={10} strokeWidth={2.5} />
        </a>
      </div>
    </div>
  );
}

// ── Tag style helper ──────────────────────────────────────────
function tagStyle(type) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 9,
    letterSpacing: 1,
    textTransform: "uppercase",
    padding: "3px 9px",
    borderRadius: 4,
    border: "1px solid rgba(var(--accent-rgb),0.18)",
    color: "var(--text-dim)",
    background: "rgba(var(--accent-rgb),0.05)",
  };
  if (type === "field") return { ...base, color: "var(--accent)", borderColor: "rgba(var(--accent-rgb),0.3)", background: "rgba(var(--accent-rgb),0.08)" };
  if (type === "degree") return { ...base };
  return base;
}

// ── Filter tab button ─────────────────────────────────────────
function FilterBtn({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? "var(--accent)" : "transparent",
        color: active ? "var(--bg)" : "var(--text-dim)",
        border: `1px solid ${active ? "var(--accent)" : "rgba(var(--accent-rgb),0.2)"}`,
        borderRadius: 50,
        padding: "7px 18px",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10,
        letterSpacing: 1.2,
        textTransform: "uppercase",
        cursor: "pointer",
        transition: "all 0.2s ease",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = "rgba(var(--accent-rgb),0.5)"; e.currentTarget.style.color = "var(--text-secondary)"; }}}
      onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = "rgba(var(--accent-rgb),0.2)"; e.currentTarget.style.color = "var(--text-dim)"; }}}
    >
      {label}
    </button>
  );
}

// ── Main page ─────────────────────────────────────────────────
export default function Resources() {
  const [scrolled, setScrolled] = useState(false);
  const [schFilter, setSchFilter] = useState("All");
  const [trendFilter, setTrendFilter] = useState("all");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scholarship filters
  const schFields = ["All", ...Array.from(new Set(scholarships.map(s => s.field))).filter(f => f !== "Any")];
  const filteredSch = schFilter === "All"
    ? scholarships
    : scholarships.filter(s => s.field === schFilter || s.field === "Any");

  // Trend filters
  const filteredTrends = trendFilter === "all"
    ? trends
    : trends.filter(t => t.category === trendFilter);

  return (
    <div style={{
      background: "var(--bg)",
      color: "var(--text-primary)",
      minHeight: "100vh",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <Cursor />
      <ScrollProgress />
      <Nav scrolled={scrolled} scrollTo={() => {}} activeSection="" />

      {/* ── PAGE HERO ── */}
      <section style={{ paddingTop: 140, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: "var(--accent)",
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 16,
          }}>
            08 ── Resources
          </div>
          <h1 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(32px, 6vw, 56px)",
            fontWeight: 900,
            color: "var(--text-primary)",
            lineHeight: 1.1,
            marginBottom: 20,
          }}>
            Scholarships &amp;<br />Research Trends
          </h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16,
            color: "var(--text-secondary)",
            lineHeight: 1.8,
            marginBottom: 28,
          }}>
            Curated opportunities and breakthroughs for engineers pursuing funded MS/PhD programmes
            in energy systems, mechanical engineering, and AI-driven simulation.
          </p>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: "var(--text-dim)",
            letterSpacing: 1.5,
            background: "rgba(var(--accent-rgb),0.07)",
            border: "1px solid rgba(var(--accent-rgb),0.15)",
            padding: "5px 14px",
            borderRadius: 50,
          }}>
            Last updated: {LAST_UPDATED}
          </span>
        </div>
      </section>

      {/* ── SCHOLARSHIPS ── */}
      <section style={{ padding: "60px 24px", background: "var(--bg-section)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* Section header */}
          <div style={{ marginBottom: 32 }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: "var(--accent)",
              letterSpacing: 3,
              textTransform: "uppercase",
              marginBottom: 8,
            }}>
              Scholarships
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
              <h2 style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 28,
                fontWeight: 800,
                color: "var(--text-primary)",
                margin: 0,
              }}>
                Funded Opportunities
              </h2>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: "var(--text-dim)",
                letterSpacing: 1,
              }}>
                {filteredSch.length} of {scholarships.length} shown
              </span>
            </div>
          </div>

          {/* Filter bar */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
            <Filter size={14} strokeWidth={2} style={{ color: "var(--text-dim)", alignSelf: "center", marginRight: 4 }} />
            {schFields.map(f => (
              <FilterBtn key={f} label={f} active={schFilter === f} onClick={() => setSchFilter(f)} />
            ))}
          </div>

          {/* Cards grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 20,
          }}>
            {filteredSch.map(s => <ScholarshipCard key={s.id} s={s} />)}
          </div>

        </div>
      </section>

      {/* ── TRENDS ── */}
      <section style={{ padding: "60px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* Section header */}
          <div style={{ marginBottom: 32 }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: "var(--accent)",
              letterSpacing: 3,
              textTransform: "uppercase",
              marginBottom: 8,
            }}>
              Trends
            </div>
            <h2 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 28,
              fontWeight: 800,
              color: "var(--text-primary)",
              margin: "0 0 24px",
            }}>
              What's Moving the Field
            </h2>

            {/* Trend tabs */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {[
                { value: "all",        label: "All" },
                { value: "ai",         label: "AI & Engineering" },
                { value: "mechanical", label: "Mechanical" },
              ].map(tab => (
                <FilterBtn
                  key={tab.value}
                  label={tab.label}
                  active={trendFilter === tab.value}
                  onClick={() => setTrendFilter(tab.value)}
                />
              ))}
            </div>
          </div>

          {/* Cards grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: 20,
          }}>
            {filteredTrends.map(t => <TrendCard key={t.id} t={t} />)}
          </div>

        </div>
      </section>

      <Footer />
      <ThemePalette />
      <BackToTop />
    </div>
  );
}
