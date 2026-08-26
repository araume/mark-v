export type Capability = {
  id: string;
  title: string;
  body: string;
  diagram: "interface" | "fullstack" | "api" | "automation" | "database" | "ui";
};

export const capabilities: Capability[] = [
  {
    id: "web",
    title: "Web Development",
    body: "Marketing sites, landing pages, and content-driven sites that load fast and hold up on a phone.",
    diagram: "interface",
  },
  {
    id: "fullstack",
    title: "Full-Stack Applications",
    body: "Authenticated products with real data behind them — client, API, server, and database as one system.",
    diagram: "fullstack",
  },
  {
    id: "api",
    title: "Backend & APIs",
    body: "REST services, third-party integrations, and the glue that makes two systems agree on the same facts.",
    diagram: "api",
  },
  {
    id: "automation",
    title: "Automation",
    body: "Scheduled and event-driven jobs that take a repetitive manual process and run it without a person.",
    diagram: "automation",
  },
  {
    id: "database",
    title: "Database Systems",
    body: "Schema design, migrations, and queries that stay fast as the table gets long.",
    diagram: "database",
  },
  {
    id: "ui",
    title: "UI Implementation",
    body: "Turning a design into accessible, responsive markup that matches the file at every breakpoint.",
    diagram: "ui",
  },
];
