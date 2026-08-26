export type ProcessStep = {
  index: string;
  title: string;
  body: string;
};

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Discover",
    body: "Understand the problem, the people doing the work today, and what a good outcome actually looks like.",
  },
  {
    index: "02",
    title: "Plan",
    body: "Define the solution, the scope, and what is explicitly not in this build. Agree before anything is written.",
  },
  {
    index: "03",
    title: "Build",
    body: "Develop the system in reviewable increments, so you see working software early rather than at the end.",
  },
  {
    index: "04",
    title: "Refine",
    body: "Test against real use, fix what the real use exposes, and polish the parts people touch every day.",
  },
  {
    index: "05",
    title: "Deploy",
    body: "Ship it, hand over the documentation and the keys, and stay reachable for what comes after.",
  },
];
