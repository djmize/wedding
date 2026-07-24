"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import config from "@/lib/config";

// ── Types ──────────────────────────────────────────────────────────────────────

type HotelSlug =
  | "caribbean-club"
  | "hampton-inn"
  | "westin"
  | "sunshine-hotel";

type HotelStatus = "idle" | "form-open" | "submitted";

interface Hotel {
  slug: HotelSlug;
  name: string;
  distance: string;
  notes: string;
  website: string;
  label: string;
  icon: React.ReactNode;
  photo: string;
  photoAlt: string;
  photoPosition: string;
  photoHeight?: string;
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function BedIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <path d="M2 20 V12 H22 V20" />
      <path d="M2 12 V8 C2 7 3 6 4 6 H20 C21 6 22 7 22 8 V12" />
      <path d="M7 12 V9 H17 V12" />
      <path d="M2 20 H22" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <rect x="3" y="3" width="18" height="18" rx="1" />
      <path d="M3 9 H21" />
      <path d="M9 9 V21" />
      <rect x="12" y="13" width="3" height="3" />
      <rect x="6" y="13" width="2" height="2" />
      <rect x="6" y="5" width="2" height="2" />
      <rect x="11" y="5" width="2" height="2" />
      <rect x="16" y="5" width="2" height="2" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-3.5 h-3.5 shrink-0"
    >
      <path d="M12 21 C12 21 5 14 5 9 C5 5.69 8.13 3 12 3 C15.87 3 19 5.69 19 9 C19 14 12 21 12 21 Z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-3.5 h-3.5 shrink-0 mt-0.5"
    >
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
}

// ── Hotel data ─────────────────────────────────────────────────────────────────

const hotels: Hotel[] = [
  {
    slug: "caribbean-club",
    name: "Caribbean Club",
    distance: "On-site",
    notes: "Multi-bedroom suites with full kitchens and living areas. Perfect for groups.",
    website: "https://www.caribclub.com/",
    label: "OUR VENUE",
    icon: <BuildingIcon />,
    photo: "/assets/places-to-stay/caribbean-club.jpeg",
    photoAlt: "Caribbean Club aerial view from Seven Mile Beach",
    photoPosition: "center 35%",
  },
  {
    slug: "hampton-inn",
    name: "Hampton Inn by Hilton Grand Cayman",
    distance: "3 min taxi · 25 min walk",
    notes: "Free beach shuttles 10am–10pm. Bridget & Danny's personal favorite!",
    website: "https://www.hilton.com/en/hotels/gcmgchx-hampton-grand-cayman-seven-mile-beach/",
    label: "GREAT VALUE",
    icon: <BedIcon />,
    photo: "/assets/places-to-stay/hampton.png",
    photoAlt: "Hampton Inn by Hilton Grand Cayman pool area",
    photoPosition: "center 50%",
  },
  {
    slug: "westin",
    name: "The Westin Grand Cayman Seven Mile Beach",
    distance: "2 min taxi · 13 min walk",
    notes: "Beachfront resort with stunning views, pools, and dining options.",
    website: "https://www.marriott.com/en-us/hotels/gcmmi-the-westin-grand-cayman-seven-mile-beach-resort-and-spa/overview/",
    label: "UPSCALE RESORT",
    icon: <BedIcon />,
    photo: "/assets/places-to-stay/westin.jpeg",
    photoAlt: "The Westin Grand Cayman pool and beach",
    photoPosition: "center 40%",
  },
  {
    slug: "sunshine-hotel",
    name: "The Sunshine Hotel & Suites",
    distance: "3 min taxi · 14 min walk",
    notes: "Boutique all-suite hotel. Florida residents get a discount when booking directly.",
    website: "https://sunshinesuites.com/",
    label: "CLOSEST OPTION",
    icon: <BedIcon />,
    photo: "/assets/places-to-stay/sunshine.png",
    photoAlt: "Sunshine Hotel & Suites pool and grounds",
    photoPosition: "center 35%",
  },
];

// ── HotelCard ─────────────────────────────────────────────────────────────────

interface HotelCardProps {
  hotel: Hotel;
  status: HotelStatus;
  sharedEmail: string;
  onEmailChange: (email: string) => void;
  onOpenForm: () => void;
  onSubmit: () => Promise<void>;
  onCancel: () => void;
  submitting: boolean;
  submitError: string | null;
}

