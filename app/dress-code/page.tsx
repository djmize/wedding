import Image from "next/image";

export default function DressCodePage() {
  return (
    <div className="bg-cream min-h-screen">
      {/* Header */}
      <div className="text-center pt-20 pb-12 px-6 border-b border-sand">
        <p className="font-script text-gold/80 mb-2" style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}>
          Bridget &amp; Danny
        </p>
        <h1
          className="font-display font-light text-bark"
          style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}
        >
          Dress Code
        </h1>
      </div>

      {/* Images */}
      <div className="max-w-2xl mx-auto px-6 py-16 space-y-16">

        <div>
          <p className="text-[0.65rem] tracking-[0.2em] uppercase text-gold/70 mb-5 text-center">
            Women
          </p>
          <div className="relative border border-gold/70">
            <Image
              src="/assets/women-dress-code.png"
              alt="Women's dress code guide"
              width={900}
              height={1400}
              className="w-full h-auto"
              sizes="(max-width: 768px) 100vw, 672px"
              priority
            />
          </div>
        </div>

        <div>
          <p className="text-[0.65rem] tracking-[0.2em] uppercase text-gold/70 mb-5 text-center">
            Men
          </p>
          <div className="relative border border-gold/70">
            <Image
              src="/assets/men-dress-code.png"
              alt="Men's dress code guide"
              width={900}
              height={1400}
              className="w-full h-auto"
              sizes="(max-width: 768px) 100vw, 672px"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
