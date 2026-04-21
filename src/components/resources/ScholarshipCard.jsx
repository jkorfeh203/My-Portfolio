import { ExternalLink, Calendar, MapPin, Bookmark, Share2 } from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { deadlineInfo } from "../../utils/deadline";
import { tagStyle, cardBase, cardHoverOn, cardHoverOff } from "./styles";

const dim = { color: "var(--text-dim)", fontStyle: "italic" };

const DEGREE_LABELS = {
  BS:  "Bachelor of Science",
  MS:  "Master of Science",
  PhD: "Doctor of Philosophy",
};

function DegreeTag({ d }) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <span style={tagStyle("degree")}>{d}</span>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side="top"
          sideOffset={6}
          style={{
            background: "var(--bg-card, #1a1a1a)",
            color: "var(--text-primary)",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            letterSpacing: 0.5,
            padding: "5px 12px",
            borderRadius: 6,
            border: "1px solid rgba(var(--accent-rgb),0.18)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
            userSelect: "none",
            zIndex: 9999,
          }}
        >
          {DEGREE_LABELS[d] ?? d}
          <Tooltip.Arrow style={{ fill: "var(--bg-card, #1a1a1a)" }} />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

export default function ScholarshipCard({ s, isBookmarked, onToggle }) {
  const dl = deadlineInfo(s.deadline);

  const waText = encodeURIComponent(
    `${s.name} — ${s.amount}\nDeadline: ${s.deadline}\nApply: ${s.link}`
  );
  const waUrl = `https://wa.me/?text=${waText}`;

  return (
    <Tooltip.Provider delayDuration={300}>
      <div
        style={{ ...cardBase, gap: 14, position: "relative" }}
        onMouseEnter={e => cardHoverOn(e.currentTarget)}
        onMouseLeave={e => cardHoverOff(e.currentTarget)}
      >
        {/* Bookmark — anchored top-right, never in flow */}
        {onToggle && (
          <button
            onClick={() => onToggle(s.id)}
            title={isBookmarked ? "Remove bookmark" : "Save scholarship"}
            style={{
              position: "absolute",
              top: 18,
              right: 18,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 4,
              color: isBookmarked ? "var(--accent)" : "var(--text-dim)",
              display: "flex",
              alignItems: "center",
              transition: "color 0.2s ease",
              zIndex: 1,
            }}
          >
            <Bookmark size={15} strokeWidth={2} fill={isBookmarked ? "currentColor" : "none"} />
          </button>
        )}

        {/* Tags row — wraps freely, bookmark never interferes */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", paddingRight: onToggle ? 28 : 0 }}>
          <span style={tagStyle("region")}>
            <MapPin size={9} strokeWidth={2} style={{ marginRight: 3 }} />
            {s.region || <span style={dim}>Region not specified</span>}
          </span>
          <span style={tagStyle("field")}>{s.field === "Any" ? "All Fields" : (s.field || <span style={dim}>Field TBD</span>)}</span>
          {(s.degree && s.degree.length > 0)
            ? s.degree.map(d => <DegreeTag key={d} d={d} />)
            : <span style={{ ...tagStyle("degree"), ...dim }}>Degree TBD</span>
          }
        </div>

        {/* Name + org */}
        <div>
          <h3 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 17,
            fontWeight: 800,
            color: s.name ? "var(--text-primary)" : "var(--text-dim)",
            marginBottom: 4,
            lineHeight: 1.3,
            fontStyle: s.name ? "normal" : "italic",
          }}>
            {s.name || "Untitled Scholarship"}
          </h3>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: "var(--text-dim)",
            letterSpacing: 0.5,
            fontStyle: s.organization ? "normal" : "italic",
          }}>
            {s.organization || "Organization not specified"}
          </p>
        </div>

        {/* Amount */}
        <div style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 20,
          fontWeight: 800,
          color: s.amount ? "var(--accent)" : "var(--text-dim)",
          fontStyle: s.amount ? "normal" : "italic",
        }}>
          {s.amount || "Amount TBD"}
        </div>

        {/* Description */}
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          color: s.description ? "var(--text-muted)" : "var(--text-dim)",
          lineHeight: 1.7,
          flex: 1,
          fontStyle: s.description ? "normal" : "italic",
        }}>
          {s.description || "Description not available."}
        </p>

        {/* Footer: deadline + WhatsApp + Apply */}
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

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {/* WhatsApp share with Radix tooltip */}
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "rgba(var(--accent-rgb),0.10)",
                    color: "var(--accent)",
                    textDecoration: "none",
                    transition: "background 0.2s ease",
                    flexShrink: 0,
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(var(--accent-rgb),0.20)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(var(--accent-rgb),0.10)"}
                >
                  <Share2 size={14} strokeWidth={2} />
                </a>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  side="top"
                  sideOffset={6}
                  style={{
                    background: "var(--bg-card, #1a1a1a)",
                    color: "var(--text-primary)",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    letterSpacing: 0.5,
                    padding: "5px 12px",
                    borderRadius: 6,
                    border: "1px solid rgba(var(--accent-rgb),0.18)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
                    userSelect: "none",
                    zIndex: 9999,
                  }}
                >
                  Share on WhatsApp
                  <Tooltip.Arrow style={{ fill: "var(--bg-card, #1a1a1a)" }} />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>

            {/* Apply */}
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
      </div>
    </Tooltip.Provider>
  );
}
