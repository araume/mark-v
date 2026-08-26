"use client";

import { useEffect, useRef } from "react";
import { MarkSymbol } from "@/components/ui/MarkSymbol";
import { clamp } from "@/lib/scroll";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Signature moment 1 of 3.
 *
 * The plate tilts a few degrees toward the pointer, as if it were a physical
 * object catching the light. Deliberately small: the maximum rotation is 7deg,
 * which reads as parallax rather than as a toy.
 */
export function HeroMark() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const plate = plateRef.current;
    if (!plate || reducedMotion) return;

    // Pointer tracking is meaningless on touch, where it would only fire on tap.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const render = () => {
      // Ease toward the pointer instead of snapping, so fast movement across
      // the screen does not produce a jolt.
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      plate.style.transform = `perspective(900px) rotateY(${currentX.toFixed(
        2,
      )}deg) rotateX(${currentY.toFixed(2)}deg)`;

      const settled =
        Math.abs(targetX - currentX) < 0.01 && Math.abs(targetY - currentY) < 0.01;
      frame = settled ? 0 : requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = clamp((event.clientX / innerWidth - 0.5) * 14, -7, 7);
      targetY = clamp((0.5 - event.clientY / innerHeight) * 14, -7, 7);
      if (!frame) frame = requestAnimationFrame(render);
    };

    const onPointerLeave = () => {
      targetX = 0;
      targetY = 0;
      if (!frame) frame = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      if (frame) cancelAnimationFrame(frame);
      plate.style.transform = "";
    };
  }, [reducedMotion]);

  return (
    <div ref={wrapRef} className="relative mx-auto w-full max-w-md lg:max-w-none">
      {/* Structural rules behind the plate — the "drawing" the part sits on. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-line" />
        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-line" />
        <span className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-line" />
        <span className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-line/60" />
      </div>

      <div
        ref={plateRef}
        className="will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <MarkSymbol className="mx-auto h-56 w-56 sm:h-72 sm:w-72 lg:h-80 lg:w-80" />
      </div>

      {/* Dimension callouts, the way a technical drawing annotates a part. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden sm:block"
      >
        <span className="meta absolute -left-2 top-0 text-accent-soft">Ø 120</span>
        <span className="meta absolute -right-2 bottom-0 text-accent-soft">
          REV. V
        </span>
      </div>
    </div>
  );
}
