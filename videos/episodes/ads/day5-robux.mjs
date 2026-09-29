// Instagram week · Day 5 (Fri) · How Roblox games earn (honest: no income promises)
export default {
  id: "ig-day5-robux",
  format: "portrait",
  badge: "HOW ROBLOX GAMES EARN",
  style: "adhd",
  music: "phonk",
  musicDb: -23,
  speed: 1.18,
  segments: [
    {
      scene: { broll: "coin-burst", sticker: "💸", type: "statement", eyebrow: "DEVELOPER EXCHANGE", text: "Roblox pays creators *hundreds of millions* a year.", sub: "Eligible creators cash out Robux for real money." },
      say: ["Roblox pays its creators hundreds of millions of dollars a year.", "Eligible creators cash out their Robux for real money."],
    },
    {
      scene: { broll: "tycoon-factory", sticker: "🤔", type: "punch", text: "But *how?*" },
      say: "But how does a game actually earn?",
    },
    {
      scene: { type: "compare",
        bad: { tag: "BUY ONCE", title: "Game Pass", text: "Permanent perks: 2× coins, VIP, special tools." },
        good: { tag: "BUY AGAIN", title: "Developer Product", text: "Repeatable: coin packs, revives, boosts." } },
      say: ["Two ways. Game passes are bought once: double coins, VIP, special tools.", "Developer products can be bought again and again: coin packs, revives, boosts."],
    },
    {
      scene: { sticker: "🔔",
        type: "notify",
        items: [
          { icon: "R$", title: "+R$ 99 · 2× Coins", sub: "Game Pass purchased", color: "#ffd23d" },
          { icon: "R$", title: "+R$ 25 · Coin Pack", sub: "Developer Product", color: "#c6ff3d" },
          { icon: "R$", title: "+R$ 25 · Coin Pack", sub: "bought again!", color: "#3de0ff" },
        ],
        note: "Illustration. What you earn depends on your game.",
      },
      say: ["Every purchase is a notification like this.", "And developer products?", "Players can buy them again and again."],
    },
    {
      scene: { type: "bullets", headingBeat: true, heading: "What makes players *pay*", items: ["The free game is already fun", "Never pay-to-win", "A cheap first purchase", "Offers at the right moment"] },
      say: ["The secret? Players pay when", "the free game is already fun,", "it's never pay to win,", "there's a cheap first purchase,", "and offers show up at the right moment."],
    },
    {
      scene: { sticker: "🚀", type: "cta", title: "Build a game that *earns.*", sub: "We build a full store in Module 08", button: "LINK IN BIO" },
      say: "Learn to build a game that earns, the right way. Link in bio!",
    },
  ],
};
