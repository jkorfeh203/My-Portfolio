import SectionTitle from "./SectionTitle";
import TimelineItem from "./TimelineItem";

const LEADERSHIP = [
  {
    title: "Founder & CEO",
    org: "Y-LEAD Liberia",
    period: "2023 — Present",
    points: [
      "Founded a youth-led NGO addressing environmental degradation, academic access, and socio-economic challenges affecting young Liberians",
      "Organized 5+ mentorship programs and environmental campaigns reaching 200+ students",
    ],
    delay: 0,
  },
  {
    title: "CEO",
    org: "KDARC Study Abroad Agency",
    period: "2024 — Present",
    points: [
      "Guided 30+ Liberian students toward international university admissions and scholarship applications",
      "Provided SOP review, university selection coaching, and application strategy",
    ],
    delay: 150,
  },
  {
    title: "International Student Representative",
    org: "Marwadi University",
    period: "2022 — 2026",
    points: ["Advocated for 500+ international students as liaison between student body and university administration"],
    delay: 300,
  },
];

const INDUSTRY = [
  {
    title: "CAT Service Technician",
    org: "Mantrac Liberia",
    period: "Oct 2021 — Nov 2022",
    points: [
      "Diagnosed and repaired CAT heavy equipment (excavators, loaders, dozers) using CAT ET and SIS",
      "Performed hydraulic, mechanical, and electrical troubleshooting; certified on CAT Forklift, Wheel Loader, and Dozer",
    ],
    delay: 100,
  },
  {
    title: "Automotive Mechanic",
    org: "VA & Sons Automotive, Monrovia",
    period: "2014 — 2022",
    points: [
      "7+ years of vehicle diagnostics, engine repair, and heavy machinery maintenance",
      "Built practical understanding of thermodynamic and fluid power systems",
    ],
    delay: 250,
  },
  {
    title: "Research Intern",
    org: "Fluid Power Engineering Lab, MU",
    period: "May 2024 — Feb 2026",
    points: [
      "Conducted thermal-fluid experiments and contributed to data analysis for faculty-led renewable energy projects",
    ],
    delay: 400,
  },
];

export default function Experience({ expRef, expVis }) {
  return (
    <section
      id="experience"
      ref={expRef}
      className="section-pad"
      style={{ background: "var(--bg-section)" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionTitle label="Experience" number={4} />
        <div className="exp-grid">
          <div>
            <h3
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 15,
                fontWeight: 600,
                color: "var(--accent)",
                marginBottom: 32,
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              Leadership
            </h3>
            {LEADERSHIP.map((item, i) => (
              <TimelineItem
                key={i}
                visible={expVis}
                delay={item.delay}
                title={item.title}
                org={item.org}
                period={item.period}
                points={item.points}
              />
            ))}
          </div>
          <div>
            <h3
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 15,
                fontWeight: 600,
                color: "var(--accent-mid)",
                marginBottom: 32,
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              Industry
            </h3>
            {INDUSTRY.map((item, i) => (
              <TimelineItem
                key={i}
                visible={expVis}
                delay={item.delay}
                title={item.title}
                org={item.org}
                period={item.period}
                points={item.points}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
