import Image from "next/image";

export default function DressCodePage() {
  return (
    <div className="bg-cream min-h-screen">
      {/* Header */}
      <div className="text-center pt-20 pb-12 px-6 border-b border-sand">
        <h1
          className="font-display font-light text-bark"
          style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}
        >
          Dress Code
        </h1>
      </div>

      {/* Images */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* Women's section */}
        <div>
          <h2
            className="font-display font-light text-bark text-center mb-8"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
          >
            Ladies
          </h2>

          {/* Category labels */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-5">
            {["Rich Berry & Wine", "Sunset & Terracotta", "Yellows", "Sage & Olive Greens", "Coastal Blues & Soft Pinks"].map((label) => (
              <span key={label} className="text-xs tracking-[0.2em] uppercase text-gold/60">
                {label}
              </span>
            ))}
          </div>

          {/* Inspiration image */}
          <div className="border border-gold/70 mb-10">
            <Image
              src="/assets/women-dress-code-white.png"
              alt="Women's dress code inspiration"
              width={900}
              height={1400}
              className="w-full h-auto"
              sizes="(max-width: 768px) 100vw, 896px"
              priority
            />
          </div>

          {/* Do's and Don'ts */}
          <div className="grid grid-cols-2 gap-6 border border-sand p-6">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-gold/70 mb-4">
                What to Keep in Mind
              </p>
              <ul className="space-y-2">
                {[
                  "Elegant dresses, maxi to floor length",
                  "Wedges, block heels, sandals, or flats",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-bark/65 leading-relaxed">
                    <span className="text-gold/50 shrink-0 mt-px">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-gold/70 mb-4">
                Please Avoid
              </p>
              <ul className="space-y-2">
                {[
                  "Short lengths or casual attire",
                  "Patterns or neon colors",
                  "White, ivory, or muted neutrals (nude, gray, brown, navy, black)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-bark/65 leading-relaxed">
                    <span className="text-bark/30 shrink-0 mt-px">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Men's section */}
        <div>
          <h2
            className="font-display font-light text-bark text-center mb-8"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
          >
            Gentlemen
          </h2>

          {/* Category labels */}
          <div className="flex justify-center gap-8 mb-5">
            {["Dark Suits", "Tan Suits", "Light Hues"].map((label) => (
              <span key={label} className="text-xs tracking-[0.2em] uppercase text-gold/60">
                {label}
              </span>
            ))}
          </div>

          {/* Inspiration image */}
          <div className="border border-gold/70 mb-10">
            <Image
              src="/assets/men-dress-code-white.png"
              alt="Men's dress code inspiration"
              width={1300}
              height={900}
              className="w-full h-auto"
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>

          {/* Do's and Don'ts */}
          <div className="grid grid-cols-2 gap-6 border border-sand p-6">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-gold/70 mb-4">
                The Essentials
              </p>
              <ul className="space-y-2">
                {[
                  "Jacket required",
                  "Tie optional",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-bark/65 leading-relaxed">
                    <span className="text-gold/50 shrink-0 mt-px">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-gold/70 mb-4">
                Please Avoid
              </p>
              <ul className="space-y-2">
                {[
                  "Shorts, t-shirts, or sneakers",
                  "Navy",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-bark/65 leading-relaxed">
                    <span className="text-bark/30 shrink-0 mt-px">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
