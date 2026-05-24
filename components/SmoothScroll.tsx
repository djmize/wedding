"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Global smooth-scroll provider — desktop only, mouse/wheel only.
 * Renders nothing; only installs Lenis as a side-effect.
 *
 * Skipped when:
 *  - prefers-reduced-motion is set
 *  - device is a touch device (mobile/tablet) — native scroll already feels premium
 *
 * GarlandReveal and ParallaxBotanical listen on window "scroll"; Lenis drives
 * the page by calling window.scrollTo() on every rAF tick, so those listeners
 * receive the smoothed scroll position automatically — no changes needed there.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Skip on touch devices: native mobile inertia scrolling already feels good,
    // and Lenis adds latency without benefit on touch.
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const lenis = new Lenis({
      duration: 0.9,        // ~0.9 s feels premium without being sluggish
      smoothWheel: true,    // the main problem we're solving
      syncTouch: false,     // do not smooth native touch events
      wheelMultiplier: 0.9, // slightly lighter than default so it doesn't feel heavy
      touchMultiplier: 1.0, // no-op when syncTouch: false, but kept for clarity
    });

    // Use a mutable `rafId` so cleanup always cancels the latest pending frame,
    // even if it fires while `raf()` is executing.
    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
