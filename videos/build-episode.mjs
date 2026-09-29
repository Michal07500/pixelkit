// Builds a narrated, animated video from an episode script.
//
//   node videos/build-episode.mjs videos/episodes/course/m03-scripting.mjs [--out file.mp4] [--stills 2,10,30] [--workers 3]
//
// Pipeline: narration (Kokoro TTS, videos/tts/tts.py) → timeline + captions → audio mix with
// generated music and SFX (videos/tts/mix.py) → frame-by-frame render of videos/engine/episode.html
// (Playwright) → H.264/AAC MP4 (ffmpeg).
//
// Env: PYTHON (default python3), FFMPEG (default ffmpeg), KOKORO_DIR (TTS model folder).

import { spawn, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import { cpus } from "node:os";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";

const HERE = dirname(fileURLToPath(import.meta.url));
const PYTHON = process.env.PYTHON || "python3";
const FFMPEG = process.env.FFMPEG || "ffmpeg";
const FPS = 30;

const args = process.argv.slice(2);
const flag = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };
const input = args.find((a) => a.endsWith(".mjs"));
if (!input) { console.error("Usage: node videos/build-episode.mjs <episode.mjs> [--out file.mp4] [--stills 1,5] [--workers N]"); process.exit(1); }

const ep = (await import(pathToFileURL(resolve(input)).href)).default;
const id = ep.id || basename(input, ".mjs");
const format = ep.format || "landscape";
const [W, H] = format === "portrait" ? [1080, 1920] : [1920, 1080];
const out = resolve(flag("--out") || join(HERE, "out", `${id}.mp4`));
const work = join(HERE, ".work", id);
mkdirSync(work, { recursive: true });
mkdirSync(dirname(out), { recursive: true });

const log = (...m) => console.log(`[${id}]`, ...m);
const run = (cmd, argv, opts = {}) => {
  const r = spawnSync(cmd, argv, { encoding: "utf8", maxBuffer: 1 << 28, ...opts });
  if (r.status !== 0) throw new Error(`${cmd} failed:\n${r.stderr || r.error}`);
  return r.stdout;
};

// ---------------------------------------------------------------- 1. narration
const voice = ep.voice || "af_heart";
const speed = ep.speed || 1.0;
const segs = ep.segments.map((s) => ({ ...s, beats: Array.isArray(s.say) ? s.say : s.say ? [s.say] : [] }));
const spoken = (text) => text.replace(/\*/g, "");
const jobs = [];
segs.forEach((s, i) => s.beats.forEach((b, k) => jobs.push({ id: `s${i}_b${k}`, text: spoken(b), voice, speed })));
writeFileSync(join(work, "jobs.json"), JSON.stringify(jobs));
log(`narration: ${jobs.length} lines`);
const voiceInfo = JSON.parse(run(PYTHON, [join(HERE, "tts", "tts.py"), join(work, "jobs.json"), join(HERE, ".work", "_voice")], { stdio: ["ignore", "pipe", "inherit"] }));

