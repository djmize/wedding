const BASE = "/assets/wedding-botanical";

export default function Home() {
  return (
    <div className="bg-cream">

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-32 overflow-hidden">
        <img
          src={`${BASE}/tropical-corner-top-left-01.png`}
          className="absolute top-0 left-0 w-40 md:w-64 lg:w-80 pointer-events-none select-none"
          alt="" aria-hidden="true"
        />
        <img
          src={`${BASE}/tropical-corner-top-right-01.png`}
          className="absolute top-0 right-0 w-36 md:w-56 lg:w-72 pointer-events-none select-none"
          alt="" aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col items-center">
          <p className="text-xs tracking-[0.35em] uppercase text-gold mb-10">
            Together with their families
          </p>
          <h1 className="font-display font-light text-[clamp(3rem,10vw,7rem)] text-bark leading-none mb-10">
            Danny &amp; Bridget
          </h1>
          <div className="w-px h-14 bg-gold/50 mb-10" />
          <p className="text-sage text-lg tracking-widest mb-3">June 12, 2027</p>
          <p className="text-gold text-xs tracking-[0.3em] uppercase">
            Seven Mile Beach &nbsp;·&nbsp; Grand Cayman
          </p>
        </div>
      </section>

      {/* ── Garland divider ── */}
      <div className="w-full overflow-hidden -mt-8 md:-mt-16">
        <img
          src={`${BASE}/tropical-garland-horizontal-01.png`}
          className="w-full pointer-events-none select-none"
          alt="" aria-hidden="true" loading="lazy"
        />
      </div>

      {/* ── Details ── */}
      <section className="relative py-16 md:py-24 px-6 flex items-center justify-center bg-cream">
        <div className="relative w-full max-w-xs md:max-w-sm" style={{ paddingBottom: "125%" }}>
          <img
            src={`${BASE}/tropical-frame-rectangular-01.png`}
            className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
            alt="" aria-hidden="true" loading="lazy"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-14 md:px-16">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">Save the Date</p>
            <h2 className="font-display font-light text-3xl md:text-4xl text-bark mb-6 leading-snug">
              Danny &amp; Bridget
            </h2>
            <div className="w-8 h-px bg-gold/60 mb-6" />
            <p className="text-sage text-sm tracking-wide mb-2">June 12, 2027</p>
            <p className="text-gold text-xs tracking-widest uppercase leading-relaxed">
              Seven Mile Beach<br />Grand Cayman, KY
            </p>
          </div>
        </div>
      </section>

      {/* ── Travel teaser ── */}
      <section className="py-20 px-6 text-center bg-ivory">
        <p className="text-xs tracking-[0.35em] uppercase text-gold mb-6">Destination</p>
        <h2 className="font-display font-light text-4xl md:text-5xl text-bark mb-6">
          Grand Cayman
        </h2>
        <p className="text-sage max-w-md mx-auto leading-relaxed text-sm">
          Seven Mile Beach is one of the most beautiful stretches of sand in the Caribbean.
          More details on travel and accommodations are coming soon.
        </p>
      </section>

      {/* ── Footer ── */}
      <footer className="relative overflow-hidden py-16 px-6 text-center bg-cream border-t border-sand">
        <img
          src={`${BASE}/tropical-corner-bottom-right-01.png`}
          className="absolute bottom-0 right-0 w-36 md:w-52 pointer-events-none select-none"
          alt="" aria-hidden="true" loading="lazy"
        />
        <div className="relative z-10">
          <p className="font-display font-light text-2xl text-bark mb-2">Danny &amp; Bridget</p>
          <p className="text-gold text-xs tracking-[0.3em] uppercase">
            June 12, 2027 &nbsp;·&nbsp; Seven Mile Beach, Grand Cayman
          </p>
        </div>
      </footer>

    </div>
  );
}
