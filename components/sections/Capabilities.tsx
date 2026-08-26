import { CapabilityDiagram } from "@/components/visuals/CapabilityDiagram";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { capabilities } from "@/content/capabilities";

export function Capabilities() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-title"
      className="border-b border-line py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          id="capabilities-title"
          index="03"
          label="CAPABILITIES"
          title="What I can actually build."
          lede="Six areas, all of which I have shipped to production and maintained afterwards."
        />

        <ul className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability, index) => (
            <Reveal
              key={capability.id}
              as="li"
              delay={(index % 3) * 80}
              className="group bg-surface p-6 transition-colors hover:bg-surface-wash sm:p-8"
            >
              <div className="text-ink">
                <CapabilityDiagram variant={capability.diagram} />
              </div>
              <h3 className="mt-6 font-mono text-xs tracking-[0.14em] text-ink">
                {capability.title.toUpperCase()}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {capability.body}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
