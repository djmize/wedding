import Image from "next/image";
import VideoHero from "@/components/VideoHero";

const activities = [
  {
    slug: "stingray-city",
    title: "Stingray City",
    subtitle: "Stingray Island",
    description:
      "Swim with friendly stingrays in their natural habitat at this world-famous sandbar. A must-do in Grand Cayman!",
    distance: "20 min by boat",
    byBoat: true,
    photo: "/assets/things-to-do/stingray-city.png",
    photoAlt: "People swimming with stingrays at Stingray City",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 4 C6 4 2 9 2 12 C2 15 6 18 12 18 C18 18 22 15 22 12 C22 9 18 4 12 4 Z" />
        <path d="M12 18 C11 20 10 22 12 23" />
        <circle cx="9" cy="11" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    slug: "snorkeling",
    title: "Snorkeling",
    subtitle: "Coral Reefs & Sea Turtles",
    description:
      "Explore vibrant coral reefs and tropical fish at some of the best snorkeling spots on the island — sea turtles included.",
    distance: "10–25 min by boat",
    byBoat: true,
    photo: "/assets/things-to-do/snorkeling.png",
    photoAlt: "Sea turtle swimming underwater with a snorkeler",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="3" y="9" width="14" height="8" rx="4" />
        <path d="M17 13 L20 13 L20 7 L22 7" />
        <line x1="8" y1="9" x2="8" y2="17" strokeWidth="1" />
      </svg>
    ),
  },
  {
    slug: "bioluminescent-tour",
    title: "Bioluminescent Tour",
    subtitle: null,
    description:
      "Experience the magic of glowing waters on a guided bioluminescent kayak or boat tour — one of Grand Cayman's most unforgettable nights out.",
    distance: "15–25 min by boat",
    byBoat: true,
    photo: "/assets/things-to-do/bioluminescent-tour.png",
    photoAlt: "Couple kayaking through bioluminescent glowing water at night",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 2 L13 6 L17 7 L13 8 L12 12 L11 8 L7 7 L11 6 Z" />
        <path d="M5 14 L5.5 16 L7.5 16.5 L5.5 17 L5 19 L4.5 17 L2.5 16.5 L4.5 16 Z" />
        <path d="M18 14 L18.4 15.6 L20 16 L18.4 16.4 L18 18 L17.6 16.4 L16 16 L17.6 15.6 Z" />
      </svg>
    ),
  },
  {
    slug: "starfish-point",
    title: "Starfish Point",
    subtitle: null,
    description:
      "Wade into the calm, shallow waters and spot beautiful starfish in their natural environment. A peaceful, magical experience for all ages.",
    distance: "25 min by car",
    byBoat: false,
    photo: "/assets/things-to-do/starfish-point.png",
    photoAlt: "Starfish resting on the sandy seafloor in clear water",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polygon points="12,2 15,9 22,9 16.5,13.5 18.5,21 12,16.5 5.5,21 7.5,13.5 2,9 9,9" />
      </svg>
    ),
  },
  {
    slug: "jet-ski",
    title: "Jet Ski Adventure",
    subtitle: null,
    description:
      "Feel the thrill and explore the island from a new perspective on a fun jet ski adventure across turquoise Caribbean waters.",
    distance: "10–20 min by car",
    byBoat: false,
    photo: "/assets/things-to-do/jet-ski.png",
    photoAlt: "Line of jet skis on brilliant turquoise water aerial view",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M2 12 C5 9 8 15 11 12 C14 9 17 15 20 12 L22 12" />
        <path d="M2 17 C5 14 8 20 11 17 C14 14 17 20 20 17 L22 17" />
        <circle cx="12" cy="7" r="1.5" />
        <path d="M10 9 L9 12 L15 12 L14 9 Z" />
      </svg>
    ),
  },
  {
    slug: "seven-mile-beach",
    title: "Seven Mile Beach",
    subtitle: null,
    description:
      "Relax on one of the world's most beautiful beaches — soft white sand, crystal-clear turquoise water, and stunning Caribbean sunsets.",
    distance: "5–15 min by car",
    byBoat: false,
    photo: "/assets/things-to-do/seven-mile-beach.png",
    photoAlt: "Seven Mile Beach with white sand and clear turquoise water",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 21 L12 10" />
        <path d="M12 10 C10 6 5 5 4 8 C7 7 10 9 12 10" />
        <path d="M12 10 C14 6 19 5 20 8 C17 7 14 9 12 10" />
        <path d="M12 12 C10 9 7 10 6 13 C9 11 11 12 12 12" />
        <path d="M12 12 C14 9 17 10 18 13 C15 11 13 12 12 12" />
      </svg>
    ),
  },
];

function BoatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0">
      <path d="M3 17 L21 17" />
      <path d="M5 17 L3 13 L21 13 L19 17" />
      <path d="M12 4 L12 13" />
      <path d="M8 8 L12 4 L16 8" />
    </svg>
  );
}

function CarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0">
      <path d="M5 17 H3 V13 L6 8 H18 L21 13 V17 H19" />
      <circle cx="7.5" cy="17" r="2" />
      <circle cx="16.5" cy="17" r="2" />
      <path d="M9.5 17 H14.5" />
    </svg>
  );
}

function HeartDivider() {
  return (
    <div className="flex items-center gap-2 my-3">
      <div className="flex-1 h-px bg-sand" />
      <svg viewBox="0 0 16 14" fill="currentColor" className="w-2.5 h-2.5 text-sand shrink-0">
        <path d="M8 13 C8 13 1 8 1 4.5 C1 2.5 2.5 1 4.5 1 C6 1 7.5 2 8 3 C8.5 2 10 1 11.5 1 C13.5 1 15 2.5 15 4.5 C15 8 8 13 8 13 Z" />
      </svg>
      <div className="flex-1 h-px bg-sand" />
    </div>
  );
}

export default function ThingsToDoPage() {
  return (
    <div className="min-h-[calc(100vh-57px)] bg-ivory">

      {/* Dark video hero */}
      <div className="relative h-[58vh] min-h-[380px] overflow-hidden">
        <VideoHero src="/assets/things-to-do/hero.mp4">
          {/* Header text */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 animate-fade-up">
            <svg viewBox="0 0 32 40" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-9 text-white/70 mb-4 mx-auto">
              <line x1="16" y1="40" x2="16" y2="16" />
              <path d="M16 16 C13 9 5 7 3 12 C8 10 13 13 16 16" />
              <path d="M16 16 C19 9 27 7 29 12 C24 10 19 13 16 16" />
              <path d="M16 20 C13 14 7 15 5 19 C10 17 14 18 16 20" />
              <path d="M16 20 C19 14 25 15 27 19 C22 17 18 18 16 20" />
            </svg>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-[0.15em] text-white font-medium uppercase mb-1">
              Things To Do
            </h1>
            <div className="w-16 h-px bg-white/40 mx-auto my-4" />
            <p className="font-display font-semibold text-white/90 text-lg md:text-xl max-w-md mx-auto leading-relaxed">
              Grand Cayman is full of unforgettable experiences.
              <br className="hidden sm:block" />
              Here are some of our favorite adventures during your stay!
            </p>
          </div>
        </VideoHero>
      </div>

      {/* Cards */}
      <div className="animate-fade-up-delay px-4 md:px-6 pb-8 pt-8">
        <div className="py-6 px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {activities.map((activity) => (
                <div key={activity.slug} className="bg-cream border border-sand flex flex-col shadow-sm">
                  <div className="relative h-48">
                    <Image
                      src={activity.photo}
                      alt={activity.photoAlt}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="relative h-0 flex justify-center z-10">
                    <div className="absolute top-0 -translate-y-1/2 w-10 h-10 rounded-full bg-cream border border-sand flex items-center justify-center text-bark/60">
                      {activity.icon}
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 px-5 pt-8 pb-5 text-center">
                    <h2 className="font-display text-sm tracking-[0.14em] uppercase text-bark leading-tight">
                      {activity.title}
                    </h2>
                    {activity.subtitle && (
                      <p className="font-display text-xs tracking-[0.1em] uppercase text-bark/45 mt-0.5">
                        {activity.subtitle}
                      </p>
                    )}
                    <HeartDivider />
                    <p className="text-bark/60 text-xs leading-relaxed flex-1">{activity.description}</p>
                    <div className="flex items-center justify-center gap-1.5 mt-4 text-bark/40 text-[0.65rem] tracking-[0.08em]">
                      {activity.byBoat ? <BoatIcon /> : <CarIcon />}
                      <span>{activity.distance}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-sand py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
          <p className="font-script text-2xl text-bark/55 shrink-0">Explore &amp; Enjoy</p>
          <div className="w-px h-8 bg-sand hidden sm:block" />
          <p className="text-bark/50 text-xs leading-relaxed text-center sm:text-left">
            Whether you&rsquo;re seeking adventure or relaxation, there&rsquo;s something for everyone in paradise.
            We can&rsquo;t wait for you to experience it!
          </p>
        </div>
      </div>

    </div>
  );
}
