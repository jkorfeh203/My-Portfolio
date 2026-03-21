export default function BlueprintBG() {
  return (
    <svg
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        opacity: 0.04,
        pointerEvents: "none",
      }}
    >
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#d4a853" strokeWidth="0.5" />
        </pattern>
        <pattern id="gridLg" width="200" height="200" patternUnits="userSpaceOnUse">
          <rect width="200" height="200" fill="url(#grid)" />
          <path d="M 200 0 L 0 0 0 200" fill="none" stroke="#d4a853" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#gridLg)" />
    </svg>
  );
}
