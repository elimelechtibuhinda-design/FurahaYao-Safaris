"use client";

import { useEffect, useRef, useState } from "react";

const phrases = ["Visit Tanzania", "See the Best of the World"];

export default function Hero() {
  const [displayed, setDisplayed] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [typing, setTyping] = useState(true);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const phrase = phrases[phraseIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (typing) {
      if (charIdx <= phrase.length) {
        setDisplayed(phrase.substring(0, charIdx));
        timeout = setTimeout(() => setCharIdx((c) => c + 1), 60);
      } else {
        timeout = setTimeout(() => setTyping(false), 1200);
      }
    } else {
      if (charIdx > 0) {
        setDisplayed(phrase.substring(0, charIdx - 1));
        timeout = setTimeout(() => setCharIdx((c) => c - 1), 30);
      } else {
        timeout = setTimeout(() => {
          setPhraseIdx((p) => (p + 1) % phrases.length);
          setTyping(true);
        }, 400);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIdx, phraseIdx, typing]);

  return (
    <section className="relative min-h-screen flex items-stretch p-0">
      {/* Background image (shows while video loads) */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dtvuqa0i2/image/upload/v1768550116/Safari_6_dekouj.jpg')",
        }}
      />

      {/* Hero video */}
      <video
        className="hero-fadein-video absolute inset-0 w-full h-full object-cover z-[1]"
        src="/videos/IMG_1813_b0atce.mov"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-[2]" />

      {/* Content */}
      <div className="relative z-[3] max-w-325 mx-auto px-4 md:px-6 flex flex-col justify-center min-h-screen hero-content-animate">
        <span className="text-safari-yellow font-bold text-sm sm:text-base mb-2 sm:mb-3 tracking-wide uppercase">
          FurahaYao Safaris
        </span>

        <h1 className="text-white text-[clamp(1.5rem,5vw,3.5rem)] font-bold leading-tight mb-3 sm:mb-4">
          Tanzania Awaits<br />
          <span className="text-safari-yellow">Your Adventure</span>
        </h1>

        {/* Typewriter */}
        <div className="mb-6 sm:mb-8">
          <span className="typewriter-text font-semibold text-safari-yellow text-base sm:text-lg font-sans">
            {displayed}
          </span>
        </div>

        <p className="bg-safari-yellow text-safari-black rounded-full px-4 sm:px-5 py-2 inline-block font-semibold mb-6 sm:mb-8 self-start text-sm sm:text-base">
          Expert local guides · Ethical wildlife encounters
        </p>

        <div className="flex flex-wrap gap-3 sm:gap-4">
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-safari-brown text-white px-5 sm:px-7 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-base hover:opacity-90 transition-opacity cursor-pointer"
          >
            Plan My Trip
          </button>
          <button
            onClick={() => document.getElementById("safaris")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-safari-yellow text-safari-black px-5 sm:px-7 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-base hover:opacity-90 transition-opacity cursor-pointer"
          >
            Explore Safaris
          </button>
        </div>
      </div>
    </section>
  );
}
