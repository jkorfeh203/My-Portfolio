import {
  GraduationCap,
  FlaskConical,
  Globe,
  Settings,
  BarChart3,
  Trophy,
} from "lucide-react";
import SectionTitle from "./SectionTitle";

const ABOUT_CARDS = [
  { Icon: GraduationCap, label: "B.Tech Mechanical Eng.", sub: "First Class with Distinction" },
  { Icon: FlaskConical, label: "Thermal Engineering", sub: "Specialization" },
  { Icon: Globe, label: "Y-LEAD Liberia", sub: "Founder & CEO" },
  { Icon: Settings, label: "7+ Years", sub: "Machinery Experience" },
  { Icon: BarChart3, label: "Top 10%", sub: "ME Department" },
  { Icon: Trophy, label: "Best Research", sub: "Project Award 2026" },
];

export default function About({ aboutRef, aboutVis }) {
  return (
    <section id="about" ref={aboutRef} className="section-pad" style={{ position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionTitle label="About" number={1} />
        <div className="about-grid">
          <div
            style={{
              opacity: aboutVis ? 1 : 0,
              transform: aboutVis ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease",
            }}
          >
            <p
              style={{
                fontSize: 17,
                color: "var(--text-secondary)",
                lineHeight: 1.85,
                marginBottom: 20,
              }}
            >
              I am a Mechanical Engineering graduate from Marwadi University, India, specializing in{" "}
              <strong style={{ color: "var(--accent)" }}>Thermal Engineering</strong> and{" "}
              <strong style={{ color: "var(--accent)" }}>Sustainable Energy Systems</strong>. My work
              bridges computational modeling, experimental validation, and real-world engineering to
              develop energy technologies for underserved regions.
            </p>
            <p
              style={{
                fontSize: 17,
                color: "var(--text-secondary)",
                lineHeight: 1.85,
                marginBottom: 20,
              }}
            >
              With over seven years of hands-on heavy and light machinery experience, a CAT Service
              Technician apprenticeship, and externally funded research in geothermal hybrid energy,
              I bring a unique combination of theoretical depth and practical engineering expertise.
            </p>
            <p style={{ fontSize: 17, color: "var(--text-secondary)", lineHeight: 1.85 }}>
              Beyond engineering, I lead <strong style={{ color: "var(--accent-mid)" }}>Y-LEAD Liberia</strong>,
              a youth empowerment NGO, and{" "}
              <strong style={{ color: "var(--accent-mid)" }}>KDARC Study Abroad Agency</strong>, mentoring
              students toward international education. My long-term mission: developing sustainable
              energy technologies for Africa.
            </p>
          </div>
          <div
            style={{
              opacity: aboutVis ? 1 : 0,
              transition: "opacity 0.6s ease 0.3s",
            }}
          >
            <div className="about-cards-grid">
              {ABOUT_CARDS.map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid rgba(var(--accent-rgb),0.1)",
                    borderRadius: 8,
                    padding: "20px 16px",
                    transition: "border-color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "rgba(var(--accent-rgb),0.35)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "rgba(var(--accent-rgb),0.1)")
                  }
                >
                  <div style={{ marginBottom: 10, color: "var(--accent)" }}>
                    <item.Icon size={24} strokeWidth={1.8} />
                  </div>
                  <div
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      marginBottom: 4,
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      color: "var(--text-dim)",
                    }}
                  >
                    {item.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
