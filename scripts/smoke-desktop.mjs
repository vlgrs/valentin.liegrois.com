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
await page.screenshot({ path: "/tmp/desktop-hero-start.png" });

await page.evaluate(() => window.scrollTo(0, window.innerHeight * 0.5));
await page.waitForTimeout(500);
await page.screenshot({ path: "/tmp/desktop-hero-mid.png" });

await browser.close();
console.log(JSON.stringify({ errors }, null, 2));
