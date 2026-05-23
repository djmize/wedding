import BotanicalDivider from "@/components/BotanicalDivider";

const registries = [
  {
    name: "Zola",
    description: "Our main registry — home goods, experiences, and more.",
    url: "https://zola.com",
  },
  {
    name: "Amazon",
    description: null,
    url: "https://amazon.com",
  },
  {
    name: "Crate & Barrel",
    description: null,
    url: "https://crateandbarrel.com",
  },
  {
    name: "Williams Sonoma",
    description: null,
    url: "https://williams-sonoma.com",
  },
];

export default function Registry() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-24">
      <h1 className="font-display text-5xl text-bark mb-4 text-center font-light">
        Gift Registry
      </h1>
      <BotanicalDivider className="w-64 mx-auto mb-6" />
      <p className="text-center text-mist text-sm mb-16">
        Your presence is the greatest gift. If you&apos;d like to give something, we&apos;re
        registered at the following stores.
      </p>

      <div className="space-y-4">
        {registries.map(({ name, description, url }) => (
          <div
            key={name}
            className="flex items-center justify-between border border-sand px-8 py-6 hover:border-rattan transition-colors"
          >
            <div>
              <p className="font-display text-2xl text-bark font-light">{name}</p>
              {description && <p className="text-mist text-sm mt-1">{description}</p>}
            </div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 ml-8 border border-bark text-bark px-6 py-2 text-xs tracking-widest uppercase hover:bg-bark hover:text-cream transition-colors"
            >
              View Registry
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
