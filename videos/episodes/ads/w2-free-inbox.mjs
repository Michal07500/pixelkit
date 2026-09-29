// Week 2 · Free lesson, delivered by email
export default {
  id: "ig-w2-free-inbox",
  format: "portrait",
  badge: "FREE LESSON",
  style: "adhd",
  music: "phonk",
  musicDb: -21,
  speed: 1.18,
  segments: [
    {
      scene: { sticker: "🤔", type: "statement", text: "Want to make Roblox games but *don't know where to start?*" },
      say: "Want to make Roblox games, but don't know where to start?",
    },
    {
      scene: { sticker: "🎁", type: "punch", text: "Start *free.*" },
      say: "Start free.",
    },
    {
      scene: { type: "flow", heading: "How it *works*", nodes: [{ icon: "@", label: "Your email", sub: "on the site" }, { icon: "📩", label: "Inbox", sub: "in seconds" }, { icon: "🎮", label: "Build", sub: "your intro screen" }] },
      say: ["Drop your email on the site,", "the free lesson lands in your inbox in seconds,", "and ten minutes later your game has a real studio intro."],
    },
    {
      scene: { type: "checklist", headingBeat: true, heading: "You *get*", items: ["PDF lesson with the full script", "Narrated video", "Works on PC and phone"] },
      say: ["You get", "a PDF with the full script,", "a narrated video,", "and it works on PC and phone."],
    },
    {
      scene: { sticker: "📩", broll: "logo-build", type: "cta", title: "Free lesson → *your inbox.*", sub: "No card, no catch", button: "LINK IN BIO" },
      say: "Free lesson, straight to your inbox. Link in bio!",
    },
  ],
};
