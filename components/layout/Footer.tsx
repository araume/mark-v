import { MarkSymbol } from "@/components/ui/MarkSymbol";
import { nav, site } from "@/content/site";

const disciplines = ["Websites", "Applications", "Automation", "Custom Software"];

export function Footer() {
  return (
    <footer className="bg-surface py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 border-b border-line pb-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <MarkSymbol className="h-7 w-7" />
              <span className="font-mono text-sm font-medium tracking-[0.18em] text-ink">
                MARK-V
              </span>
            </div>
            <p className="meta mt-4">SOFTWARE &amp; WEB ENGINEERING</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {disciplines.join(" · ")}
            </p>
            <p className="mt-4 text-sm text-muted">
              {site.locality}, {site.location} — working with clients anywhere.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="meta">NAVIGATE</p>
            <ul className="mt-3 space-y-0.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-block py-1.5 font-mono text-[0.6875rem] tracking-[0.12em] text-ink transition-colors hover:text-accent"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="meta">CONTACT</p>
            <ul className="mt-3 space-y-0.5">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-block py-1.5 font-mono text-[0.6875rem] tracking-[0.12em] text-ink transition-colors hover:text-accent"
                >
                  EMAIL
                </a>
              </li>
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className="inline-block py-1.5 font-mono text-[0.6875rem] tracking-[0.12em] text-ink transition-colors hover:text-accent"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="meta">© {new Date().getFullYear()} MARK-V</p>
          <p className="meta">
            <span className="text-accent">●</span> SYSTEM STATUS: ONLINE
          </p>
        </div>
      </div>
    </footer>
  );
}
