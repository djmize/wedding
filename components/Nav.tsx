import Link from "next/link";
import config from "@/lib/config";

const links = [
  { href: "/", label: "Home" },
  ...(config.features.faq ? [{ href: "/faq", label: "FAQ" }] : []),
  { href: "/registry", label: "Registry" },
];

export default function Nav() {
  return (
    <nav className="w-full border-b border-sand bg-cream/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-display text-xl tracking-wide text-bark">
          {config.partner1} &amp; {config.partner2}
        </Link>
        <ul className="flex gap-6 text-xs tracking-widest uppercase text-driftwood">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="hover:text-bark transition-colors">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
