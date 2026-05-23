"use client";

import { useEffect, useRef } from "react";

const DEBUG = true;

export default function GarlandReveal({ src, className = "" }: { src: string; className?: string }) {
  const ref = useRef<HTMLImageElement>(null);
  const debugRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dbg = () => document.getElementById("gr-debug");
    const log = (msg: string) => { const d = dbg(); if (d) d.textContent = msg; document.title = msg; };

    log("GR:1-started");
    const el = ref.current;
    if (!el) { log("GR:2-el-null"); return; }
    log("GR:3-el-ok");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { log("GR:4-reduced-motion"); return; }
    log("GR:5-setup");

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
      const dbg = document.getElementById("gr-debug");
      if (dbg) dbg.textContent = `scale:${scale.toFixed(2)} t:${t.toFixed(2)} mob:${isMobile} h:${el.offsetHeight}`;
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchmove", onScroll, { passive: true });
    el.addEventListener("load", update);
    log("GR:6-calling-update");
    update();
    log("GR:7-done");

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchmove", onScroll);
      el.removeEventListener("load", update);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <img
        ref={ref}
        src={src}
        className={className}
        style={{ transformOrigin: "bottom center", willChange: "transform" }}
        alt=""
        aria-hidden="true"
        loading="lazy"
      />
      {DEBUG && (
        <div
          id="gr-debug"
          style={{
            position: "fixed", top: 0, left: 0, zIndex: 9999,
            background: "red", color: "white", padding: "6px 10px",
            fontSize: "14px", fontFamily: "monospace",
          }}
        >
          no update yet
        </div>
      )}
    </>
  );
}
