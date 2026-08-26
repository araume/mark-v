type MarkSymbolProps = {
  className?: string;
  /** Decorative by default; give it a title when it stands in for the name. */
  title?: string;
};

/**
 * The MARK-V mark: a chevron cut from a square plate, drawn as two planes
 * meeting at a machined vertex. Pure SVG so it stays crisp at any size and
 * costs nothing to load.
 */
export function MarkSymbol({ className, title }: MarkSymbolProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <defs>
        <linearGradient id="mv-plate-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2A343B" />
          <stop offset="100%" stopColor="#11161A" />
        </linearGradient>
        <linearGradient id="mv-plate-b" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#11161A" />
          <stop offset="100%" stopColor="#3A464E" />
        </linearGradient>
      </defs>

      {/* Plate edge */}
      <rect x="0.5" y="0.5" width="119" height="119" fill="none" stroke="#D9E0E5" />

      {/* Left plane of the V */}
      <path d="M24 28 L60 96 L48 96 L12 28 Z" fill="url(#mv-plate-a)" />
      {/* Right plane of the V, lifted so the two faces read as separate metal */}
      <path d="M108 28 L72 96 L60 96 L96 28 Z" fill="url(#mv-plate-b)" />

      {/* Machined highlight along the vertex */}
      <path d="M60 96 L48 96 L54 84 Z" fill="#A9C7D9" opacity="0.55" />

      {/* Registration ticks */}
      <path d="M12 12 H26 M12 12 V26" stroke="#A9C7D9" strokeWidth="1" fill="none" />
      <path d="M108 108 H94 M108 108 V94" stroke="#A9C7D9" strokeWidth="1" fill="none" />
    </svg>
  );
}
