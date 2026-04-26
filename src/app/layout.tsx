import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { I18nProvider } from "@/i18n/I18nProvider";
import { LanguageToggle } from "@/components/LanguageToggle";
import { HeroLogo } from "@/components/HeroLogo";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Valentin Liegrois",
  description: "AI systems engineer · Independent consultant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <I18nProvider>
          <SmoothScroll>
            <LanguageToggle />
            <HeroLogo />
            {children}
          </SmoothScroll>
        </I18nProvider>
      </body>
    </html>
  );
}
