"use client";
import { useEffect, useRef } from "react";

export default function VideoBackground({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const resume = () => video.play().catch(() => {});
    const handleVisibility = () => { if (!document.hidden) resume(); };

    resume();
    video.addEventListener("pause", resume);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      video.removeEventListener("pause", resume);
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
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
