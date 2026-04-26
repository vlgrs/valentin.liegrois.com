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
      {/* Pulled up by the same height as the hero pin (lvh = largest viewport)
          so the post-hero sections sit BEHIND the pinned hero (z-0) inside
          the GSAP spacer. As the hero slides up at the end of its scrub,
          Identity is revealed underneath. Using lvh (not svh) ensures no
          gap appears when iOS Chrome retracts its address bar mid-scroll. */}
      <div className="relative z-0 -mt-[100lvh]">
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
