import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollIndicator from "@/components/ScrollIndicator";

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
    <div>
      {/* HERO — visually identical to original, outer wrapper no longer clips scroll */}
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

        {/* Scroll indicator — subtle, low-contrast, appears after hero text */}
        <ScrollIndicator />
      </div>

      {/* ── Scroll sections ─────────────────────────────────────────── */}
      <ScrollReveal>

        {/* ── 2. WELCOME NOTE ─────────────────────────────────────── */}
        <section className="bg-ivory py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

              {/* Photo column */}
              <div className="reveal-item">
                <div className="relative h-[520px] md:h-[640px] overflow-hidden">
                  {/* reveal-scale-img observed independently by ScrollReveal */}
                  <div className="absolute inset-0 reveal-scale-img">
                    <Image
                      src="/assets/us.png"
                      fill
                      alt="Bridget and Danny"
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>

              {/* Text column */}
              <div className="reveal-item">
                <p className="text-[0.65rem] tracking-[0.2em] uppercase text-gold/70 mb-3">
                  A Note From Us
                </p>
                <h2
                  className="font-display text-bark mb-4"
                  style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)" }}
                >
                  Welcome
                </h2>
                <p className="font-script text-gold/70 text-2xl mb-6">
                  We can&apos;t wait to celebrate with you.
                </p>
                <div className="text-sm md:text-base leading-[1.9] text-bark/65 space-y-4">
                  <p>
                    We are beyond excited to celebrate this special weekend with
                    all of our favorite people in one of our favorite places.
                  </p>
                  <p>
                    The turquoise water, white sand, and unforgettable sunsets of
                    Grand Cayman mean so much to us, and we truly cannot imagine
                    a better place to begin this next chapter together.
                  </p>
                  <p>
                    We know that traveling to celebrate with us is no small thing,
                    and it means more than we can express. We created this website
                    to make planning your trip as simple as possible, with
                    information about where to stay, what to do, and everything
                    you need to know for the wedding weekend.
                  </p>
                  <p>
                    Thank you for being such an important part of our lives. We
                    cannot wait for a weekend filled with sunshine, great food,
                    dancing, and memories that we will cherish forever.
                  </p>
                </div>
                <div className="mt-8">
                  <p className="text-sm text-bark/65 mb-1">See you in paradise!</p>
                  <p className="font-script text-gold/80 text-xl">
                    Love, Bridget &amp; Danny
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── 3. DESTINATION TRANSITION ───────────────────────────── */}
        <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
          {/* Image wrapper — observed by ScrollReveal for scale effect */}
          <div className="absolute inset-0 reveal-scale-img">
            <Image
              src="/assets/things-to-do/seven-mile-beach.png"
              fill
              alt="Seven Mile Beach, Grand Cayman"
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
            <p className="font-script text-white text-3xl md:text-4xl mb-3 reveal-item">
              A weekend in paradise
            </p>
            <p className="font-display text-white/75 tracking-[0.2em] text-sm uppercase reveal-item">
              June 11–13, 2027
            </p>
          </div>
        </section>

        {/* ── 4. THE WEEKEND ──────────────────────────────────────── */}
        <section className="bg-cream py-20 md:py-28">
          <div className="max-w-5xl mx-auto px-6">

            {/* Section header */}
            <div className="text-center reveal-item">
              <p className="text-[0.65rem] tracking-[0.2em] uppercase text-gold/70 mb-3">
                The Weekend
              </p>
              <h2
                className="font-display font-light text-bark"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
              >
                A few moments to look forward to
              </h2>
              <div className="w-12 h-px bg-sand mx-auto mt-6 mb-16" />
            </div>

            {/* Event columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

              <div className="reveal-item" style={{ transitionDelay: "0ms" }}>
                <p className="text-[0.65rem] tracking-[0.18em] uppercase text-gold/70">
                  Friday, June 11
                </p>
                <h3 className="font-display text-xl tracking-[0.1em] uppercase text-bark mt-1">
                  Welcome Party
                </h3>
                <div className="w-8 h-px bg-sand my-4" />
                <p className="text-sm text-bark/60 leading-relaxed">
                  Kick off the weekend with us in Grand Cayman.
                </p>
                <p className="italic text-xs text-bark/45 mt-2">
                  RSVP required · More details coming soon
                </p>
              </div>

              <div className="reveal-item" style={{ transitionDelay: "150ms" }}>
                <p className="text-[0.65rem] tracking-[0.18em] uppercase text-gold/70">
                  Saturday, June 12
                </p>
                <h3 className="font-display text-xl tracking-[0.1em] uppercase text-bark mt-1">
                  The Wedding
                </h3>
                <div className="w-8 h-px bg-sand my-4" />
                <p className="text-sm text-bark/60 leading-relaxed">
                  Ceremony and reception at Caribbean Club on Seven Mile Beach.
                </p>
              </div>

              <div className="reveal-item" style={{ transitionDelay: "300ms" }}>
                <p className="text-[0.65rem] tracking-[0.18em] uppercase text-gold/70">
                  Saturday Night
                </p>
                <h3 className="font-display text-xl tracking-[0.1em] uppercase text-bark mt-1">
                  Late-Night Dancing
                </h3>
                <div className="w-8 h-px bg-sand my-4" />
                <p className="text-sm text-bark/60 leading-relaxed">
                  We&apos;ll head to Luca around 10 PM to keep the night going.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── 5. QUOTE TRANSITION ─────────────────────────────────── */}
        <section className="bg-sand/40 py-16 md:py-20">
          <div className="max-w-2xl mx-auto text-center px-6 reveal-item">
            <p
              className="font-display font-light text-bark/70 italic"
              style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)" }}
            >
              &ldquo;Come for the wedding. Stay for the island.&rdquo;
            </p>
          </div>
        </section>

        {/* ── 6. NAVIGATION TILES ─────────────────────────────────── */}
        <section className="bg-ivory py-16 md:py-20">
          <div className="text-center reveal-item">
            <p className="text-[0.65rem] tracking-[0.2em] uppercase text-gold/70 mb-3">
              Explore
            </p>
            <h2
              className="font-display font-light text-bark"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
            >
              Plan Your Trip
            </h2>
            <div className="w-12 h-px bg-sand mx-auto mt-6" />
          </div>

          <div className="max-w-5xl mx-auto px-6 mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">

            <Link
              href="/places-to-stay"
              className="reveal-item group block relative overflow-hidden aspect-[4/3] md:aspect-[3/4] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
              style={{ transitionDelay: "0ms" }}
            >
              <Image
                src="/assets/places-to-stay/caribbean-club.jpeg"
                fill
                alt="Caribbean Club resort on Seven Mile Beach"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-focus:scale-105"
                style={{ objectPosition: "center 40%" }}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 text-center px-4">
                <p className="font-display text-white tracking-[0.18em] text-sm uppercase">
                  Where to Stay
                </p>
                <p className="text-white/70 text-xs tracking-wide mt-1">
                  Hotels near the celebration
                </p>
              </div>
            </Link>

            <Link
              href="/things-to-do"
              className="reveal-item group block relative overflow-hidden aspect-[4/3] md:aspect-[3/4] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
              style={{ transitionDelay: "150ms" }}
            >
              <Image
                src="/assets/things-to-do/stingray-city.png"
                fill
                alt="Stingray City, Grand Cayman"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-focus:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 text-center px-4">
                <p className="font-display text-white tracking-[0.18em] text-sm uppercase">
                  Things to Do
                </p>
                <p className="text-white/70 text-xs tracking-wide mt-1">
                  Beaches, snorkeling, and adventure
                </p>
              </div>
            </Link>

            <Link
              href="/faq"
              className="reveal-item group block relative overflow-hidden aspect-[4/3] md:aspect-[3/4] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
              style={{ transitionDelay: "300ms" }}
            >
              <Image
                src="/assets/things-to-do/seven-mile-beach.png"
                fill
                alt="Seven Mile Beach, Grand Cayman"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-focus:scale-105"
                style={{ objectPosition: "center 60%" }}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 text-center px-4">
                <p className="font-display text-white tracking-[0.18em] text-sm uppercase">
                  Q &amp; A
                </p>
                <p className="text-white/70 text-xs tracking-wide mt-1">
                  Everything you need to know
                </p>
              </div>
            </Link>

          </div>
        </section>

        {/* ── 7. CLOSING ──────────────────────────────────────────── */}
        <section className="relative min-h-[70vh] overflow-hidden">
          <Image
            src="/assets/hand_hold.png"
            fill
            alt="Bridget and Danny holding hands"
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] text-center px-6 reveal-item">
            <p className="font-script text-white text-3xl md:text-4xl mb-6">
              We cannot wait to celebrate with you.
            </p>
            <p className="font-display text-white text-2xl md:text-3xl tracking-[0.1em] mb-4">
              Bridget &amp; Danny
            </p>
            <p className="font-display text-white/75 tracking-[0.15em] text-sm">
              June 12, 2027
            </p>
            <p className="font-display text-white/55 tracking-[0.15em] uppercase text-xs mt-1">
              Seven Mile Beach, Grand Cayman
            </p>
          </div>
        </section>

      </ScrollReveal>
    </div>
  );
}
