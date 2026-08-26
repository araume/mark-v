"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { MarkSymbol } from "@/components/ui/MarkSymbol";

export function Navbar() {
  const [compact, setCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Compact state is a single boolean flip, so a plain listener with a
  // threshold is cheaper here than joining the shared rAF loop.
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A fixed-position menu must not leave the page scrollable behind it.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
        compact
          ? "border-line bg-surface/85 backdrop-blur-sm"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-[height] duration-300 sm:px-8 ${
          compact ? "h-14" : "h-20"
        }`}
      >
        <a
          href="#top"
          className="flex items-center gap-2.5"
          aria-label={`${site.name} — home`}
        >
          <MarkSymbol
            className={`transition-[width,height] duration-300 ${
              compact ? "h-6 w-6" : "h-7 w-7"
            }`}
          />
          <span className="font-mono text-sm font-medium tracking-[0.18em] text-ink">
            MARK-V
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="meta transition-colors hover:text-accent"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden border border-ink bg-ink px-4 py-2.5 font-mono text-[0.6875rem] tracking-[0.14em] text-surface transition-colors hover:bg-accent-strong hover:border-accent-strong md:inline-block"
          >
            START A PROJECT
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="flex h-10 w-10 items-center justify-center border border-line-strong md:hidden"
          >
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" className="relative block h-3 w-4">
              <span
                className={`absolute left-0 block h-px w-4 bg-ink transition-transform duration-300 ${
                  menuOpen ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-4 bg-ink transition-transform duration-300 ${
                  menuOpen ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="border-t border-line bg-surface md:hidden"
      >
        <ul className="mx-auto max-w-7xl px-5 py-2 sm:px-8">
          {nav.map((item) => (
            <li key={item.href} className="border-b border-line last:border-b-0">
              <a
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between py-4 font-mono text-xs tracking-[0.14em] text-ink"
              >
                {item.label}
                <span aria-hidden="true" className="text-accent-soft">
                  →
                </span>
              </a>
            </li>
          ))}
          <li className="py-4">
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="block border border-ink bg-ink px-4 py-3 text-center font-mono text-[0.6875rem] tracking-[0.14em] text-surface"
            >
              START A PROJECT
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
