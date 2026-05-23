import config from "@/lib/config";
import BotanicalDivider from "@/components/BotanicalDivider";
import PalmLeaf from "@/components/PalmLeaf";

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-65px)] flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden">
      <PalmLeaf className="absolute bottom-0 left-0 w-48 md:w-64 opacity-[0.12]" />
      <PalmLeaf className="absolute bottom-0 right-0 w-48 md:w-64 opacity-[0.12]" flip />

      <p className="text-xs tracking-[0.35em] uppercase text-rattan mb-8">
        We&apos;re getting married
      </p>
      <h1 className="font-display text-7xl md:text-9xl text-bark font-light mb-8">
        {config.partner1} &amp; {config.partner2}
      </h1>
      <BotanicalDivider className="w-72 mb-8" />
      <p className="text-driftwood text-xl font-light tracking-wide mb-3">
        {config.weddingDateDisplay}
      </p>
      <p className="text-lagoon text-xs tracking-[0.25em] uppercase">
        {config.venueAddress}
      </p>
    </div>
  );
}
