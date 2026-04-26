"use client";

import { useT } from "@/i18n/I18nProvider";

export function TrustedBy() {
  const t = useT();

  return (
    <section className="relative">
      <div
        aria-hidden
        className="mx-auto h-px w-full max-w-5xl bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />

      <div className="reveal mx-auto w-full max-w-5xl px-6 py-20 text-center sm:py-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-white/45">
          {t.trustedBy.heading}
        </p>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {t.trustedBy.brands.map((brand) => (
            <li key={brand}>
              <span className="inline-block rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-sm font-medium uppercase tracking-[0.12em] text-white/80 transition-all hover:border-white/35 hover:bg-white/[0.07] hover:text-white sm:text-[15px]">
                {brand}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
