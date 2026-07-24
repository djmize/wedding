"use client";
import { useEffect, useRef, useState } from "react";

export default function VideoBackground({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [needsTap, setNeedsTap] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const play = () =>
      video.play()
        .then(() => setNeedsTap(false))
        .catch(() => setNeedsTap(true));
    const handleVisibility = () => { if (!document.hidden) play(); };

    video.load();
    video.addEventListener("canplay", play, { once: true });
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const handleTap = () => {
    ref.current?.play().then(() => setNeedsTap(false)).catch(() => {});
  };

  return (
    <>
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
      {needsTap && (
        <button
          onClick={handleTap}
          className="absolute inset-0 w-full h-full flex items-center justify-center z-20 cursor-pointer"
          aria-label="Play video"
        >
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7 ml-1">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      )}
    </>
  );
}
