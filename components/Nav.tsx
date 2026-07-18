"use client";

import { useState } from "react";
import config from "@/lib/config";

const links = [
  { href: "/things-to-do", label: "Things to Do" },
  { href: "/places-to-stay", label: "Where to Stay" },
  { href: "/faq", label: "Q&A" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full border-b border-sand bg-cream/92 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-[1.125rem] flex items-center justify-between">
        <a href="/" className="font-display text-lg text-bark tracking-wide">
          {config.partner1} &amp; {config.partner2}
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8 text-[0.7rem] tracking-[0.18em] uppercase text-bark/60">
          {links.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className="hover:text-bark transition-colors duration-200">
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1 cursor-pointer"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className={`block w-5 h-px bg-bark transition-transform duration-200 origin-center ${open ? "rotate-45 translate-y-[6px]" : ""}`} />
          <span className={`block w-5 h-px bg-bark transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-bark transition-transform duration-200 origin-center ${open ? "-rotate-45 -translate-y-[6px]" : ""}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-sand bg-cream/96 px-6 py-4">
          <ul className="flex flex-col gap-4 text-[0.7rem] tracking-[0.18em] uppercase text-bark/60">
            {links.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="hover:text-bark transition-colors duration-200"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
