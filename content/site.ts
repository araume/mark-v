export const site = {
  name: "MARK-V",
  operator: "Mark",
  role: "Software & Web Engineering",
  // Location is a real ranking signal for "web developer Philippines" — it has
  // to appear in copy and structured data, not just in metadata keywords.
  location: "Philippines",
  locality: "Manila",
  region: "PH",
  tagline:
    "Building thoughtful digital systems, websites, and software for people who need things to actually work.",
  status: "AVAILABLE FOR SELECT PROJECTS",
  email: "hello@mark-v.dev",
  url: "https://mark-v.dev",
  socials: [
    { label: "GITHUB", href: "https://github.com/", handle: "/mark-v" },
    { label: "LINKEDIN", href: "https://linkedin.com/", handle: "/in/mark-v" },
  ],
} as const;

export const nav = [
  { label: "WORK", href: "#work" },
  { label: "SERVICES", href: "#services" },
  { label: "ABOUT", href: "#operator" },
  { label: "CONTACT", href: "#contact" },
] as const;
