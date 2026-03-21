import { useEffect, useRef } from "react";

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
        background: "rgba(10,8,4,0.97)",
        border: "1px solid rgba(212,168,83,0.45)",
        borderRadius: 10,
        boxShadow: "0 8px 32px rgba(212,168,83,0.15)",
        backdropFilter: "blur(12px)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.95)",
        transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
        pointerEvents: "none",
        maxWidth: 280,
      }}
    >
      {/* Checkmark icon */}
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: "rgba(212,168,83,0.15)",
          border: "1.5px solid rgba(212,168,83,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          color: "#d4a853",
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          color: "#f5efe0",
          lineHeight: 1.4,
        }}
      >
        {message}
      </span>
      {/* Gold progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 2,
          borderRadius: "0 0 10px 10px",
          background: "linear-gradient(90deg, #d4a853, #f0d070)",
          width: visible ? "0%" : "100%",
          transition: visible ? "width 3.2s linear" : "none",
        }}
      />
    </div>
  );
}
