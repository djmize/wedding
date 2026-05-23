import config from "@/lib/config";

const links = [
  { href: "#details", label: "Details" },
  { href: "#travel", label: "Travel" },
  { href: "#rsvp", label: "RSVP" },
];

export default function Nav() {
  return (
    <nav className="w-full border-b border-sand bg-cream/92 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-[1.125rem] flex items-center justify-between">
        <a href="#" className="font-display text-lg text-bark tracking-wide">
          {config.partner1} &amp; {config.partner2}
        </a>
        <ul className="hidden md:flex gap-8 text-[0.7rem] tracking-[0.18em] uppercase text-bark/60">
          {links.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className="hover:text-bark transition-colors duration-200">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
