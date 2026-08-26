import type { Project } from "@/content/projects";

/**
 * Stand-in imagery for projects that do not yet have a real screenshot.
 * These are deliberately wireframe-like: they read as an interface without
 * pretending to be a specific one. Once `project.image` is supplied,
 * ProjectCard renders the screenshot and this is never mounted.
 */
export function ProjectVisual({ variant }: { variant: Project["placeholder"] }) {
  return (
    <svg
      viewBox="0 0 640 400"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect width="640" height="400" fill="#F6F8FA" />

      {/* Window chrome, shared by every variant. */}
      <rect x="0" y="0" width="640" height="34" fill="#FFFFFF" />
      <line x1="0" y1="34" x2="640" y2="34" stroke="#D9E0E5" />
      <circle cx="20" cy="17" r="3.5" fill="#D9E0E5" />
      <circle cx="34" cy="17" r="3.5" fill="#D9E0E5" />
      <circle cx="48" cy="17" r="3.5" fill="#D9E0E5" />
      <rect x="70" y="10" width="150" height="14" fill="#F0F8FF" />

      {variant === "dashboard" ? <Dashboard /> : null}
      {variant === "storefront" ? <Storefront /> : null}
      {variant === "pipeline" ? <Pipeline /> : null}
      {variant === "console" ? <Console /> : null}
    </svg>
  );
}

function Dashboard() {
  return (
    <g>
      <rect x="0" y="34" width="140" height="366" fill="#11161A" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x="20"
          y={68 + i * 26}
          width={i === 1 ? 88 : 68}
          height="8"
          fill={i === 1 ? "#A9C7D9" : "#3A464E"}
        />
      ))}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={168 + i * 152} y="62" width="136" height="76" fill="#FFFFFF" stroke="#D9E0E5" />
          <rect x={184 + i * 152} y="80" width="40" height="7" fill="#D9E0E5" />
          <rect x={184 + i * 152} y="98" width="66" height="18" fill="#11161A" />
        </g>
      ))}
      <rect x="168" y="162" width="440" height="206" fill="#FFFFFF" stroke="#D9E0E5" />
      <polyline
        points="192,320 246,290 300,300 354,246 408,262 462,206 516,222 584,190"
        fill="none"
        stroke="#2F6E93"
        strokeWidth="2"
      />
      <polyline
        points="192,340 246,332 300,336 354,314 408,322 462,300 516,306 584,292"
        fill="none"
        stroke="#A9C7D9"
        strokeWidth="2"
      />
      <line x1="192" y1="356" x2="584" y2="356" stroke="#D9E0E5" />
    </g>
  );
}

function Storefront() {
  return (
    <g>
      <rect x="0" y="34" width="640" height="52" fill="#FFFFFF" />
      <line x1="0" y1="86" x2="640" y2="86" stroke="#D9E0E5" />
      <rect x="32" y="52" width="72" height="10" fill="#11161A" />
      <rect x="420" y="50" width="188" height="20" fill="#F0F8FF" stroke="#D9E0E5" />
      <rect x="32" y="110" width="152" height="258" fill="#FFFFFF" stroke="#D9E0E5" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x="50" y={134 + i * 26} width={i % 2 ? 82 : 106} height="8" fill="#D9E0E5" />
      ))}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        return (
          <g key={i}>
            <rect
              x={210 + col * 142}
              y={110 + row * 132}
              width="126"
              height="116"
              fill="#FFFFFF"
              stroke="#D9E0E5"
            />
            <rect x={210 + col * 142} y={110 + row * 132} width="126" height="66" fill="#F0F8FF" />
            <rect x={224 + col * 142} y={188 + row * 132} width="64" height="7" fill="#11161A" />
            <rect x={224 + col * 142} y={202 + row * 132} width="40" height="7" fill="#D9E0E5" />
          </g>
        );
      })}
    </g>
  );
}

function Pipeline() {
  const nodes = [
    { x: 70, label: "SOURCE" },
    { x: 250, label: "MATCH" },
    { x: 430, label: "OUTPUT" },
  ];
  return (
    <g>
      {nodes.map((node, i) => (
        <g key={node.label}>
          <rect x={node.x} y="150" width="140" height="90" fill="#FFFFFF" stroke="#11161A" />
          <rect x={node.x + 18} y="176" width="60" height="8" fill="#11161A" />
          <rect x={node.x + 18} y="194" width="90" height="6" fill="#D9E0E5" />
          <rect x={node.x + 18} y="208" width="72" height="6" fill="#D9E0E5" />
          {i < nodes.length - 1 ? (
            <g>
              <line
                x1={node.x + 140}
                y1="195"
                x2={node.x + 180}
                y2="195"
                stroke="#2F6E93"
                strokeWidth="1.5"
              />
              <path
                d={`M${node.x + 174} 190 L${node.x + 181} 195 L${node.x + 174} 200 Z`}
                fill="#2F6E93"
              />
            </g>
          ) : null}
        </g>
      ))}
      <rect x="70" y="70" width="500" height="46" fill="#FFFFFF" stroke="#D9E0E5" />
      <rect x="88" y="88" width="86" height="8" fill="#A9C7D9" />
      <rect x="70" y="288" width="500" height="70" fill="#FFFFFF" stroke="#D9E0E5" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="88" y={304 + i * 18} width="8" height="8" fill={i === 1 ? "#2F6E93" : "#D9E0E5"} />
          <rect x="106" y={306 + i * 18} width={i === 1 ? 220 : 168} height="5" fill="#D9E0E5" />
        </g>
      ))}
    </g>
  );
}

function Console() {
  return (
    <g>
      <rect x="0" y="34" width="640" height="366" fill="#11161A" />
      <rect x="32" y="66" width="576" height="140" fill="#1A2126" stroke="#3A464E" />
      <rect x="52" y="88" width="52" height="8" fill="#A9C7D9" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x="52" y={112 + i * 20} width={[300, 216, 356, 172][i]} height="6" fill="#3A464E" />
      ))}
      <rect x="32" y="230" width="278" height="138" fill="#1A2126" stroke="#3A464E" />
      <rect x="330" y="230" width="278" height="138" fill="#1A2126" stroke="#3A464E" />
      <rect x="52" y="252" width="64" height="8" fill="#A9C7D9" />
      <rect x="350" y="252" width="80" height="8" fill="#A9C7D9" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x="52" y={278 + i * 16} width={[196, 148, 220, 132, 174][i]} height="5" fill="#3A464E" />
          <rect x="350" y={278 + i * 16} width={[164, 210, 128, 188, 146][i]} height="5" fill="#3A464E" />
        </g>
      ))}
    </g>
  );
}
