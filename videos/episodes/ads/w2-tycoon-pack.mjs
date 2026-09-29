// Week 2 · Tycoon Pack launch
export default {
  id: "ig-w2-tycoon-pack",
  format: "portrait",
  badge: "NEW · TYCOON PACK",
  style: "adhd",
  music: "phonk",
  musicDb: -21,
  speed: 1.18,
  segments: [
    {
      scene: { sticker: "🍕", broll: "tycoon-factory", type: "statement", text: "Why can't you *stop* playing tycoons?" },
      say: "Why can't you stop playing tycoons?",
    },
    {
      scene: { sticker: "⏱️", type: "punch", text: "First buy: *10 seconds.*" },
      say: "Your first purchase happens in ten seconds.",
    },
    {
      scene: { sticker: "📈", type: "punch", text: "Every button: *×1.6*", sub: "Always just one more thing to buy" },
      say: ["Every next button costs about one point six times more.", "So there's always just one more thing to buy."],
    },
    {
      scene: { sticker: "♻️", type: "punch", text: "Then: *REBIRTH.*", sub: "Lose everything. Keep +50% forever." },
      say: ["And when you own it all? Rebirth.", "Lose everything, keep fifty percent more cash, forever."],
    },
    {
      scene: { type: "checklist", headingBeat: true, heading: "The Tycoon *Pack*", items: ["Plots that save", "Buttons + droppers", "Rebirth system", "2× Cash + Auto Collect passes"] },
      say: ["Now build one yourself. The Tycoon Pack.", "Plots that save,", "buttons and droppers,", "a rebirth system,", "and two game passes."],
    },
    {
      scene: { sticker: "💰", broll: "tycoon-factory", type: "cta", title: "Build the *empire.*", sub: "Tycoon Pack · PDF + 5 narrated videos", button: "LINK IN BIO" },
      say: "Build the empire. Link in bio!",
    },
  ],
};
