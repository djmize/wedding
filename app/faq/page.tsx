import type React from "react";
import { notFound } from "next/navigation";
import config from "@/lib/config";

type QA = {
  q: string;
  a: string;
  /** Optional JSX override for the answer — rendered instead of `a` when present. */
  aNode?: React.ReactNode;
  list?: string[];
};

type Section = {
  title: string;
  items: QA[];
};

const sections: Section[] = [
  {
    title: "Travel",
    items: [
      {
        q: "When should I arrive in Grand Cayman?",
        a: "We recommend arriving in time for our Welcome Dinner on Friday night — details to come! If you're unable to make it Friday, please plan on arriving no later than Saturday morning so you have plenty of time to get settled before the wedding.",
      },
      {
        q: "Which airport should I fly into?",
        a: "Fly into Owen Roberts International Airport (GCM), which is about a 10–15 minute drive from the venue.",
      },
      {
        q: "Do I need a visa?",
        a: "U.S., Canadian, and UK passport holders can stay in the Cayman Islands for up to 6 months without a visa — just don't forget your passport!",
      },
      {
        q: "Should I rent a car?",
        a: "If you're staying along Seven Mile Beach, a rental car isn't necessary. Taxis are readily available, and many hotels, restaurants, and attractions are within a short drive. Certain hotels also include free shuttles.",
      },
    ],
  },
  {
    title: "Welcome Party",
    items: [
      {
        q: "Is there anything happening before the wedding?",
        a: "Yes! Please join us for our Welcome Party on Friday evening, June 11. We'd love to spend some time with everyone before the big day! We will have more info on that coming soon.",
      },
      {
        q: "Do I need to RSVP for the Welcome Party?",
        a: "Yes, please! When you RSVP for the wedding, you'll also be able to let us know if you'll be attending the Welcome Party.",
      },
      {
        q: "What should I wear to the Welcome Party?",
        a: "More details on the Welcome Party are coming soon! What we can say is that it will be a more casual event than the wedding — so plan accordingly.",
      },
    ],
  },
  {
    title: "Wedding Day",
    items: [
      {
        q: "Where is the ceremony?",
        a: "The ceremony will take place on the beach at the Caribbean Club.",
      },
      {
        q: "Where is the reception?",
        a: "Following the ceremony, we'll celebrate with dinner and dancing at the Caribbean Club. At 10:00 PM, we'll move inside Luca for more late-night dancing and the after-party till 1am.",
      },
      {
        q: "Can I bring a guest?",
        a: "Due to the intimate nature of our celebration, we are unable to accommodate additional guests for everyone. Only those whose names are listed on your invitation are invited. We truly appreciate your understanding.",
      },
    ],
  },
  {
    title: "Attire",
    items: [
      {
        q: "What is the dress code?",
        a: "",
        aNode: (
          <p>
            {"Not black tie, but not casual — think elegant, warm, and timeless. We've put together visual guides for both women and men. "}
            <a href="/dress-code" className="text-gold underline">
              View the full dress code
            </a>
            {"."}
          </p>
        ),
      },
      {
        q: "Can I wear heels?",
        a: "Since the ceremony is on the beach, we recommend wedges, block heels, sandals, or flats.",
      },
    ],
  },
  {
    title: "Food & Drinks",
    items: [
      {
        q: "Will dinner and drinks be provided?",
        a: "Yes! We'll be serving dinner, drinks, and dessert during the reception.",
      },
      {
        q: "Can dietary restrictions be accommodated?",
        a: "Yes! When the official RSVP is sent out, you will be able to request dietary accommodations at that time.",
      },
    ],
  },
  {
    title: "Weather",
    items: [
      {
        q: "What if it rains?",
        a: "We have a backup plan, so we'll be celebrating rain or shine.",
      },
      {
        q: "Will it be hot?",
        a: "June is warm and tropical, so lightweight clothing is recommended.",
      },
    ],
  },
  {
    title: "Accommodations",
    items: [
      {
        q: "Where should I stay?",
        a: "",
        aNode: (
          <p>
            {"We’ve put together a dedicated page with our top accommodation recommendations — including group rate options and details on each hotel. Check it out at "}
            <a href="/places-to-stay" className="text-gold underline">
              Where to Stay
            </a>
            {". The short version: the Caribbean Club (our venue) has gorgeous suites perfect for groups, and the Hampton Inn by Hilton Grand Cayman is a personal favorite just a short drive away."}
          </p>
        ),
      },
    ],
  },
  {
    title: "General Information",
    items: [
      {
        q: "What currency is used?",
        a: "The Cayman Islands Dollar (KYD) is the official currency, but U.S. dollars are widely accepted.",
      },
      {
        q: "Should I bring reef-safe sunscreen?",
        a: "Yes, please! If you plan on swimming or snorkeling during your trip, we kindly encourage you to use a mineral, non-nano sunscreen to help protect Grand Cayman's beautiful coral reefs. Look for products with non-nano zinc oxide or non-nano titanium dioxide as the active ingredients.",
      },
    ],
  },
  {
    title: "Things to Do",
    items: [
      {
        q: "What are some fun things to do while we're in Grand Cayman?",
        a: "If you're extending your trip, we highly recommend:",
        list: [
          "Visiting Stingray City",
          "Snorkeling",
          "Jet Skiing",
          "Relaxing on Seven Mile Beach",
          "Visiting Starfish Point",
          "Taking a bioluminescent bay tour",
        ],
      },
    ],
  },
];

