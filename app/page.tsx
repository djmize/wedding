const BASE = "/assets/wedding-botanical";

function Divider() {
  return (
    <div className="flex items-center justify-center gap-3 my-5">
      <div className="h-px w-12 bg-gold/40" />
      <div className="w-1 h-1 rounded-full bg-gold/60" />
      <div className="h-px w-12 bg-gold/40" />
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.65rem] tracking-[0.22em] uppercase text-gold mb-4">
      {children}
    </p>
  );
}

export default function Home() {
  return (
    <div className="bg-cream overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">

        {/* Large top-right corner — pushed further offscreen */}
        <img
          src={`${BASE}/tropical-corner-top-right-01.png`}
          className="absolute -top-12 -right-14 md:-right-24 w-[50vw] md:w-[37vw] max-w-xl pointer-events-none select-none"
          alt="" aria-hidden="true"
        />

        {/* Bottom-left — desktop only, intentionally half-visible */}
        <img
          src={`${BASE}/tropical-corner-bottom-left-01.png`}
          className="absolute -bottom-12 -left-10 w-44 md:w-64 pointer-events-none select-none hidden md:block opacity-75"
          alt="" aria-hidden="true"
        />

        {/* Hero text */}
        <div className="relative z-10 flex flex-col items-center animate-fade-up">
          <Eyebrow>Together with their families</Eyebrow>
          <h1
            className="font-display font-light text-bark leading-[1.05] mb-9"
            style={{ fontSize: "clamp(3.25rem, 7.5vw, 5.75rem)" }}
          >
            Danny &amp; Bridget
          </h1>
          <Divider />
          <p
            className="text-sage tracking-[0.14em] mt-1 mb-2"
            style={{ fontSize: "clamp(0.88rem, 1.6vw, 1.05rem)" }}
          >
            June 12, 2027
          </p>
          <p
            className="text-gold tracking-[0.14em] uppercase"
            style={{ fontSize: "clamp(0.68rem, 1.1vw, 0.78rem)" }}
          >
            Seven Mile Beach, Grand Cayman, KY
          </p>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-fade-up-delay">
          <div className="w-px h-7 bg-gold/30" />
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="text-gold/50">
            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </section>

      {/* ── Garland — overlaps hero bottom and welcome top ── */}
      <div className="w-full overflow-hidden pointer-events-none select-none -mt-12 md:-mt-20 -mb-8 md:-mb-14">
        <img
          src={`${BASE}/tropical-garland-horizontal-01.png`}
          className="w-full"
          alt="" aria-hidden="true" loading="lazy"
        />
      </div>

      {/* ── Welcome ── */}
      <section className="py-16 px-6 bg-cream">
        <div className="max-w-lg mx-auto text-center">
          <Eyebrow>Welcome</Eyebrow>
          <h2
            className="font-display font-light text-bark mb-6 leading-snug"
            style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.5rem)" }}
          >
            We&apos;re getting married<br />in paradise
          </h2>
          <p className="text-bark/75 leading-[1.9]" style={{ fontSize: "clamp(0.87rem, 1.4vw, 0.93rem)" }}>
            We are so thrilled to share this milestone with the people we love most.
            Join us on the shores of Seven Mile Beach as we begin our forever together.
            More details are on the way — for now, please save the date.
          </p>
        </div>
      </section>

      {/* ── Details ── */}
      <section id="details" className="pt-14 pb-16 px-6 bg-[#F9F5EE]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Eyebrow>Mark Your Calendar</Eyebrow>
            <h2
              className="font-display font-light text-bark"
              style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.5rem)" }}
            >
              Event Details
            </h2>
            <Divider />
          </div>

          {/* Invitation frame card — larger, with shadow */}
          <div
            className="relative w-full max-w-[340px] md:max-w-[410px] mx-auto drop-shadow-[0_6px_28px_rgba(44,26,14,0.09)]"
            style={{ paddingBottom: "125%" }}
          >
            <img
              src={`${BASE}/tropical-frame-rectangular-01.png`}
              className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
              alt="" aria-hidden="true" loading="lazy"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-12 md:px-16">
              <p className="font-display italic text-gold mb-5" style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)" }}>
                Save the Date
              </p>
              <h3
                className="font-display font-light text-bark leading-snug mb-4"
                style={{ fontSize: "clamp(1.5rem, 2.8vw, 2rem)" }}
              >
                Danny &amp; Bridget
              </h3>
              <div className="w-8 h-px bg-gold/50 mb-5" />
              <p className="text-sage tracking-wide mb-2" style={{ fontSize: "clamp(0.75rem, 1.2vw, 0.85rem)" }}>
                June 12, 2027
              </p>
              <p
                className="text-gold tracking-[0.1em] uppercase leading-relaxed"
                style={{ fontSize: "clamp(0.62rem, 1vw, 0.72rem)" }}
              >
                Seven Mile Beach<br />Grand Cayman, KY
              </p>
              <p className="text-bark/50 tracking-wide mt-7" style={{ fontSize: "clamp(0.62rem, 1vw, 0.68rem)" }}>
                Ceremony &amp; reception details<br />coming soon
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Travel ── */}
      <section id="travel" className="py-20 px-6 bg-cream overflow-hidden">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 md:gap-28 items-center">

          {/* Left: botanical spray + heading */}
          <div className="relative min-h-[260px] md:min-h-0">
            <img
              src={`${BASE}/tropical-side-spray-left-01.png`}
              className="absolute -left-14 top-0 bottom-0 h-full w-auto pointer-events-none select-none hidden md:block opacity-70"
              alt="" aria-hidden="true" loading="lazy"
            />
            <div className="relative z-10 md:pl-44">
              <Eyebrow>Destination</Eyebrow>
              <h2
                className="font-display font-light text-bark leading-snug mb-4"
                style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.5rem)" }}
              >
                Grand Cayman
              </h2>
              <div className="h-px w-10 bg-gold/40 mb-5" />
              <p className="text-bark/75 leading-[1.9]" style={{ fontSize: "clamp(0.85rem, 1.3vw, 0.9rem)" }}>
                Seven Mile Beach is one of the Caribbean&apos;s most celebrated stretches
                of coastline — turquoise water, warm breezes, and world-class hospitality await.
              </p>
            </div>
          </div>

          {/* Right: getting there + stay */}
          <div className="space-y-7">
            <div>
              <h3 className="font-display text-xl text-bark mb-2">Getting There</h3>
              <p className="text-bark/75 leading-[1.9]" style={{ fontSize: "clamp(0.85rem, 1.3vw, 0.9rem)" }}>
                Grand Cayman is served by Owen Roberts International Airport (GCM),
                with direct flights from most major U.S. cities. We recommend arriving
                a day early to settle in and enjoy the island.
              </p>
            </div>
            <div className="h-px bg-sand" />
            <div>
              <h3 className="font-display text-xl text-bark mb-2">Where to Stay</h3>
              <p className="text-bark/75 leading-[1.9]" style={{ fontSize: "clamp(0.85rem, 1.3vw, 0.9rem)" }}>
                Accommodation recommendations and room blocks are coming soon.
                Seven Mile Beach has a range of options from boutique hotels
                to private villas — there&apos;s something for everyone.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── RSVP teaser ── */}
      <section id="rsvp" className="py-16 px-6 bg-[#F9F5EE] text-center">
        <div className="max-w-sm mx-auto border border-sand bg-cream/70 px-10 py-12">
          <Eyebrow>Stay Tuned</Eyebrow>
          <h2
            className="font-display font-light text-bark mb-1"
            style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.5rem)" }}
          >
            RSVP Coming Soon
          </h2>
          <Divider />
          <p
            className="text-bark/70 leading-[1.9]"
            style={{ fontSize: "clamp(0.85rem, 1.3vw, 0.9rem)" }}
          >
            Formal invitations will be sent closer to the date.
            For now, please save June 12, 2027 —
            we hope to see you in Grand Cayman.
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative overflow-hidden py-20 px-6 text-center bg-cream border-t border-sand/60">
        <img
          src={`${BASE}/tropical-corner-bottom-right-01.png`}
          className="absolute -bottom-4 -right-4 w-36 md:w-56 pointer-events-none select-none opacity-60"
          alt="" aria-hidden="true" loading="lazy"
        />
        <div className="relative z-10 max-w-xs mx-auto">
          <p className="text-bark/65 leading-[2] mb-7" style={{ fontSize: "clamp(0.85rem, 1.3vw, 0.9rem)" }}>
            We can&apos;t wait to celebrate<br />with you in paradise.
          </p>
          <div className="h-px w-10 bg-gold/40 mx-auto mb-7" />
          <p className="font-display font-light text-bark mb-3" style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.75rem)" }}>
            Danny &amp; Bridget
          </p>
          <p className="text-gold text-[0.65rem] tracking-[0.22em] uppercase">
            June 12, 2027 &nbsp;·&nbsp; Seven Mile Beach, Grand Cayman
          </p>
        </div>
      </footer>

    </div>
  );
}
