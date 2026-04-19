import { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ThemePalette from "../components/ThemePalette";
import BackToTop from "../components/BackToTop";
import Cursor from "../components/Cursor";
import ScrollProgress from "../components/ScrollProgress";
import ScholarshipCard from "../components/resources/ScholarshipCard";
import TrendCard from "../components/resources/TrendCard";
import FilterBtn from "../components/resources/FilterBtn";
import EmptyState from "../components/resources/EmptyState";
import SectionHeader from "../components/resources/SectionHeader";
import scholarships from "../data/scholarships.json";
import trends from "../data/trends.json";

/* global __DATA_LAST_UPDATED__ */

// Injected at build time from git log of the two data files
const LAST_UPDATED = __DATA_LAST_UPDATED__;

export default function Resources() {
  const [scrolled, setScrolled] = useState(false);
  const [schFilter, setSchFilter] = useState("All");
  const [trendFilter, setTrendFilter] = useState("all");

  useEffect(() => {
    document.title = "Resources | John T. Korfeh";
    return () => { document.title = "John T. Korfeh"; };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scholarship filters — auto-generated from field values in JSON
  const schFields = ["All", ...Array.from(new Set(scholarships.map(s => s.field))).filter(f => f !== "Any")];
  const filteredSch = schFilter === "All"
    ? scholarships
    : scholarships.filter(s => s.field === schFilter || s.field === "Any");

  // Trend filters — auto-generated from category values in JSON
  const trendCategories = [
    { value: "all", label: "All" },
    ...Array.from(new Set(trends.map(t => t.category))).map(c => ({
      value: c,
      label: c === "ai" ? "AI & Engineering" : c.charAt(0).toUpperCase() + c.slice(1),
    })),
  ];
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
            Resources
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
          <SectionHeader
            eyebrow="Scholarships"
            title="Funded Opportunities"
            count={filteredSch.length}
            total={scholarships.length}
          />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
            <Filter size={14} strokeWidth={2} style={{ color: "var(--text-dim)", alignSelf: "center", marginRight: 4 }} />
            {schFields.map(f => (
              <FilterBtn key={f} label={f} active={schFilter === f} onClick={() => setSchFilter(f)} />
            ))}
          </div>
          {filteredSch.length === 0
            ? <EmptyState message="No scholarships match this filter." />
            : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
                {filteredSch.map(s => <ScholarshipCard key={s.id} s={s} />)}
              </div>
            )
          }
        </div>
      </section>

      {/* ── TRENDS ── */}
      <section style={{ padding: "60px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHeader eyebrow="Trends" title="What's Moving the Field" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
            {trendCategories.map(tab => (
              <FilterBtn
                key={tab.value}
                label={tab.label}
                active={trendFilter === tab.value}
                onClick={() => setTrendFilter(tab.value)}
              />
            ))}
          </div>
          {filteredTrends.length === 0
            ? <EmptyState message="No trends match this filter." />
            : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 20 }}>
                {filteredTrends.map(t => <TrendCard key={t.id} t={t} />)}
              </div>
            )
          }
        </div>
      </section>

      <Footer />
      <ThemePalette />
      <BackToTop />
    </div>
  );
}
