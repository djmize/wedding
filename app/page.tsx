function Divider() {
  return (
    <div className="flex items-center justify-center gap-3 my-5">
      <div className="h-px w-12 bg-white/40" />
      <div className="w-1 h-1 rounded-full bg-white/60" />
      <div className="h-px w-12 bg-white/40" />
    </div>
  );
}

export default function Home() {
  return (
    <div className="h-[calc(100vh-57px)] overflow-hidden relative">

      {/* Background photo */}
      <img
        src="/assets/hand_hold.png"
        className="absolute inset-0 w-full h-full object-cover object-center"
        alt="Bridget and Danny"
        loading="eager"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <div className="flex flex-col items-center animate-fade-up">
          <p className="font-display text-white/85 mb-3" style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}>
            Join the celebration with
          </p>
          <h1
            className="font-display font-light text-white leading-[1.05] mb-9"
            style={{ fontSize: "clamp(3.25rem, 7.5vw, 5.75rem)" }}
          >
            Bridget &amp; Danny
          </h1>
          <Divider />
          <p
            className="font-display text-white/80 tracking-[0.14em] mt-1 mb-2"
            style={{ fontSize: "clamp(0.88rem, 1.6vw, 1.05rem)" }}
          >
            June 12, 2027
          </p>
          <p
            className="font-display text-white/65 tracking-[0.14em] uppercase"
            style={{ fontSize: "clamp(0.68rem, 1.1vw, 0.78rem)" }}
          >
            Seven Mile Beach, Grand Cayman, KY
          </p>
        </div>
      </div>

    </div>
  );
}
