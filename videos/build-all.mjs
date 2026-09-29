// Builds every episode (course + Instagram week + 16:9 trailer), one after another.
//
//   node videos/build-all.mjs            all episodes
//   node videos/build-all.mjs ads        only files whose path contains "ads"
//   node videos/build-all.mjs --skip-existing
//
// Each episode is rendered with build-episode.mjs (see that file for requirements).

import { spawnSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const filter = args.find((a) => !a.startsWith("--"));
const skipExisting = args.includes("--skip-existing");

const files = ["course", "ads"].flatMap((dir) =>
  readdirSync(join(HERE, "episodes", dir)).filter((f) => f.endsWith(".mjs")).sort().map((f) => join(HERE, "episodes", dir, f)));

for (const file of files) {
  if (filter && !file.includes(filter)) continue;
  const { default: ep } = await import(pathToFileURL(file).href);
  if (skipExisting && existsSync(join(HERE, "out", `${ep.id}.mp4`))) { console.log(`skip ${ep.id}`); continue; }
  const r = spawnSync(process.execPath, [join(HERE, "build-episode.mjs"), file], { stdio: "inherit" });
  if (r.status !== 0) { console.error(`Failed: ${file}`); process.exit(1); }
}
