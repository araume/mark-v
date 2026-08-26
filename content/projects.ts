export type Project = {
  /** Stable id — becomes the route segment when /work/[slug] is added. */
  slug: string;
  /** Zero-padded index rendered as MARK-V / 001. */
  index: string;
  name: string;
  year: string;
  /** One-line positioning, shown under the name. */
  summary: string;
  /** Problem → solution → result. Kept to three short beats. */
  problem: string;
  solution: string;
  result: string;
  stack: string[];
  /**
   * Screenshot. Replace `image` with a real capture in /public/work and delete
   * `placeholder` — ProjectCard renders the generated visual only while the
   * screenshot is missing, so swapping content never touches a component.
   */
  image?: { src: string; width: number; height: number; alt: string };
  placeholder: "dashboard" | "storefront" | "pipeline" | "console";
};

export const projects: Project[] = [
  {
    slug: "meridian-operations",
    index: "001",
    name: "Meridian Operations",
    year: "2025",
    summary: "Internal operations console for a regional logistics firm.",
    problem:
      "Dispatch ran on three spreadsheets and a group chat. Nobody could answer where a shipment was without calling someone.",
    solution:
      "A single operations console: live shipment state, role-scoped access, and an audit trail on every status change.",
    result:
      "Dispatch resolution time dropped from hours to minutes, and the group chat stopped being the system of record.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    placeholder: "dashboard",
  },
  {
    slug: "kiln-supply",
    index: "002",
    name: "Kiln Supply Co.",
    year: "2025",
    summary: "Catalogue and quoting site for a materials supplier.",
    problem:
      "A 400-item catalogue lived in a PDF that went stale monthly, and every quote request arrived as an unstructured email.",
    solution:
      "A fast catalogue with real search and filtering, plus a structured quote builder that produces a clean request.",
    result:
      "Quote requests arrive complete, so the sales reply went from a day of back-and-forth to a single message.",
    stack: ["Next.js", "TypeScript", "Sanity", "Vercel"],
    placeholder: "storefront",
  },
  {
    slug: "ledger-reconcile",
    index: "003",
    name: "Ledger Reconcile",
    year: "2024",
    summary: "Automated reconciliation between a POS system and accounting.",
    problem:
      "Two people spent the first three days of every month manually matching transactions across two systems.",
    solution:
      "A scheduled pipeline that pulls both ledgers, matches on a tolerance rule, and surfaces only genuine exceptions.",
    result:
      "Roughly 96% of lines now reconcile untouched. The monthly close takes an afternoon.",
    stack: ["Python", "PostgreSQL", "Docker", "Cron"],
    placeholder: "pipeline",
  },
  {
    slug: "atlas-api",
    index: "004",
    name: "Atlas API",
    year: "2024",
    summary: "Public API and developer console for a property data provider.",
    problem:
      "Data was delivered as monthly CSV drops. Customers wanted queries, and support was answering schema questions by hand.",
    solution:
      "A versioned REST API with key management, rate limits, and a console where customers test calls against live data.",
    result:
      "Integration went from a two-week engagement to same-day self-service.",
    stack: ["Node.js", "Fastify", "PostgreSQL", "Redis"],
    placeholder: "console",
  },
];
