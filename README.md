# PIXEL KIT

Learn Roblox Studio. Ship real games.

A project-based Roblox Studio course (ages 17–25) with genre-specific add-on packs. This repo holds everything for the launch: the website, the free lead-magnet lesson, promo videos and the business plan.

## What's inside

| Path | What it is |
|---|---|
| [`site/`](site/) | The public website: landing page (`index.html`) and privacy policy. No build step. |
| [`course/`](course/) | Course content. Starts with the free lesson: a studio-grade intro screen. |
| [`videos/`](videos/) | Animated promo + lesson explainer videos (`out/`), their HTML sources (`src/`), the renderer and video scripts. |
| [`PLAN.md`](PLAN.md) | Launch plan: offer, pricing, validation, tools, marketing, numbers, legal checklist. |
| [`netlify.toml`](netlify.toml) | Tells Netlify to publish only `site/`. |

## Deploy the website

**Netlify (recommended, free):**
1. Go to [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project** → GitHub → pick `pixelkit`.
2. Leave the build command empty. `netlify.toml` already sets the publish folder to `site`.
3. Deploy. Every push to `main` redeploys automatically.

Before going live, fill in:
- `site/index.html` → `CONFIG` block near the bottom: `FORM_ENDPOINT` (e.g. Formspree) and the three `CHECKOUT` links (Lemon Squeezy / Gumroad).
- `site/privacy.html` → everything in `[BRACKETS]`.

## Re-render the videos

```bash
cd videos
npm i playwright
node render.mjs src/promo-vertical.html out/promo-vertical.mp4
node render.mjs src/lesson-explainers.html out/lesson-explainers.mp4
```

Needs `ffmpeg` with libx264 on your PATH. Preview any scene live by opening it in Chrome with `?play` at the end of the URL.

---

PIXEL KIT is not affiliated with, endorsed by, or sponsored by Roblox Corporation.
