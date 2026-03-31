"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function About() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowVideo((prev) => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="py-12 pb-3 bg-white" aria-label="About FurahaYao Safaris">
      <div className="max-w-325 mx-auto px-4 md:px-6 flex flex-col lg:flex-row gap-12 items-center">
        {/* Left */}
        <div className="flex-1 flex flex-col gap-5">
          <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-safari-black">
            About FurahaYao Safaris
          </h2>
          <p className="text-[clamp(1rem,2vw,1.2rem)] text-safari-black leading-relaxed">
            We are passionate about sharing Tanzania&apos;s wonders. Our team is
            local, experienced, and committed to responsible travel. Every trip
            is crafted for authenticity and comfort.
          </p>

          <ul className="list-disc ml-5 text-safari-brown font-medium space-y-1">
            <li>Personalized itineraries tailored to your preferences</li>
            <li>Expert local guides with deep knowledge of Tanzania</li>
            <li>Ethical wildlife encounters respecting nature and conservation</li>
          </ul>

          <div>
            <h3 className="font-bold text-safari-yellow text-lg block mb-2">
              Why choose us?
            </h3>
            <ul className="flex flex-wrap gap-3">
              {["Transparent pricing", "24/7 support", "Trusted by travelers"].map((item) => (
                <li
                  key={item}
                  className="bg-safari-light text-safari-black rounded-lg px-3 py-1 text-sm font-medium"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="self-start bg-safari-brown text-white px-7 py-3 rounded-full font-bold text-base hover:opacity-90 transition-opacity cursor-pointer mt-2"
          >
            Plan My Trip
          </button>
        </div>

        {/* Right: media */}
        <div className="flex-1 flex justify-center items-center w-full">
          <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden">
            <Image
              src="/images/On the Car.HEIC"
              alt="On the Car"
              fill
              sizes="100vw"
              className={`object-cover transition-opacity duration-1200 ${
                showVideo ? "opacity-0" : "opacity-100"
              }`}
            />
            <video
              src="/videos/IMG_1813_b0atce.mov"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1200 ${
                showVideo ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