// ---------------------------------------------------------------- 2. timeline
const ADHD = ep.style === "adhd";
const ENERGY = !!ep.energy || ADHD;
// Must match the tempos in videos/tts/mix.py (beat pulse in the engine follows the music)
const MUSIC_META = { calm: { bpm: 86, intro: 0 }, hype: { bpm: 124, intro: 4 * 60 / 124 }, phonk: { bpm: 130, intro: 4 * 60 / 130 } };
const LEAD = ADHD ? { title: 0.6, cta: 0.45, punch: 0.12 } : ENERGY ? { title: 0.9, cta: 0.6, punch: 0.22 } : { title: 1.3, cta: 0.9 };
const GAP = ADHD ? 0.08 : ENERGY ? 0.16 : 0.32;
const hits = [];
let cursor = 0.4;
const clips = [];
const events = [];
const segments = segs.map((s, i) => {
  const start = cursor;
  let tBeat = start + (LEAD[s.scene.type] ?? (ENERGY ? 0.32 : 0.55));
  const beats = s.beats.map((text, k) => {
    const v = voiceInfo[`s${i}_b${k}`];
    const b = { start: tBeat, end: tBeat + v.duration, text: spoken(text) };
    clips.push({ file: v.file, start: tBeat });
    tBeat = b.end + GAP;
    return b;
  });
  const lastEnd = beats.length ? beats[beats.length - 1].end : start + 2;
  const isLast = i === segs.length - 1;
  const end = lastEnd + (s.hold || 0) + (isLast ? 2.4 : ADHD ? 0.15 : ENERGY ? 0.3 : 0.6);
  cursor = end;

  // Sound design
  const type = s.scene.type;
  if (type === "title" || type === "cta" || type === "punch") {
    if (i > 0 && type !== "punch") events.push({ t: Math.max(0, start - 0.9), kind: "riser", gain: 0.8 });
    events.push({ t: start + 0.03, kind: "impact", gain: type === "punch" ? 1 : type === "title" ? 1 : 0.8 });
    if (ADHD && type === "punch") events.push({ t: start + 0.03, kind: "boom", gain: 0.9 });
    if (ENERGY) hits.push(start + 0.03);
  } else events.push({ t: Math.max(0, start - 0.12), kind: "whoosh", gain: ENERGY ? 0.7 : 0.55 });
  if (ADHD) beats.forEach((b, k) => { if (k > 0) events.push({ t: b.start - 0.05, kind: "swoosh", gain: 0.4 }); });
  if (s.scene.sticker) events.push({ t: (beats[s.scene.stickerBeat || 0]?.start ?? start) + 0.1, kind: "pop", gain: 1 });
  if (type === "notify") beats.forEach((b, k) => { if (k >= (s.scene.headingBeat ? 1 : 0)) events.push({ t: b.start, kind: "ding", gain: 0.9 }); });
  const perBeat = { bullets: "pop", flow: "pop", stats: "pop", checklist: "tick" }[type];
  if (perBeat) beats.forEach((b, k) => { if (k > 0 || type === "checklist") events.push({ t: b.start, kind: perBeat, gain: 0.8 }); });
  if (type === "compare" && beats[1]) events.push({ t: beats[1].start, kind: "pop" });
  if (type === "grid") (s.scene.tiles || []).forEach((_, k) => events.push({ t: start + 0.35 + k * 0.12, kind: "pop", gain: 0.5 }));

  return { start, end, scene: s.scene, beats };
});
const duration = cursor;

// Captions: split each beat into short chunks, time words by character position
const MAXW = ADHD ? (format === "portrait" ? 2 : 3) : format === "portrait" ? 5 : 8;
const HOT = new Set("paid money free robux you your game games millions never epic first sale live earn earns forever today broken ruined lava hacker exploiter why how build built ship shipped players".split(" "));
const captions = [];
for (const seg of segments) for (const b of seg.beats) {
  const words = b.text.split(/\s+/).filter(Boolean);
  const chunks = [];
  let cur = [];
  for (const w of words) {
    cur.push(w);
    if (cur.length >= MAXW || (/[.,!?;:]$/.test(w) && cur.length >= Math.ceil(MAXW / 2))) { chunks.push(cur); cur = []; }
  }
  if (cur.length) {
    if (cur.length <= 2 && chunks.length) chunks[chunks.length - 1].push(...cur); else chunks.push(cur);
  }
  const total = words.join(" ").length;
  let pos = 0;
  const dur = b.end - b.start;
  for (const c of chunks) {
    const text = c.join(" ");
    const cs = b.start + (pos / total) * dur;
    const ce = b.start + ((pos + text.length) / total) * dur;
    let wpos = 0;
    const ws = c.map((w) => { const wt = cs + (wpos / text.length) * (ce - cs); wpos += w.length + 1; const bare = w.toLowerCase().replace(/[^a-z0-9$]/g, ""); return { w, t: wt, hot: HOT.has(bare) || /\d|\$|!$/.test(w) }; });
    captions.push({ start: cs, end: ce, text, words: ws });
    pos += text.length + 1;
  }
}

// ---------------------------------------------------------------- 3. audio mix
const mixSpec = { duration, fps: FPS, clips, events, music: { style: ep.music || "calm", gain_db: ep.musicDb ?? -20 }, out: join(work, "mix.wav"), envelope_out: join(work, "mouth.json"), out_nomusic: ENERGY ? join(work, "mix-nomusic.wav") : undefined };
writeFileSync(join(work, "timeline.json"), JSON.stringify(mixSpec));
log(`audio mix (${duration.toFixed(1)} s)`);
run(PYTHON, [join(HERE, "tts", "mix.py"), join(work, "timeline.json")]);
const mouth = JSON.parse(readFileSync(join(work, "mouth.json"), "utf8"));

