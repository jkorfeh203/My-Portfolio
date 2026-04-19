import { ExternalLink, Zap, BookOpen } from "lucide-react";
import { tagStyle, cardBase, cardHoverOn, cardHoverOff } from "./styles";

export default function TrendCard({ t }) {
  const isAI = t.category === "ai";
  return (
    <div
      style={{ ...cardBase, gap: 12 }}
      onMouseEnter={e => cardHoverOn(e.currentTarget)}
      onMouseLeave={e => cardHoverOff(e.currentTarget)}
    >
      {/* Category + source */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
        <span style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          letterSpacing: 1.5,
          textTransform: "uppercase",
          color: isAI ? "#818cf8" : "var(--accent)",
          background: isAI ? "rgba(129,140,248,0.1)" : "rgba(var(--accent-rgb),0.1)",
          padding: "3px 10px",
          borderRadius: 50,
        }}>
          {isAI ? <Zap size={9} strokeWidth={2} /> : <BookOpen size={9} strokeWidth={2} />}
          {isAI ? "AI & Engineering" : "Mechanical"}
        </span>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          color: "var(--text-dim)",
          letterSpacing: 0.5,
        }}>
          {t.source}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: 15,
        fontWeight: 800,
        color: "var(--text-primary)",
        lineHeight: 1.4,
      }}>
        {t.title}
      </h3>

      {/* Summary */}
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 13,
        color: "var(--text-muted)",
        lineHeight: 1.75,
        flex: 1,
      }}>
        {t.summary}
      </p>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {t.tags.map(tag => (
          <span key={tag} style={tagStyle("tag")}>{tag}</span>
        ))}
      </div>

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: "var(--text-dim)",
        }}>
          {new Date(t.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
        </span>
        <a
          href={t.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: "var(--accent)",
            textDecoration: "none",
            letterSpacing: 1,
            textTransform: "uppercase",
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          Read <ExternalLink size={10} strokeWidth={2.5} />
        </a>
      </div>
    </div>
  );
}
