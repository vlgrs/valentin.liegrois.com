"use client";

import { useT } from "@/i18n/I18nProvider";

export function SelectedWork() {
  const t = useT();

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-6">
        <header className="reveal mx-auto max-w-2xl px-4 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-white/45">
            {t.work.heading}
          </p>
          <h2 className="mt-4 text-2xl font-light tracking-tight text-white sm:text-4xl">
            {t.work.sub}
          </h2>
        </header>

        <ul className="mt-14 grid grid-cols-1 gap-3 sm:mt-20 sm:grid-cols-2 sm:gap-4">
          {t.work.projects.map((project) => (
            <li
              key={project.title}
              className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.025] p-8 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-white/25 hover:bg-white/[0.045]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <h3 className="text-xl font-medium tracking-tight text-white">
                {project.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                {project.line}
              </p>
              <ul className="mt-6 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-white/12 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] tracking-wide text-white/70 transition-colors group-hover:border-white/25 group-hover:text-white/85"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
