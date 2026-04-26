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
      className="fixed top-5 left-5 z-50 rounded-full border border-white/15 bg-black/30 px-3.5 py-1.5 text-xs font-medium tracking-wider text-white/80 backdrop-blur-md transition-colors hover:border-white/30 hover:text-white"
    >
      {t.nav.switchLang}
    </button>
  );
}
