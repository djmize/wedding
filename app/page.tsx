import RevealSection from "@/components/RevealSection";
import ParallaxBotanical from "@/components/ParallaxBotanical";
import GarlandReveal from "@/components/GarlandReveal";

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

        {/* Top-right: mirrored across X axis (scaleY). local bottom-right = visual top-right = screen corner */}
        <img
          src={`${BASE}/tropical-corner-top-right-01.png`}
          className="absolute -top-12 -right-14 md:-right-24 w-[50vw] md:w-[37vw] max-w-xl pointer-events-none select-none"
          style={{
            transform: "scaleY(-1)",
            maskImage: "radial-gradient(ellipse at bottom right, transparent 0%, black 55%)",
            WebkitMaskImage: "radial-gradient(ellipse at bottom right, transparent 0%, black 55%)",
          }}
          alt="" aria-hidden="true" loading="eager"
        />

        {/* Top-left (rotated 270° CW from original = 180° from previous): radial fade from top-left corner */}
        <img
          src={`${BASE}/tropical-corner-top-left-01.png`}
          className="absolute -top-12 -left-14 md:-left-24 w-[50vw] md:w-[37vw] max-w-xl pointer-events-none select-none rotate-[270deg]"
          style={{
            maskImage: "radial-gradient(ellipse at top left, transparent 0%, black 55%)",
            WebkitMaskImage: "radial-gradient(ellipse at top left, transparent 0%, black 55%)",
          }}
          alt="" aria-hidden="true" loading="lazy"
        />

<div className="relative z-10 flex flex-col items-center animate-fade-up">
          <p className="font-script text-gold/80 mb-3" style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}>
            Join the celebration with
          </p>
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

        <div className="absolute bottom-36 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-fade-up-delay">
          <div className="w-px h-7 bg-gold/30" />
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="text-gold/50">
            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </section>

      {/* ── Garland ── */}
      <div className="w-full pointer-events-none select-none -mt-[30vh] md:-mt-[38vh] -mb-8 md:-mb-14">
        <GarlandReveal
          src={`${BASE}/tropical-garland-horizontal-01.png`}
          className="w-full"
        />
      </div>

      {/* ── Welcome ── */}
      <section className="py-16 px-6 bg-cream">
        <RevealSection>
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
        </RevealSection>
      </section>

      {/* ── Travel ── */}
      <section id="travel" className="py-20 px-6 bg-cream overflow-hidden">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 md:gap-28 items-center">

          <RevealSection>
            <div className="relative min-h-[260px] md:min-h-0">
              <ParallaxBotanical
                src={`${BASE}/tropical-side-spray-left-01.png`}
                className="absolute -left-14 top-0 bottom-0 h-full w-auto pointer-events-none select-none hidden md:block opacity-70"
                speed={0.1}
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
          </RevealSection>

          <RevealSection delay={120}>
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
          </RevealSection>

        </div>
      </section>

      {/* ── RSVP teaser ── */}
      <section id="rsvp" className="py-16 px-6 bg-[#F9F5EE] text-center">
        <RevealSection>
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
        </RevealSection>
      </section>

      {/* ── Footer ── */}
      <footer className="relative overflow-hidden py-20 px-6 text-center bg-cream border-t border-sand/60">
        <ParallaxBotanical
          src={`${BASE}/tropical-corner-bottom-right-01.png`}
          className="absolute -bottom-4 -right-4 w-36 md:w-56 pointer-events-none select-none opacity-60"
          speed={0.06}
        />
        <RevealSection>
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
        </RevealSection>
      </footer>

    </div>
  );
}
