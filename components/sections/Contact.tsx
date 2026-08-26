import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { site } from "@/content/site";
import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="border-b border-line bg-surface-alt py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          id="contact-title"
          index="08"
          label="INITIALIZE PROJECT"
          title="Describe the problem. I'll tell you if I can solve it."
          lede="If it is not something I should take on, I will say so and point you somewhere better."
          align="wide"
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_minmax(0,20rem)] lg:gap-16">
          <Reveal y={22}>
            <ContactForm />
          </Reveal>

          <Reveal delay={100} className="space-y-px self-start border border-line bg-line">
            <div className="bg-surface p-6">
              <p className="meta">DIRECT</p>
              <a
                href={`mailto:${site.email}`}
                className="mt-3 block text-base font-medium text-ink underline underline-offset-4 transition-colors hover:text-accent"
              >
                {site.email}
              </a>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Prefer email? Skip the form entirely — it reaches the same place.
              </p>
            </div>

            <div className="bg-surface p-6">
              <p className="meta">RESPONSE TIME</p>
              <p className="mt-3 text-sm text-ink">Within 2 working days</p>
            </div>

            <div className="bg-surface p-6">
              <p className="meta">AVAILABILITY</p>
              <p className="mt-3 flex items-center gap-2.5 text-sm text-ink">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                />
                {site.status}
              </p>
            </div>

            <div className="bg-surface p-6">
              <p className="meta">ELSEWHERE</p>
              <ul className="mt-2 space-y-0.5">
                {site.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      className="group flex items-center justify-between py-1.5 font-mono text-[0.6875rem] tracking-[0.12em] text-ink transition-colors hover:text-accent"
                    >
                      {social.label}
                      <span
                        aria-hidden="true"
                        className="text-accent-soft transition-transform duration-300 group-hover:translate-x-0.5"
                      >
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
