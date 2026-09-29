# Module 9 · Launch & Growth

A great game nobody clicks on is invisible. In this final module you'll package Coin Rush so it gets clicked, publish it, read the data to find out where players leave, and build a loop of updates and community that keeps it growing.

**You'll ship:** Coin Rush, live and public.

---

## 9.1 Icon and thumbnails that get clicks

On the Roblox home page, your game is a small square icon and a title. That's all a player sees before deciding. The icon is your most important piece of marketing.

**Icon (512×512):**

- **One clear subject.** A character mid-action grabbing a glowing coin, lava below. Not a screenshot of the whole map.
- **Readable at thumbnail size.** Zoom out to 15% and check it still reads.
- **High contrast, saturated colors.** Warm lava orange vs. cool blue sky stands out in a grid of icons.
- **Little or no text.** Maybe one word. Text becomes unreadable when small.
- **An emotion.** Faces with a strong expression (excitement, panic) get more clicks.

**Thumbnails (1920×1080, up to 10):** these appear on the game page and sometimes in discovery. Show real gameplay moments with a short caption: *"Race for coins!"*, *"Don't touch the lava!"*, *"Upgrade your speed!"*. The first thumbnail matters most.

**How to make them:** pose characters in Studio, use good lighting (Module 2), take high-resolution screenshots, then finish in an image editor with glow, color grading and a bold caption. Keep the style consistent with your icon.

> **Tip:** Make 3 icon variants. Roblox lets you run **thumbnail and icon experiments** in the Creator Hub, so let the data pick the winner.

## 9.2 Title, description and discoverability

**Title:** short, clear, genre-revealing. *Coin Rush* works. You can add a tag for updates, like *Coin Rush [NEW MAP]*, but don't spam emojis and capitals.

**Description:** first two lines matter most (they show without expanding):

```
Race other players to grab the most coins before time runs out,
and don't touch the lava! 🔥🪙

⭐ Level up and unlock Speed and Jump upgrades
⭐ New rounds every 2 minutes
⭐ Play with friends on PC, mobile and console

👍 Like the game for more updates!
```

**Settings that affect discovery** (File → Game Settings, or the Creator Hub):

- **Genre** set correctly.
- **Supported devices**: turn on phone, tablet and console if your UI works there (it does, after Module 4).
- **Maturity/content questionnaire** filled in honestly; it decides who can see your game.
- **Server size**: 8–12 works well for Coin Rush.

**Make it public:** in the Creator Hub, set the experience to **Public**. Play it yourself from a phone and a PC before you tell anyone.

## 9.3 Analytics: finding where players drop off

Roblox gives you detailed analytics in the **Creator Hub → your experience → Analytics**. The three numbers that matter most at the start:

| Metric | What it tells you | Healthy early target |
|---|---|---|
| **Day 1 retention** | % of new players who come back the next day | 10%+ is a good start |
| **Average session time** | How long a visit lasts | 8+ minutes for a round game |
| **Payer conversion** | % of players who buy anything | 1–3% |

Also check the **Funnel** style data: how many players leave in the first minute. If lots of players quit in the first 60 seconds, your intro, lobby or first round is confusing or slow.

**Custom events** show exactly where players go. From the server:

```lua
local AnalyticsService = game:GetService("AnalyticsService")

-- Log each step of a new player's first session
AnalyticsService:LogOnboardingFunnelStepEvent(player, 1, "Joined")
AnalyticsService:LogOnboardingFunnelStepEvent(player, 2, "Pressed Play")
AnalyticsService:LogOnboardingFunnelStepEvent(player, 3, "Finished First Round")
AnalyticsService:LogOnboardingFunnelStepEvent(player, 4, "Bought First Upgrade")
```

Now you can see the exact step where most people leave, and fix that one first.

> **Tip:** Change one thing at a time and compare a week before vs. a week after. If you change five things at once, you'll never know which one worked.

## 9.4 Updates and building a community

Games grow through updates. A steady rhythm tells the algorithm and your players that the game is alive.

**Update rhythm:** a small update every 1–2 weeks (a new map, a new upgrade, a limited-time event), and a bigger one every month or two. Put the update in the title tag and the description.

**Changelog:** a small in-game "What's new" panel on the menu. Players who see new content stay longer.

**Community:**

- Create a **Roblox Community** (formerly Groups) for your game, and link it on the game page. Members get notified about updates.
- A **Discord server** for fans: bug reports, ideas, sneak peeks.
- **Short videos**: 15–30 s clips of funny lava fails or close finishes on TikTok, YouTube Shorts and Instagram Reels. This is how most small games get their first thousand players.
- Reward your community: codes for free coins announced on Discord, and credits for players whose ideas you add.

**Listen, then decide.** Players are great at telling you *what* feels wrong and often bad at proposing the *fix*. Look for patterns in feedback, then design your own solution.

## 9.5 Running Roblox Ads

Once your analytics look healthy (players stay and come back), paid ads can speed up growth. Before that, ads just buy players who leave.

**Ads Manager** is in the **Creator Hub → Ads**. You can run:

- **Sponsored experiences**: your game shown in discovery spots, paid with an ad budget.
- **Display/portal ads** in other games (depending on current Roblox ad products).

**How to start:**

1. Start small: a modest daily budget for 3–5 days.
2. Use your best-performing icon from the experiments in 9.1.
3. Watch cost per play and, more importantly, **what those players do**: do they stay and come back like organic players?
4. Only scale budgets for ads that bring players who retain.

> **Watch out:** Ads can't fix a game with poor retention. Fix the first 5 minutes first, then pay for traffic.

---

## You did it

Look at what you built: a map, secure scripts, polished UI, saved progression, a full round-based game loop, a store, and a public launch. That's the complete skill set behind almost every successful Roblox game.

**Where to go next:** pick a Genre Pack and take these same systems into an obby, tycoon, simulator, horror, heist or tower defense game. Keep shipping. Every game you finish makes the next one better.

---

## Module recap

- [ ] Icon and at least 3 thumbnails, with an icon experiment running
- [ ] Clear title and a description with a strong first two lines
- [ ] Coin Rush set to Public on all supported devices
- [ ] Onboarding funnel events logged and checked after a week
- [ ] First update planned, community group and Discord created
