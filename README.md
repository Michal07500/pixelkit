# PIXEL KIT

Learn Roblox Studio. Ship real games.

A project-based Roblox Studio course (ages 17–25) with genre-specific add-on packs. This repo holds the whole business: website with payments, the course (PDFs + narrated videos), a week of Instagram ads, and the tooling that generates all of it.

**🇸🇰 Krok za krokom, ako to spustiť: [SPUSTENIE.md](SPUSTENIE.md)**

## What's inside

| Path | What it is |
|---|---|
| [`site/`](site/) | Landing page with Lemon Squeezy checkout, `thanks.html`, `privacy.html`, free lesson (`free/`) and trailer (`media/`). No build step. |
| [`course/modules/`](course/modules/) | The full course: 9 modules, 43 lessons, Luau code and exercises (Markdown). |
| [`course/pdf/`](course/pdf/) | Designed PDFs: one per module, the free lesson, and the complete course. |
| [`videos/out/`](videos/out/) | Rendered MP4s: 10 narrated course videos, 7 Instagram Reels, a 16:9 trailer. |
| [`videos/episodes/`](videos/episodes/) | The script of every video: narration + scenes. |
| [`videos/engine/`](videos/engine/) | The animation engine (scenes, captions, mascot). |
| [`social/`](social/) | Instagram launch week: schedule, captions, hashtags, carousels. |
| [`assets/`](assets/) | Brand images and fonts (OFL). |
| [`index.ts`](index.ts), [`scripts/hf-generate.ts`](scripts/hf-generate.ts) | Higgsfield SDK: Seedance 2.5 test and AI b-roll generation. |
| [`PLAN.md`](PLAN.md) | Business plan: pricing, validation, marketing, numbers, legal. |

## Commands

```bash
npm install
npx playwright install chromium

npm run build:pdf        # course/modules/*.md → course/pdf/*.pdf
npm run build:videos     # every episode → videos/out/*.mp4 (skips existing)
npm run build:video -- videos/episodes/ads/day4-lava.mjs   # one video
npm run build:carousels  # Instagram carousels → social/carousels/
npm run release          # course ZIP for buyers + free lesson and trailer into site/

npm run seedance         # Higgsfield Seedance 2.5 test (billable)
npm run hf:plan          # list planned AI clips (free)
npm run hf:generate      # generate them (billable) → videos/ai/
```

Video builds also need Python 3 with `videos/tts/requirements.txt`, the Kokoro voice model (`bash videos/tts/download-models.sh`) and ffmpeg. Higgsfield needs `HF_CREDENTIALS=key-id:key-secret` in `.env.local` (git-ignored).

## How the videos are made

Each episode in `videos/episodes/` is a list of scenes with the narrator's lines. `videos/build-episode.mjs`:

1. voices every line with the Kokoro neural TTS (`videos/tts/tts.py`),
2. builds a timeline where each bullet, code step or diagram node appears exactly when the narrator reaches it, plus word-by-word captions,
3. mixes narration with a generated, royalty-free music bed (ducked under the voice) and transition sound effects (`videos/tts/mix.py`),
4. renders every frame of `videos/engine/episode.html` in headless Chromium, with the mascot's mouth driven by the voice,
5. encodes H.264 + AAC MP4.

## Deploy

Netlify → Import from GitHub → this repo. `netlify.toml` publishes only `site/`. See [SPUSTENIE.md](SPUSTENIE.md) for forms, payments and Instagram.

---

PIXEL KIT is not affiliated with, endorsed by, or sponsored by Roblox Corporation.
