"use client";

import { useState, useEffect, useRef } from "react";

/* ─── Types ─────────────────────────────────────────── */
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  heardFrom: string;
  language: string;
  travelWith: string;
  occasion: string;
  exactDates: string;
  startDate: string;
  endDate: string;
  departurePeriod: string;
  duration: string;
  extras: string[];
  zanzibarDuration: string;
  parks: string[];
  additionalActivities: string;
  activities: string[];
  accommodation: string;
  accommodationCategory: string;
  locationPreference: string;
  dreamSafari: string;
  budget: string;
  contactAgain: string;
}

const INITIAL: FormData = {
  firstName: "", lastName: "", email: "", heardFrom: "", language: "",
  travelWith: "", occasion: "", exactDates: "", startDate: "", endDate: "",
  departurePeriod: "", duration: "", extras: [], zanzibarDuration: "",
  parks: [], additionalActivities: "", activities: [],
  accommodation: "", accommodationCategory: "", locationPreference: "",
  dreamSafari: "", budget: "", contactAgain: "",
};

/* ─── Step metadata ──────────────────────────────────── */
const STEPS = [
  { num: 1, label: "About You" },
  { num: 2, label: "Travel Plans" },
  { num: 3, label: "Safari Timing" },
  { num: 4, label: "Zanzibar" },
  { num: 5, label: "Destinations" },
  { num: 6, label: "Experiences" },
  { num: 7, label: "Accommodation" },
  { num: 8, label: "Final Details" },
];

