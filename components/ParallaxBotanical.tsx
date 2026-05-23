"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  className?: string;
  speed?: number;
  loading?: "eager" | "lazy";
  scrollBased?: boolean;
};

export default function ParallaxBotanical({
  src,
  className = "",
  speed = 0.1,
  loading = "lazy",
  scrollBased = false,
}: Props) {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    if (prefersReduced || isMobile) return;

    let rafId: number;

    const update = () => {
      if (scrollBased) {
        el.style.transform = `translateY(${-window.scrollY * speed}px)`;
      } else {
        const parent = el.parentElement;
        if (!parent) return;
        const rect = parent.getBoundingClientRect();
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
        el.style.transform = `translateY(${offset}px)`;
      }
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
  }, [speed, scrollBased]);

  return (
    <img
      ref={ref}
      src={src}
      className={className}
      alt=""
      aria-hidden="true"
      loading={loading}
    />
  );
}
