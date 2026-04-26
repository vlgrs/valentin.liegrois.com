"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Logo } from "./Logo";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Logo pinned to the top-right of the viewport. Visible at rest and fades
 * out as the user starts scrolling, just like the floating particles.
 */
export function HeroLogo() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tween = gsap.fromTo(
      el,
      { opacity: 1 },
      {
        opacity: 0,
        ease: "power1.out",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "20% top",
          scrub: 0.4,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed right-5 top-5 z-40 text-white"
      aria-hidden
    >
      <Logo className="h-9 w-9 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] sm:h-10 sm:w-10" />
    </div>
  );
}
