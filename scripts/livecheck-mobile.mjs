import { chromium, devices } from "playwright";

const url = process.env.URL ?? "https://valentin-liegrois-com.pages.dev/";

const browser = await chromium.launch();
const ctx = await browser.newContext(devices["iPhone 13"]);
const page = await ctx.newPage();
const errors = [];
const requestFails = [];
page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("requestfailed", (r) =>
  requestFails.push(`${r.url()}: ${r.failure()?.errorText}`)
);

await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
await page.waitForTimeout(3500);

const info = await page.evaluate(() => {
  const v = document.querySelector("video");
  return {
    hasVideo: !!v,
    videoSrc: v?.src,
    videoCurrentSrc: v?.currentSrc,
    videoDuration: v?.duration,
    videoReadyState: v?.readyState,
    videoNetworkState: v?.networkState,
    videoError: v?.error
      ? { code: v.error.code, message: v.error.message }
      : null,
    videoPaused: v?.paused,
    poster: v?.poster,
    crossOrigin: v?.crossOrigin,
  };
});

await page.screenshot({ path: "/tmp/live-mobile.png" });

await browser.close();
console.log(JSON.stringify({ info, errors, requestFails }, null, 2));
