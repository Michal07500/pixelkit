// Week 2 · Emotional: the first Robux from your own game
export default {
  id: "ig-w2-first-robux",
  format: "portrait",
  badge: "POV",
  style: "adhd",
  music: "phonk",
  musicDb: -21,
  speed: 1.18,
  segments: [
    {
      scene: { sticker: "📱", type: "statement", eyebrow: "POV", text: "Your phone buzzes in class." },
      say: "P O V. Your phone buzzes in class.",
    },
    {
      scene: {
        sticker: "🤯", stickerBeat: 1, broll: "coin-burst",
        type: "notify",
        items: [
          { icon: "R$", title: "Someone bought 2× Cash", sub: "in YOUR tycoon", color: "#ffd23d" },
          { icon: "+8", title: "8 players online", sub: "right now", color: "#3de0ff" },
        ],
        note: "Illustration. What you earn depends on your game.",
      },
      say: ["Someone just bought a game pass.", "In your game. And eight people are playing it right now."],
    },
    {
      scene: { sticker: "🥹", type: "punch", text: "While you were *in class.*" },
      say: "While you were sitting in class.",
    },
    {
      scene: { type: "statement", text: "It starts with *one* game.", sub: "Core Course + Genre Packs: from zero to shipped" },
      say: ["It all starts with one game.", "Learn to build it, step by step."],
    },
    {
      scene: { sticker: "🚀", broll: "logo-build", type: "cta", title: "Build *yours.*", sub: "First lesson free", button: "LINK IN BIO" },
      say: "Build yours. First lesson free. Link in bio!",
    },
  ],
};
