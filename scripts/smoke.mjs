import { chromium } from "playwright";

const url = process.env.URL ?? "http://localhost:3000/";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

await page.goto(url, { waitUntil: "domcontentloaded" });

await page.waitForFunction(() => {
  const v = document.querySelector("video");
  return v && Number.isFinite(v.duration) && v.duration > 0;
}, { timeout: 10000 }).catch(() => {});

await page.waitForTimeout(800);

// Sample beat 3 entry, hold, fade-out, and clean end.
const samples = [
  { name: "00-start", scroll: 0.00 },
  { name: "01-b1-fading", scroll: 0.15 },
  { name: "02-b2-rising", scroll: 0.28 },
  { name: "03-b2-full", scroll: 0.42 },
  { name: "04-b2-exit", scroll: 0.55 },
  { name: "05-b3-enter", scroll: 0.66 },
  { name: "06-b3-hold", scroll: 0.80 },
  { name: "07-b3-fading", scroll: 0.93 },
  { name: "08-clean-end", scroll: 0.99 },
];

const vh = 800;
const heroRange = vh * 2;

for (const s of samples) {
  await page.evaluate((y) => window.scrollTo(0, y), s.scroll * heroRange);
  await page.waitForTimeout(700);
  await page.screenshot({ path: `/tmp/timeline-${s.name}.png` });
}

await browser.close();
console.log(JSON.stringify({ errors }, null, 2));
