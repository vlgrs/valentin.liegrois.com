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

      // Video scrub fills 85% of the timeline. The last 15% is reserved for
      // the slide-up exit so beat 3 can land exactly on the final frame and
      // the transition chains directly with no static hold.
      tl.fromTo(
        video,
        { currentTime: 0 },
        { currentTime: video.duration, ease: "none", duration: 0.85 },
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

      // Beats chain continuously across the whole video duration (timeline
      // 0 → 0.85, since the last 15% is the slide-up exit). Beat 3 lands
      // EXACTLY on the video's final frame at 0.85, then the slide chains
      // directly — no static "dead hold" between the last text and the exit.
      //
      // Schedule (timeline progress 0..1):
      //   0.00 - 0.05   beat 1 visible
      //   0.05 - 0.10   beat 1 fades out
      //   0.12 - 0.25   beat 2 lines stagger in (3 lines, 4% apart)
      //   0.25 - 0.62   beat 2 holds (cyber wireframe phase)
      //   0.62 - 0.72   beat 2 fades out (stagger)
      //   0.74 - 0.85   beat 3 enters and lands on the resolved final frame
      //   0.85 - 1.00   the hero slides up off-screen, beat 3 rides with it
      if (beat1) {
        tl.fromTo(
          beat1,
          { opacity: 1, x: 0 },
          { opacity: 0, x: -32, duration: 0.05 },
          0.05
        );
      }

      if (beat2Lines.length === 3) {
        beat2Lines.forEach((line, i) => {
          tl.fromTo(
            line,
            { opacity: 0, x: -40 },
            { opacity: 1, x: 0, duration: 0.05, ease: "power2.out" },
            0.12 + i * 0.04
          );
        });
        tl.to(
          beat2Lines,
          { opacity: 0, x: -32, duration: 0.10, stagger: 0.015 },
          0.62
        );
      }

      if (beat3) {
        tl.fromTo(
          beat3,
          { opacity: 0, x: -32 },
          { opacity: 1, x: 0, duration: 0.11, ease: "power2.out" },
          0.74
        );
      }

      // Whole-hero exit: the pin element slides UP (translateY -100%) in the
      // final 15% of scrub. The hero physically lifts off the viewport like a
      // raising curtain, revealing Identity (sitting behind via z-index) from
      // the bottom up. Cleaner than a cross-fade — no overlap, just a single
      // crisp upward motion.
      tl.to(
        pin,
        { yPercent: -100, duration: 0.15, ease: "power2.in" },
        0.85
      );

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
    <section ref={pinRef} className="relative z-10 h-svh w-full overflow-hidden bg-black">
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

      {/* Mobile legibility wash — strong fade-to-black at the bottom 60% so
          the beats stay readable against the face which fills the portrait
          viewport. Hidden on sm+ where the left-side wash takes over. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/85 via-black/40 to-transparent sm:hidden" />

      {/* Desktop legibility wash — left-side gradient only, doesn't touch the
          face area on the right of the frame. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-2/3 bg-gradient-to-r from-black/65 via-black/25 to-transparent sm:block" />

      <div
        ref={beat1Ref}
        className="pointer-events-none absolute inset-x-0 bottom-12 flex flex-col items-center px-6 text-center sm:inset-y-0 sm:bottom-auto sm:left-0 sm:right-auto sm:max-w-[40vw] sm:items-start sm:justify-end sm:pb-24 sm:pl-14 sm:pr-0 sm:text-left"
      >
        <h1
          className="font-hero text-4xl uppercase leading-[0.95] tracking-[0.04em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] sm:text-7xl"
          style={{ fontFamily: "var(--font-hero)" }}
        >
          {t.hero.beat1.name}
        </h1>
        <p className="mt-4 max-w-[34ch] text-base font-normal tracking-wide text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] sm:mt-6 sm:text-xl">
          {t.hero.beat1.sub}
        </p>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-12 flex flex-col items-center gap-1 px-6 text-center sm:inset-y-0 sm:bottom-auto sm:left-0 sm:right-auto sm:max-w-[40vw] sm:items-start sm:justify-end sm:gap-2 sm:pb-24 sm:pl-14 sm:pr-0 sm:text-left">
        {t.hero.beat2.map((line, i) => (
          <p
            key={i}
            ref={(el) => {
              if (el) beat2LinesRef.current[i] = el;
            }}
            className="font-hero text-xl uppercase leading-tight tracking-[0.04em] text-white opacity-0 drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] sm:text-4xl"
            style={{ fontFamily: "var(--font-hero)" }}
          >
            {line}
          </p>
        ))}
      </div>

      <div
        ref={beat3Ref}
        className="pointer-events-none absolute inset-x-0 bottom-12 flex flex-col items-center px-6 text-center opacity-0 sm:inset-y-0 sm:bottom-auto sm:left-0 sm:right-auto sm:max-w-[40vw] sm:items-start sm:justify-end sm:pb-24 sm:pl-14 sm:pr-0 sm:text-left"
      >
        <p
          className="font-hero text-xl uppercase leading-tight tracking-[0.04em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] sm:text-4xl"
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
