// Renders an animated HTML scene to MP4, frame by frame.
//
// Usage:  node render.mjs src/promo-vertical.html out/promo-vertical.mp4
// Needs:  playwright (npm i playwright) and ffmpeg with libx264 on PATH (or set FFMPEG=/path/to/ffmpeg)
//
// Each scene declares its size, fps and duration in <meta name="video"> and exposes
// window.renderFrame(t), which draws the frame at time t (seconds). Rendering is
// deterministic, so every frame is exact regardless of machine speed.

import { spawn, execSync } from "node:child_process";
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
function loadPlaywright() {
  try { return require("playwright"); } catch {}
  const globalRoot = execSync("npm root -g").toString().trim();
  return require(`${globalRoot}/playwright`);
}

const [input, output] = process.argv.slice(2);
if (!input || !output) {
  console.error("Usage: node render.mjs <scene.html> <out.mp4>");
  process.exit(1);
}

const { chromium } = loadPlaywright();
const browser = await chromium.launch();
const page = await browser.newPage({ ignoreHTTPSErrors: true });
await page.goto(pathToFileURL(resolve(input)).href, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);

const meta = await page.evaluate(() => JSON.parse(document.querySelector('meta[name="video"]').content));
const { width, height, fps, duration } = meta;
await page.setViewportSize({ width, height });

mkdirSync(dirname(resolve(output)), { recursive: true });
const ffmpeg = spawn(process.env.FFMPEG || "ffmpeg", [
  "-y", "-loglevel", "error",
  "-f", "image2pipe", "-framerate", String(fps), "-i", "-",
  "-c:v", "libx264", "-preset", "slow", "-crf", "17", "-pix_fmt", "yuv420p",
  "-movflags", "+faststart", output,
], { stdio: ["pipe", "inherit", "inherit"] });

const frames = Math.round(duration * fps);
for (let i = 0; i < frames; i++) {
  await page.evaluate(t => window.renderFrame(t), i / fps);
  const buf = await page.screenshot({ type: "png" });
  if (!ffmpeg.stdin.write(buf)) await new Promise(r => ffmpeg.stdin.once("drain", r));
  if (i % fps === 0) process.stdout.write(`\r${output}: ${Math.round(i / frames * 100)}%`);
}
ffmpeg.stdin.end();
await new Promise((res, rej) => ffmpeg.on("close", code => (code === 0 ? res() : rej(new Error(`ffmpeg exited ${code}`)))));
await browser.close();
console.log(`\r${output}: done (${frames} frames, ${width}x${height} @ ${fps}fps)`);
