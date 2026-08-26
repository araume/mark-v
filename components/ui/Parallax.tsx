"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { subscribeToScroll, viewportProgress } from "@/lib/scroll";
import { useReducedMotion } from "@/lib/useReducedMotion";

type ParallaxProps = {
  children: ReactNode;
  /** Total travel in px across the full viewport pass. Negative moves up. */
  distance?: number;
  className?: string;
  /**
   * Below this viewport width the effect is skipped entirely. Parallax on a
   * small screen mostly reads as jitter, and the plan calls for reducing
   * decorative motion on mobile.
   */
  minWidth?: number;
};

export function Parallax({
  children,
  distance = -60,
  className,
  minWidth = 768,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reducedMotion) return;
    if (window.innerWidth < minWidth) return;

    let onScreen = false;
    let last = Number.NaN;

    const visibility = new IntersectionObserver(
      (entries) => {
        onScreen = entries[0]?.isIntersecting ?? false;
      },
      { rootMargin: "20% 0px" },
    );
    visibility.observe(node);

    const unsubscribe = subscribeToScroll((viewportHeight) => {
      if (!onScreen) return;

      const progress = viewportProgress(node.getBoundingClientRect(), viewportHeight);
      // Centre the travel so the element sits at its natural position mid-pass.
      const offset = (progress - 0.5) * distance;

      // Sub-pixel churn is invisible but still forces a style recalc.
      if (Math.abs(offset - last) < 0.1) return;
      last = offset;
      node.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    });

    return () => {
      visibility.disconnect();
      unsubscribe();
      node.style.transform = "";
    };
  }, [distance, minWidth, reducedMotion]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
