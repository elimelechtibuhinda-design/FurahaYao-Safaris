"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Destination = {
  name: string;
  highlight: string;
  media: { type: "video" | "image"; src: string | string[] };
};

const destinations: Destination[] = [
  {
    name: "Serengeti",
    highlight: "Great Migration",
    media: {
      type: "video",
      src: "/videos/Serengeti.mov",
    },
  },
  {
    name: "Ngorongoro",
    highlight: "Crater views",
    media: {
      type: "image",
      src: [
        "/images/Ngorongoro.png",
        "/images/Ngorongoro Crater views.jpg",
        "/images/Ngorongoro Crater views.jpeg",
      ],
    },
  },
  {
    name: "Tarangire",
    highlight: "Elephant herds",
    media: {
      type: "video",
      src: "/videos/Tarangire Elephants.mov",
    },
  },
  {
    name: "Zanzibar",
    highlight: "Beach paradise",
    media: {
      type: "image",
      src: [
        "/images/zenj.webp",
        "/images/Discover-Zanzibar-banner_.jpg",
        "/images/Zanzibar Getaways.jpg",
      ],
    },
  },
];

export default function Destinations() {
  const [indexes, setIndexes] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    destinations.forEach((d) => (init[d.name] = 0));
    return init;
  });

  const [loadedMap, setLoadedMap] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    destinations.forEach((d) => (init[d.name] = true));
    return init;
  });

  const [prevDisplayMap, setPrevDisplayMap] = useState<Record<string, string | null>>(() => {
    const init: Record<string, string | null> = {};
    destinations.forEach((d) => (init[d.name] = null));
    return init;
  });

  const prevIndexesRef = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    destinations.forEach((d) => (init[d.name] = 0));
    return init;
  })[0];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndexes((prev) => {
        const next = { ...prev };
        destinations.forEach((d) => {
          const src = d.media.src;
          if (Array.isArray(src) && src.length > 0) {
            next[d.name] = (prev[d.name] + 1) % src.length;
          }
        });
        return next;
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Track previous display src per destination so we can show it as a background
  useEffect(() => {
    // detect changes between prevIndexesRef and indexes
    const prev = { ...prevIndexesRef };
    destinations.forEach((d) => {
      const src = d.media.src;
      if (!Array.isArray(src)) return;
      const prevIdx = prev[d.name] ?? 0;
      const newIdx = indexes[d.name] ?? 0;
      if (prevIdx === newIdx) return;
      const prevSrc = src[prevIdx];
      setPrevDisplayMap((p) => ({ ...p, [d.name]: prevSrc }));
      setLoadedMap((l) => ({ ...l, [d.name]: false }));
      // clear prev after transition
      setTimeout(() => setPrevDisplayMap((p) => ({ ...p, [d.name]: null })), 700);
    });
    // update ref
    Object.keys(indexes).forEach((k) => (prevIndexesRef[k] = indexes[k]));
  }, [indexes]);

  return (
    <section id="destinations" className="py-12 bg-safari-brown">
      <div className="max-w-325 mx-auto px-4 md:px-6">
        <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-safari-black">
          Top Destinations
        </h2>
        <p className="mt-2 text-[clamp(1rem,2vw,1.2rem)] text-safari-black">
          Explore Tanzania&apos;s most breathtaking places and unique experiences.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {destinations.map((d) => {
            const srcVal = d.media.src;
            const displaySrc = Array.isArray(srcVal)
              ? srcVal[indexes[d.name] ?? 0]
              : (srcVal as string);

            const prevBg = prevDisplayMap[d.name];
            const loaded = loadedMap[d.name];

            return (
              <div
                key={d.name}
                className="relative rounded-2xl overflow-hidden shadow-sm group"
              >
                {d.media.type === "video" ? (
                  <video
                    src={displaySrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="w-full aspect-video object-cover block"
                  />
                ) : (
                  <div
                    className="relative w-full aspect-video bg-center bg-cover"
                    style={prevBg ? { backgroundImage: `url(${prevBg})` } : undefined}
                  >
                    <Image
                      src={displaySrc}
                      alt={d.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-opacity duration-700"
                      style={{ opacity: loaded ? 1 : 0 }}
                      onLoad={() => {
                          setLoadedMap((l) => ({ ...l, [d.name]: true }));
                        }}
                    />
                  </div>
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                {/* Labels */}
                <div className="absolute bottom-0 left-0 p-4 flex flex-col gap-1">
                  <span className="text-white text-xl font-bold">{d.name}</span>
                  <span className="text-safari-brown font-medium text-base">
                    {d.highlight}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
