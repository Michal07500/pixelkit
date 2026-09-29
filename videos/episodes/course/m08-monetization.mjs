export default {
  id: "course-m08-monetization",
  format: "landscape",
  badge: "MODULE 08 · Monetization",
  music: "calm",
  segments: [
    {
      scene: { type: "title", eyebrow: "MODULE 08", title: "*Monetization*", sub: "Game passes, developer products, and prices players are happy to pay." },
      say: "Module eight. Let's add a store to Coin Rush, and do it the way players respect.",
    },
    {
      scene: { type: "compare", eyebrow: "TWO KINDS OF PURCHASE",
        bad: { tag: "BUY ONCE", title: "Game Pass", text: "A permanent perk, owned forever. For Coin Rush: 2× Coins." },
        good: { tag: "BUY AGAIN", title: "Developer Product", text: "Can be bought any number of times. For Coin Rush: a 500 coin pack." } },
      say: [
        "Roblox has two kinds of purchase. A game pass is bought once and owned forever. Ours is double coins.",
        "A developer product can be bought again and again, like a pack of five hundred coins.",
      ],
    },
    {
      scene: { type: "code", eyebrow: "GAME PASS", file: "ServerScriptService / Passes",
        code: `local owns = MarketplaceService:UserOwnsGamePassAsync(\n\tplayer.UserId, DOUBLE_COINS_PASS)\nplayer:SetAttribute("DoubleCoins", owns)\n\n-- in addCoins:\nif player:GetAttribute("DoubleCoins") then\n\tamount *= 2\nend`,
        steps: [[1, 3], [5, 8]], focus: [[1, 3], [6, 8]] },
      say: [
        "For the pass, the server checks ownership when the player joins, and stores it as an attribute.",
        "Then every time we add coins, owners get double.",
      ],
    },
    {
      scene: { type: "flow", heading: "ProcessReceipt, *bulletproof*", nodes: [{ icon: "01", label: "Already granted?", sub: "check receipt store" }, { icon: "02", label: "Grant the item", sub: "player in server" }, { icon: "03", label: "Record + save", sub: "then PurchaseGranted" }] },
      say: [
        "Developer products are granted in one place only: Process Receipt. First, check if this receipt was already granted.",
        "If not, give the item to the player.",
        "Record the receipt, save their data, and only then return Purchase Granted. If anything fails, Roblox retries later, so nobody loses Robux.",
      ],
    },
    {
      scene: { type: "bullets", headingBeat: true, heading: "Prices that *feel good*", items: ["Fun first, for free players", "No pay-to-win in competition", "A cheap first purchase", "A 'best value' bundle anchor"] },
      say: [
        "Money follows goodwill.",
        "A free player must be able to enjoy everything.",
        "Avoid pay to win in competitive modes.",
        "Offer a cheap first purchase to break the ice.",
        "And place a bigger best value bundle next to it.",
      ],
    },
    {
      scene: { type: "cta", title: "Next: *Launch & Growth*", sub: "Module 09 · go live and get players", button: "KEEP GOING →" },
      say: "Your store is live. In the final module, we launch Coin Rush and get it in front of players.",
    },
  ],
};
