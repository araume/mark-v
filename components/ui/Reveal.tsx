"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Rendered element. Defaults to a div so it never breaks semantics by accident. */
  as?: ElementType;
  className?: string;
  /** Stagger, in ms. Use index * 80 for lists. */
  delay?: number;
  /** Vertical travel in px. */
  y?: number;
  /** Starting scale, for cards that should settle into place. */
  scale?: number;
  /** Starting blur in px. Use sparingly — it is the most expensive of the three. */
  blur?: number;
};

/**
 * Intersection-based entrance animation. This is the single reveal primitive
 * for the whole site: the three bespoke scroll effects (hero mark, work cards,
 * process line) are the only motion that does not go through here.
 *
 * Renders as `pending` on the server so there is no flash of the finished state
 * before hydration; the `.js` gate in globals.css keeps the content visible when
 * JavaScript never arrives.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  y = 18,
  scale = 1,
  blur = 0,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Anything already on screen at load reveals immediately.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal={shown ? "shown" : "pending"}
      className={className}
      style={
        {
          "--reveal-delay": `${delay}ms`,
          "--reveal-y": `${y}px`,
          "--reveal-scale": scale,
          "--reveal-blur": `${blur}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
