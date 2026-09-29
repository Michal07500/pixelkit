# PIXEL KIT: Launch Plan

A project-based Roblox Studio course for ages 17–25, sold as a one-time purchase, with genre-specific "Genre Packs" as add-ons.

## 1. The offer

| Product | Early access | Regular | What it is |
|---|---|---|---|
| Core Course | $29 | $49 | 9 modules, 43 lessons, one complete shipped game |
| Creator Bundle | $59 | $99 | Core Course + any 3 Genre Packs |
| All Access | $99 | $179 | Everything, including future packs, monthly live Q&A, game feedback |
| Genre Pack (single) | $12–24 | n/a | Obby, Tycoon, Simulator, Horror, Heist, Tower Defense, Pixel UI Kit, Monetization Pro |

**Why this structure:** the Core Course is the entry point. Genre Packs are the upsell, and each new pack is a reason to email the list again. All Access anchors the price so the Bundle looks like the obvious pick.

**Lead magnet:** the free intro-screen lesson (`course/free-lesson-intro-screen.md`). It's quick, visual and makes the game feel professional right away, which is exactly the feeling the paid course sells.

## 2. Validate before you build

Don't record 43 lessons first. Build in this order:

1. **Week 1:** put the landing page live and connect the email form. Record the free lesson as a video.
2. **Weeks 2–4:** post content (see section 4) and drive people to the free lesson.
3. **Decision point:** a list of **300+ emails** is a reasonable signal to continue. With under 100 after a month, change the angle (headline, price, niche) before recording the full course.
4. **Pre-sale:** open early-access checkout to the list. Pre-sales pay for the time spent recording.
5. **Record and release module by module.** Buyers get lessons as they're finished.

## 3. Tools (cheap and fast)

| Need | Recommended | Why |
|---|---|---|
| Website hosting | Netlify, Vercel or GitHub Pages | Free. Connect this GitHub repo; `netlify.toml` publishes `site/` |
| Domain | Any registrar, around $10–15/year | e.g. `pixelkit.gg` or `getpixelkit.com` (check availability) |
| Email list | Formspree to start, then ConvertKit (Kit) or MailerLite | Free tiers are enough to validate |
| Payments and delivery | Lemon Squeezy or Gumroad | Merchant of record, so they handle EU VAT and sales tax for you |
| Course hosting | Teachable, Podia, or unlisted videos + Notion to start | Start simple, move later |
| Community | Discord server | Where this audience already is |
| Recording | OBS (free) + a decent USB mic | Audio quality matters more than video quality |

**Connecting the site:** open `site/index.html`, find the `CONFIG` block near the bottom, and paste in:
- `FORM_ENDPOINT`: your Formspree (or similar) form URL,
- `CHECKOUT.course`, `CHECKOUT.bundle`, `CHECKOUT.all`: your checkout links.

## 4. Getting attention (ages 17–25)

This audience lives on **TikTok, YouTube Shorts, YouTube and Discord**. What works:

- **Short "build in public" clips:** "I made a Roblox horror monster in 60 seconds", before/after of a map, the intro screen in 30 seconds. One clip a day on TikTok + Shorts + Reels, all from the same recording.
- **Longer YouTube tutorials:** free, genuinely useful, each ending with the free lesson link. These keep bringing in people for years.
- **Your own game as proof:** PIXEL HEIST is your portfolio. Show its development, because people buy from creators who actually ship.
- **Communities:** the Roblox Developer Forum, r/robloxgamedev and dev Discords. Help people first, link rarely.
- **Collabs:** small Roblox dev YouTubers (5k–50k subs) with an affiliate cut (e.g. 30%) via Lemon Squeezy or Gumroad affiliates.

## 5. Realistic numbers

No guarantees. These are scenarios to plan around, not promises:

| Scenario | Email list | Conversion | Buyers | Avg. order | Revenue |
|---|---|---|---|---|---|
| Slow start | 300 | 3% | 9 | $45 | ~$400 |
| Solid | 1,000 | 4% | 40 | $50 | ~$2,000 |
| Strong content traction | 5,000 | 4% | 200 | $55 | ~$11,000 |

Revenue then compounds with each new Genre Pack sold to existing buyers. The main lever is **audience size**, which comes from consistent content. It usually takes months, not weeks.

## 6. Legal and admin checklist

- [ ] **Business registration:** selling digital products is business income. In Slovakia that typically means a trade licence (živnosť) or another legal form. Check local rules and taxes; if you're under 18, a parent or guardian needs to be involved.
- [ ] **Payments:** use a merchant of record (Lemon Squeezy, Gumroad) so VAT is handled for you.
- [ ] **Privacy policy + terms:** needed for the email form (GDPR) and for sales. A template is ready in `site/privacy.html`; fill in the `[BRACKETS]`. Lemon Squeezy and Gumroad cover their side.
- [ ] **Refund policy:** the site promises a 14-day money-back guarantee. Keep it, or change the text on the site.
- [ ] **Trademarks:** don't use the Roblox logo or imply you're official. The footer already carries a "not affiliated" disclaimer.
- [ ] **Your own code:** everything sold in Genre Packs should be written by you or properly licensed. No reselling Toolbox models.

## 7. Next 30 days

| Week | Do |
|---|---|
| 1 | Buy domain, deploy site, connect Formspree, set up Discord, record free lesson video |
| 2 | 5 short clips/week, 1 YouTube tutorial, share in dev communities |
| 3 | Same cadence; outline Module 1–3 scripts; set up Lemon Squeezy products |
| 4 | Review email numbers → decide: pre-sale, or change the angle |

## 8. Before you go live

Placeholders still to fill in on the site:

- `FORM_ENDPOINT` and `CHECKOUT` links in `site/index.html`
- Prices, if you want different ones
- The `[BRACKETS]` in `site/privacy.html` (name, contact, providers, date)
- Replace "Coming soon" on a Genre Pack once it's actually ready
