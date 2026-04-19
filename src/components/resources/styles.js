export function tagStyle(type) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 9,
    letterSpacing: 1,
    textTransform: "uppercase",
    padding: "3px 9px",
    borderRadius: 4,
    border: "1px solid rgba(var(--accent-rgb),0.18)",
    color: "var(--text-dim)",
    background: "rgba(var(--accent-rgb),0.05)",
  };
  if (type === "field") return { ...base, color: "var(--accent)", borderColor: "rgba(var(--accent-rgb),0.3)", background: "rgba(var(--accent-rgb),0.08)" };
  return base;
}

export const cardBase = {
  background: "var(--bg-card)",
  border: "1px solid rgba(var(--accent-rgb),0.12)",
  borderRadius: 14,
  padding: "24px 22px",
  display: "flex",
  flexDirection: "column",
  transition: "all 0.3s ease",
};

export function cardHoverOn(el) {
  el.style.borderColor = "rgba(var(--accent-rgb),0.35)";
  el.style.transform = "translateY(-3px)";
  el.style.boxShadow = "0 10px 32px rgba(var(--accent-rgb),0.08)";
}

export function cardHoverOff(el) {
  el.style.borderColor = "rgba(var(--accent-rgb),0.12)";
  el.style.transform = "translateY(0)";
  el.style.boxShadow = "none";
}
