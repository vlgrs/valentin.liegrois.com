"use client";

import { useT } from "@/i18n/I18nProvider";

export function Capabilities() {
  const t = useT();

  return (
    <section className="relative isolate overflow-hidden py-24 sm:py-32">
      {/* Subtle grid pattern background for depth. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 50%, black, transparent)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 50% at 50% 50%, black, transparent)",
        }}
      />

      <div className="mx-auto w-full max-w-6xl px-6">
        <header className="reveal mx-auto max-w-2xl px-4 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-white/45">
            {t.capabilities.heading}
          </p>
          <h2 className="mt-4 text-2xl font-light tracking-tight text-white sm:text-4xl">
            {t.capabilities.sub}
          </h2>
        </header>

        {/* 6-col grid at lg so 5 cards fit as 3 + 2-centered.
            sm: 2 cols, last card spans both (no empty cell).
            Container is transparent — each card carries its own border so
            empty grid tracks stay invisible. */}
        <div className="mt-14 grid grid-cols-1 gap-3 sm:mt-20 sm:grid-cols-2 sm:gap-4 lg:grid-cols-6">
          {t.capabilities.buckets.map((bucket, i) => {
            const lgFifth = i === 4;
            const lgCenterStart = i === 3;
            return (
              <article
                key={bucket.title}
                className={[
                  "group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.025] p-7 transition-all duration-300",
                  "hover:border-white/25 hover:bg-white/[0.045]",
                  "shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]",
                  lgFifth ? "sm:col-span-2 lg:col-span-2" : "lg:col-span-2",
                  lgCenterStart ? "lg:col-start-2" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {/* Top inner highlight that brightens on hover. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <h3 className="text-lg font-medium tracking-tight text-white">
                  {bucket.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  {bucket.lead}
                </p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {bucket.pills.map((pill) => (
                    <li
                      key={pill}
                      className="rounded-full border border-white/12 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] tracking-wide text-white/70 transition-colors group-hover:border-white/25 group-hover:text-white/85"
                    >
                      {pill}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
