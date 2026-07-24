"use client";
import { useEffect, useRef, useState } from "react";

export default function VideoHero({
  src,
  children,
}: {
  src: string;
  children: React.ReactNode;
}) {
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

      {/* Dark overlay — always present */}
      <div className="absolute inset-0 bg-black/35" />

      {needsTap ? (
        <button
          onClick={handleTap}
          className="absolute inset-0 w-full h-full flex items-center justify-center z-10 cursor-pointer"
          aria-label="Play video"
        >
          <div className="w-16 h-16 rounded-full border border-white/40 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6 ml-1 opacity-70">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      ) : (
        children
      )}
    </>
  );
}
