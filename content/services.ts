export type Service = {
  id: string;
  index: string;
  title: string;
  /** Plain description of the deliverable. */
  what: string;
  /** Who this is actually for. */
  who: string;
  /** The problem it removes. */
  solves: string;
  includes: string[];
};

export const services: Service[] = [
  {
    id: "websites",
    index: "01",
    title: "Websites",
    what: "A responsive marketing site or landing page, built to be edited without calling me back.",
    who: "Businesses whose current site is slow, dated, or was built on a page builder nobody can maintain.",
    solves: "People find you, understand what you do, and can contact you — on a phone, on a bad connection.",
    includes: ["Design & build", "CMS wiring", "SEO foundation", "Analytics"],
  },
  {
    id: "web-apps",
    index: "02",
    title: "Web Applications",
    what: "Custom web applications and internal tools with accounts, permissions, and real data.",
    who: "Teams outgrowing a spreadsheet, or paying per-seat for software that does 20% of what they need.",
    solves: "One place where the current state of the work lives, that the whole team can trust.",
    includes: ["Data modelling", "Auth & roles", "Admin tooling", "Deployment"],
  },
  {
    id: "automation",
    index: "03",
    title: "Automation",
    what: "Scripts and scheduled workflows that perform a repetitive process end to end.",
    who: "Anyone with a recurring task that is a person copying data between two systems.",
    solves: "Hours a week returned, and a process that runs the same way every time.",
    includes: ["Process mapping", "Pipeline build", "Error alerting", "Handover docs"],
  },
  {
    id: "backend",
    index: "04",
    title: "API & Backend Development",
    what: "APIs, integrations, databases, and the server-side systems behind an existing product.",
    who: "Product teams with a frontend and no backend, or a backend that has stopped keeping up.",
    solves: "Your data becomes something other systems can query reliably instead of a monthly export.",
    includes: ["API design", "Integrations", "Schema & migrations", "Performance work"],
  },
  {
    id: "custom",
    index: "05",
    title: "Custom Software",
    what: "Software shaped around one specific operational problem, where off-the-shelf does not fit.",
    who: "Operators with a workflow that is genuinely theirs and does not survive a generic tool.",
    solves: "The software matches how the work is actually done, rather than the other way around.",
    includes: ["Discovery", "Prototype", "Build & iterate", "Ongoing support"],
  },
];
