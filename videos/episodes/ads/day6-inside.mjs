// Instagram week · Day 6 (Sat) · What's inside + the feeling of shipping
export default {
  id: "ig-day6-inside",
  format: "portrait",
  badge: "WHAT'S INSIDE",
  music: "hype",
  musicDb: -17,
  energy: true,
  speed: 1.12,
  segments: [
    {
      scene: { type: "statement", text: "Imagine sending your friends a link to *your* game.", sub: "Not a game you play. A game you made." },
      say: ["Imagine sending your friends a link to your game.", "Not a game you play. A game you made."],
    },
    {
      scene: { type: "stats", heading: "Inside *PIXEL KIT*", items: [{ value: "9", label: "modules" }, { value: "43", label: "lessons" }, { value: "1", label: "shipped game" }, { value: "8", label: "genre packs" }] },
      say: ["That's what PIXEL KIT is for. Nine modules,", "forty three lessons,", "one game you actually ship,", "and eight genre packs to go further."],
    },
    {
      scene: { type: "bullets", headingBeat: true, heading: "Every module *includes*", items: ["A narrated video", "A PDF with all the code", "Exercises to try", "A piece of your game"] },
      say: ["Every module comes with", "a narrated video,", "a PDF with all the code,", "exercises,", "and one more piece of your own game."],
    },
    {
      scene: { type: "punch", text: "Pay *once.* Keep it *forever.*", sub: "No subscription · 14-day money-back guarantee" },
      say: ["Pay once. Keep it forever.", "No subscription, and a fourteen day money back guarantee."],
    },
    {
      scene: { type: "cta", title: "Your game starts *today.*", sub: "First lesson free", button: "LINK IN BIO" },
      say: "Your game starts today. First lesson free. Link in bio!",
    },
  ],
};
