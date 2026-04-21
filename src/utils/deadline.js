export function deadlineInfo(deadline) {
  if (!deadline) {
    return { label: "Rolling", color: "var(--text-dim)", bg: "rgba(var(--accent-rgb),0.06)" };
  }
  const parsed = new Date(deadline);
  if (isNaN(parsed.getTime())) {
    return { label: deadline, color: "var(--text-dim)", bg: "rgba(var(--accent-rgb),0.06)" };
  }
  const days = Math.ceil((parsed - new Date()) / 86400000);
  if (days < 0)  return { label: "Closed",        color: "#6b7280", bg: "rgba(107,114,128,0.08)" };
  if (days < 10) return { label: `${days}d left`, color: "#ef4444", bg: "rgba(239,68,68,0.08)" };
  if (days < 20) return { label: `${days}d left`, color: "#f59e0b", bg: "rgba(245,158,11,0.08)" };
  return {
    label: parsed.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    color: "var(--text-dim)",
    bg: "rgba(var(--accent-rgb),0.06)",
  };
}
