import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el  = document.documentElement;
      const pos = el.scrollTop  || document.body.scrollTop;
      const max = el.scrollHeight - el.clientHeight;
      setPct(max > 0 ? (pos / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 200,
        background: "rgba(var(--accent-rgb),0.08)",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${pct}%`,
          background: "linear-gradient(90deg, var(--accent-dark), var(--accent), var(--accent-light))",
          transition: "width 0.1s linear",
          boxShadow: "0 0 8px rgba(var(--accent-rgb),0.6)",
        }}
      />
    </div>
  );
}
