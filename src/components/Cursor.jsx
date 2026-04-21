import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, [role=button], input, textarea, select, label";

export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const pos     = useRef({ x: -100, y: -100 });
  const ring    = useRef({ x: -100, y: -100 });
  const raf     = useRef(null);
  const hovered = useRef(false);

  useEffect(() => {
    document.body.style.cursor = "none";

    const lerp = (a, b, t) => a + (b - a) * t;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };

      // Check on every move — no relatedTarget edge cases, works across navigations
      const over = e.target instanceof Element && !!e.target.closest(INTERACTIVE);
      if (over && !hovered.current) {
        hovered.current = true;
        if (dotRef.current)  dotRef.current.style.transform    = "translate(-50%,-50%) scale(2.2)";
        if (ringRef.current) ringRef.current.style.transform   = "translate(-50%,-50%) scale(1.6)";
        if (ringRef.current) ringRef.current.style.borderColor = "rgba(var(--accent-rgb),0.8)";
      } else if (!over && hovered.current) {
        hovered.current = false;
        if (dotRef.current)  dotRef.current.style.transform    = "translate(-50%,-50%) scale(1)";
        if (ringRef.current) ringRef.current.style.transform   = "translate(-50%,-50%) scale(1)";
        if (ringRef.current) ringRef.current.style.borderColor = "rgba(var(--accent-rgb),0.45)";
      }
    };

    const loop = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.12);
      if (dotRef.current) {
        dotRef.current.style.left = pos.current.x + "px";
        dotRef.current.style.top  = pos.current.y + "px";
      }
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + "px";
        ringRef.current.style.top  = ring.current.y + "px";
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    document.addEventListener("mousemove", onMove);

    return () => {
      document.body.style.cursor = "";
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  if ("ontouchstart" in window) return null;

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "var(--accent)",
          pointerEvents: "none",
          zIndex: 99999,
          transform: "translate(-50%,-50%) scale(1)",
          transition: "transform 0.2s ease, background 0.4s ease, box-shadow 0.4s ease",
          boxShadow: "0 0 10px rgba(var(--accent-rgb),0.8)",
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          width: 30,
          height: 30,
          borderRadius: "50%",
          border: "1.5px solid rgba(var(--accent-rgb),0.45)",
          pointerEvents: "none",
          zIndex: 99998,
          transform: "translate(-50%,-50%) scale(1)",
          transition: "transform 0.25s ease, border-color 0.4s ease",
        }}
      />
    </>
  );
}
