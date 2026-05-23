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

    let rafId: number;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const viewportMid = window.innerHeight / 2;
      const t = Math.max(-T_MAX, Math.min(T_MAX, (elementCenter - viewportMid) / viewportMid));
      const scale = minScale + normalizedSigmoid(t) * (maxScale - minScale);
      el.style.marginTop = `-${el.offsetHeight * (1 - scale)}px`;
      el.style.transform = `scale(${scale})`;
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchmove", onScroll, { passive: true });
    el.addEventListener("load", update);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchmove", onScroll);
      el.removeEventListener("load", update);
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
