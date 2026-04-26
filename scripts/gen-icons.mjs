import sharp from "sharp";
import fs from "fs";
import path from "path";

const root = path.resolve(import.meta.dirname, "..");
const svgPath = path.join(root, "src/app/icon.svg");
const svg = fs.readFileSync(svgPath);

// Apple touch icon — iOS Home Screen, 180x180.
await sharp(svg, { density: 600 })
  .resize(180, 180)
  .png()
  .toFile(path.join(root, "src/app/apple-icon.png"));

// Modern browsers favicon PNG (used as fallback when SVG isn't supported).
await sharp(svg, { density: 600 })
  .resize(32, 32)
  .png()
  .toFile(path.join(root, "src/app/icon.png"));

console.log("icons generated:");
console.log("  src/app/apple-icon.png  (180x180)");
console.log("  src/app/icon.png        (32x32)");
console.log("  src/app/icon.svg        (vector)");
