"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  speed?: number;
  loading?: "eager" | "lazy";
  scrollBased?: boolean;
};

export default function ParallaxBotanical({
  src,
  className = "",
  style,
  speed = 0.1,
  loading = "lazy",
  scrollBased = false,
}: Props) {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 768) return;

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

    // Re-run update on layout changes so the offset stays correct after
    // resize, orientation flip, or virtual keyboard appearance.
    const onResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", onResize);
      window.visualViewport.addEventListener("scroll", onScroll);
    }

    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", onResize);
        window.visualViewport.removeEventListener("scroll", onScroll);
      }
      cancelAnimationFrame(rafId);
    };
  }, [speed, scrollBased]);

  return (
    <img
      ref={ref}
      src={src}
      className={className}
      style={style}
      alt=""
      aria-hidden="true"
      loading={loading}
    />
  );
}
