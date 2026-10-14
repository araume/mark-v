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
  /** Live deployment, when there is one to link. Omitted for shipped binaries. */
  link?: string;
  /**
   * Screenshot, served from /public. Give a project an `image` and drop its
   * `placeholder` — ProjectCard renders the generated visual only while the
   * screenshot is missing, so swapping content never touches a component.
   *
   * `width`/`height` are the file's true pixel dimensions: the card takes its
   * aspect ratio from them, so a capture is never cropped to fit a shape it
   * was not taken in.
   */
  image?: { src: string; width: number; height: number; alt: string };
  placeholder?: "dashboard" | "storefront" | "pipeline" | "console";
};

export const projects: Project[] = [
  {
    slug: "beca-logistics",
    index: "001",
    name: "BECA Logistics",
    year: "2026",
    summary: "Landing page for an international freight forwarder.",
    problem:
      "A forwarder operating since 2009 with nothing an importer could check first — registrations, service scope, and delivery times all lived in phone calls and attachments.",
    solution:
      "A single landing page that puts the whole operation on the record: six service lines, DTI and LTFRB numbers, the carrier network, and a per-region lead-time table, with the quote path always one click away.",
    result:
      "Importers can qualify Beca before they make contact, so the enquiries that arrive start from the route and the cargo rather than from the basics.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    link: "https://becalogistics.online/",
    image: {
      src: "/beca-preview.png",
      width: 1900,
      height: 969,
      alt: "The Beca Logistics home page: the headline “Fast, safe, reliable, personalized service.” set over a world map, above a strip noting BOC accreditation, established 2009, and DTI and LTFRB registration.",
    },
  },
  {
    slug: "transcan",
    index: "002",
    name: "TranScan",
    year: "2025",
    summary: "Computer vision software that reads e-receipts.",
    problem:
      "Every e-receipt had to be opened and read by a person, who then retyped the same three fields into another system — slow, and wrong often enough to matter.",
    solution:
      "Desktop software that takes an uploaded e-receipt and extracts the total amount, phone number, and reference number from the image itself, with no template per issuer.",
    result:
      "The three fields come off the receipt without anyone reading it, turning a manual transcription step into an upload.",
    stack: ["Python", "Computer Vision", "OCR"],
    link: "https://github.com/araume/transcan/",
    placeholder: "console",
  },
];
