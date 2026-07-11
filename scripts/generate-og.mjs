/**
 * Renders scripts/og.html → public/og.png (1200×630) for social previews.
 * Run: node scripts/generate-og.mjs
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const htmlPath = path.join(root, "scripts/og.html");
const outPath = path.join(root, "public/og.png");

await mkdir(path.dirname(outPath), { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  // 1× → exact 1200×630 (Open Graph / Twitter recommended size)
  deviceScaleFactor: 1,
});

await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle" });
// Give web fonts a beat to settle
await page.waitForTimeout(800);
await page.screenshot({ path: outPath, type: "png" });
await browser.close();

console.log(`Wrote ${outPath}`);
