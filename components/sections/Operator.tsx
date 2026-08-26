import { MarkSymbol } from "@/components/ui/MarkSymbol";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { site } from "@/content/site";

const disciplines = ["WEB", "BACKEND", "AUTOMATION", "SYSTEMS"];

const notes = [
  {
    label: "WHAT I BUILD",
    body: "Systems that hold the state of somebody's work — orders, shipments, records, jobs — and stay correct while people use them under pressure.",
  },
  {
    label: "HOW I WORK",
    body: "Directly. You talk to the person writing the code. Scope is agreed in writing, progress is visible weekly, and there is no account manager in between.",
  },
  {
    label: "WHAT I CARE ABOUT",
    body: "That the thing works on the tenth month, not just at handover. That means readable code, real error handling, and documentation for the person who comes next.",
  },
];

export function Operator() {
  return (
    <section
      id="operator"
      aria-labelledby="operator-title"
      className="border-b border-line py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          id="operator-title"
          index="01"
          label="OPERATOR"
          title="There is one person behind Mark-V."
          lede="Not a network of contractors, and not a brand with a stock team photo. One developer, working directly with a small number of clients at a time."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
          {/* Identity plate — the headshot's structural replacement. */}
          <Reveal scale={0.97} y={24}>
            <div className="panel panel-marks p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="meta">OPERATOR</p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight text-ink">
                    {site.operator}
                  </p>
                  <p className="mt-1 text-sm text-muted">Software Developer</p>
                </div>
                <MarkSymbol className="h-14 w-14 shrink-0" />
              </div>

              <div className="mt-6 border-t border-line pt-5">
                <p className="meta">DISCIPLINES</p>
                <ul className="mt-3 grid grid-cols-2 gap-2">
                  {disciplines.map((discipline) => (
                    <li
                      key={discipline}
                      className="border border-line bg-surface-alt px-3 py-2 font-mono text-[0.6875rem] tracking-[0.12em] text-ink"
                    >
                      {discipline}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 border-t border-line pt-5">
                <p className="meta">STATUS</p>
                <p className="mt-3 flex items-center gap-2.5 text-sm font-medium text-ink">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  {site.status}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                <span className="meta">BASED</span>
                <span className="font-mono text-[0.6875rem] tracking-[0.12em] text-ink">
                  {site.locality.toUpperCase()}, {site.region}
                </span>
              </div>
            </div>
          </Reveal>

          <dl className="grid gap-px self-start border border-line bg-line">
            {notes.map((note, index) => (
              <Reveal key={note.label} delay={index * 90} className="bg-surface p-6 sm:p-8">
                <dt className="meta text-accent">{note.label}</dt>
                <dd className="mt-3 text-base leading-relaxed text-ink sm:text-lg">
                  {note.body}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
