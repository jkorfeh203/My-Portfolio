import { Mail, Linkedin, Link2, Phone } from "lucide-react";
import SectionTitle from "./SectionTitle";

const CONTACT_ITEMS = [
  {
    Icon: Mail,
    label: "Email",
    value: "johnkorfeh2017@gmail.com",
    href: "mailto:johnkorfeh2017@gmail.com",
  },
  {
    Icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/john-korfeh-a2087029b",
    href: "https://linkedin.com/in/john-korfeh-a2087029b/",
  },
  {
    Icon: Link2,
    label: "ORCID",
    value: "0009-0004-7323-3507",
    href: "https://orcid.org/0009-0004-7323-3507",
  },
  {
    Icon: Phone,
    label: "Phone",
    value: "+91 93289 93445",
    href: "tel:+919328993445",
  },
];

const CTA_TAGS = ["ASME", "IEEE", "ESL"];

export default function Contact({ conRef, conVis }) {
  return (
    <section
      id="contact"
      ref={conRef}
      className="section-pad"
      style={{ background: "var(--bg-section)" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionTitle label="Contact" number={8} />
        <div
          className="contact-grid"
          style={{
            opacity: conVis ? 1 : 0,
            transform: conVis ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease",
          }}
        >
          <div>
            <p
              style={{
                fontSize: 18,
                color: "var(--text-secondary)",
                lineHeight: 1.8,
                marginBottom: 36,
              }}
            >
              I am actively seeking funded MS/PhD opportunities in Thermal Engineering, Energy
              Systems, and CFD research. If my work aligns with your research, I would welcome the
              chance to connect.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {CONTACT_ITEMS.map((c, i) => (
                <a
                  key={i}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    textDecoration: "none",
                    padding: "16px 20px",
                    background: "var(--bg-card)",
                    border: "1px solid rgba(var(--accent-rgb),0.1)",
                    borderRadius: 8,
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(var(--accent-rgb),0.35)";
                    e.currentTarget.style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(var(--accent-rgb),0.1)";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  <span style={{ color: "var(--accent)", display: "flex", alignItems: "center" }}>
                    <c.Icon size={20} strokeWidth={1.8} />
                  </span>
                  <div>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 10,
                        color: "var(--text-dim)",
                        letterSpacing: 1.5,
                        textTransform: "uppercase",
                        marginBottom: 4,
                      }}
                    >
                      {c.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 14,
                        color: "var(--text-secondary)",
                      }}
                    >
                      {c.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid rgba(var(--accent-rgb),0.12)",
              borderRadius: 12,
              padding: 40,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                border: "2px solid var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 24,
                background: "rgba(var(--accent-rgb),0.06)",
              }}
            >
              <span
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 28,
                  fontWeight: 800,
                  color: "var(--accent)",
                }}
              >
                JK
              </span>
            </div>
            <h3
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 22,
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: 8,
              }}
            >
              Let's Build the Future
            </h3>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: "var(--text-muted)",
                lineHeight: 1.7,
                maxWidth: 320,
              }}
            >
              Open to research collaborations, graduate supervision, and engineering projects
              focused on sustainable energy for developing regions.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              {CTA_TAGS.map((tag, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: "var(--accent)",
                    border: "1px solid rgba(var(--accent-rgb),0.25)",
                    padding: "4px 10px",
                    borderRadius: 4,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
