import type { Capability } from "@/content/capabilities";

const stroke = "#11161A";
const faint = "#D9E0E5";
const accent = "#2F6E93";

/**
 * One consistent diagram language across all six capabilities: 1px strokes,
 * the same box proportions, accent used only on the element that carries the
 * idea. Decorative — the adjacent text carries the meaning.
 */
export function CapabilityDiagram({ variant }: { variant: Capability["diagram"] }) {
  return (
    <svg
      viewBox="0 0 160 90"
      className="h-[90px] w-full"
      fill="none"
      strokeWidth="1"
      aria-hidden="true"
    >
      {variant === "interface" ? <Interface /> : null}
      {variant === "fullstack" ? <FullStack /> : null}
      {variant === "api" ? <Api /> : null}
      {variant === "automation" ? <Automation /> : null}
      {variant === "database" ? <Database /> : null}
      {variant === "ui" ? <Ui /> : null}
    </svg>
  );
}

function Interface() {
  return (
    <g>
      <rect x="20" y="14" width="120" height="62" stroke={stroke} />
      <line x1="20" y1="28" x2="140" y2="28" stroke={stroke} />
      <circle cx="27" cy="21" r="2" fill={faint} />
      <circle cx="35" cy="21" r="2" fill={faint} />
      <rect x="30" y="38" width="44" height="4" fill={accent} />
      <rect x="30" y="48" width="66" height="3" fill={faint} />
      <rect x="30" y="56" width="52" height="3" fill={faint} />
      <rect x="104" y="38" width="26" height="26" stroke={faint} />
    </g>
  );
}

function FullStack() {
  const stages = ["", "", "", ""];
  return (
    <g>
      {stages.map((_, i) => (
        <g key={i}>
          <rect x={6 + i * 39} y="34" width="28" height="22" stroke={stroke} />
          {i < 3 ? (
            <line
              x1={34 + i * 39}
              y1="45"
              x2={45 + i * 39}
              y2="45"
              stroke={accent}
            />
          ) : null}
        </g>
      ))}
      <text x="6" y="70" fontSize="6" fill="#66727A" fontFamily="monospace">
        CLIENT
      </text>
      <text x="45" y="70" fontSize="6" fill="#66727A" fontFamily="monospace">
        API
      </text>
      <text x="84" y="70" fontSize="6" fill="#66727A" fontFamily="monospace">
        SRV
      </text>
      <text x="123" y="70" fontSize="6" fill="#66727A" fontFamily="monospace">
        DB
      </text>
    </g>
  );
}

function Api() {
  return (
    <g>
      <rect x="10" y="30" width="34" height="30" stroke={stroke} />
      <rect x="116" y="30" width="34" height="30" stroke={stroke} />
      <circle cx="80" cy="45" r="13" stroke={accent} />
      <line x1="44" y1="40" x2="67" y2="40" stroke={faint} />
      <line x1="44" y1="50" x2="67" y2="50" stroke={faint} />
      <line x1="93" y1="40" x2="116" y2="40" stroke={accent} />
      <line x1="93" y1="50" x2="116" y2="50" stroke={faint} />
      <circle cx="80" cy="45" r="3" fill={accent} />
    </g>
  );
}

function Automation() {
  return (
    <g>
      <path d="M22 45 L36 37 L36 53 Z" fill={accent} />
      <rect x="52" y="30" width="34" height="30" stroke={stroke} />
      <line x1="60" y1="40" x2="78" y2="40" stroke={faint} />
      <line x1="60" y1="46" x2="72" y2="46" stroke={faint} />
      <line x1="60" y1="52" x2="76" y2="52" stroke={faint} />
      <line x1="36" y1="45" x2="52" y2="45" stroke={stroke} />
      <line x1="86" y1="45" x2="104" y2="45" stroke={stroke} />
      <rect x="104" y="36" width="18" height="18" stroke={stroke} />
      <path d="M108 45 L112 49 L119 40" stroke={accent} strokeWidth="1.5" />
      <path
        d="M52 24 A18 18 0 0 1 86 24"
        stroke={faint}
        strokeDasharray="2 3"
      />
    </g>
  );
}

function Database() {
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <ellipse cx="80" cy={26 + i * 17} rx="30" ry="7" stroke={i === 0 ? stroke : faint} />
          <line x1="50" y1={26 + i * 17} x2="50" y2={43 + i * 17} stroke={faint} />
          <line x1="110" y1={26 + i * 17} x2="110" y2={43 + i * 17} stroke={faint} />
        </g>
      ))}
      <ellipse cx="80" cy="60" rx="30" ry="7" stroke={stroke} />
      <line x1="50" y1="26" x2="50" y2="60" stroke={stroke} />
      <line x1="110" y1="26" x2="110" y2="60" stroke={stroke} />
      <rect x="74" y="40" width="12" height="3" fill={accent} />
    </g>
  );
}

function Ui() {
  return (
    <g>
      <rect x="14" y="18" width="60" height="54" stroke={faint} strokeDasharray="3 3" />
      <rect x="86" y="18" width="60" height="54" stroke={stroke} />
      <rect x="94" y="26" width="24" height="4" fill={accent} />
      <rect x="94" y="36" width="44" height="3" fill={faint} />
      <rect x="94" y="44" width="36" height="3" fill={faint} />
      <rect x="94" y="56" width="22" height="9" stroke={stroke} />
      <path d="M76 45 L84 45" stroke={accent} />
      <path d="M80 41 L84 45 L80 49" stroke={accent} />
    </g>
  );
}
