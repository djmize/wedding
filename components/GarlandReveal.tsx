"use client";

import { useEffect, useRef } from "react";

export default function GarlandReveal({ src, className = "" }: { src: string; className?: string }) {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId: number;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const viewportMid = window.innerHeight / 2;
      // t = 1 when entering from bottom, 0 when centered, -1 when exiting top
      const t = Math.max(-1.5, Math.min(1.5, (elementCenter - viewportMid) / viewportMid));
      const k = 3;
      const raw = 1 / (1 + Math.exp(k * t));
      const lo = 1 / (1 + Math.exp(k * 1.5));
      const hi = 1 / (1 + Math.exp(-k * 1.5));
      const n = (raw - lo) / (hi - lo);
      const scale = 0.40 + n * 0.85;
      el.style.marginTop = `-${el.offsetHeight * (1 - scale)}px`;
      el.style.transform = `scale(${scale})`;
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
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
