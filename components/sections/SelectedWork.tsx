import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { projects } from "@/content/projects";

export function SelectedWork() {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="border-b border-line bg-surface-alt py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          id="work-title"
          index="02"
          label="SELECTED WORK"
          title="Systems built for people who had a real problem."
          lede="Four recent builds, described by what was wrong before and what changed after."
          align="wide"
        />

        <div className="mt-16 space-y-20 sm:mt-20 sm:space-y-28">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              flip={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
