import SectionTitle from "./SectionTitle";

const AWARDS = [
  { title: "Best Undergraduate Research Project", org: "Marwadi University, ME Dept.", year: "2026" },
  { title: "Best Research Poster, 2nd Runner-Up", org: "ASME Annual Conference, India Chapter", year: "2025" },
  { title: "Young Innovator Award, Top 100 Asia-Pacific", org: "Global Peace Foundation Japan", year: "2025" },
  { title: "Most Decorated Graduate", org: "Booker Washington Institute, Class of 2021", year: "2021" },
  { title: "Community Social Impact Award", org: "Omega Old Field Block C, Liberia", year: "2020" },
  { title: "UWC Scholar Nominee", org: "Liberia National Selection", year: "2019" },
];

const CERTIFICATIONS = [
  "ANSYS Simulation Training (2025)",
  "NPTEL Engineering Metrology, IIT Kanpur (2024)",
  "MATLAB for Mechanical Engineers, Internshala (2024)",
  "General CAT Technician, Magna Cum Laude (2021)",
];

const MEMBERSHIPS = ["ASME", "IEEE", "Engineering Society of Liberia"];

export default function Achievements({ achRef, achVis }) {
  return (
    <section id="achievements" ref={achRef} className="section-pad">
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionTitle label="Honors & Awards" number={5} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {AWARDS.map((a, i) => (
            <div
              key={i}
              style={{
                background: "var(--bg-card)",
                border: "1px solid rgba(var(--accent-rgb),0.06)",
                borderRadius: 8,
                padding: "28px 24px",
                position: "relative",
                overflow: "hidden",
                opacity: achVis ? 1 : 0,
                transform: achVis ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.5s ease",
                transitionDelay: `${i * 100}ms`,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(var(--accent-rgb),0.3)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(var(--accent-rgb),0.06)")}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 3,
                  height: "100%",
                  background: "var(--accent)",
                  opacity: 0.7,
                }}
              />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: "var(--accent)",
                  letterSpacing: 1,
                }}
              >
                {a.year}
              </span>
              <h4
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 16,
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  margin: "10px 0 6px",
                }}
              >
                {a.title}
              </h4>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  color: "var(--text-dim)",
                }}
              >
                {a.org}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 48,
            opacity: achVis ? 1 : 0,
            transition: "opacity 0.8s ease 0.7s",
          }}
        >
          <h3
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 16,
              fontWeight: 600,
              color: "var(--text-muted)",
              marginBottom: 20,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            Certifications
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {CERTIFICATIONS.map((c, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  color: "var(--text-muted)",
                  background: "rgba(var(--accent-rgb),0.03)",
                  border: "1px solid rgba(var(--accent-rgb),0.07)",
                  padding: "10px 18px",
                  borderRadius: 6,
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        <div
          style={{
            marginTop: 32,
            opacity: achVis ? 1 : 0,
            transition: "opacity 0.8s ease 0.9s",
          }}
        >
          <h3
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 16,
              fontWeight: 600,
              color: "var(--text-muted)",
              marginBottom: 20,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            Professional Memberships
          </h3>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {MEMBERSHIPS.map((m, i) => (
              <div
                key={i}
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--accent)",
                  background: "rgba(var(--accent-rgb),0.07)",
                  border: "1px solid rgba(var(--accent-rgb),0.18)",
                  padding: "12px 24px",
                  borderRadius: 6,
                }}
              >
                {m}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
