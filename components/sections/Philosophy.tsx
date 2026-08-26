import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { principles } from "@/content/philosophy";

export function Philosophy() {
  return (
    <section
      id="philosophy"
      aria-labelledby="philosophy-title"
      className="border-b border-line py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          id="philosophy-title"
          index="07"
          label="PHILOSOPHY"
          title="The rules I actually work by."
          lede="Short list, held to in practice — it is what the code ends up looking like."
        />

        <ol className="mt-14 grid gap-px border border-line bg-line md:grid-cols-2">
          {principles.map((principle, index) => (
            <Reveal
              key={principle.index}
              as="li"
              delay={(index % 2) * 80}
              className={`bg-surface p-6 sm:p-8 ${
                index === principles.length - 1 ? "md:col-span-2" : ""
              }`}
            >
              <div className="flex items-baseline gap-4">
                <span className="meta text-accent">{principle.index}</span>
                <h3 className="text-lg font-semibold tracking-tight text-ink sm:text-xl">
                  {principle.title}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                {principle.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
