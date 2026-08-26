import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";
import { HeroMark } from "./HeroMark";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative overflow-hidden border-b border-line pt-28 pb-20 sm:pt-32 lg:pt-40 lg:pb-28"
    >
      {/* Blueprint field, faded out so it never competes with the type. */}
      <div
        aria-hidden="true"
        className="grid-field absolute inset-0 -z-10 opacity-[0.55] [mask-image:radial-gradient(ellipse_at_50%_35%,black,transparent_72%)]"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <Reveal className="flex items-center gap-3" y={10}>
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-accent"
            />
            <span className="meta">{site.status}</span>
          </Reveal>

          <Reveal delay={60}>
            <h1
              id="hero-title"
              className="mt-6 text-[2.75rem] font-semibold leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-7xl"
            >
              MARK-V
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-4 font-mono text-sm tracking-[0.16em] text-muted sm:text-base">
              SOFTWARE &amp; WEB ENGINEERING
            </p>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
              {site.tagline}
            </p>
          </Reveal>

          <Reveal delay={240} className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="group inline-flex items-center gap-2.5 border border-ink bg-ink px-6 py-3.5 font-mono text-xs tracking-[0.14em] text-surface transition-colors hover:border-accent-strong hover:bg-accent-strong"
            >
              VIEW WORK
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 border border-line-strong px-6 py-3.5 font-mono text-xs tracking-[0.14em] text-ink transition-colors hover:border-ink hover:bg-surface-alt"
            >
              START A PROJECT
            </a>
          </Reveal>

          <Reveal delay={300}>
            <dl className="mt-14 grid max-w-lg grid-cols-3 gap-px border border-line bg-line">
              {[
                { term: "BASED", detail: site.location },
                { term: "ENGAGEMENT", detail: "Solo / Direct" },
                { term: "TIMEZONE", detail: "UTC+8" },
              ].map((item) => (
                <div key={item.term} className="bg-surface px-4 py-4">
                  <dt className="meta">{item.term}</dt>
                  <dd className="mt-2 text-sm font-medium text-ink">
                    {item.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={200} scale={0.94} y={28}>
          <HeroMark />
        </Reveal>
      </div>
    </section>
  );
}
