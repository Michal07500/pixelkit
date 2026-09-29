// Generates AI b-roll clips for the Instagram ads with Higgsfield Seedance 2.5 (text-to-video, 9:16).
//
//   npm run hf:plan               show what would be generated (free, no API calls)
//   npm run hf:generate           actually generate (billable) → videos/ai/*.mp4
//   npm run hf:generate -- --only lava-run,coin-burst
//
// Needs HF_CREDENTIALS="key-id:key-secret" in .env.local. Stops at the first credit/access error.
// Already-downloaded clips are skipped, so re-running only pays for what's missing.

import { config as loadEnv } from "dotenv";
import { createHiggsfieldClient, NotEnoughCreditsError, AuthenticationError, TimeoutError, APIError } from "@higgsfield/client/v2";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

loadEnv({ path: ".env.local", quiet: true });

const MODEL = "bytedance/seedance-2.5/text-to-video";
const OUT = join("videos", "ai");
const STYLE = "stylized blocky low-poly 3D game look, vibrant colors, cinematic lighting, smooth camera motion";

const CLIPS: { slug: string; use: string; prompt: string }[] = [
  { slug: "lava-run", use: "Day 1 / Day 4 hook", prompt: `A blocky game character sprints across floating stone platforms above a glowing orange lava lake, grabbing spinning gold coins, sunset sky, camera follows from behind, ${STYLE}` },
  { slug: "logo-build", use: "Intro sting", prompt: "A glowing lime-green pixel logo assembles from hundreds of tiny cubes on a pure black background, sparks and particles, slow push-in, clean 3D render" },
  { slug: "dev-desk", use: "Day 1 / Day 6 'you could build this'", prompt: "A young game developer at a desk at night, monitor showing a 3D game editor, lime and pink RGB lighting, over-the-shoulder shot, shallow depth of field, cinematic" },
  { slug: "heist-lasers", use: "Heist Pack teaser", prompt: `Blocky characters sneak past a red laser grid inside a bank vault full of gold, neon lighting, dramatic slow push-in, ${STYLE}` },
  { slug: "tycoon-factory", use: "Tycoon Pack teaser", prompt: `A colorful blocky tycoon factory with conveyor belts carrying glowing ore, droppers and upgrade buttons, isometric camera slowly orbiting, ${STYLE}` },
  { slug: "horror-hall", use: "Horror Pack teaser", prompt: `A dark blocky hallway lit only by a flashlight beam, thick fog, a tall blocky monster silhouette at the far end, slow creeping camera, ${STYLE}` },
  { slug: "tower-defense", use: "Tower Defense Pack teaser", prompt: `Blocky towers fire colorful projectiles at a wave of blocky enemies marching along a winding path, top-down cinematic sweep, ${STYLE}` },
  { slug: "coin-burst", use: "Day 5 / CTA ending", prompt: "An explosion of shiny gold coins and lime confetti in slow motion against a dark background, celebratory, glossy 3D render" },
];

const args = process.argv.slice(2);
const execute = args.includes("--yes");
const onlyArg = args[args.indexOf("--only") + 1];
const only = args.includes("--only") && onlyArg ? new Set(onlyArg.split(",")) : null;
const todo = CLIPS.filter((c) => (!only || only.has(c.slug)) && !existsSync(join(OUT, `${c.slug}.mp4`)));

console.log(`${MODEL} · 5 s · 720p · 9:16`);
for (const c of todo) console.log(`  • ${c.slug.padEnd(16)} ${c.use}`);
if (!todo.length) { console.log("Nothing to do: all clips already exist in videos/ai/."); process.exit(0); }
if (!execute) {
  console.log(`\n${todo.length} clip(s) would be generated. Each one is a billable request.`);
  console.log("Check the price per generation in your Higgsfield dashboard, then run: npm run hf:generate");
  process.exit(0);
}

const credentials = process.env.HF_CREDENTIALS;
if (!credentials?.includes(":")) { console.error("HF_CREDENTIALS missing in .env.local (format key-id:key-secret)."); process.exit(1); }
const client = createHiggsfieldClient({ credentials, maxPollTime: 15 * 60 * 1000, pollInterval: 5000 });

mkdirSync(OUT, { recursive: true });
const manifestPath = join(OUT, "manifest.json");
const manifest: Record<string, unknown> = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")) : {};

for (const clip of todo) {
  console.log(`\n→ ${clip.slug}`);
  try {
    const result = await client.subscribe(MODEL, {
      input: { prompt: clip.prompt, duration: 5, resolution: "720p", aspect_ratio: "9:16" },
      withPolling: true,
    });
    const status = String(result.status);
    if (status !== "completed" || !result.video?.url) {
      console.error(`  ${clip.slug}: ended as "${status}" (request ${result.request_id}). Not saved.`);
      manifest[clip.slug] = { status, request_id: result.request_id };
      continue;
    }
    const res = await fetch(result.video.url);
    if (!res.ok) throw new Error(`download failed (${res.status})`);
    writeFileSync(join(OUT, `${clip.slug}.mp4`), Buffer.from(await res.arrayBuffer()));
    manifest[clip.slug] = { status, request_id: result.request_id, prompt: clip.prompt };
    console.log(`  saved videos/ai/${clip.slug}.mp4`);
  } catch (err) {
    if (err instanceof NotEnoughCreditsError) {
      console.error("  HTTP 403: out of credits, key without access, or a firewall blocking api.higgsfield.ai. Stopping.");
      break;
    }
    if (err instanceof AuthenticationError) { console.error("  Invalid HF_CREDENTIALS. Stopping."); break; }
    if (err instanceof TimeoutError) { console.error(`  Timed out waiting: ${err.message}`); continue; }
    if (err instanceof APIError) { console.error(`  API error ${err.statusCode ?? ""}: ${err.message}`); continue; }
    console.error("  Failed:", err instanceof Error ? err.message : err);
  } finally {
    writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  }
}
