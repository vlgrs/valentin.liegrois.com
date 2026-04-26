"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Mounts a single ScrollTrigger.batch over every `.reveal` element on the page.
 * Each batch staggers fade + translate-up entrances when the elements enter
 * the viewport. One trigger group → cheap, no duplication per section.
 */
export function RevealOnScroll() {
  useEffect(() => {
    const els = gsap.utils.toArray<HTMLElement>(".reveal");
    if (els.length === 0) return;

    // Set initial state explicitly (matches the CSS baseline in globals.css).
    gsap.set(els, { opacity: 0, y: 28 });

    ScrollTrigger.batch(els, {
      start: "top 85%",
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.08,
          overwrite: "auto",
        }),
    });

    // Refresh after fonts load so positions don't shift mid-animation.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.id?.startsWith("batch-")) trigger.kill();
      });
    };
  }, []);

  return null;
}
