// Usage: node screenshot.mjs <url> [label] [--viewport=WxH] [--full] [--dark] [--wait=ms]
// Saves to ./temporary screenshots/screenshot-N[-label].png (auto-incremented).
import puppeteer from 'puppeteer';
import { mkdir, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const args = process.argv.slice(2);
const url = args.find((a) => !a.startsWith('--')) || 'http://localhost:3000';
const label = args.filter((a) => !a.startsWith('--'))[1];

const viewportArg = args.find((a) => a.startsWith('--viewport='));
const [w, h] = viewportArg ? viewportArg.split('=')[1].split('x').map(Number) : [1440, 900];
const fullPage = args.includes('--full');
const dark = args.includes('--dark');
const waitArg = args.find((a) => a.startsWith('--wait='));
const extraWait = waitArg ? Number(waitArg.split('=')[1]) : 600;

const OUT_DIR = join(process.cwd(), 'temporary screenshots');
await mkdir(OUT_DIR, { recursive: true });

const existing = await readdir(OUT_DIR);
const nums = existing
  .map((f) => f.match(/^screenshot-(\d+)/))
  .filter(Boolean)
  .map((m) => Number(m[1]));
const next = nums.length ? Math.max(...nums) + 1 : 1;
const outFile = join(OUT_DIR, `screenshot-${next}${label ? `-${label}` : ''}.png`);

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
if (dark) {
  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);
}
await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise((r) => setTimeout(r, extraWait));
await page.screenshot({ path: outFile, fullPage });
await browser.close();
console.log(outFile);
