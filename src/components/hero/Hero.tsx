"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useT } from "@/i18n/I18nProvider";

import { FloatingParticles } from "./FloatingParticles";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  videoSrc?: string;
  posterSrc?: string;
  /** Total scroll runway for the hero, expressed as a "+=N%" GSAP end value. */
  scrubRange?: string;
  /** GSAP scrub smoothness in seconds. */
  scrubSeconds?: number;
};

export function Hero({
  videoSrc = "/valentin_motion_scrub.mp4",
  posterSrc = "/valentin_poster.jpg",
  scrubRange = "+=200%",
  scrubSeconds = 0.8,
}: Props) {
  const t = useT();

  const pinRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const beat1Ref = useRef<HTMLDivElement>(null);
  const beat2LinesRef = useRef<HTMLParagraphElement[]>([]);
  const beat3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pin = pinRef.current;
    const video = videoRef.current;
    const particles = particlesRef.current;
    const beat1 = beat1Ref.current;
    const beat2Lines = beat2LinesRef.current;
    const beat3 = beat3Ref.current;
    if (!pin || !video) return;

    const triggers: ScrollTrigger[] = [];

    const setup = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: scrubRange,
          scrub: scrubSeconds,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        video,
        { currentTime: 0 },
        { currentTime: video.duration, ease: "none" },
        0
      );

      if (particles) {
        tl.fromTo(
          particles,
          { opacity: 1 },
          { opacity: 0, ease: "power1.out", duration: 0.15 },
          0
        );
      }

      // Beats slide in/out HORIZONTALLY from the left edge — anchored on the
      // side of the frame so the face is never occluded. Timeline is tightly
      // packed so the text flows continuously through the whole video duration
      // with no gaps and no end pause.
      if (beat1) {
        tl.fromTo(
          beat1,
          { opacity: 1, x: 0 },
          { opacity: 0, x: -32, duration: 0.10 },
          0.15
        );
      }

      // Beat 2: 3 lines slide in one after the other (~5% gap), hold, exit.
      if (beat2Lines.length === 3) {
        beat2Lines.forEach((line, i) => {
          tl.fromTo(
            line,
            { opacity: 0, x: -40 },
            { opacity: 1, x: 0, duration: 0.07, ease: "power2.out" },
            0.22 + i * 0.05
          );
        });
        tl.to(
          beat2Lines,
          { opacity: 0, x: -32, duration: 0.10, stagger: 0.015 },
          0.50
        );
      }

      // Beat 3: enters right after beat 2 exits, holds through the rest of
      // the scrub so the final "available" message lands on the resolved face.
      if (beat3) {
        tl.fromTo(
          beat3,
          { opacity: 0, x: -32 },
          { opacity: 1, x: 0, duration: 0.10 },
          0.62
        );
      }

      if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);
    };

    if (Number.isFinite(video.duration) && video.duration > 0) {
      setup();
    } else {
      video.addEventListener("loadedmetadata", setup, { once: true });
    }

    return () => {
      video.removeEventListener("loadedmetadata", setup);
      triggers.forEach((tr) => tr.kill());
    };
  }, [scrubRange, scrubSeconds]);

  return (
    <section ref={pinRef} className="relative h-svh w-full overflow-hidden bg-black">
      <video
        ref={videoRef}
        src={videoSrc}
        poster={posterSrc}
        muted
        playsInline
        preload="auto"
        autoPlay={false}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div ref={particlesRef} className="absolute inset-0">
        <FloatingParticles count={120} />
      </div>

      {/* Left-edge legibility wash — keeps the off-face text readable without
          touching the right-side composition where the face lives. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />

      <div
        ref={beat1Ref}
        className="pointer-events-none absolute inset-y-0 left-0 flex max-w-[42vw] flex-col justify-end pb-16 pl-8 sm:max-w-[40vw] sm:pb-24 sm:pl-14"
      >
        <h1
          className="font-hero text-5xl uppercase leading-[0.95] tracking-[0.04em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] sm:text-7xl"
          style={{ fontFamily: "var(--font-hero)" }}
        >
          {t.hero.beat1.name}
        </h1>
        <p className="mt-5 max-w-[34ch] text-sm font-light tracking-wide text-white/80 sm:text-base">
          {t.hero.beat1.sub}
        </p>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 flex max-w-[42vw] flex-col justify-end gap-1 pb-16 pl-8 sm:max-w-[40vw] sm:gap-2 sm:pb-24 sm:pl-14">
        {t.hero.beat2.map((line, i) => (
          <p
            key={i}
            ref={(el) => {
              if (el) beat2LinesRef.current[i] = el;
            }}
            className="font-hero text-2xl uppercase leading-tight tracking-[0.04em] text-white opacity-0 drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] sm:text-4xl"
            style={{ fontFamily: "var(--font-hero)" }}
          >
            {line}
          </p>
        ))}
      </div>

      <div
        ref={beat3Ref}
        className="pointer-events-none absolute inset-y-0 left-0 flex max-w-[42vw] flex-col justify-end pb-16 pl-8 opacity-0 sm:max-w-[40vw] sm:pb-24 sm:pl-14"
      >
        <p
          className="font-hero text-2xl uppercase leading-tight tracking-[0.04em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] sm:text-4xl"
          style={{ fontFamily: "var(--font-hero)" }}
        >
          {t.hero.beat3}
        </p>
      </div>

      {/* Clean bottom drop-shadow — soft fade-to-black at the hero's bottom
          edge that creates depth and a calm boundary into the page below. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/55 to-transparent"
      />
    </section>
  );
}
