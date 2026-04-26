"use client";

import { useT } from "@/i18n/I18nProvider";

export function Identity() {
  const t = useT();

  return (
    <section className="relative isolate overflow-hidden">
      {/* Warm radial that picks up where the hero's cyan bloom left off —
          the section lives in a small pool of amber light. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[75vh] w-[85vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-90 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,180,90,0.30), rgba(255,110,50,0.10) 45%, transparent 75%)",
        }}
      />

      <div className="reveal mx-auto flex w-full max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-40">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-white/45">
          {t.identity.role}
        </p>
        <p className="mt-6 text-2xl font-light leading-relaxed tracking-tight text-white/90 sm:text-3xl">
          {t.identity.line}
        </p>
      </div>
    </section>
  );
}
