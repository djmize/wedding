"use client";
import { useState } from "react";
import Image from "next/image";

type Panel = "women" | "men" | null;

export default function DressCodeImages() {
  const [open, setOpen] = useState<Panel>(null);

  const toggle = (panel: Panel) =>
    setOpen((prev) => (prev === panel ? null : panel));

  return (
    <div className="mt-6 space-y-3">
      {(["women", "men"] as const).map((panel) => (
        <div key={panel}>
          <button
            onClick={() => toggle(panel)}
            className="w-full flex items-center justify-between py-3 px-4 border border-gold/40 text-left group hover:border-gold/70 transition-colors duration-200"
          >
            <span className="font-display font-light text-bark tracking-[0.08em]" style={{ fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)" }}>
              {panel === "women" ? "Women's Dress Code" : "Men's Dress Code"}
            </span>
            <span className="text-gold/50 text-xl leading-none transition-transform duration-200 select-none shrink-0 ml-4"
              style={{ transform: open === panel ? "rotate(45deg)" : "none" }}>
              +
            </span>
          </button>

          {open === panel && (
            <div className="border border-t-0 border-gold/40 p-3">
              <div className="relative border border-gold/70">
                <Image
                  src={panel === "women" ? "/assets/women-dress-code.png" : "/assets/men-dress-code.png"}
                  alt={panel === "women" ? "Women's dress code guide" : "Men's dress code guide"}
                  width={900}
                  height={1400}
                  className="w-full h-auto"
                  sizes="(max-width: 768px) 100vw, 672px"
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
