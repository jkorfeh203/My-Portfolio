import { useState } from "react";
import SectionTitle from "./SectionTitle";
import ProjectCard from "./ProjectCard";
import ResearchModal from "./ResearchModal";

const PROJECTS = [
  {
    title: "Geothermal-Assisted Hybrid Solar Chimney Power Plant Prototype",
    period: "2025 — Present",
    role: "Undergraduate Researcher | Externally Funded",
    points: [
      "Designed, fabricated, and experimentally evaluated a geothermal-assisted hybrid solar chimney prototype targeting affordable off-grid power for rural Sub-Saharan African communities",
      "Validated experimental data against CFD predictions (ANSYS Fluent) using thermocouple arrays, anemometers, and solar irradiance sensors for multi-parameter acquisition",
    ],
    tools: ["ANSYS Fluent", "Thermocouples", "CFD Validation", "Prototype Fabrication"],
    abstract:
      "This study presents the design, fabrication, and experimental evaluation of a geothermal-assisted hybrid solar chimney power plant prototype. The system integrates solar updraft tower principles with low-grade geothermal energy to enhance thermal buoyancy and power output. Experimental results are cross-validated against ANSYS Fluent CFD simulations to assess thermodynamic efficiency and scalability for rural Sub-Saharan African energy access.",
  },
  {
    title: "Hybrid Sustainable Power Generating Plant using Geothermal Energy: Numerical Analysis",
    period: "2024 — 2025",
    role: "Lead Researcher | Externally Funded",
    points: [
      "Developed coupled thermodynamic and CFD models using MATLAB, ANSYS Fluent, Workbench, and ICEM CFD to evaluate hybrid energy conversion efficiency",
      "Presented at FMFP Conference 2025 (100+ researchers); manuscript under peer review for journal publication",
    ],
    tools: ["MATLAB", "ANSYS Fluent", "ICEM CFD", "ANSYS Workbench"],
    abstract:
      "A comprehensive numerical investigation of a hybrid sustainable power plant that couples solar chimney and geothermal energy sources. Coupled thermodynamic and computational fluid dynamics models were developed to characterize flow patterns, temperature distributions, and energy conversion efficiency across a range of operating conditions. The work was presented at FMFP 2025 and a journal manuscript is currently under peer review.",
  },
  {
    title: "CFD Analysis of Aerodynamic Performance in a Quadcopter",
    period: "2024 — 2025",
    role: "Lead Researcher",
    points: [
      "Optimized lift-to-drag ratio and characterized turbulence behavior using k-ε and k-ω SST models across multiple angle-of-attack configurations",
      "Presented at TFGET Conference 2026; manuscript under peer review for journal publication",
    ],
    tools: ["ANSYS Fluent", "k-ε Model", "k-ω SST", "Turbulence Modeling"],
    abstract:
      "This research applies computational fluid dynamics to analyze the aerodynamic performance of a quadcopter drone across various flight configurations. Using k-ε and k-ω SST turbulence models in ANSYS Fluent, lift-to-drag ratios were optimized and flow separation characteristics were mapped for multiple angle-of-attack scenarios. The findings were presented at TFGET 2026 and are under journal review.",
  },
];

export default function Research({ resRef, resVis }) {
  const [selected, setSelected] = useState(null);

  return (
    <section
      id="research"
      ref={resRef}
      className="section-pad"
      style={{ background: "var(--bg-section)" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionTitle label="Research & Projects" number={2} />
        <div style={{ display: "grid", gap: 24 }}>
          {PROJECTS.map((p, i) => (
            <ProjectCard
              key={i}
              visible={resVis}
              delay={i * 150}
              title={p.title}
              period={p.period}
              role={p.role}
              points={p.points}
              tools={p.tools}
              onClick={() => setSelected(p)}
            />
          ))}
        </div>
        <div
          style={{
            marginTop: 40,
            padding: "24px 28px",
            background: "rgba(var(--accent-rgb),0.04)",
            border: "1px solid rgba(var(--accent-rgb),0.12)",
            borderRadius: 8,
          }}
        >
          <h4
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 15,
              fontWeight: 600,
              color: "var(--accent)",
              marginBottom: 12,
            }}
          >
            Publications
          </h4>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              color: "var(--text-muted)",
              lineHeight: 1.8,
              marginBottom: 8,
            }}
          >
            [1] Korfeh, J.T. et al. "Design & Development of a Hybrid Sustainable Power Generating
            Plant Using Geothermal Energy." FMFP 2025.{" "}
            <em style={{ color: "var(--text-dim)" }}>Under review.</em>
          </p>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              color: "var(--text-muted)",
              lineHeight: 1.8,
            }}
          >
            [2] Korfeh, J.T. et al. "CFD Analysis of Aerodynamic Performance in a Quadcopter." TFGET
            2026. <em style={{ color: "var(--text-dim)" }}>Under review.</em>
          </p>
        </div>
      </div>

      <ResearchModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
