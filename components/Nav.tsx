import config from "@/lib/config";

export default function Nav() {
  return (
    <nav className="w-full border-b border-sand bg-cream/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-6 py-4 text-center">
        <span className="font-display text-xl tracking-wide text-bark">
          {config.partner1} &amp; {config.partner2}
        </span>
      </div>
    </nav>
  );
}