export default function FAQ() {
  if (!config.features.faq) notFound();

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
          Questions &amp; Answers
        </h1>
      </div>

      {/* Sections */}
      <div className="max-w-2xl mx-auto px-6 py-16 space-y-14">
        {sections.map((section) => (
          <div key={section.title}>
            <h2
              className="font-display font-light text-gold tracking-[0.08em] mb-5 pb-3 border-b border-sand"
              style={{ fontSize: "clamp(1.1rem, 2vw, 1.3rem)" }}
            >
              {section.title}
            </h2>
            <div className="divide-y divide-sand/60">
              {section.items.map((item) => (
                <details key={item.q} className="group py-1">
                  <summary className="flex items-center justify-between py-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <span
                      className="font-display font-light text-bark pr-4"
                      style={{ fontSize: "clamp(1rem, 1.8vw, 1.15rem)" }}
                    >
                      {item.q}
                    </span>
                    <span className="shrink-0 text-gold/50 text-xl leading-none transition-transform duration-200 group-open:rotate-45 select-none">
                      +
                    </span>
                  </summary>
                  <div className="pb-5 pt-1 text-bark/70 leading-[1.9]" style={{ fontSize: "clamp(0.85rem, 1.4vw, 0.93rem)" }}>
                    {item.aNode ? item.aNode : <p>{item.a}</p>}
                    {item.list && (
                      <ul className="mt-3 space-y-1 ml-4">
                        {item.list.map((li) => (
                          <li key={li} className="flex items-start gap-2">
                            <span className="text-gold/50 mt-[0.35em] shrink-0">—</span>
                            <span>{li}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}

        {/* Still Have Questions */}
        <div className="text-center pt-6 pb-4 border-t border-sand">
          <h2
            className="font-display font-light text-bark mb-3"
            style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.75rem)" }}
          >
            Still Have Questions?
          </h2>
          <p className="text-bark/65 leading-[1.9]" style={{ fontSize: "clamp(0.85rem, 1.4vw, 0.93rem)" }}>
            This page will continue to be updated as more details are confirmed — so check back soon!
            In the meantime, feel free to reach out to us anytime and we&apos;re happy to help.<br />
            We can&apos;t wait to celebrate with you in Grand Cayman.
          </p>
        </div>
      </div>
    </div>
  );
}
