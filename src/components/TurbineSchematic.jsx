// CFD turbine schematic illustration — kept for future use
// To use: import TurbineSchematic from "./TurbineSchematic"

export default function TurbineSchematic() {
  const accent = "rgba(var(--accent-rgb),";
  return (
    <svg
      viewBox="0 0 380 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    >
      {/* Corner bracket accents */}
      <path d="M8 8 L8 22 M8 8 L22 8"       stroke={`${accent}0.25)`} strokeWidth="1.2" strokeLinecap="square" />
      <path d="M372 8 L372 22 M372 8 L358 8" stroke={`${accent}0.25)`} strokeWidth="1.2" strokeLinecap="square" />
      <path d="M8 212 L8 198 M8 212 L22 212" stroke={`${accent}0.25)`} strokeWidth="1.2" strokeLinecap="square" />
      <path d="M372 212 L372 198 M372 212 L358 212" stroke={`${accent}0.25)`} strokeWidth="1.2" strokeLinecap="square" />

      {/* Background dot grid */}
      {Array.from({ length: 6 }).map((_, row) =>
        Array.from({ length: 11 }).map((_, col) => (
          <circle key={`${row}-${col}`} cx={32 + col * 32} cy={20 + row * 36} r={1.2} fill={`${accent}0.1)`} />
        ))
      )}

      {/* Dashed centre lines */}
      <line x1="190" y1="18" x2="190" y2="202" stroke={`${accent}0.18)`} strokeWidth="0.8" strokeDasharray="4 3" />
      <line x1="28"  y1="110" x2="352" y2="110" stroke={`${accent}0.18)`} strokeWidth="0.8" strokeDasharray="4 3" />

      {/* Outer rotor ring */}
      <circle cx="190" cy="110" r="74" stroke={`${accent}0.3)`}  strokeWidth="1.2" />
      {/* Hub ring */}
      <circle cx="190" cy="110" r="20" stroke={`${accent}0.45)`} strokeWidth="1.4" />
      {/* Hub centre dot */}
      <circle cx="190" cy="110" r="5"  fill={`${accent}0.45)`} />

      {/* Blade 1 — top */}
      <path
        d="M186 92 C183 66 177 42 187 26 C193 20 200 28 197 48 C195 64 192 78 190 92 Z"
        stroke={`${accent}0.55)`} strokeWidth="1.3" fill={`${accent}0.05)`}
      />
      {/* Blade 2 — right */}
      <path
        d="M208 114 C232 110 256 103 274 113 C280 120 272 127 254 125 C240 123 222 120 209 117 Z"
        stroke={`${accent}0.55)`} strokeWidth="1.3" fill={`${accent}0.05)`}
      />
      {/* Blade 3 — bottom */}
      <path
        d="M194 128 C197 154 203 178 193 194 C187 200 180 192 182 174 C184 160 187 144 190 128 Z"
        stroke={`${accent}0.55)`} strokeWidth="1.3" fill={`${accent}0.05)`}
      />
      {/* Blade 4 — left */}
      <path
        d="M172 106 C148 110 124 117 106 107 C100 100 108 93 126 95 C140 97 158 100 171 103 Z"
        stroke={`${accent}0.55)`} strokeWidth="1.3" fill={`${accent}0.05)`}
      />

      {/* Rotation arc + arrowhead */}
      <path d="M152 64 A52 52 0 0 1 228 64" stroke={`${accent}0.38)`} strokeWidth="1" fill="none" strokeDasharray="3 2.5" />
      <polygon points="228,64 220,58 224,71" fill={`${accent}0.38)`} />
      {/* ω label */}
      <text x="183" y="58" fontSize="12" fill={`${accent}0.55)`} fontFamily="Georgia,serif" fontStyle="italic">ω</text>

      {/* Incoming flow arrows — left */}
      {[90, 108, 126].map((y, i) => (
        <g key={i}>
          <line x1="28" y1={y} x2="60" y2={y} stroke={`${accent}0.42)`} strokeWidth="1.1" />
          <polygon points={`60,${y} 53,${y - 4} 53,${y + 4}`} fill={`${accent}0.42)`} />
        </g>
      ))}
      <text x="10" y="88" fontSize="9" fill={`${accent}0.45)`} fontFamily="'JetBrains Mono',monospace">V₁</text>

      {/* Outgoing flow arrows — right */}
      {[90, 108, 126].map((y, i) => (
        <g key={i}>
          <line x1="320" y1={y} x2="352" y2={y} stroke={`${accent}0.28)`} strokeWidth="1.1" />
          <polygon points={`352,${y} 345,${y - 4} 345,${y + 4}`} fill={`${accent}0.28)`} />
        </g>
      ))}
      <text x="354" y="88" fontSize="9" fill={`${accent}0.3)`} fontFamily="'JetBrains Mono',monospace">V₂</text>

      {/* Diameter dimension line */}
      <line x1="116" y1="192" x2="264" y2="192" stroke={`${accent}0.25)`} strokeWidth="0.8" />
      <line x1="116" y1="188" x2="116" y2="196" stroke={`${accent}0.25)`} strokeWidth="0.8" />
      <line x1="264" y1="188" x2="264" y2="196" stroke={`${accent}0.25)`} strokeWidth="0.8" />
      <text x="162" y="206" fontSize="9" fill={`${accent}0.3)`} fontFamily="'JetBrains Mono',monospace">D = 2r</text>

      {/* CFD label — bottom right */}
      <text x="306" y="198" fontSize="9" fill={`${accent}0.28)`} fontFamily="'JetBrains Mono',monospace" letterSpacing="2">CFD</text>
    </svg>
  );
}
