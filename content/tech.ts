export type TechGroup = {
  label: string;
  items: string[];
  note: string;
};

export const techGroups: TechGroup[] = [
  {
    label: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    note: "Server-rendered by default, interactive where it earns it.",
  },
  {
    label: "Backend",
    items: ["Node.js", "Python", "REST APIs", "Fastify"],
    note: "Boring, typed, and observable in production.",
  },
  {
    label: "Database",
    items: ["PostgreSQL", "MongoDB", "MSSQL", "MySQL"],
    note: "Relational unless there is a reason not to be.",
  },
  {
    label: "Infrastructure",
    items: ["Docker", "Vercel", "Linux", "GitHub Actions"],
    note: "Reproducible environments and deploys that are not a ritual.",
  },
];
