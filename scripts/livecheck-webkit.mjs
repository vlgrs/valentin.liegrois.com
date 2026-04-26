import { webkit, devices } from "playwright";

const url = process.env.URL ?? "https://valentin-liegrois-com.pages.dev/";

const browser = await webkit.launch();
const ctx = await browser.newContext(devices["iPhone 13"]);
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
await page.waitForTimeout(3500);

const samples = [
  { name: "01-start", scroll: 0 },
  { name: "02-mid", scroll: 600 },
  { name: "03-late", scroll: 1100 },
  { name: "04-end", scroll: 1400 },
];

for (const s of samples) {
  await page.evaluate((y) => window.scrollTo(0, y), s.scroll);
  await page.waitForTimeout(700);
  await page.screenshot({ path: `/tmp/wk-${s.name}.png` });
}

const final = await page.evaluate(() => {
  const v = document.querySelector("video");
  const hero = document.querySelector("section.h-lvh");
  return {
    videoCurrentTime: v?.currentTime,
    videoDuration: v?.duration,
    heroHeight: hero?.getBoundingClientRect()?.height,
    viewportHeight: window.innerHeight,
  };
});

await browser.close();
console.log(JSON.stringify({ final, errors }, null, 2));
