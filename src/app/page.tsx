import { Hero } from "@/components/hero/Hero";
import { Identity } from "@/components/sections/Identity";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { Capabilities } from "@/components/sections/Capabilities";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col bg-black text-white">
      <Hero />
      {/* Pulled up 100vh so the post-hero sections sit BEHIND the pinned hero
          (z-0) inside the GSAP spacer. As the hero fades to opacity 0 at the
          end of its scrub, Identity is revealed underneath — automatic
          cross-fade, no empty black space when the pin releases. */}
      <div className="relative z-0 -mt-[100svh]">
        <Identity />
        <TrustedBy />
        <Capabilities />
        <SelectedWork />
        <Contact />
        <Footer />
      </div>
      <RevealOnScroll />
    </main>
  );
}
