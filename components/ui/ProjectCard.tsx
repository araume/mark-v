import Image from "next/image";
import type { Project } from "@/content/projects";
import { ProjectVisual } from "@/components/visuals/ProjectVisual";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Signature moment 2 of 3.
 *
 * The screenshot and the copy travel at different rates through the viewport,
 * so the card assembles itself rather than sliding in as one block. Alternating
 * `flip` keeps the eye moving down the page instead of down a single column.
 */
export function ProjectCard({ project, flip }: { project: Project; flip: boolean }) {
  return (
    <article className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
      <Parallax
        distance={flip ? 44 : -44}
        className={flip ? "lg:order-2" : undefined}
      >
        <Reveal scale={0.96} y={30}>
          <div className="panel panel-marks aspect-[16/10] overflow-hidden">
            {project.image ? (
              <Image
                src={project.image.src}
                alt={project.image.alt}
                width={project.image.width}
                height={project.image.height}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-full w-full object-cover"
              />
            ) : (
              <ProjectVisual variant={project.placeholder} />
            )}
          </div>
        </Reveal>
      </Parallax>

      <div className={flip ? "lg:order-1" : undefined}>
        <Reveal className="flex items-center gap-3" y={10}>
          <span className="meta text-accent">
            MARK-V / {project.index}
          </span>
          <span aria-hidden="true" className="h-px w-6 bg-accent-soft" />
          <span className="meta">{project.year}</span>
        </Reveal>

        <Reveal delay={70}>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {project.name}
          </h3>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-3 text-base text-muted sm:text-lg">{project.summary}</p>
        </Reveal>

        <Reveal delay={170}>
          <dl className="mt-7 space-y-4 border-l border-line pl-5">
            {[
              { term: "PROBLEM", detail: project.problem },
              { term: "SOLUTION", detail: project.solution },
              { term: "RESULT", detail: project.result },
            ].map((row) => (
              <div key={row.term}>
                <dt className="meta">{row.term}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-ink sm:text-base">
                  {row.detail}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Metadata lands last, after the story has been read. */}
        <Reveal delay={260}>
          <ul className="mt-7 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="border border-line bg-surface-alt px-2.5 py-1.5 font-mono text-[0.6875rem] tracking-[0.1em] text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>
        </Reveal>

        {project.link ? (
          <Reveal delay={310}>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-7 inline-flex items-center gap-2.5 border border-line-strong px-4 py-3 font-mono text-[0.6875rem] tracking-[0.14em] text-ink transition-colors hover:border-ink hover:bg-surface-alt"
            >
              VISIT LIVE SITE
              <span className="sr-only"> — {project.name} (opens in a new tab)</span>
              <span
                aria-hidden="true"
                className="text-accent transition-transform duration-300 group-hover:translate-x-0.5"
              >
                ↗
              </span>
            </a>
          </Reveal>
        ) : null}
      </div>
    </article>
  );
}
