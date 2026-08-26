"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { processSteps } from "@/content/process";
import { clamp, subscribeToScroll } from "@/lib/scroll";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Signature moment 3 of 3.
 *
 * A rule draws from the first step to the last as the section passes the middle
 * of the viewport, and each step's marker fills once the line reaches it. Under
 * reduced motion the line is simply drawn complete — the progression is
 * decorative, and the numbered steps carry the sequence on their own.
 */
export function Process() {
  const trackRef = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(0);
  const reducedMotion = useReducedMotion();

  // With reduced motion the line is simply drawn complete, so the effect below
  // never has to run and never has to write progress state.
  const drawn = reducedMotion ? 1 : progress;

  useEffect(() => {
    const node = trackRef.current;
    if (!node || reducedMotion) return;

    let onScreen = false;
    const visibility = new IntersectionObserver(
      (entries) => {
        onScreen = entries[0]?.isIntersecting ?? false;
      },
      { rootMargin: "30% 0px" },
    );
    visibility.observe(node);

    const unsubscribe = subscribeToScroll((viewportHeight) => {
      if (!onScreen) return;
      const rect = node.getBoundingClientRect();
      // The line tracks the point two-thirds down the viewport, so it stays
      // just ahead of where the reader is actually looking.
      const anchor = viewportHeight * 0.66;
      setProgress(clamp((anchor - rect.top) / rect.height, 0, 1));
    });

    return () => {
      visibility.disconnect();
      unsubscribe();
    };
  }, [reducedMotion]);

  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="border-b border-line py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          id="process-title"
          index="05"
          label="PROCESS"
          title="How a project actually runs."
          lede="Five stages. You see working software from stage three onward, not at the end."
        />

        <ol ref={trackRef} className="relative mt-14 max-w-3xl">
          {/* Track */}
          <span
            aria-hidden="true"
            className="absolute left-[11px] top-2 bottom-2 w-px bg-line"
          />
          {/* Drawn progress */}
          <span
            aria-hidden="true"
            className="absolute left-[11px] top-2 w-px origin-top bg-accent"
            style={{
              height: "calc(100% - 1rem)",
              transform: `scaleY(${drawn})`,
              transition: reducedMotion ? "none" : "transform 120ms linear",
            }}
          />

          {processSteps.map((step, index) => {
            // Each marker lights once the line has passed its own position.
            const threshold = index / Math.max(1, processSteps.length - 1);
            const reached = drawn >= threshold - 0.04;

            return (
              <li key={step.index} className="relative pl-12 pb-12 last:pb-0">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1 flex h-[23px] w-[23px] items-center justify-center border bg-surface transition-colors duration-500"
                  style={{
                    borderColor: reached ? "#2F6E93" : "#D9E0E5",
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 transition-colors duration-500"
                    style={{ backgroundColor: reached ? "#2F6E93" : "#D9E0E5" }}
                  />
                </span>

                <Reveal delay={index * 60} y={14}>
                  <p className="meta text-accent">{step.index}</p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                    {step.body}
                  </p>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
