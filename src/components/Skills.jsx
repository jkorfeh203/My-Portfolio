import SectionTitle from "./SectionTitle";
import SkillGauge from "./SkillGauge";

const SIMULATION_SKILLS = [
  { label: "ANSYS Fluent", level: 90, delay: 0 },
  { label: "ANSYS Workbench", level: 85, delay: 80 },
  { label: "MATLAB / Simulink", level: 85, delay: 160 },
  { label: "SolidWorks", level: 80, delay: 240 },
  { label: "AutoCAD", level: 80, delay: 320 },
  { label: "ICEM CFD", level: 75, delay: 400 },
];

const DOMAIN_SKILLS = [
  { label: "Thermal Engineering", level: 92, delay: 100 },
  { label: "CFD & Turbulence Modeling", level: 88, delay: 180 },
  { label: "Renewable Energy Systems", level: 85, delay: 260 },
  { label: "Heat Transfer", level: 88, delay: 340 },
  { label: "Fluid Mechanics", level: 85, delay: 420 },
  { label: "Mechanical Design", level: 78, delay: 500 },
];

const METHODS_TAGS = [
  "CFD Turbulence Modeling (k-ε, k-ω SST)",
  "Thermodynamic Modeling",
  "Experimental Validation",
  "Prototype Fabrication",
  "Data Acquisition",
  "Heavy Machinery Diagnostics",
  "Hydraulic Systems",
  "Engine Repair",
  "CAT Equipment Operation",
  "Thermal Imaging",
];

export default function Skills({ skillRef, skillVis }) {
  return (
    <section id="skills" ref={skillRef} className="section-pad">
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionTitle label="Technical Skills" number={3} />
        <div className="skills-grid">
          <div>
            <h3
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 16,
                fontWeight: 600,
                color: "var(--accent)",
                marginBottom: 24,
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              Simulation & Tools
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {SIMULATION_SKILLS.map((s, i) => (
                <SkillGauge
                  key={i}
                  label={s.label}
                  level={s.level}
                  delay={s.delay}
                  visible={skillVis}
                />
              ))}
            </div>
          </div>
          <div>
            <h3
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 16,
                fontWeight: 600,
                color: "var(--accent-mid)",
                marginBottom: 24,
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              Engineering Domains
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {DOMAIN_SKILLS.map((s, i) => (
                <SkillGauge
                  key={i}
                  label={s.label}
                  level={s.level}
                  delay={s.delay}
                  visible={skillVis}
                />
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 48 }}>
          <h3
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 16,
              fontWeight: 600,
              color: "var(--accent-soft)",
              marginBottom: 20,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            Research Methods & Practical Skills
          </h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              opacity: skillVis ? 1 : 0,
              transition: "opacity 0.8s ease 0.6s",
            }}
          >
            {METHODS_TAGS.map((s, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  color: "var(--text-secondary)",
                  background: "rgba(var(--accent-rgb),0.07)",
                  border: "1px solid rgba(var(--accent-rgb),0.18)",
                  padding: "8px 16px",
                  borderRadius: 20,
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
