import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const pos     = useRef({ x: -100, y: -100 });
  const ring    = useRef({ x: -100, y: -100 });
  const raf     = useRef(null);

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = "none";

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    // Hover scale on interactive elements — use current CSS vars at call time
    const onEnter = () => {
      if (dotRef.current)  dotRef.current.style.transform  = "translate(-50%,-50%) scale(2.2)";
      if (ringRef.current) ringRef.current.style.transform = "translate(-50%,-50%) scale(1.6)";
      if (ringRef.current) ringRef.current.style.borderColor = "rgba(var(--accent-rgb),0.8)";
    };
    const onLeave = () => {
      if (dotRef.current)  dotRef.current.style.transform  = "translate(-50%,-50%) scale(1)";
      if (ringRef.current) ringRef.current.style.transform = "translate(-50%,-50%) scale(1)";
      if (ringRef.current) ringRef.current.style.borderColor = "rgba(var(--accent-rgb),0.45)";
    };

    const interactables = document.querySelectorAll(
      "a, button, [role=button], input, textarea, select, label"
    );
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    // RAF loop — ring lerps toward dot position
    const lerp = (a, b, t) => a + (b - a) * t;
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
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  // Only render on non-touch devices
  if ("ontouchstart" in window) return null;

  return (
    <>
      {/* Dot — exact position, colors driven by CSS vars */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "var(--accent)",
          pointerEvents: "none",
          zIndex: 99999,
          transform: "translate(-50%,-50%) scale(1)",
          transition: "transform 0.2s ease, background 0.4s ease, box-shadow 0.4s ease",
          boxShadow: "0 0 10px rgba(var(--accent-rgb),0.8)",
        }}
      />
      {/* Ring — lerped position, colors driven by CSS vars */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          width: 36,
          height: 36,
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
