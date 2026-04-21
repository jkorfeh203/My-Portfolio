import { useEffect, useRef } from "react";
import { Check } from "lucide-react";

export default function Toast({ message, visible, onHide }) {
  const timerRef = useRef(null);

  useEffect(() => {
    if (visible) {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(onHide, 3200);
    }
    return () => clearTimeout(timerRef.current);
  }, [visible, onHide]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 148,
        right: 28,
        zIndex: 9000,
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "12px 18px",
        background: "rgba(var(--bg-rgb),0.97)",
        border: "1px solid rgba(var(--accent-rgb),0.45)",
        borderRadius: 10,
        boxShadow: "0 8px 32px rgba(var(--accent-rgb),0.15)",
        backdropFilter: "blur(12px)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.95)",
        transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
        pointerEvents: "none",
        maxWidth: 280,
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: "rgba(var(--accent-rgb),0.15)",
          border: "1.5px solid rgba(var(--accent-rgb),0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          color: "var(--accent)",
        }}
      >
        <Check size={13} strokeWidth={3} />
      </div>
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          color: "var(--text-primary)",
          lineHeight: 1.4,
        }}
      >
        {message}
      </span>
      {/* Progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 2,
          borderRadius: "0 0 10px 10px",
          background: "linear-gradient(90deg, var(--accent), var(--accent-light, var(--accent)))",
          width: visible ? "0%" : "100%",
          transition: visible ? "width 3.2s linear" : "none",
        }}
      />
    </div>
  );
}
