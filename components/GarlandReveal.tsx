"use client";

import { useEffect, useRef } from "react";

export default function GarlandReveal({ src, className = "" }: { src: string; className?: string }) {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
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

    // Stable layout anchor — bottom edge is invariant to scale with
    // transformOrigin:"bottom center", so computeTarget() has zero DOM reads.
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

    // No CSS transitions. Scroll events update targetScale only.
    // render() eases currentScale toward targetScale each rAF frame.
    calibrate();
    let currentScale = computeTarget();
    let targetScale = currentScale;
    let rafId = 0;
    let running = false;

    el.style.transition = "none";
    el.style.transform = `translate3d(0,0,0) scale(${currentScale})`;

    function render() {
      currentScale += (targetScale - currentScale) * 0.10;
      el.style.transform = `translate3d(0,0,0) scale(${currentScale})`;

      if (Math.abs(targetScale - currentScale) > 0.001) {
        rafId = requestAnimationFrame(render);
      } else {
        currentScale = targetScale;
        el.style.transform = `translate3d(0,0,0) scale(${currentScale})`;
        running = false;
      }
    }

    function start() {
      if (!running) {
        running = true;
        rafId = requestAnimationFrame(render);
      }
    }

    function updateTarget() {
      targetScale = computeTarget();
      start();
    }

    // Snap immediately on layout changes — no animation.
    function recalibrate() {
      calibrate();
      targetScale = computeTarget();
      currentScale = targetScale;
      el.style.transform = `translate3d(0,0,0) scale(${currentScale})`;
    }

    window.addEventListener("scroll", updateTarget, { passive: true });
    window.addEventListener("touchmove", updateTarget, { passive: true });
    window.addEventListener("resize", recalibrate);
    window.addEventListener("orientationchange", recalibrate);
    el.addEventListener("load", recalibrate);

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", recalibrate);
      window.visualViewport.addEventListener("scroll", updateTarget);
    }

    return () => {
      window.removeEventListener("scroll", updateTarget);
      window.removeEventListener("touchmove", updateTarget);
      window.removeEventListener("resize", recalibrate);
      window.removeEventListener("orientationchange", recalibrate);
      el.removeEventListener("load", recalibrate);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", recalibrate);
        window.visualViewport.removeEventListener("scroll", updateTarget);
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
