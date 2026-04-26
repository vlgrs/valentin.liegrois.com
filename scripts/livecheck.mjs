import { chromium } from "playwright";

const url = process.env.URL ?? "https://valentin-liegrois-com.pages.dev/";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const errors = [];
const requestFails = [];
page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("requestfailed", (r) =>
  requestFails.push(`${r.url()}: ${r.failure()?.errorText}`)
);

await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
await page.waitForTimeout(2500);

const beforeScroll = await page.evaluate(() => {
  const v = document.querySelector("video");
  const heroSection = document.querySelector("section.h-svh");
  return {
    videoCurrentTime: v?.currentTime,
    videoDuration: v?.duration,
    heroPosition: heroSection ? getComputedStyle(heroSection).position : null,
    heroTransform: heroSection ? getComputedStyle(heroSection).transform : null,
    heroTopOffset: heroSection?.getBoundingClientRect()?.top,
  };
});

await page.evaluate(() => window.scrollTo(0, 800));
await page.waitForTimeout(1200);

const midScroll = await page.evaluate(() => {
  const v = document.querySelector("video");
  const heroSection = document.querySelector("section.h-svh");
  return {
    scrollY: window.scrollY,
    videoCurrentTime: v?.currentTime,
    heroPosition: heroSection ? getComputedStyle(heroSection).position : null,
    heroTransform: heroSection ? getComputedStyle(heroSection).transform : null,
    heroTopOffset: heroSection?.getBoundingClientRect()?.top,
  };
});

await page.evaluate(() => window.scrollTo(0, 1500));
await page.waitForTimeout(1200);

const lateScroll = await page.evaluate(() => {
  const v = document.querySelector("video");
  return {
    scrollY: window.scrollY,
    videoCurrentTime: v?.currentTime,
  };
});

await page.screenshot({ path: "/tmp/live-late.png" });

await browser.close();
console.log(JSON.stringify({ beforeScroll, midScroll, lateScroll, errors, requestFails }, null, 2));
