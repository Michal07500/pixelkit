// Extra reel · "POV: you just published your first Roblox game" (emotional payoff)
export default {
  id: "ig-extra2-pov-first-game",
  format: "portrait",
  badge: "POV",
  style: "adhd",
  music: "phonk",
  musicDb: -21,
  speed: 1.18,
  segments: [
    {
      scene: { sticker: "😳", type: "statement", eyebrow: "POV", text: "You just hit *Publish* on your first Roblox game." },
      say: "P O V. You just hit publish on your first Roblox game.",
    },
    {
      scene: {
        sticker: "🔥", stickerBeat: 3, broll: "lava-run",
        type: "notify",
        items: [
          { icon: "LIVE", title: "Your game is public!", sub: "Anyone on Roblox can join", color: "#c6ff3d" },
          { icon: "+1", title: "First stranger joined", sub: "…and they're still playing", color: "#3de0ff" },
          { icon: "👍", title: "First like", sub: "someone you've never met", color: "#ff4fa3" },
          { icon: "R$", title: "+R$ 25 · first purchase", sub: "Coin Pack", color: "#ffd23d" },
        ],
        note: "Illustration. What happens depends on your game.",
      },
      say: [
        "Your game is public.",
        "A total stranger joins. And they keep playing.",
        "Someone you've never met hits like.",
        "And then, your first purchase!",
      ],
    },
    {
      scene: { sticker: "🥹", type: "punch", text: "You *made* that." },
      say: "You made that.",
    },
    {
      scene: { type: "statement", text: "Not a game you play. A game *you built.*", sub: "That feeling is why we made PIXEL KIT." },
      say: ["Not a game you play. A game you built.", "That feeling is exactly why we made PIXEL KIT."],
    },
    {
      scene: { sticker: "🚀", broll: "logo-build", type: "cta", title: "Your *POV* starts here.", sub: "First lesson free", button: "LINK IN BIO" },
      say: "Your P O V starts here. First lesson free. Link in bio!",
    },
  ],
};
