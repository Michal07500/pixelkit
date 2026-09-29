// Week 2 · Horror Pack launch
export default {
  id: "ig-w2-horror-pack",
  format: "portrait",
  badge: "NEW · HORROR PACK",
  style: "adhd",
  music: "phonk",
  musicDb: -21,
  speed: 1.18,
  segments: [
    {
      scene: { sticker: "😱", broll: "horror-hall", type: "statement", text: "Horror games get *millions* of plays. Here's *why.*" },
      say: "Horror games get millions of plays on Roblox. Here's why.",
    },
    {
      scene: { sticker: "📹", type: "punch", text: "People *scream.*", sub: "Screams become clips. Clips bring players." },
      say: ["People scream.", "Screams become clips. And clips bring new players. For free."],
    },
    {
      scene: { type: "code", file: "ServerScriptService / MonsterAI", code: `if canSee(player) then\n\tchase(player)\nelse\n\tpatrol()\nend`, steps: [[1, 2], [3, 5]] },
      say: ["The monster sees you, it chases you.", "Loses you, it goes back to hunting."],
    },
    {
      scene: { type: "checklist", headingBeat: true, heading: "The Horror *Pack*", items: ["A monster that hunts", "Flashlight with a battery", "Lag-free jumpscares", "Fuses, generator, escape"] },
      say: ["The new Horror Pack.", "A monster that hunts with pathfinding,", "a flashlight with a dying battery,", "jumpscares that never lag,", "and a full escape objective."],
    },
    {
      scene: { sticker: "🔦", broll: "horror-hall", type: "cta", title: "Build the game *they scream at.*", sub: "Horror Pack · PDF + 5 narrated videos", button: "LINK IN BIO" },
      say: "Build the game they scream at. Link in bio!",
    },
  ],
};