// AI b-roll: scenes with { broll: "slug" } use videos/ai/<slug>.mp4 (from npm run hf:generate) if it exists.
// Frames are extracted as JPEGs (headless Chromium can't decode H.264), cropped to fill the frame.
for (const seg of segments) {
  const slug = seg.scene.broll;
  if (!slug) continue;
  const src = join(HERE, "ai", `${slug}.mp4`);
  if (!existsSync(src)) { log(`b-roll "${slug}" not found in videos/ai/, skipping`); continue; }
  const dir = join(work, "broll", slug);
  if (!existsSync(join(dir, "0001.jpg"))) {
    mkdirSync(dir, { recursive: true });
    run(FFMPEG, ["-y", "-loglevel", "error", "-i", src, "-vf", `fps=${FPS},scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H}`, "-q:v", "4", join(dir, "%04d.jpg")]);
  }
  const frames = readdirSync(dir).filter((f) => f.endsWith(".jpg")).length;
  seg.scene._broll = { dir: pathToFileURL(dir).href, frames };
}

const EPISODE = { format, badge: ep.badge || "", energy: ENERGY, adhd: ADHD, music: MUSIC_META[ep.music || "calm"], hits, segments, captions, mouth, fps: FPS, duration };
writeFileSync(join(work, "episode.json"), JSON.stringify(EPISODE));

// ---------------------------------------------------------------- 4. render
const engineUrl = pathToFileURL(join(HERE, "engine", "episode.html")).href;
const browser = await chromium.launch();
async function openPage() {
  const ctx = await browser.newContext({ viewport: { width: W, height: H } });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => console.error(`[${id}] page error:`, e.message));
  await page.addInitScript((data) => { window.EPISODE = data; }, EPISODE);
  await page.goto(engineUrl, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  return page;
}

const stills = flag("--stills");
if (stills) {
  const page = await openPage();
  for (const s of stills.split(",").map(Number)) {
    await page.evaluate((t) => window.renderFrame(t), s);
    await page.screenshot({ path: join(dirname(out), `${id}-still-${s}.jpg`), type: "jpeg", quality: 85 });
  }
  await browser.close();
  log("stills written");
  process.exit(0);
}

const frames = Math.ceil(duration * FPS);
const workers = Math.max(1, Math.min(Number(flag("--workers") || Math.max(1, cpus().length - 1)), 6));
const per = Math.ceil(frames / workers);
let done = 0;
const t0 = Date.now();

async function renderRange(w) {
  const from = w * per, to = Math.min(frames, from + per);
  if (from >= to) return null;
  const file = join(work, `part${w}.mp4`);
  const page = await openPage();
  const ff = spawn(FFMPEG, ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(FPS), "-i", "-",
    "-c:v", "libx264", "-preset", "medium", "-crf", "22", "-tune", "animation", "-pix_fmt", "yuv420p", "-r", String(FPS), file], { stdio: ["pipe", "inherit", "inherit"] });
  for (let f = from; f < to; f++) {
    await page.evaluate((t) => window.renderFrame(t), f / FPS);
    const buf = await page.screenshot({ type: "jpeg", quality: 92 });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r));
    done++;
    if (done % (FPS * 5) === 0) {
      const rate = done / ((Date.now() - t0) / 1000);
      log(`frames ${done}/${frames} (${rate.toFixed(1)} fps, ~${Math.round((frames - done) / rate)} s left)`);
    }
  }
  ff.stdin.end();
  await new Promise((res, rej) => ff.on("close", (c) => (c === 0 ? res() : rej(new Error("ffmpeg part failed")))));
  await page.context().close();
  return file;
}

log(`rendering ${frames} frames with ${workers} workers`);
const parts = (await Promise.all(Array.from({ length: workers }, (_, w) => renderRange(w)))).filter(Boolean);
await browser.close();

writeFileSync(join(work, "parts.txt"), parts.map((f) => `file '${f}'`).join("\n"));
run(FFMPEG, ["-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", join(work, "parts.txt"), "-i", join(work, "mix.wav"),
  "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart", out]);
if (ENERGY) {
  // Second copy with voice + SFX only: add licensed trending audio inside Instagram/TikTok
  const dry = out.replace(/\.mp4$/, "-nomusic.mp4");
  run(FFMPEG, ["-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", join(work, "parts.txt"), "-i", join(work, "mix-nomusic.wav"),
    "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart", dry]);
}
parts.forEach((f) => rmSync(f, { force: true }));
log(`done → ${out} (${duration.toFixed(1)} s, ${((Date.now() - t0) / 1000).toFixed(0)} s render)`);
