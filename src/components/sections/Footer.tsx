"use client";

import { useT } from "@/i18n/I18nProvider";

export function Footer() {
  const t = useT();

  return (
    <footer className="mx-auto w-full max-w-6xl px-6 pb-12 pt-6">
      <div className="flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-8 text-xs tracking-wide text-white/40 sm:flex-row sm:items-center">
        <span className="font-mono">Valentin Liegrois</span>
        <span>{t.footer.tagline}</span>
      </div>
    </footer>
  );
}