function HotelCard({
  hotel,
  status,
  sharedEmail,
  onEmailChange,
  onOpenForm,
  onSubmit,
  onCancel,
  submitting,
  submitError,
}: HotelCardProps) {
  return (
    <div className="bg-cream border border-sand flex flex-col shadow-sm">
      {/* Photo */}
      <div className={`relative ${hotel.photoHeight ?? "h-56"}`}>
        <Image
          src={hotel.photo}
          alt={hotel.photoAlt}
          fill
          className="object-cover"
          style={{ objectPosition: hotel.photoPosition }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      {/* Zero-height seam — badge straddles photo/content border */}
      <div className="relative h-0 flex justify-center z-10">
        <div className="absolute top-0 -translate-y-1/2 w-10 h-10 rounded-full bg-cream border border-sand flex items-center justify-center text-bark/60">
          {hotel.icon}
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 px-5 pt-8 pb-0 text-center">
        <h2 className="font-display text-sm tracking-[0.12em] uppercase text-bark leading-snug">
          {hotel.name}
        </h2>

        {/* Distance */}
        <div className="flex items-center justify-center gap-1.5 mt-3 text-bark/50 text-[0.68rem] tracking-[0.06em]">
          <PinIcon />
          <span>{hotel.distance}</span>
        </div>

        {/* Notes */}
        <div className="flex items-start justify-center gap-1.5 mt-2 text-bark/55 text-[0.72rem] leading-relaxed">
          <StarIcon />
          <span className="text-left">{hotel.notes}</span>
        </div>

        {/* Book link */}
        <a
          href={hotel.website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 text-[0.65rem] tracking-[0.1em] uppercase text-gold/70 hover:text-gold transition-colors underline underline-offset-2"
        >
          Visit Website
        </a>
      </div>

      {/* Group rate interest area */}
      <div className="px-5 pt-4 pb-4">
        {status === "idle" && (
          <button
            onClick={onOpenForm}
            className="w-full py-2.5 bg-sage text-cream text-[0.65rem] tracking-[0.18em] uppercase hover:bg-sage/85 transition-colors cursor-pointer"
          >
            Ask About Group Rate
          </button>
        )}

        {status === "form-open" && (
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="email"
                value={sharedEmail}
                onChange={(e) => onEmailChange(e.target.value)}
                placeholder="your@email.com"
                autoComplete="email"
                className="flex-1 min-w-0 border border-sand bg-white px-3 py-2 text-bark text-xs focus:outline-none focus:border-gold/60 transition-colors"
              />
              <button
                onClick={onSubmit}
                disabled={submitting}
                className="px-4 py-2 bg-sage text-cream text-[0.62rem] tracking-[0.14em] uppercase hover:bg-sage/85 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer shrink-0"
              >
                {submitting ? "…" : "Submit"}
              </button>
              <button
                onClick={onCancel}
                aria-label="Cancel"
                className="px-2 py-2 text-bark/40 hover:text-bark/70 transition-colors cursor-pointer text-sm leading-none"
              >
                ✕
              </button>
            </div>
            {submitError && (
              <p className="text-xs text-red-600">{submitError}</p>
            )}
          </div>
        )}

        {status === "submitted" && (
          <p className="text-center text-[0.72rem] tracking-[0.06em] text-sage py-2">
            Thanks! We&apos;ll be in touch.
          </p>
        )}
      </div>

      {/* Label badge — bottom strip */}
      <div className="bg-sage px-4 py-2.5 text-center">
        <span className="text-cream text-[0.6rem] tracking-[0.22em] uppercase font-medium">
          {hotel.label}
        </span>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function PlacesToStayPage() {
  if (!config.features.placesToStay) notFound();

  const [sharedEmail, setSharedEmail] = useState("");
  const [hotelStatuses, setHotelStatuses] = useState<
    Record<HotelSlug, HotelStatus>
  >({
    "caribbean-club": "idle",
    "hampton-inn": "idle",
    westin: "idle",
    "sunshine-hotel": "idle",
  });
  const [submitting, setSubmitting] = useState<HotelSlug | null>(null);
  const [submitErrors, setSubmitErrors] = useState<
    Partial<Record<HotelSlug, string>>
  >({});

  function setStatus(slug: HotelSlug, status: HotelStatus) {
    setHotelStatuses((prev) => ({ ...prev, [slug]: status }));
  }

  async function handleSubmit(slug: HotelSlug) {
    const email = sharedEmail.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubmitErrors((prev) => ({
        ...prev,
        [slug]: "Please enter a valid email address.",
      }));
      return;
    }

    setSubmitting(slug);
    setSubmitErrors((prev) => ({ ...prev, [slug]: undefined }));

    try {
      const res = await fetch("/api/hotel-group-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, hotelSlug: slug }),
      });

      const data = (await res.json()) as { ok: boolean; error?: string };

      if (data.ok) {
        setStatus(slug, "submitted");
      } else {
        setSubmitErrors((prev) => ({
          ...prev,
          [slug]: data.error ?? "Something went wrong. Please try again.",
        }));
      }
    } catch {
      setSubmitErrors((prev) => ({
        ...prev,
        [slug]: "Something went wrong. Please try again.",
      }));
    } finally {
      setSubmitting(null);
    }
  }

  return (
    <div className="min-h-[calc(100vh-57px)] bg-ivory">

      {/* ── Header ── */}
      <div className="text-center pt-20 pb-14 px-6 border-b border-sand bg-cream">
        {/* Decorative palm tree icon */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-12 bg-sand" />
          <svg
            viewBox="0 0 24 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-8 text-bark/30"
          >
            <line x1="12" y1="40" x2="12" y2="14" />
            <path d="M12 14 C10 8 3 6 2 10 C7 8 11 12 12 14" />
            <path d="M12 14 C14 8 21 6 22 10 C17 8 13 12 12 14" />
            <path d="M12 18 C10 13 5 13 4 17 C8 15 11 16 12 18" />
            <path d="M12 18 C14 13 19 13 20 17 C16 15 13 16 12 18" />
          </svg>
          <div className="h-px w-12 bg-sand" />
        </div>

        <h1
          className="font-display font-light text-bark tracking-[0.2em] uppercase"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
        >
          Where to Stay
        </h1>

        <p
          className="font-script text-gold/80 mt-2"
          style={{ fontSize: "clamp(1.3rem, 3vw, 2rem)" }}
        >
          Close to the Celebration
        </p>

        <div className="h-px w-10 bg-gold/40 mx-auto mt-6 mb-6" />

        <p
          className="text-bark/60 leading-[1.9] max-w-xl mx-auto"
          style={{ fontSize: "clamp(0.85rem, 1.4vw, 0.95rem)" }}
        >
          We recommend staying nearby so you can make the most of the weekend.
          All of these hotels are just a short drive from{" "}
          <strong className="text-bark/80 font-medium">
            The Caribbean Club
          </strong>{" "}
          (our wedding venue on Seven Mile Beach).
        </p>
      </div>

      {/* ── Hotel cards ── */}
      <div className="px-4 md:px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {hotels.map((hotel) => (
              <HotelCard
                key={hotel.slug}
                hotel={hotel}
                status={hotelStatuses[hotel.slug]}
                sharedEmail={sharedEmail}
                onEmailChange={setSharedEmail}
                onOpenForm={() => setStatus(hotel.slug, "form-open")}
                onSubmit={() => handleSubmit(hotel.slug)}
                onCancel={() => {
                  setStatus(hotel.slug, "idle");
                  setSubmitErrors((prev) => ({
                    ...prev,
                    [hotel.slug]: undefined,
                  }));
                }}
                submitting={submitting === hotel.slug}
                submitError={submitErrors[hotel.slug] ?? null}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="border-t border-sand py-10 px-6 bg-cream">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          {/* Car icon */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-7 h-7 text-sage/60 shrink-0"
          >
            <path d="M5 17 H3 V13 L6 8 H18 L21 13 V17 H19" />
            <circle cx="7.5" cy="17" r="2" />
            <circle cx="16.5" cy="17" r="2" />
            <path d="M9.5 17 H14.5" />
          </svg>

          {/* Dashed line */}
          <div className="hidden sm:flex flex-1 border-t border-dashed border-sand" />

          <div className="text-center">
            <p className="text-[0.6rem] tracking-[0.2em] uppercase text-bark/40 mb-1">
              All of these hotels are within 10 minutes of
            </p>
            <p className="font-script text-bark/60" style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)" }}>
              The Caribbean Club{" "}
              <span className="text-gold/70 not-italic">♡</span>
            </p>
          </div>

          {/* Dashed line */}
          <div className="hidden sm:flex flex-1 border-t border-dashed border-sand" />

          {/* Pin icon */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-7 h-7 text-sage/60 shrink-0"
          >
            <path d="M12 21 C12 21 5 14 5 9 C5 5.69 8.13 3 12 3 C15.87 3 19 5.69 19 9 C19 14 12 21 12 21 Z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
        </div>
      </div>

    </div>
  );
}
