import { Reveal } from "./Reveal";

type SectionHeaderProps = {
  /** Canonical section number, e.g. "02". */
  index: string;
  /** Section name in the metadata line, e.g. "SELECTED WORK". */
  label: string;
  title: string;
  /** Optional standfirst under the title. */
  lede?: string;
  /** Id used by the heading for aria-labelledby on the section. */
  id: string;
  align?: "left" | "wide";
};

export function SectionHeader({
  index,
  label,
  title,
  lede,
  id,
  align = "left",
}: SectionHeaderProps) {
  return (
    <header className={align === "wide" ? "max-w-3xl" : "max-w-2xl"}>
      <Reveal className="flex items-center gap-3" y={10}>
        <span className="meta text-accent">{index}</span>
        <span aria-hidden="true" className="h-px w-8 bg-accent-soft" />
        <span className="meta">{label}</span>
      </Reveal>

      <Reveal delay={80}>
        <h2
          id={id}
          className="mt-5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl"
        >
          {title}
        </h2>
      </Reveal>

      {lede ? (
        <Reveal delay={140}>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{lede}</p>
        </Reveal>
      ) : null}
    </header>
  );
}
