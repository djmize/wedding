"use client";
import { useEffect, useRef } from "react";

export default function VideoBackground({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const play = () => video.play().catch(() => {});
    const handleVisibility = () => { if (!document.hidden) play(); };

    // Force reload on each mount so navigation doesn't leave stale paused state
    video.load();
    video.addEventListener("canplay", play, { once: true });
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
