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
      <Identity />
      <TrustedBy />
      <Capabilities />
      <SelectedWork />
      <Contact />
      <Footer />
      <RevealOnScroll />
    </main>
  );
}
