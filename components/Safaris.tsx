"use client";

import Image from "next/image";

type SafariCard = {
  title: string;
  description: string;
  media: { type: "video" | "image"; src: string };
};

const safaris: SafariCard[] = [
  {
    title: "Wildlife Safaris",
    description: "Experience Tanzania's iconic parks and see the Big Five up close.",
    media: {
      type: "video",
      src: "/videos/Wildlife Safaris.mov",
    },
  },
  {
    title: "Cultural Tours",
    description: "Connect with local communities and traditions for a deeper journey.",
    media: {
      type: "video",
      src: "/videos/Cultural Tours.mov",
    },
  },
  {
    title: "Zanzibar Getaways",
    description: "Relax on pristine beaches and explore the spice island's culture.",
    media: {
      type: "image",
      src: "/images/zenj.webp",
    },
  },
  {
    title: "Custom/Private Safaris",
    description: "Design your own adventure with private guides and flexible itineraries.",
    media: {
      type: "video",
      src: "/videos/Custom:Private Safaris.mov",
    },
  },
];

function EnquireButton() {
  return (
    <button
      onClick={() =>
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
      }
      className="bg-safari-yellow text-safari-black px-6 py-2 rounded-full font-bold text-sm hover:opacity-90 transition-opacity cursor-pointer"
    >
      Enquire Now
    </button>
  );
}

export default function Safaris() {
  return (
    <section id="safaris" className="py-12 bg-safari-brown text-white" aria-label="Safari Tours and Services">
      <div className="max-w-325 mx-auto px-4 md:px-6">
        <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-white">
          Our Safaris &amp; Services
        </h2>
        <p className="mt-2 text-[clamp(1rem,2vw,1.2rem)] text-white leading-relaxed">
          Discover the best ways to explore Tanzania, tailored to your interests.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 mt-8" role="list">
          {safaris.map((s) => (
            <div
              key={s.title}
              className="bg-safari-white rounded-2xl shadow-sm p-6 flex flex-col items-center gap-4"
            >
              {s.media.type === "video" ? (
                <video
                  src={s.media.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="w-full aspect-4/3 object-cover rounded-xl"
                />
              ) : (
                <div className="relative w-full aspect-4/3 rounded-xl overflow-hidden">
                  <Image
                    src={s.media.src}
                    alt={s.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <h3 className="text-safari-brown font-bold text-lg text-center m-0">
                {s.title}
              </h3>
              <p className="text-safari-black text-center text-sm leading-relaxed">
                {s.description}
              </p>
              <EnquireButton />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
