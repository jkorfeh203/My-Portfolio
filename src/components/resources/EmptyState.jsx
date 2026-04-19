import { SearchX } from "lucide-react";

export default function EmptyState({ message }) {
  return (
    <div style={{ textAlign: "center", padding: "60px 0" }}>
      <SearchX
        size={36}
        strokeWidth={1.5}
        style={{ display: "block", margin: "0 auto 16px", color: "var(--text-dim)" }}
      />
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "var(--text-dim)" }}>
        {message}
      </p>
    </div>
  );
}
