import { Reveal } from "@/components/ui/Reveal";
import { techGroups } from "@/content/tech";

export function Technology() {
  return (
    <section
      id="technology"
      aria-labelledby="technology-title"
      className="border-b border-line bg-ink py-20 text-surface sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <header className="max-w-2xl">
          <Reveal className="flex items-center gap-3" y={10}>
            <span className="meta text-accent-soft">06</span>
            <span aria-hidden="true" className="h-px w-8 bg-accent-soft/50" />
            <span className="meta text-accent-soft">TECHNOLOGY</span>
          </Reveal>
          <Reveal delay={80}>
            <h2
              id="technology-title"
              className="mt-5 text-3xl font-semibold tracking-tight text-surface sm:text-4xl lg:text-5xl"
            >
              The specification.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-4 text-base leading-relaxed text-accent-soft sm:text-lg">
              Tools chosen because they are stable and I know them well, not
              because they are new.
            </p>
          </Reveal>
        </header>

        <dl className="mt-14 grid gap-px border border-white/12 bg-white/12 sm:grid-cols-2 lg:grid-cols-4">
          {techGroups.map((group, index) => (
            <Reveal
              key={group.label}
              delay={index * 70}
              className="bg-ink p-6 sm:p-8"
            >
              <dt className="meta text-accent-soft">{group.label.toUpperCase()}</dt>
              <dd>
                <ul className="mt-4 space-y-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-2.5 text-base font-medium text-surface"
                    >
                      <span
                        aria-hidden="true"
                        className="h-1 w-1 shrink-0 translate-y-[-0.2em] bg-accent-soft"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 border-t border-white/12 pt-4 text-sm leading-relaxed text-white/55">
                  {group.note}
                </p>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
