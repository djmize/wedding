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

    // Cache stable layout values — bottom edge is invariant with transformOrigin:bottom center
    let elBottomDoc = el.getBoundingClientRect().bottom + window.scrollY;
    let elHeight = el.offsetHeight;

    const computeTarget = (): number => {
      const elCenter = elBottomDoc - window.scrollY - elHeight / 2;
      const viewportMid = window.innerHeight / 2;
      const t = Math.max(-T_MAX, Math.min(T_MAX, (elCenter - viewportMid) / viewportMid));
      return minScale + normalizedSigmoid(t) * (maxScale - minScale);
    };

    // Snap to initial scale with no transition, then enable CSS transition.
    // CSS transitions run on the GPU compositor thread — smooth on all browsers.
    el.style.transition = "none";
    el.style.transform = `scale(${computeTarget()})`;
    requestAnimationFrame(() => {
      el.style.transition = "transform 0.3s ease-out";
    });

    let rafId: number;

    const update = () => {
      el.style.transform = `scale(${computeTarget()})`;
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    const onLoad = () => {
      elBottomDoc = el.getBoundingClientRect().bottom + window.scrollY;
      elHeight = el.offsetHeight;
      el.style.transition = "none";
      el.style.transform = `scale(${computeTarget()})`;
      requestAnimationFrame(() => {
        el.style.transition = "transform 0.3s ease-out";
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchmove", onScroll, { passive: true });
    el.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchmove", onScroll);
      el.removeEventListener("load", onLoad);
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