/* ─── Reusable pill-choice component ─────────────────── */
function PillGroup({
  options, value, onChange, multi = false,
}: {
  options: string[];
  value: string | string[];
  onChange: (v: string | string[]) => void;
  multi?: boolean;
}) {
  const toggle = (opt: string) => {
    if (multi) {
      const arr = value as string[];
      onChange(arr.includes(opt) ? arr.filter((x) => x !== opt) : [...arr, opt]);
    } else {
      onChange(opt as string);
    }
  };
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = multi
          ? (value as string[]).includes(opt)
          : value === opt;
        return (
          <button
            key={opt}
            type="button"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 cursor-pointer
              ${active
                ? "border-safari-brown bg-safari-brown text-white"
                : "border-safari-light bg-white text-safari-black hover:border-safari-brown hover:bg-safari-light"
              }`}
            onClick={() => toggle(opt)}
          >
            {active && <span className="w-1.5 h-1.5 rounded-full bg-white animate-[popIn_0.2s_ease]" />}
            {opt}
          </button>
        );
      })}
    </div>
  );
}

/* ─── Field wrapper ──────────────────────────────────── */
function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold tracking-wider uppercase text-safari-brown">
        {label}
        {required && <span className="text-safari-brown ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

/* ─── Main component ─────────────────────────────────── */
export default function Contact() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const formRef = useRef<HTMLDivElement>(null);

  const set = (key: keyof FormData, val: string | string[]) =>
    setForm((f) => ({ ...f, [key]: val }));

  const totalSteps = STEPS.length;
  const progress = ((step - 1) / (totalSteps - 1)) * 100;

  // Validation for each step
  const isStepValid = () => {
    switch (step) {
      case 1:
        return form.firstName.trim() && form.lastName.trim() && form.email.trim() && form.heardFrom.trim() && form.language.trim();
      case 2:
        return form.travelWith.trim() && form.occasion.trim();
      case 3:
        if (form.exactDates === "Yes") {
          return form.startDate.trim() && form.endDate.trim();
        } else if (form.exactDates === "No") {
          return form.departurePeriod.trim();
        } else {
          return form.exactDates.trim();
        }
      case 4:
        // If Zanzibar is selected, require zanzibarDuration
        if (form.extras.includes("Zanzibar")) {
          return form.zanzibarDuration.trim();
        }
        return true;
      case 5:
        return form.parks.length > 0;
      case 6:
        if (form.additionalActivities === "Yes") {
          return form.activities.length > 0;
        }
        return form.additionalActivities.trim();
      case 7:
        return form.accommodation.trim() && form.accommodationCategory.trim() && form.locationPreference.trim();
      case 8:
        return form.dreamSafari.trim() && form.budget.trim() && form.contactAgain.trim();
      default:
        return true;
    }
  };

  const navigate = (dir: "forward" | "back") => {
    if (dir === "forward" && !isStepValid()) {
      setError("Please fill in all required fields before continuing.");
      return;
    }
    setError("");
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setStep((s) => (dir === "forward" ? s + 1 : s - 1));
      setAnimating(false);
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 350);
  };

  const handleSubmit = async () => {
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen bg-white py-16" aria-label="Safari Planning Contact Form">
      <div className="max-w-325 mx-auto px-4 md:px-6" ref={formRef}>

        {/* Hero Header */}
        <header className="text-center mb-12 animate-[fadeup_0.9s_ease_both]">
          <div className="mb-4 text-center">
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-safari-brown">
              FurahaYao Safaris
            </span>
          </div>
          <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold text-safari-black mb-3">
            Plan Your <span className="text-safari-brown">Safari</span>
          </h1>
          <p className="text-safari-black/60 max-w-md mx-auto leading-relaxed">
            We want to understand you properly so we can design a safari that fits you — not a generic one.
          </p>
        </header>

        {submitted ? (
          /* Thank You State */
          <div className="bg-safari-light rounded-3xl p-12 text-center animate-[fadeup_0.8s_ease_both]">
            <div className="text-6xl mb-6 animate-[float_3s_ease-in-out_infinite]">🦁</div>
            <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-safari-black mb-4">
              Your Journey <span className="text-safari-brown">Begins</span>
            </h2>
            <div className="w-16 h-0.5 bg-safari-brown mx-auto mb-6 opacity-50" />
            <p className="text-safari-black/60 max-w-sm mx-auto leading-relaxed">
              Thank you — your safari request has been received. Our team will craft a tailored itinerary and reach out within 24 hours.
            </p>
          </div>
        ) : (
          <>
            {/* Progress Track */}
            <div className="mb-10 animate-[fadeup_0.9s_0.15s_ease_both]">
              <div className="h-1 bg-safari-light rounded-full mb-4 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-safari-brown via-safari-brown to-safari-brown rounded-full transition-all duration-500 ease-out relative"
                  style={{ width: `${progress}%` }}
                >
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 rounded-full bg-safari-brown shadow-lg shadow-safari-brown/50" />
                </div>
              </div>
              <div className="flex justify-between">
                {STEPS.map((s) => (
                  <div
                    key={s.num}
                    className={`flex flex-col items-center gap-1 transition-opacity duration-300
                      ${s.num === step ? "opacity-100" : s.num < step ? "opacity-100" : "opacity-40"}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300
                        ${s.num === step
                          ? "bg-safari-brown text-safari-black shadow-lg shadow-safari-brown/30"
                          : s.num < step
                            ? "bg-safari-brown text-white"
                            : "bg-safari-light text-safari-black/40 border border-safari-light"
                        }`}
                    >
                      {s.num < step ? "✓" : s.num}
                    </div>
                    <span className="hidden sm:block text-[9px] tracking-wide uppercase text-safari-black/50">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-safari-light rounded-3xl p-8 md:p-12 shadow-xl shadow-safari-black/5 animate-[fadeup_0.9s_0.2s_ease_both]">
              <div
                className={`transition-all duration-350 ease-out
                  ${animating
                    ? direction === "forward"
                      ? "opacity-0 -translate-x-6"
                      : "opacity-0 translate-x-6"
                    : "opacity-100 translate-x-0"
                  }`}
              >

                {/* ── STEP 1 ── */}
                {step === 1 && (
                  <>
                    <div className="flex items-baseline gap-4 mb-8 pb-5 border-b border-safari-brown/10">
                      <span className="text-xs font-semibold tracking-widest text-safari-brown">01</span>
                      <h3 className="text-xl md:text-2xl font-bold text-safari-black">
                        Let&apos;s get to know you
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field label="First Name" required>
                        <input
                          className="w-full bg-white border border-safari-brown/20 rounded-xl px-4 py-3 text-safari-black placeholder:text-safari-black/30 outline-none focus:border-safari-brown focus:ring-2 focus:ring-safari-brown/10 transition-all"
                          value={form.firstName}
                          onChange={e => set("firstName", e.target.value)}
                          placeholder="Your first name"
                        />
                      </Field>
                      <Field label="Last Name" required>
                        <input
                          className="w-full bg-white border border-safari-brown/20 rounded-xl px-4 py-3 text-safari-black placeholder:text-safari-black/30 outline-none focus:border-safari-brown focus:ring-2 focus:ring-safari-brown/10 transition-all"
                          value={form.lastName}
                          onChange={e => set("lastName", e.target.value)}
                          placeholder="Your last name"
                        />
                      </Field>
                    </div>
                    <div className="mt-5">
                      <Field label="Email Address" required>
                        <input
                          type="email"
                          className="w-full bg-white border border-safari-brown/20 rounded-xl px-4 py-3 text-safari-black placeholder:text-safari-black/30 outline-none focus:border-safari-brown focus:ring-2 focus:ring-safari-brown/10 transition-all"
                          value={form.email}
                          onChange={e => set("email", e.target.value)}
                          placeholder="you@email.com"
                        />
                      </Field>
                    </div>
                    <div className="mt-6">
                      <Field label="How did you hear about FurahaYao Safaris?" required>
                        <PillGroup
                          options={["Google", "Instagram", "Friend or family", "Travel blog", "Returning guest", "Other"]}
                          value={form.heardFrom}
                          onChange={v => set("heardFrom", v as string)}
                        />
                      </Field>
                    </div>
                    <div className="mt-6">
                      <Field label="What language do you speak?" required>
                        <input
                          className="w-full bg-white border border-safari-brown/20 rounded-xl px-4 py-3 text-safari-black placeholder:text-safari-black/30 outline-none focus:border-safari-brown focus:ring-2 focus:ring-safari-brown/10 transition-all"
                          value={form.language}
                          onChange={e => set("language", e.target.value)}
                          placeholder="e.g. English, French, Spanish…"
                        />
                      </Field>
                    </div>
                  </>
                )}

                {/* ── STEP 2 ── */}
                {step === 2 && (
                  <>
                    <div className="flex items-baseline gap-4 mb-8 pb-5 border-b border-safari-brown/10">
                      <span className="text-xs font-semibold tracking-widest text-safari-brown">02</span>
                      <h3 className="text-xl md:text-2xl font-bold text-safari-black">
                        Your travel plans
                      </h3>
                    </div>
                    <Field label="Who are you going with?" required>
                      <PillGroup
                        options={["Solo", "Couple", "Family", "Friends", "In a relationship", "Other"]}
                        value={form.travelWith}
                        onChange={v => set("travelWith", v as string)}
                      />
                    </Field>
                    <hr className="my-6 border-safari-brown/10" />
                    <Field label="For what occasion?" required>
                      <PillGroup
                        options={["Honeymoon", "Anniversary", "Birthday", "Adventure", "Family trip", "Other"]}
                        value={form.occasion}
                        onChange={v => set("occasion", v as string)}
                      />
                    </Field>
                  </>
                )}

                {/* ── STEP 3 ── */}
                {step === 3 && (
                  <>
                    <div className="flex items-baseline gap-4 mb-8 pb-5 border-b border-safari-brown/10">
                      <span className="text-xs font-semibold tracking-widest text-safari-brown">03</span>
                      <h3 className="text-xl md:text-2xl font-bold text-safari-black">
                        Safari timing
                      </h3>
                    </div>
                    <Field label="Do you know the exact dates?" required>
                      <PillGroup options={["Yes", "No"]} value={form.exactDates} onChange={v => set("exactDates", v as string)} />
                    </Field>

                    {form.exactDates === "Yes" && (
                      <>
                        <hr className="my-6 border-safari-brown/10" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <Field label="Departure date">
                            <input
                              type="date"
                              className="w-full bg-white border border-safari-brown/20 rounded-xl px-4 py-3 text-safari-black outline-none focus:border-safari-brown focus:ring-2 focus:ring-safari-brown/10 transition-all"
                              value={form.startDate}
                              onChange={e => set("startDate", e.target.value)}
                            />
                          </Field>
                          <Field label="Return date">
                            <input
                              type="date"
                              className="w-full bg-white border border-safari-brown/20 rounded-xl px-4 py-3 text-safari-black outline-none focus:border-safari-brown focus:ring-2 focus:ring-safari-brown/10 transition-all"
                              value={form.endDate}
                              onChange={e => set("endDate", e.target.value)}
                            />
                          </Field>
                        </div>
                      </>
                    )}

                    {form.exactDates === "No" && (
                      <>
                        <hr className="my-6 border-safari-brown/10" />
                        <Field label="Departure period" required>
                          <PillGroup
                            options={["January – March", "April – June", "July – September", "October – December", "Flexible"]}
                            value={form.departurePeriod}
                            onChange={v => set("departurePeriod", v as string)}
                          />
                        </Field>
                      </>
                    )}

                    <hr className="my-6 border-safari-brown/10" />
                    <Field label="Approximate safari duration" required>
                      <PillGroup
                        options={["2–4 days", "5–7 days", "8–10 days", "10+ days", "Not sure yet"]}
                        value={form.duration}
                        onChange={v => set("duration", v as string)}
                      />
                    </Field>
                  </>
                )}

                {/* ── STEP 4 ── */}
                {step === 4 && (
                  <>
                    <div className="flex items-baseline gap-4 mb-8 pb-5 border-b border-safari-brown/10">
                      <span className="text-xs font-semibold tracking-widest text-safari-brown">04</span>
                      <h3 className="text-xl md:text-2xl font-bold text-safari-black">
                        Zanzibar &amp; extra services
                      </h3>
                    </div>
                    <p className="text-sm text-safari-black/50 mb-5">
                      In addition to your private safari, what else would you like us to take care of?
                    </p>
                    <Field label="Additional services">
                      <PillGroup
                        options={["Flights", "Zanzibar", "Private excursions in Zanzibar", "Private transfer to your hotel upon landing"]}
                        value={form.extras}
                        onChange={v => set("extras", v as string[])}
                        multi
                      />
                    </Field>

                    {form.extras.includes("Zanzibar") && (
                      <>
                        <hr className="my-6 border-safari-brown/10" />
                        <Field label="Approximate duration in Zanzibar" required>
                          <PillGroup
                            options={["2–4 days", "5–7 days", "7+ days"]}
                            value={form.zanzibarDuration}
                            onChange={v => set("zanzibarDuration", v as string)}
                          />
                        </Field>
                      </>
                    )}
                  </>
                )}

                {/* ── STEP 5 ── */}
                {step === 5 && (
                  <>
                    <div className="flex items-baseline gap-4 mb-8 pb-5 border-b border-safari-brown/10">
                      <span className="text-xs font-semibold tracking-widest text-safari-brown">05</span>
                      <h3 className="text-xl md:text-2xl font-bold text-safari-black">
                        Safari destinations
                      </h3>
                    </div>
                    <p className="text-sm text-safari-black/50 mb-5">
                      Which parks do you absolutely want to explore?
                    </p>
                    <Field label="Select destinations">
                      <PillGroup
                        options={[
                          "Arusha National Park",
                          "Tarangire National Park",
                          "Lake Manyara National Park",
                          "Ngorongoro Crater",
                          "Serengeti National Park",
                          "Lake Natron",
                          "Not sure — recommend for me",
                        ]}
                        value={form.parks}
                        onChange={v => set("parks", v as string[])}
                        multi
                      />
                    </Field>
                  </>
                )}

                {/* ── STEP 6 ── */}
                {step === 6 && (
                  <>
                    <div className="flex items-baseline gap-4 mb-8 pb-5 border-b border-safari-brown/10">
                      <span className="text-xs font-semibold tracking-widest text-safari-brown">06</span>
                      <h3 className="text-xl md:text-2xl font-bold text-safari-black">
                        Experiences
                      </h3>
                    </div>
                    <Field label="Would you like additional activities?" required>
                      <PillGroup
                        options={["Yes", "No"]}
                        value={form.additionalActivities}
                        onChange={v => set("additionalActivities", v as string)}
                      />
                    </Field>

                    {form.additionalActivities === "Yes" && (
                      <>
                        <hr className="my-6 border-safari-brown/10" />
                        <Field label="Select what interests you">
                          <PillGroup
                            options={[
                              "Swimming in an oasis near Arusha",
                              "Canoeing on Lake Momella",
                              "Canoeing on Duluti Lake",
                              "Walking to Duluti Lake",
                              "Hiking to waterfalls of Mount Meru",
                              "Bike ride in Mto Wa Mbu village",
                              "Guided walk with a Maasai guide + waterfall at Lake Natron",
                              "Cultural visit with the Maasai tribe",
                              "Cultural visit with the Hadzabe tribe",
                            ]}
                            value={form.activities}
                            onChange={v => set("activities", v as string[])}
                            multi
                          />
                        </Field>
                      </>
                    )}
                  </>
                )}

                {/* ── STEP 7 ── */}
                {step === 7 && (
                  <>
                    <div className="flex items-baseline gap-4 mb-8 pb-5 border-b border-safari-brown/10">
                      <span className="text-xs font-semibold tracking-widest text-safari-brown">07</span>
                      <h3 className="text-xl md:text-2xl font-bold text-safari-black">
                        Accommodation
                      </h3>
                    </div>
                    <Field label="Type of accommodation" required>
                      <PillGroup
                        options={["Camp", "Lodge", "Mix", "Not sure yet"]}
                        value={form.accommodation}
                        onChange={v => set("accommodation", v as string)}
                      />
                    </Field>

                    <p className="text-xs text-safari-black/40 mt-3 mb-6">
                      Camp = fully equipped tents · Lodge = hotel-style · Mix = a bit of both
                    </p>

                    <hr className="my-6 border-safari-brown/10" />

                    <Field label="Accommodation category" required>
                      <PillGroup
                        options={["Mid-range", "Luxury", "Ultra-luxury"]}
                        value={form.accommodationCategory}
                        onChange={v => set("accommodationCategory", v as string)}
                      />
                    </Field>

                    <hr className="my-6 border-safari-brown/10" />

                    <Field label="Location preference" required>
                      <PillGroup
                        options={["Inside the parks", "Outside but close", "Flexible"]}
                        value={form.locationPreference}
                        onChange={v => set("locationPreference", v as string)}
                      />
                    </Field>
                  </>
                )}

                {/* ── STEP 8 ── */}
                {step === 8 && (
                  <>
                    <div className="flex items-baseline gap-4 mb-8 pb-5 border-b border-safari-brown/10">
                      <span className="text-xs font-semibold tracking-widest text-safari-brown">08</span>
                      <h3 className="text-xl md:text-2xl font-bold text-safari-black">
                        Final details
                      </h3>
                    </div>
                    <Field label="Tell us about your dream safari">
                      <textarea
                        className="w-full bg-white border border-safari-brown/20 rounded-xl px-4 py-3 text-safari-black placeholder:text-safari-black/30 outline-none focus:border-safari-brown focus:ring-2 focus:ring-safari-brown/10 transition-all min-h-32 resize-y"
                        value={form.dreamSafari}
                        onChange={e => set("dreamSafari", e.target.value)}
                        placeholder="Animals you want to see, the vibe, expectations, any special moments you have in mind…"
                      />
                    </Field>

                    <hr className="my-6 border-safari-brown/10" />

                    <Field label="Approximate budget per person (safari only)" required>
                      <PillGroup
                        options={["$1,500 – $3,000", "$3,000 – $5,000", "$5,000 – $8,000", "$8,000+", "Not sure yet"]}
                        value={form.budget}
                        onChange={v => set("budget", v as string)}
                      />
                    </Field>

                    <hr className="my-6 border-safari-brown/10" />

                    <Field label="Would you like us to contact you again?" required>
                      <PillGroup
                        options={["Yes, I still have a few questions", "No, just send me the itinerary by email"]}
                        value={form.contactAgain}
                        onChange={v => set("contactAgain", v as string)}
                      />
                    </Field>

                    {error && (
                      <div className="mt-4 bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm text-center">
                        {error}
                      </div>
                    )}
                  </>
                )}

                {/* ── Navigation ── */}
                <div className="flex items-center justify-between mt-10 pt-6 border-t border-safari-brown/10">
                  {step > 1 ? (
                    <button
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-safari-brown/20 text-safari-black/60 font-medium text-sm hover:border-safari-brown hover:text-safari-black transition-all cursor-pointer"
                      onClick={() => navigate("back")}
                    >
                      ← Back
                    </button>
                  ) : (
                    <span />
                  )}

                  <span className="text-sm font-medium text-safari-brown/50">
                    {step} / {totalSteps}
                  </span>

                  {error && (
                    <div className="text-red-600 text-sm mb-2">{error}</div>
                  )}
                  {step < totalSteps ? (
                    <button
                      className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-safari-brown text-white font-semibold text-sm hover:bg-safari-black hover:-translate-y-0.5 hover:shadow-xl hover:shadow-safari-brown/20 transition-all cursor-pointer"
                      onClick={() => navigate("forward")}
                    >
                      Continue →
                    </button>
                  ) : (
                    <button
                      className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-safari-brown text-safari-black font-semibold text-sm hover:bg-safari-brown hover:text-white hover:-translate-y-0.5 hover:shadow-xl hover:shadow-safari-brown/30 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={handleSubmit}
                      disabled={sending}
                    >
                      {sending ? (
                        <>
                          <span className="w-4 h-4 border-2 border-safari-black/30 border-t-safari-black rounded-full animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>Plan My Trip ✦</>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
