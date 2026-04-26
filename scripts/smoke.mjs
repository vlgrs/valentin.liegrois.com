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

// Beat 2 progression — sample at 30%, 35%, 40%, 50% to see staggered lines
const beat2 = [
  { name: "beat2-30", scroll: 0.30 },
  { name: "beat2-35", scroll: 0.35 },
  { name: "beat2-40", scroll: 0.40 },
  { name: "beat2-50", scroll: 0.50 },
];

// Transition bridge progression — past hero pin, into identity
const bridge = [
  { name: "bridge-pre", scroll: 0.95 },     // last bit of hero scrub
  { name: "bridge-release", scroll: 1.05 }, // pin just released
  { name: "bridge-cyan", scroll: 1.20 },    // cyan bloom should peak
  { name: "bridge-mix", scroll: 1.40 },     // crossfade cyan→amber
  { name: "bridge-amber", scroll: 1.55 },   // amber peak
  { name: "bridge-out", scroll: 1.75 },     // amber fades, identity visible
];

const vh = 800;
const heroRange = vh * 2;

for (const s of [...beat2, ...bridge]) {
  await page.evaluate((y) => window.scrollTo(0, y), s.scroll * heroRange);
  await page.waitForTimeout(450);
  await page.screenshot({ path: `/tmp/${s.name}.png` });
}

await browser.close();
console.log(JSON.stringify({ errors }, null, 2));
