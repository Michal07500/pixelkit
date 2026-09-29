// Instagram week · Day 1 (Mon) · Launch trailer. Also rendered in 16:9 (see day1-trailer-wide.mjs).
// Arc: you play → someone built it → they got paid → why not you? → the dream → how → free start.
export default {
  id: "ig-day1-trailer",
  format: "portrait",
  badge: "NEW · ROBLOX COURSE",
  style: "adhd",
  music: "phonk",
  musicDb: -23,
  speed: 1.18,
  segments: [
    {
      scene: { broll: "lava-run", sticker: "🎮", type: "statement", text: "You've played *1,000 hours* of Roblox." },
      say: "You've played a thousand hours of Roblox.",
    },
    {
      scene: { type: "statement", text: "Someone *built* every one of those games." },
      say: "Every single one of those games? Someone built it.",
    },
    {
      scene: { broll: "coin-burst", sticker: "💸", type: "punch", text: "And got *paid.*" },
      say: "And got paid!",
    },
    {
      scene: { sticker: "🤯", type: "statement", eyebrow: "DEVELOPER EXCHANGE", text: "Roblox pays creators *hundreds of millions* every year.", sub: "Eligible creators cash out Robux for real money." },
      say: "Roblox pays its creators hundreds of millions of dollars, every single year.",
    },
    {
      scene: { broll: "dev-desk", sticker: "👀", type: "punch", text: "Why not *you?*" },
      say: "So why not you?",
    },
    {
      scene: { sticker: "🔥", stickerBeat: 2,
        type: "notify",
        items: [
          { icon: "LIVE", title: "Your game is live!", sub: "Coin Rush is public", color: "#c6ff3d" },
          { icon: "+12", title: "12 players online", sub: "playing your game right now", color: "#3de0ff" },
          { icon: "R$", title: "+R$ 99 · first sale!", sub: "Someone bought 2× Coins", color: "#ffd23d" },
          { icon: "1K", title: "1,000 visits", sub: "and counting", color: "#ff4fa3" },
        ],
        note: "Illustration. What you earn depends on your game.",
      },
      say: [
        "Imagine hitting publish on your own game.",
        "Watching real players jump in.",
        "Your first sale.",
        "Your first thousand visits!",
      ],
    },
    {
      scene: { type: "checklist", headingBeat: true, heading: "From *zero* to *shipped*", items: ["Build the world", "Write real code", "Save player progress", "Add a store that earns"] },
      say: ["PIXEL KIT takes you from zero to shipped.", "Build the world.", "Write real code.", "Save progress.", "Add a store that earns!"],
    },
    {
      scene: { broll: "logo-build", sticker: "🚀", type: "cta", title: "Start *free* today.", sub: "First lesson free · no experience needed", button: "LINK IN BIO" },
      say: "Your first lesson is free. Link in bio. Let's build!",
    },
  ],
};
