/**
 * One rAF loop and one scroll listener for the whole page.
 *
 * Every scroll-linked effect subscribes here instead of attaching its own
 * listener, so the cost of the page's motion stays flat as sections are added.
 * Subscribers are only ticked while their element is actually on screen.
 */

type Subscriber = (viewportHeight: number) => void;

const subscribers = new Set<Subscriber>();
let frame = 0;
let listening = false;

function tick() {
  frame = 0;
  const viewportHeight = window.innerHeight;
  for (const run of subscribers) run(viewportHeight);
}

function schedule() {
  if (frame) return;
  frame = requestAnimationFrame(tick);
}

export function subscribeToScroll(run: Subscriber): () => void {
  subscribers.add(run);

  if (!listening) {
    listening = true;
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
  }

  // Position the new subscriber immediately rather than waiting for a scroll.
  schedule();

  return () => {
    subscribers.delete(run);
    if (subscribers.size === 0 && listening) {
      listening = false;
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    }
  };
}

/**
 * How far an element has travelled through the viewport.
 * 0 when its top edge first enters from below, 1 when its bottom edge exits.
 */
export function viewportProgress(rect: DOMRect, viewportHeight: number): number {
  const total = viewportHeight + rect.height;
  const travelled = viewportHeight - rect.top;
  return Math.min(1, Math.max(0, travelled / total));
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
