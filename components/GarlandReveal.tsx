"use client";

import { useEffect, useRef } from "react";

export default function GarlandReveal({ src, className = "" }: { src: string; className?: string }) {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isMobile = window.innerWidth < 768;
    const minScale = isMobile ? 0.80 : 0.40;
    const maxScale = isMobile ? 1.20 : 1.25;

    const K = 3;
    const T_MAX = 1.5;
    const sigmoid = (x: number) => 1 / (1 + Math.exp(x));
    const lo = sigmoid(K * T_MAX);
    const hi = sigmoid(-K * T_MAX);
    const normalizedSigmoid = (t: number) => (sigmoid(K * t) - lo) / (hi - lo);

    // ─── Stable layout cache ────────────────────────────────────────────────
    // With transformOrigin:"bottom center", getBoundingClientRect().bottom is
    // invariant to scale — it always equals the layout bottom. Caching it means
    // computeTarget() is pure arithmetic with zero DOM reads per frame.
    let elBottomDoc = 0;
    let elHeight = 0;

    const calibrate = () => {
      elBottomDoc = el.getBoundingClientRect().bottom + window.scrollY;
      elHeight = el.offsetHeight;
    };

    const computeTarget = (): number => {
      const elCenter = elBottomDoc - window.scrollY - elHeight / 2;
      const viewportMid = window.innerHeight / 2;
      const t = Math.max(-T_MAX, Math.min(T_MAX, (elCenter - viewportMid) / viewportMid));
      return minScale + normalizedSigmoid(t) * (maxScale - minScale);
    };

    // ─── rAF lerp ───────────────────────────────────────────────────────────
    // scroll/touch events update targetScale only.
    // The rAF loop eases currentScale toward targetScale each frame.
    // No CSS transition — avoids the restart-chop on discrete mouse-wheel input.
    const SMOOTHING = 0.1; // raise → snappier, lower → floatier
    let targetScale = minScale;
    let currentScale = minScale;
    let rafId: number;
    let ticking = false;

    const tick = () => {
      currentScale += (targetScale - currentScale) * SMOOTHING;
      el.style.transform = `scale(${currentScale})`;
      if (Math.abs(targetScale - currentScale) > 0.0005) {
        rafId = requestAnimationFrame(tick);
      } else {
        el.style.transform = `scale(${targetScale})`;
        ticking = false;
      }
    };

    const onScroll = () => {
      targetScale = computeTarget();
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    // ─── Calibration triggers ───────────────────────────────────────────────
    // Snap (no animation) whenever the layout may have shifted.
    const snap = () => {
      calibrate();
      targetScale = computeTarget();
      currentScale = targetScale;
      el.style.transform = `scale(${currentScale})`;
    };

    const onResize = () => snap();

    // ─── Init ────────────────────────────────────────────────────────────────
    calibrate();
    snap();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchmove", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    el.addEventListener("load", snap);

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", onResize);
      window.visualViewport.addEventListener("scroll", onScroll);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchmove", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      el.removeEventListener("load", snap);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", onResize);
        window.visualViewport.removeEventListener("scroll", onScroll);
      }
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <img
      ref={ref}
      src={src}
      className={className}
      style={{ transformOrigin: "bottom center", willChange: "transform" }}
      alt=""
      aria-hidden="true"
      loading="lazy"
    />
  );
}
