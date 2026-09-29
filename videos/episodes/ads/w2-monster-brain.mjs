// Week 2 · Educational: how a Roblox monster decides to chase you
export default {
  id: "ig-w2-monster-brain",
  format: "portrait",
  badge: "HOW IT WORKS",
  style: "adhd",
  music: "phonk",
  musicDb: -21,
  speed: 1.18,
  segments: [
    {
      scene: { sticker: "👁️", broll: "horror-hall", type: "statement", text: "How does a Roblox monster *see* you?" },
      say: "How does a Roblox monster actually see you?",
    },
    {
      scene: { sticker: "🔴", type: "punch", text: "One *ray.*" },
      say: "With one ray.",
    },
    {
      scene: { type: "code", file: "MonsterAI", code: `local hit = workspace:Raycast(\n\troot.Position, offset)\n\nif hit.Instance:IsDescendantOf(you) then\n\tchase(you)\nend`, steps: [[1, 2], [4, 6]] },
      say: ["It fires an invisible ray from its eyes to you.", "If the first thing the ray hits is you, it sees you, and it runs."],
    },
    {
      scene: { sticker: "🚪", type: "punch", text: "Wall in between? *Invisible.*", sub: "After 4 seconds it gives up" },
      say: ["A wall in between? You're invisible.", "Hide for four seconds, and it gives up."],
    },
    {
      scene: { sticker: "🏃", type: "punch", text: "Monster *17.* You *16.*", sub: "That's why you have to use the map" },
      say: ["And the speed? Monster seventeen, you sixteen.", "That's why you can't just run. You have to outsmart it."],
    },
    {
      scene: { sticker: "😈", type: "cta", title: "Build your own *monster.*", sub: "Horror Pack · full code explained", button: "LINK IN BIO" },
      say: "Build your own monster. Link in bio!",
    },
  ],
};
