import type { ArtKey } from "@/data/projects";

const a = (o: number) => `rgb(var(--accent) / ${o})`;
const w = (o: number) => `rgb(255 255 255 / ${o})`;

/**
 * Stylised, original SVG "screens" used until real screenshots are added.
 * Each one is a diagrammatic hint of the project, not a fake screenshot.
 */
export default function ProjectArt({ art }: { art: ArtKey }) {
  return (
    <svg
      viewBox="0 0 400 250"
      className="h-full w-full"
      role="img"
      aria-label={`Illustration for ${art} project`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`g-${art}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={a(0.35)} />
          <stop offset="1" stopColor={a(0)} />
        </linearGradient>
        <pattern id={`p-${art}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke={w(0.04)} />
        </pattern>
      </defs>
      <rect width="400" height="250" fill={`url(#p-${art})`} />
      {art === "journal" && <Journal />}
      {art === "pos" && <Pos />}
      {art === "pyviz" && <PyViz />}
      {art === "chart" && <Chart />}
      {art === "brand" && <Brand />}
      {art === "web" && <Web />}
      {art === "blueprint" && <Blueprint />}
    </svg>
  );
}

function Journal() {
  return (
    <g>
      <rect x="24" y="24" width="352" height="202" rx="12" fill={w(0.025)} stroke={w(0.14)} />
      <line x1="112" y1="24" x2="112" y2="226" stroke={w(0.1)} />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x="36" y={44 + i * 22} width={i === 1 ? 62 : 48} height="8" rx="4" fill={i === 1 ? a(0.6) : w(0.14)} />
      ))}
      <rect x="128" y="40" width="90" height="10" rx="5" fill={w(0.25)} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={128 + i * 82} y="62" width="74" height="34" rx="6" fill={w(0.04)} stroke={w(0.1)} />
          <rect x={136 + i * 82} y="71" width="30" height="5" rx="2.5" fill={w(0.25)} />
          <rect x={136 + i * 82} y="82" width="46" height="7" rx="3.5" fill={i === 1 ? a(0.8) : w(0.45)} />
        </g>
      ))}
      <polygon points="132,196 164,170 190,178 222,146 252,154 284,120 316,128 362,96 362,206 132,206" fill={`url(#g-journal)`} />
      <polyline points="132,196 164,170 190,178 222,146 252,154 284,120 316,128 362,96" fill="none" stroke={a(0.95)} strokeWidth="2" strokeLinejoin="round" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect key={i} x={140 + i * 32} y={206 - (6 + ((i * 7) % 5) * 3)} width="14" height={6 + ((i * 7) % 5) * 3} rx="2" fill={w(0.16)} />
      ))}
    </g>
  );
}

function Pos() {
  return (
    <g>
      <rect x="24" y="24" width="352" height="202" rx="12" fill={w(0.025)} stroke={w(0.14)} />
      <rect x="40" y="40" width="70" height="9" rx="4.5" fill={w(0.25)} />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const x = 40 + (i % 3) * 66;
        const y = 64 + Math.floor(i / 3) * 70;
        const on = i === 1;
        return (
          <g key={i}>
            <rect x={x} y={y} width="56" height="56" rx="10" fill={on ? a(0.16) : w(0.04)} stroke={on ? a(0.9) : w(0.12)} strokeWidth={on ? 1.5 : 1} />
            <text x={x + 28} y={y + 34} textAnchor="middle" fontSize="15" fontFamily="ui-monospace,monospace" fill={on ? a(1) : w(0.5)}>
              T{i + 1}
            </text>
            {i === 4 && <circle cx={x + 48} cy={y + 8} r="3.5" fill="rgb(var(--signal))" />}
          </g>
        );
      })}
      <rect x="248" y="40" width="112" height="170" rx="8" fill={w(0.04)} stroke={w(0.12)} />
      <rect x="260" y="52" width="48" height="7" rx="3.5" fill={w(0.3)} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="260" y={74 + i * 20} width={52 + (i % 2) * 14} height="6" rx="3" fill={w(0.16)} />
          <rect x="328" y={74 + i * 20} width="22" height="6" rx="3" fill={w(0.3)} />
        </g>
      ))}
      <line x1="260" y1="164" x2="350" y2="164" stroke={w(0.2)} strokeDasharray="3 3" />
      <rect x="260" y="174" width="30" height="8" rx="4" fill={w(0.4)} />
      <rect x="310" y="172" width="40" height="12" rx="4" fill={a(0.9)} />
      <rect x="260" y="192" width="90" height="10" rx="5" fill={a(0.25)} stroke={a(0.7)} />
    </g>
  );
}

