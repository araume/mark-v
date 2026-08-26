import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { services } from "@/content/services";

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="border-b border-line bg-surface-alt py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          id="services-title"
          index="04"
          label="SERVICES"
          title="What you can hire me to do."
          lede="Five ways this usually starts. If your problem sits between two of them, that is normal — say so and we will scope it."
          align="wide"
        />

        <ul className="mt-14 space-y-px border border-line bg-line">
          {services.map((service, index) => (
            <Reveal key={service.id} as="li" delay={index * 60} y={14}>
              <div className="group grid gap-6 bg-surface p-6 transition-colors hover:bg-surface-wash sm:p-8 lg:grid-cols-[auto_1fr_auto] lg:items-start lg:gap-10">
                <span className="meta text-accent lg:pt-1.5">{service.index}</span>

                <div className="lg:grid lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-10">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {service.what}
                    </p>
                  </div>

                  <dl className="mt-6 space-y-4 lg:mt-0">
                    <div>
                      <dt className="meta">WHO IT IS FOR</dt>
                      <dd className="mt-1.5 text-sm leading-relaxed text-ink">
                        {service.who}
                      </dd>
                    </div>
                    <div>
                      <dt className="meta">WHAT IT SOLVES</dt>
                      <dd className="mt-1.5 text-sm leading-relaxed text-ink">
                        {service.solves}
                      </dd>
                    </div>
                  </dl>
                </div>

                <ul className="flex flex-wrap gap-2 lg:w-40 lg:flex-col lg:gap-1.5">
                  {service.includes.map((item) => (
                    <li
                      key={item}
                      className="font-mono text-[0.6875rem] tracking-[0.1em] text-muted"
                    >
                      <span aria-hidden="true" className="text-accent-soft">
                        —{" "}
                      </span>
                      {item.toUpperCase()}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120}>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-muted">
            Every engagement starts with a scoped, fixed-price discovery so you
            know the cost and the shape of the build before committing to it.{" "}
            <a
              href="#contact"
              className="text-accent underline underline-offset-4 transition-colors hover:text-accent-strong"
            >
              Start a project
            </a>{" "}
            and describe the problem in your own words.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
