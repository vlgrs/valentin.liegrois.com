"use client";

import { useI18n } from "@/i18n/I18nProvider";

export function LanguageToggle() {
  const { locale, setLocale, t } = useI18n();
  const next = locale === "en" ? "fr" : "en";

  return (
    <button
      type="button"
      onClick={() => setLocale(next)}
      aria-label={`Switch language to ${next.toUpperCase()}`}
      className="rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-[11px] font-medium tracking-wider text-white/60 transition-colors hover:border-white/30 hover:text-white"
    >
      {t.nav.switchLang}
    </button>
  );
}
