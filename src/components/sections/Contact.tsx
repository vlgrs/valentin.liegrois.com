"use client";

import { useT } from "@/i18n/I18nProvider";

export function Contact() {
  const t = useT();

  return (
    <section className="relative isolate overflow-hidden py-32 sm:py-44">
      {/* Soft warm radial behind the CTA, echoing the hero palette. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[55vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,170,80,0.18), rgba(110,220,255,0.06) 50%, transparent 75%)",
        }}
      />

      <div className="reveal mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
        <h2 className="text-3xl font-light tracking-tight text-white sm:text-5xl">
          {t.contact.heading}
        </h2>
        <a
          href={`mailto:${t.contact.cta}`}
          className="group mt-10 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-7 py-4 text-base font-light tracking-wide text-white shadow-[0_20px_60px_-20px_rgba(255,170,80,0.25)] transition-all hover:border-white/40 hover:bg-white/10 sm:text-lg"
        >
          <span>{t.contact.cta}</span>
          <span aria-hidden className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </a>
        <p className="mt-6 text-sm text-white/40">{t.contact.sub}</p>
      </div>
    </section>
  );
}
