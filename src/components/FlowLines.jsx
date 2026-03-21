export default function FlowLines({ style: s = {} }) {
  return (
    <svg viewBox="0 0 200 60" style={{ width: 200, height: 60, ...s }}>
      {[0, 15, 30, 45].map((y, i) => (
        <path
          key={i}
          d={`M0 ${y + 8} Q50 ${y + (i % 2 === 0 ? 0 : 16)}, 100 ${y + 8} T200 ${y + 8}`}
          fill="none"
          stroke="#d4a853"
          strokeWidth="0.8"
          opacity={0.15 + i * 0.05}
        />
      ))}
    </svg>
  );
}
