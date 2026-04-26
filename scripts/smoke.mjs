import { chromium, devices } from "playwright";

const url = process.env.URL ?? "http://localhost:3000/";

const browser = await chromium.launch();
const ctx = await browser.newContext(devices["iPhone 13"]);
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

await page.goto(url, { waitUntil: "domcontentloaded" });

await page.waitForFunction(() => {
  const v = document.querySelector("video");
  return v && Number.isFinite(v.duration) && v.duration > 0;
}, { timeout: 10000 }).catch(() => {});

await page.waitForTimeout(1200);

const samples = [
  { name: "01-hero-start", scroll: 0.00 },
  { name: "02-beat2", scroll: 0.18 },
  { name: "03-beat3", scroll: 0.78 },
  { name: "04-mid-page", scroll: 0.40 },
  { name: "05-identity", scroll: 0.50 },
  { name: "06-trustedby", scroll: 0.55 },
  { name: "07-capabilities", scroll: 0.65 },
  { name: "08-work", scroll: 0.85 },
  { name: "09-contact", scroll: 1.00 },
];

const total = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);

for (const s of samples) {
  await page.evaluate((y) => window.scrollTo(0, y), s.scroll * total);
  await page.waitForTimeout(700);
  await page.screenshot({ path: `/tmp/mobile-${s.name}.png` });
}

await browser.close();
console.log(JSON.stringify({ errors, viewport: ctx._options?.viewport }, null, 2));