function PyViz() {
  const bars = [60, 96, 78, 128, 104, 148];
  return (
    <g>
      {/* database cylinder */}
      <g transform="translate(36 70)">
        <ellipse cx="34" cy="14" rx="34" ry="12" fill={w(0.05)} stroke={a(0.8)} />
        <path d="M0 14v60c0 7 15 12 34 12s34-5 34-12V14" fill={w(0.03)} stroke={a(0.8)} />
        <path d="M0 44c0 7 15 12 34 12s34-5 34-12" fill="none" stroke={a(0.5)} />
        <path d="M0 74c0 7 15 12 34 12" fill="none" stroke={a(0.3)} />
      </g>
      <path d="M112 118h38" stroke={a(0.8)} strokeWidth="1.5" strokeDasharray="4 4" />
      <path d="M146 112l8 6-8 6" fill="none" stroke={a(0.9)} strokeWidth="1.5" />
      {/* chart */}
      <rect x="166" y="40" width="210" height="170" rx="10" fill={w(0.03)} stroke={w(0.12)} />
      <line x1="188" y1="62" x2="188" y2="188" stroke={w(0.3)} />
      <line x1="188" y1="188" x2="358" y2="188" stroke={w(0.3)} />
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1="188" y1={78 + i * 36} x2="358" y2={78 + i * 36} stroke={w(0.06)} />
      ))}
      {bars.map((h, i) => (
        <rect key={i} x={200 + i * 26} y={188 - h} width="16" height={h} rx="3" fill={i === 5 ? a(0.9) : a(0.32)} />
      ))}
      <text x="36" y="196" fontSize="11" fontFamily="ui-monospace,monospace" fill={w(0.45)}>
        .py → db → plt
      </text>
    </g>
  );
}

function Chart() {
  // [open, close, high, low] as y-coordinates (smaller y = higher price)
  const c: [number, number, number, number][] = [
    [150, 138, 130, 156],
    [138, 146, 130, 152],
    [146, 128, 122, 150],
    [128, 120, 112, 134],
    [120, 132, 114, 138],
    [132, 104, 98, 136],
    [104, 92, 84, 110],
    [92, 98, 86, 104],
    [98, 74, 68, 102],
    [74, 82, 66, 88],
    [82, 62, 56, 86],
    [62, 70, 54, 76],
  ];
  return (
    <g>
      <rect x="24" y="24" width="352" height="202" rx="12" fill={w(0.025)} stroke={w(0.14)} />
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1="36" y1={50 + i * 36} x2="364" y2={50 + i * 36} stroke={w(0.05)} />
      ))}
      {/* fair value gap zone */}
      <rect x="152" y="100" width="212" height="22" fill={a(0.1)} stroke={a(0.35)} strokeDasharray="3 3" />
      <text x="158" y="115" fontSize="9" fontFamily="ui-monospace,monospace" fill={a(0.9)}>FVG</text>
      {c.map(([o, cl, h, l], i) => {
        const x = 52 + i * 26;
        const up = cl < o;
        return (
          <g key={i}>
            <line x1={x + 6} x2={x + 6} y1={h} y2={l} stroke={up ? a(0.85) : w(0.4)} />
            <rect x={x} y={Math.min(o, cl)} width="12" height={Math.max(4, Math.abs(o - cl))} rx="1.5" fill={up ? a(0.85) : w(0.22)} stroke={up ? a(1) : w(0.4)} />
          </g>
        );
      })}
      <line x1="36" y1="176" x2="364" y2="176" stroke={w(0.3)} strokeDasharray="5 4" />
      <text x="40" y="190" fontSize="9" fontFamily="ui-monospace,monospace" fill={w(0.5)}>RISK</text>
      <line x1="36" y1="64" x2="364" y2="64" stroke={a(0.5)} strokeDasharray="5 4" />
      <text x="40" y="58" fontSize="9" fontFamily="ui-monospace,monospace" fill={a(0.9)}>TARGET · R:R</text>
    </g>
  );
}

function Brand() {
  return (
    <g>
      <circle cx="140" cy="130" r="86" fill={a(0.07)} />
      <circle cx="140" cy="130" r="60" fill="none" stroke={a(0.2)} strokeDasharray="2 5" />
      {/* bottle */}
      <rect x="124" y="46" width="32" height="26" rx="4" fill={w(0.2)} stroke={w(0.4)} />
      <rect x="132" y="72" width="16" height="12" fill={w(0.1)} stroke={w(0.3)} />
      <path d="M92 118c0-18 14-34 34-34h28c20 0 34 16 34 34v68c0 12-10 22-22 22h-52c-12 0-22-10-22-22v-68Z" fill={a(0.12)} stroke={a(0.85)} strokeWidth="1.5" />
      <path d="M102 150c20-8 38 8 76 0v36c0 8-6 14-14 14h-48c-8 0-14-6-14-14v-36Z" fill={a(0.28)} />
      <rect x="116" y="124" width="48" height="6" rx="3" fill={w(0.5)} />
      <rect x="124" y="136" width="32" height="4" rx="2" fill={w(0.25)} />
      {/* price ladder */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="248" y={78 + i * 44} width="108" height="32" rx="8" fill={w(0.04)} stroke={i === 1 ? a(0.8) : w(0.14)} />
          <circle cx="266" cy={94 + i * 44} r={4 + i * 2} fill={a(0.3 + i * 0.25)} />
          <rect x="286" y={90 + i * 44} width={54 - i * 6} height="7" rx="3.5" fill={w(0.3)} />
        </g>
      ))}
      <text x="248" y="64" fontSize="9" fontFamily="ui-monospace,monospace" fill={w(0.5)}>PRICE TIERS · CONCEPT</text>
    </g>
  );
}

