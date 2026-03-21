export default function TurbineSVG() {
  const style = `
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    .blade-group { animation: spin 12s linear infinite; transform-origin: 150px 150px; }
  `;
  return (
    <svg
      width="300"
      height="300"
      viewBox="0 0 300 300"
      style={{ opacity: 0.08, position: "absolute", right: "5%", top: "15%" }}
    >
      <style>{style}</style>
      <g className="blade-group">
        {[0, 60, 120, 180, 240, 300].map((r, i) => (
          <ellipse
            key={i}
            cx="150"
            cy="60"
            rx="12"
            ry="80"
            fill="#d4a853"
            transform={`rotate(${r} 150 150)`}
          />
        ))}
      </g>
      <circle cx="150" cy="150" r="18" fill="#0a0a0a" stroke="#d4a853" strokeWidth="2" />
      <circle cx="150" cy="150" r="8" fill="#d4a853" />
    </svg>
  );
}
