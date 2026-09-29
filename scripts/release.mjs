// Prepares everything for launch after the PDFs and videos are built.
//
//   node scripts/release.mjs
//
// 1. site/free/   ← free lesson PDF + narrated video (downloaded after email signup)
// 2. site/media/  ← the hero reel (9:16) + poster frame for the landing page
// 3. dist/PIXEL-KIT-Core-Course-Part-1.zip + Part-2.zip ← what buyers download (upload both as product files)
// 4. dist/PIXEL-KIT-<Name>-Pack.zip  ← one ZIP per Genre Pack (PDF + narrated videos)
//
// Env: FFMPEG (default ffmpeg) for the poster frame.

import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import AdmZip from "adm-zip";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const p = (...s) => join(ROOT, ...s);
const FFMPEG = process.env.FFMPEG || "ffmpeg";
const mb = (f) => (statSync(f).size / 1e6).toFixed(1) + " MB";

function need(file) {
  if (!existsSync(file)) {
    console.error(`Missing ${file.replace(ROOT + "/", "")}. Build it first (npm run build:pdf / npm run build:videos).`);
    process.exit(1);
  }
  return file;
}

function copy(from, to) {
  mkdirSync(dirname(to), { recursive: true });
  copyFileSync(need(from), to);
  console.log(`${to.replace(ROOT + "/", "")}  (${mb(to)})`);
}

// 1. Free lesson for subscribers
copy(p("course/pdf/00-free-lesson-intro-screen.pdf"), p("site/free/pixelkit-free-lesson.pdf"));
copy(p("videos/out/course-m00-free-lesson-intro-screen.mp4"), p("site/free/pixelkit-free-lesson.mp4"));

// 2. Autoplaying reel in the hero phone
copy(p("videos/out/ig-day1-trailer.mp4"), p("site/media/reel.mp4"));
const poster = spawnSync(FFMPEG, ["-y", "-loglevel", "error", "-ss", "6.4", "-i", p("site/media/reel.mp4"), "-frames:v", "1", "-vf", "scale=540:-1", "-q:v", "4", p("site/media/reel-poster.jpg")]);
if (poster.status === 0) console.log("site/media/reel-poster.jpg");
else console.warn("Could not extract the poster frame (is ffmpeg installed?). The video still works without it.");

// 3. The paid course download, in two parts so each file stays under 100 MB
//    (GitHub's file limit, and quick to upload to Lemon Squeezy).
const pdfs = readdirSync(p("course/pdf")).filter((f) => f.endsWith(".pdf") && !f.startsWith("pack-")).sort();
const videos = readdirSync(p("videos/out")).filter((f) => /^course-m\d\d-.*\.mp4$/.test(f)).sort();
if (videos.length < 10) console.warn(`Only ${videos.length}/10 course videos found in videos/out.`);
const startHere = Buffer.from(
`PIXEL KIT: Learn Roblox Studio. Ship real games.

Your course comes in two downloads:
  Part 1: all PDFs + videos for modules 00-03
  Part 2: videos for modules 04-09
Unzip both into the same folder.

How to use this course
1. Open Videos/m01-getting-started.mp4 and watch it.
2. Open PDF/01-getting-started.pdf next to Roblox Studio and follow along.
3. Do every "Try it" exercise before moving on.
4. Repeat for modules 02 to 09. By the end, Coin Rush is live on Roblox.

PDF/pixelkit-full-course.pdf contains every module in one file.
PDF/bonus-*.pdf are your bonuses: Luau Cheat Sheet, Game Launch Checklist, 30 Game Ideas, Coin Rush Build Map.

Questions or problems? Reply to your receipt email.
PIXEL KIT is not affiliated with Roblox Corporation.
`);
mkdirSync(p("dist"), { recursive: true });
const parts = [
  { file: "PIXEL-KIT-Core-Course-Part-1.zip", pdfs: true, videos: videos.filter((f) => /^course-m0[0-3]-/.test(f)) },
  { file: "PIXEL-KIT-Core-Course-Part-2.zip", pdfs: false, videos: videos.filter((f) => !/^course-m0[0-3]-/.test(f)) },
];
for (const part of parts) {
  const zip = new AdmZip();
  if (part.pdfs) for (const f of pdfs) zip.addLocalFile(p("course/pdf", f), "PDF");
  for (const f of part.videos) zip.addLocalFile(p("videos/out", f), "Videos", f.replace(/^course-/, ""));
  zip.addFile("START HERE.txt", startHere);
  const out = p("dist", part.file);
  zip.writeZip(out);
  console.log(`dist/${part.file}  (${mb(out)}, ${part.pdfs ? pdfs.length : 0} PDFs, ${part.videos.length} videos)`);
}

// 4. Genre Packs
const PACKS = {
  horror: { name: "Horror", game: "Night Shift", first: "h1-atmosphere" },
  tycoon: { name: "Tycoon", game: "Pizza Tycoon", first: "t1-foundation" },
};
for (const [slug, pack] of Object.entries(PACKS)) {
  const pdf = p("course/pdf", `pack-${slug}.pdf`);
  if (!existsSync(pdf)) { console.warn(`Skipping ${pack.name} Pack: build the PDF first (npm run build:pdf).`); continue; }
  const packZip = new AdmZip();
  packZip.addLocalFile(pdf, "", `PIXEL-KIT-${pack.name}-Pack.pdf`);
  const clips = readdirSync(p("videos/out")).filter((f) => f.startsWith(`pack-${slug}-`) && f.endsWith(".mp4")).sort();
  if (clips.length < 5) console.warn(`${pack.name} Pack: only ${clips.length}/5 videos found in videos/out.`);
  for (const f of clips) packZip.addLocalFile(p("videos/out", f), "Videos", f.replace(`pack-${slug}-`, ""));
  packZip.addFile("START HERE.txt", Buffer.from(
`PIXEL KIT · ${pack.name} Pack

You'll build ${pack.game}, lesson by lesson.

1. Open Videos/${pack.first}.mp4 and watch it.
2. Open PIXEL-KIT-${pack.name}-Pack.pdf next to Roblox Studio and follow the same lesson.
3. Every script starts with a comment saying exactly where it goes.
4. Do the "Try it" steps before moving on, then continue with the next video.

Questions or problems? Reply to your receipt email.
PIXEL KIT is not affiliated with Roblox Corporation.
`));
  const packOut = p("dist", `PIXEL-KIT-${pack.name}-Pack.zip`);
  packZip.writeZip(packOut);
  console.log(`dist/PIXEL-KIT-${pack.name}-Pack.zip  (${mb(packOut)}, ${clips.length} videos)`);
}