function Web() {
  return (
    <g>
      <rect x="24" y="24" width="352" height="202" rx="12" fill={w(0.025)} stroke={w(0.14)} />
      <line x1="24" y1="48" x2="376" y2="48" stroke={w(0.1)} />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={40 + i * 14} cy="36" r="3.5" fill={w(0.25)} />
      ))}
      <rect x="120" y="30" width="160" height="12" rx="6" fill={w(0.06)} />
      <rect x="40" y="62" width="40" height="7" rx="3.5" fill={w(0.3)} />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={250 + i * 38} y="63" width="28" height="5" rx="2.5" fill={w(0.15)} />
      ))}
      <rect x="40" y="90" width="150" height="14" rx="4" fill={w(0.5)} />
      <rect x="40" y="110" width="110" height="14" rx="4" fill={w(0.3)} />
      <rect x="40" y="136" width="90" height="7" rx="3.5" fill={w(0.12)} />
      <rect x="40" y="152" width="64" height="20" rx="10" fill={a(0.9)} />
      <rect x="214" y="84" width="146" height="96" rx="10" fill={a(0.1)} stroke={a(0.4)} />
      <path d="M262 172v-40c0-10 8-18 18-18h4c10 0 18 8 18 18v40c0 4-3 6-6 6h-26c-3 0-6-2-6-6Z" fill={a(0.35)} stroke={a(0.9)} />
      <rect x="276" y="98" width="12" height="10" rx="2" fill={w(0.4)} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={40 + i * 83} y="188" width="74" height="28" rx="6" fill={w(0.04)} stroke={w(0.1)} />
          <rect x={48 + i * 83} y="196" width="28" height="5" rx="2.5" fill={w(0.25)} />
          <rect x={48 + i * 83} y="205" width="18" height="4" rx="2" fill={a(0.6)} />
        </g>
      ))}
    </g>
  );
}

function Blueprint() {
  const tiers = [
    { y: 150, hw: 74, h: 24 },
    { y: 118, hw: 58, h: 22 },
    { y: 88, hw: 44, h: 20 },
    { y: 62, hw: 30, h: 18 },
  ];
  return (
    <g stroke={a(0.85)} fill="none" strokeWidth="1.4" strokeLinejoin="round">
      {/* plinth */}
      <rect x="110" y="182" width="180" height="14" fill={a(0.06)} />
      <rect x="126" y="170" width="148" height="12" fill={a(0.04)} />
      {tiers.map((t, i) => (
        <g key={i}>
          <path d={`M${200 - t.hw} ${t.y} L${200 - t.hw + 14} ${t.y - t.h} H${200 + t.hw - 14} L${200 + t.hw} ${t.y} Z`} fill={a(0.07)} />
          <line x1={200 - t.hw + 14} y1={t.y} x2={200 - t.hw + 14} y2={t.y + 12} />
          <line x1={200 + t.hw - 14} y1={t.y} x2={200 + t.hw - 14} y2={t.y + 12} />
        </g>
      ))}
      <line x1="200" y1="44" x2="200" y2="26" />
      <circle cx="200" cy="24" r="3" />
      {/* exploded offset arrow */}
      <g strokeDasharray="3 3" stroke={w(0.4)}>
        <line x1="290" y1="62" x2="330" y2="40" />
        <line x1="290" y1="150" x2="330" y2="150" />
      </g>
      <g transform="translate(300 28)" stroke={a(0.5)}>
        <path d="M0 20h56l-10 -12M56 20l-10 12" />
      </g>
      {/* dimension line */}
      <g stroke={w(0.45)} strokeWidth="1">
        <line x1="60" y1="196" x2="60" y2="62" />
        <line x1="54" y1="196" x2="66" y2="196" />
        <line x1="54" y1="62" x2="66" y2="62" />
        <line x1="110" y1="214" x2="290" y2="214" />
        <line x1="110" y1="208" x2="110" y2="220" />
        <line x1="290" y1="208" x2="290" y2="220" />
      </g>
      <text x="136" y="232" fontSize="9" fontFamily="ui-monospace,monospace" fill={w(0.5)} stroke="none">
        PLATE 01 · ELEVATION · NTS
      </text>
    </g>
  );
}
