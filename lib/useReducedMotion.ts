"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void): () => void {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

/**
 * The server cannot know the preference, so it assumes reduced. Motion is
 * opt-in once the client has actually been asked, which means a hydration pass
 * never starts an animation the visitor asked not to see.
 */
function getServerSnapshot(): boolean {
  return true;
}

/**
 * matchMedia is an external store, so this reads it through the API built for
 * that rather than mirroring it into state via an effect.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
