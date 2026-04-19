import { ExternalLink, Calendar, MapPin } from "lucide-react";
import { deadlineInfo } from "../../utils/deadline";
import { tagStyle, cardBase, cardHoverOn, cardHoverOff } from "./styles";

export default function ScholarshipCard({ s }) {
  const dl = deadlineInfo(s.deadline);
  return (
    <div
      style={{ ...cardBase, gap: 14 }}
      onMouseEnter={e => cardHoverOn(e.currentTarget)}
      onMouseLeave={e => cardHoverOff(e.currentTarget)}
    >
      {/* Tags row */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        <span style={tagStyle("region")}>
          <MapPin size={9} strokeWidth={2} style={{ marginRight: 3 }} />
          {s.region}
        </span>
        <span style={tagStyle("field")}>{s.field === "Any" ? "All Fields" : s.field}</span>
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
