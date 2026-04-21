import { useState, useEffect } from "react";
import { Filter, Search, X, Mail } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ThemePalette from "../components/ThemePalette";
import BackToTop from "../components/BackToTop";
import ScrollProgress from "../components/ScrollProgress";
import ScholarshipCard from "../components/resources/ScholarshipCard";
import TrendCard from "../components/resources/TrendCard";
import FilterBtn from "../components/resources/FilterBtn";
import EmptyState from "../components/resources/EmptyState";
import ShowMore from "../components/resources/ShowMore";
import SectionTabs from "../components/resources/SectionTabs";
import MobileCarousel from "../components/resources/MobileCarousel";
import { useBookmarks } from "../hooks/useBookmarks";
import scholarships from "../data/scholarships.json";
import trends from "../data/trends.json";

/* global __DATA_LAST_UPDATED__ */
const LAST_UPDATED = __DATA_LAST_UPDATED__;
const PAGE_SIZE = 6;

function deadlineSortKey(deadline) {
  const d = new Date(deadline);
  if (isNaN(d.getTime())) return 2e15;           // non-date strings → last
  if (d < new Date()) return 1e15 + d.getTime(); // closed → second to last
  return d.getTime();                             // future → soonest first
}

export default function Resources() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("scholarships");

  // Scholarship state
  const [schFilter, setSchFilter] = useState("All");
  const [schDegree, setSchDegree] = useState("All");
  const [schSearch, setSchSearch] = useState("");
  const [schVisible, setSchVisible] = useState(PAGE_SIZE);

  // Trend state
  const [trendFilter, setTrendFilter] = useState("all");
  const [trendVisible, setTrendVisible] = useState(PAGE_SIZE);

  // Bookmarks
  const [bookmarks, toggleBookmark, isBookmarked] = useBookmarks(scholarships);

  useEffect(() => {
    document.title = "Resources | John T. Korfeh";
    return () => { document.title = "John T. Korfeh"; };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setSchVisible(PAGE_SIZE); }, [schFilter, schDegree, schSearch]);
  useEffect(() => { setTrendVisible(PAGE_SIZE); }, [trendFilter]);

  // Scholarship filters + sort by deadline
  const schFields = ["All", ...Array.from(new Set(scholarships.map(s => s.field))).filter(f => f !== "Any")];
  const schDegrees = ["All", "BS", "MS", "PhD"];
  const schQuery = schSearch.toLowerCase().trim();
  const filteredSch = scholarships
    .filter(s => schFilter === "All" || s.field === schFilter || s.field === "Any")
    .filter(s => schDegree === "All" || (s.degree && s.degree.includes(schDegree)))
    .filter(s => !schQuery || [s.name, s.organization, s.description, ...(s.tags || [])].join(" ").toLowerCase().includes(schQuery))
    .slice()
    .sort((a, b) => deadlineSortKey(a.deadline) - deadlineSortKey(b.deadline));

  // Saved scholarships (preserves sort order)
  const savedSch = filteredSch.filter(s => isBookmarked(s.id));
  // All bookmarked (for count badge — not filtered)
  const allSavedCount = scholarships.filter(s => isBookmarked(s.id)).length;

  // Trend filters
  const trendCategories = [
    { value: "all", label: "All" },
    ...Array.from(new Set(trends.map(t => t.category))).map(c => ({
      value: c,
      label: c === "ai" ? "AI & Engineering" : c.charAt(0).toUpperCase() + c.slice(1),
    })),
  ];
  const filteredTrends = trendFilter === "all" ? trends : trends.filter(t => t.category === trendFilter);

  const suggestHref = [
    "mailto:johnkorfeh2017@gmail.com",
    "?subject=Scholarship%20Suggestion%20for%20John's%20Resources%20Page",
    "&body=Hi%20John%2C%0A%0AScholarship%20name%3A%20%0AOrganization%3A%20%0ADeadline%3A%20%0ALink%3A%20%0A%0AThanks!",
  ].join("");

  return (
    <div style={{ background: "var(--bg)", color: "var(--text-primary)", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      <ScrollProgress />
      <Nav scrolled={scrolled} scrollTo={() => {}} activeSection="" />

      {/* ── PAGE HERO ── */}
      <section style={{ paddingTop: 140, paddingBottom: 60, paddingLeft: 24, paddingRight: 24, textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "var(--accent)", letterSpacing: 4, textTransform: "uppercase", marginBottom: 16 }}>
            Resources
          </div>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 900, color: "var(--text-primary)", lineHeight: 1.1, marginBottom: 20 }}>
            Scholarships &amp;<br />Research Trends
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 28 }}>
            Curated opportunities and breakthroughs for students pursuing funded undergraduate
            and postgraduate programmes across engineering, STEM, and beyond.
          </p>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "var(--text-dim)", letterSpacing: 1.5, background: "rgba(var(--accent-rgb),0.07)", border: "1px solid rgba(var(--accent-rgb),0.15)", padding: "5px 14px", borderRadius: 50 }}>
            Last updated: {LAST_UPDATED}
          </span>
        </div>
      </section>

      {/* ── TABBED CONTENT ── */}
      <section style={{ padding: "0 24px 80px", background: "var(--bg-section)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          <SectionTabs
            active={activeTab}
            onChange={setActiveTab}
            schCount={filteredSch.length}
            trendCount={filteredTrends.length}
            savedCount={allSavedCount}
          />

          {/* ── SCHOLARSHIPS ── */}
          {activeTab === "scholarships" && (
            <>
              {/* Search */}
              <div style={{ position: "relative", maxWidth: 420, marginBottom: 20 }}>
                <Search size={13} strokeWidth={2} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)", pointerEvents: "none" }} />
                <input
                  type="text"
                  placeholder="Search scholarships..."
                  value={schSearch}
                  onChange={e => setSchSearch(e.target.value)}
                  style={{ width: "100%", background: "rgba(var(--accent-rgb),0.04)", border: "1px solid rgba(var(--accent-rgb),0.18)", borderRadius: 50, padding: "9px 40px 9px 36px", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--text-primary)", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s ease" }}
                  onFocus={e => e.target.style.borderColor = "rgba(var(--accent-rgb),0.5)"}
                  onBlur={e => e.target.style.borderColor = "rgba(var(--accent-rgb),0.18)"}
                />
                {schSearch && (
                  <button onClick={() => setSchSearch("")} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-dim)", display: "flex", alignItems: "center", padding: 2 }}>
                    <X size={12} strokeWidth={2.5} />
                  </button>
                )}
              </div>

              {/* Field filters */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
                <Filter size={14} strokeWidth={2} style={{ color: "var(--text-dim)", alignSelf: "center", marginRight: 4 }} />
                {schFields.map(f => (
                  <FilterBtn key={f} label={f} active={schFilter === f} onClick={() => setSchFilter(f)} />
                ))}
              </div>

              {filteredSch.length === 0 ? (
                <div>
                  <EmptyState message="No scholarships match your search or filters." />
                  <div style={{ textAlign: "center", marginTop: 12 }}>
                    <button onClick={() => { setSchFilter("All"); setSchDegree("All"); setSchSearch(""); }} style={{ background: "none", border: "1px solid rgba(var(--accent-rgb),0.3)", borderRadius: 50, padding: "7px 20px", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "var(--accent)", cursor: "pointer", letterSpacing: 1 }}>
                      Clear all filters
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Mobile: carousel (all filtered cards, no Show More) */}
                  <MobileCarousel>
                    {filteredSch.map(s => (
                      <ScholarshipCard key={s.id} s={s} isBookmarked={isBookmarked(s.id)} onToggle={toggleBookmark} />
                    ))}
                  </MobileCarousel>

                  {/* Desktop: grid + Show More */}
                  <div className="desktop-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
                    {filteredSch.slice(0, schVisible).map(s => (
                      <ScholarshipCard key={s.id} s={s} isBookmarked={isBookmarked(s.id)} onToggle={toggleBookmark} />
                    ))}
                  </div>
                  <div className="desktop-showmore">
                    <ShowMore visible={schVisible} total={filteredSch.length} pageSize={PAGE_SIZE} onMore={() => setSchVisible(v => v + PAGE_SIZE)} onLess={() => setSchVisible(PAGE_SIZE)} label="scholarships" />
                  </div>
                </>
              )}

              {/* Suggest a scholarship */}
              <div style={{ textAlign: "center", marginTop: 48, paddingTop: 32, borderTop: "1px solid rgba(var(--accent-rgb),0.08)" }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "var(--text-dim)", marginBottom: 12 }}>
                  Know a scholarship that should be here?
                </p>
                <a
                  href={suggestHref}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    background: "none",
                    border: "1px solid rgba(var(--accent-rgb),0.3)",
                    borderRadius: 50,
                    padding: "9px 22px",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: "var(--accent)",
                    textDecoration: "none",
                    letterSpacing: 1,
                    transition: "border-color 0.2s ease, background 0.2s ease",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.background = "rgba(var(--accent-rgb),0.06)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(var(--accent-rgb),0.3)"; e.currentTarget.style.background = "none"; }}
                >
                  <Mail size={12} strokeWidth={2} />
                  Suggest a scholarship
                </a>
              </div>
            </>
          )}

          {/* ── SAVED ── */}
          {activeTab === "saved" && (
            <>
              {allSavedCount === 0 ? (
                <EmptyState message="No saved scholarships yet. Hit the bookmark icon on any card to save it here." />
              ) : (
                <>
                  {/* Mobile: carousel */}
                  <MobileCarousel>
                    {scholarships.filter(s => isBookmarked(s.id)).map(s => (
                      <ScholarshipCard key={s.id} s={s} isBookmarked={true} onToggle={toggleBookmark} />
                    ))}
                  </MobileCarousel>

                  {/* Desktop: grid */}
                  <div className="desktop-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
                    {scholarships.filter(s => isBookmarked(s.id)).map(s => (
                      <ScholarshipCard key={s.id} s={s} isBookmarked={true} onToggle={toggleBookmark} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {/* ── TRENDS ── */}
          {activeTab === "trends" && (
            <>
              {/* Category filters */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
                {trendCategories.map(tab => (
                  <FilterBtn key={tab.value} label={tab.label} active={trendFilter === tab.value} onClick={() => setTrendFilter(tab.value)} />
                ))}
              </div>

              {filteredTrends.length === 0 ? (
                <EmptyState message="No trends match this filter." />
              ) : (
                <>
                  {/* Mobile: carousel */}
                  <MobileCarousel>
                    {filteredTrends.map(t => <TrendCard key={t.id} t={t} />)}
                  </MobileCarousel>

                  {/* Desktop: grid + Show More */}
                  <div className="desktop-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 20 }}>
                    {filteredTrends.slice(0, trendVisible).map(t => <TrendCard key={t.id} t={t} />)}
                  </div>
                  <div className="desktop-showmore">
                    <ShowMore visible={trendVisible} total={filteredTrends.length} pageSize={PAGE_SIZE} onMore={() => setTrendVisible(v => v + PAGE_SIZE)} onLess={() => setTrendVisible(PAGE_SIZE)} label="trends" />
                  </div>
                </>
              )}
            </>
          )}

        </div>
      </section>

      <Footer />
      <ThemePalette />
      <BackToTop />
    </div>
  );
}
