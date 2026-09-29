// Instagram week · Day 5 (Fri) · How Roblox games earn Robux (no income promises)
export default {
  id: "ig-day5-robux",
  format: "portrait",
  badge: "HOW ROBLOX GAMES EARN",
  music: "hype",
  speed: 1.06,
  segments: [
    {
      scene: { type: "statement", text: "How do Roblox games *earn Robux?*" },
      say: "How do Roblox games actually earn Robux?",
    },
    {
      scene: { type: "compare",
        bad: { tag: "BUY ONCE", title: "Game Pass", text: "Permanent perks: 2× coins, VIP, special tools." },
        good: { tag: "BUY AGAIN", title: "Developer Product", text: "Repeatable: coin packs, revives, boosts." } },
      say: ["Two ways. Game passes are bought once: double coins, VIP, special tools.", "Developer products can be bought again and again: coin packs, revives and boosts."],
    },
    {
      scene: { type: "bullets", headingBeat: true, heading: "What makes players *pay*", items: ["The free game is already fun", "No pay-to-win", "A cheap first purchase", "Offers at the right moment"] },
      say: ["And what makes players happy to pay?", "The free game is already fun.", "It's never pay to win.", "There's a cheap first purchase.", "And offers show up at the right moment, not every five seconds."],
    },
    {
      scene: { type: "cta", title: "Learn to build it *right.*", sub: "Monetization is Module 08 of PIXEL KIT", button: "LINK IN BIO" },
      say: "We build a full in-game store in PIXEL KIT. Link in bio.",
    },
  ],
};
