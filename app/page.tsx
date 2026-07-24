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
        <section className="bg-ivory pt-20 md:pt-28 pb-10 md:pb-14">
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

              {/* Photo column */}
              <div className="reveal-item">
                <div className="relative h-[520px] md:h-[640px] overflow-hidden">
                  <div className="absolute inset-0 reveal-scale-img">
                    <Image
                      src="/assets/holding.png"
                      fill
                      alt="Bridget and Danny"
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="absolute inset-0 border border-gold/70 pointer-events-none z-10" />
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
                <div className="text-sm md:text-base leading-[1.9] text-bark/65 space-y-4">
                  <p>
                    We are beyond excited to share this special weekend with all
                    of our favorite people in one of our favorite places. The
                    turquoise water, white sand, and unforgettable sunsets of
                    Grand Cayman mean so much to us, and we truly cannot imagine
                    a better place to say &ldquo;I do.&rdquo;
                  </p>
                  <p>
                    We know traveling to celebrate with us is no small thing, and
                    it means more than we can say. We created this website to make
                    planning your trip as easy as possible, with information about
                    accommodations, travel, the wedding weekend, things to do, and
                    everything else you may need.
                  </p>
                  <p>
                    We will continue updating the website over the next few months
                    as plans are finalized and more details become available, so
                    please check back periodically for the latest information.
                  </p>
                  <p>
                    Thank you for being such an important part of our lives. We
                    cannot wait for a weekend filled with sunshine, love, great
                    food, dancing, and memories we will cherish forever.
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

        {/* ── 3. NAVIGATION TILES ──────────────────────────────────── */}
        <section className="bg-ivory pt-10 md:pt-14 pb-16 md:pb-20">
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
              <div className="absolute inset-0 border border-gold/70 pointer-events-none z-10" />
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
              <div className="absolute inset-0 border border-gold/70 pointer-events-none z-10" />
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
              <div className="absolute inset-0 border border-gold/70 pointer-events-none z-10" />
            </Link>

          </div>
        </section>

      </ScrollReveal>
    </div>
  );
}
