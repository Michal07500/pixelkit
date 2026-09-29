# PIXEL KIT: Video Scripts

Ready-made animated clips live in `out/`:

| File | Format | Length | Use |
|---|---|---|---|
| `promo-vertical.mp4` | 1080×1920 (9:16) | 19 s | TikTok, Reels, Shorts, pinned post |
| `lesson-explainers.mp4` | 1920×1080 (16:9) | 42 s | Cut into the free lesson video (see timestamps below) |

Both are silent on purpose, so you can add music or a voiceover in CapCut or DaVinci Resolve. Use royalty-free music (CapCut's commercial library, YouTube Audio Library) so the video doesn't get muted or claimed.

---

## 1. Free lesson video (YouTube, ~8–10 min)

**Title options**
- "Make Your Roblox Game Look Professional in 10 Minutes (Intro Screen)"
- "Every Roblox Game Needs This: Custom Intro Screen Tutorial"

**Thumbnail:** your logo glowing on black on the left, big text "PRO INTRO" on the right, an arrow pointing at it. Keep it to 3 words max.

| Time | On screen | Voiceover |
|---|---|---|
| 0:00 | Your finished intro playing in PIXEL HEIST | "This is what players see when they join my game. In the next ten minutes, you'll have the same thing in yours, even if you've never written a line of code." |
| 0:12 | Split: default Roblox loading screen vs. yours | "Default loading screen. Custom intro. One of these looks like a real studio made it." |
| 0:20 | `promo-vertical.mp4` logo sting (first 2 s), or your face cam | "I'm [name], and this is lesson 4.1 from PIXEL KIT, a free preview of the full course." |
| 0:30 | Studio: Asset Manager | **Step 1.** Upload the logo, copy the asset ID. Mention moderation takes a few minutes. |
| 1:30 | Studio: Explorer → ReplicatedFirst | **Step 2.** Create the LocalScript. Explain in one sentence each why ReplicatedFirst and why a LocalScript. |
| 2:30 | Studio: typing / pasting code | **Step 3.** Walk through the code block by block: ScreenGui, background, logo, aspect ratio, UIScale. Don't read every line; explain what each block *does*. |
| 5:00 | `lesson-explainers.mp4` **0:00–0:03** | "Before we test it, three things that'll make every UI you build better." |
| 5:05 | `lesson-explainers.mp4` **0:03–0:15** | "One: Scale versus Offset. Offset is pixels. It looks fine on your screen, then falls off a phone screen. Scale is a percentage, so it works everywhere." |
| 5:20 | `lesson-explainers.mp4` **0:15–0:27** | "Two: AnchorPoint. By default Roblox positions things by their top-left corner. Set the AnchorPoint to 0.5, 0.5 and you're placing it by its center." |
| 5:35 | `lesson-explainers.mp4` **0:27–0:39** | "Three: TweenService. You tell it what to change, to what value, and how long, and it animates for you. Easing styles change the feel. Back gives you that little pop." |
| 5:50 | Studio: press Play | **Step 4.** Test it. Show it working, then on the mobile emulator (Test → Device). |
| 6:30 | Studio: tweak times, try `Bounce` easing | Challenges: change the timing, add a title under the logo, try another easing style. |
| 7:30 | `lesson-explainers.mp4` **0:39–0:42** end card | "That was one lesson out of 43. In the full course you'll build a complete game, from an empty baseplate to a published game with an in-game store. Link's in the description, and early members get launch pricing." |

**Description template**
```
Add a professional intro screen to your Roblox game in 10 minutes. No experience needed.

Get the free lesson + early-access pricing: [YOUR LINK]

0:00 What we're building
0:30 Upload your logo
1:30 Create the script
2:30 The code, explained
5:00 3 things to remember (Scale, AnchorPoint, TweenService)
5:50 Test on desktop and mobile
6:30 Challenges

PIXEL KIT is not affiliated with Roblox Corporation.
```

---

## 2. Short-form scripts (TikTok / Reels / Shorts)

Film these with OBS (screen) + phone (face) or screen only. Hook in the first 1.5 seconds, text on screen for every line (most people watch muted), 15–35 s each.

**#1 "Default vs. custom"**
- Hook (text): "Your Roblox game's first 2 seconds are losing you players"
- Show the default loading screen → cut to your intro → "made this in 10 min"
- End: "Free tutorial, link in bio"

**#2 "Scale vs. Offset" (use explainer 0:03–0:15, cropped to 9:16)**
- Hook: "Why your Roblox UI breaks on mobile"
- Explainer clip → "Use Scale, not Offset"
- End: "Follow for one Roblox dev tip a day"

**#3 "Build in public"**
- Hook: "Day 1 of building a Roblox heist game"
- 3–4 quick cuts of PIXEL HEIST progress
- End: "Should I teach how I made this?" (drives comments)

**#4 "One line that fixes it"**
- Hook: "This one line makes your UI look pro"
- Show `AnchorPoint = Vector2.new(0.5, 0.5)` before/after
- End: "Full breakdown in bio"

**#5 Promo (use `promo-vertical.mp4` as is)**
- Add trending music, caption: "Learning Roblox Studio this year? Start here."
- Pin it to your profile.

**Posting rhythm:** 1 short a day across TikTok, Shorts and Reels (same file), 1 long YouTube video a week. Reply to comments with video replies; they're free content ideas.

---

## 3. Recording setup

- **OBS Studio** (free): 1920×1080, 60 fps for Studio recordings, bitrate ~12,000 kbps.
- **Studio UI:** zoom Studio's text to make code readable (File → Studio Settings → Script Editor → Font size 18+).
- **Audio:** a $30–50 USB mic beats any camera upgrade. Record in a room with soft furniture.
- **Editing:** CapCut (fastest for shorts) or DaVinci Resolve (free, great for YouTube).

---

## 4. Re-rendering or editing the animations

The clips are HTML scenes in `src/`, rendered frame by frame. To change text, colors or timing, edit the scene and re-render:

```bash
cd pixelkit/videos
npm i playwright            # once
node render.mjs src/promo-vertical.html out/promo-vertical.mp4
node render.mjs src/lesson-explainers.html out/lesson-explainers.mp4
```

Requires `ffmpeg` on your PATH (or set `FFMPEG=/path/to/ffmpeg`). To preview a scene live, open it in Chrome with `?play` at the end of the address, e.g. `file:///.../src/promo-vertical.html?play`.
