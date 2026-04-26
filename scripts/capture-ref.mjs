import { chromium } from "playwright";

const ref = "https://skeleton-rebuild.preview.emergentagent.com";

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 800 },
});
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));

await page.goto(ref, { waitUntil: "domcontentloaded", timeout: 30000 });
await page.waitForTimeout(5000); // let any reform animation finish

await page.screenshot({ path: "/tmp/ref-top.png" });

// Hover the center of the portrait area
await page.mouse.move(640, 360);
await page.waitForTimeout(700);
await page.screenshot({ path: "/tmp/ref-hover.png" });

// Move pointer off
await page.mouse.move(10, 10);
await page.waitForTimeout(700);

// Scroll a bit
await page.evaluate(() => window.scrollTo(0, window.innerHeight * 0.35));
await page.waitForTimeout(400);
await page.screenshot({ path: "/tmp/ref-scroll-35.png" });

await page.evaluate(() => window.scrollTo(0, window.innerHeight * 0.85));
await page.waitForTimeout(400);
await page.screenshot({ path: "/tmp/ref-scroll-85.png" });

await ctx.close();
await browser.close();
console.log("ref errors:", errors);
console.log("done");
