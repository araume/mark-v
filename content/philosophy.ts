export type Principle = {
  index: string;
  title: string;
  body: string;
};

export const principles: Principle[] = [
  {
    index: "01",
    title: "Build useful things",
    body: "The measure of a build is whether the person it was made for stops working around the problem.",
  },
  {
    index: "02",
    title: "Keep systems understandable",
    body: "Someone else has to read this later. Clever costs more than it saves.",
  },
  {
    index: "03",
    title: "Prefer solutions over complexity",
    body: "The right amount of architecture is the least that solves the problem and survives the next change.",
  },
  {
    index: "04",
    title: "Design for the people using it",
    body: "Software is used by someone under time pressure who did not read the documentation.",
  },
  {
    index: "05",
    title: "Ship, test, improve",
    body: "Working software in front of real users beats a longer plan every time.",
  },
];
