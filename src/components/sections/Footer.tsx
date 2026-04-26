"use client";

import { useT } from "@/i18n/I18nProvider";
import { Logo } from "@/components/Logo";

export function Footer() {
  const t = useT();

  return (
    <footer className="mx-auto w-full max-w-6xl px-6 pb-12 pt-6">
      <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs tracking-wide text-white/40 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3 text-white">
          <Logo className="h-6 w-6" />
          <span className="font-mono text-white/60">Valentin Liegrois</span>
        </div>
        <span>{t.footer.tagline}</span>
      </div>
    </footer>
  );
}
