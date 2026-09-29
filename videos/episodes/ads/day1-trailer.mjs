// Instagram week · Day 1 (Mon) · Launch trailer. Also rendered in 16:9 (see day1-trailer-wide.mjs).
export default {
  id: "ig-day1-trailer",
  format: "portrait",
  badge: "NEW · ROBLOX COURSE",
  music: "hype",
  speed: 1.06,
  segments: [
    {
      scene: { type: "statement", text: "You play *Roblox.*" },
      say: "You play Roblox.",
    },
    {
      scene: { type: "statement", text: "What if you *built it?*" },
      say: "What if you built it?",
    },
    {
      scene: { type: "code", file: "LavaFloor / Script", code: `lava.Touched:Connect(function(hit)\n\tlocal hum = hit.Parent\n\t\t:FindFirstChildOfClass("Humanoid")\n\tif hum then\n\t\thum.Health = 0\n\tend\nend)` },
      say: "PIXEL KIT teaches you Roblox Studio from zero. Real code, explained line by line.",
    },
    {
      scene: { type: "checklist", headingBeat: true, heading: "Build a *full game*", items: ["World building", "Luau scripting", "UI & menus", "Saving player data", "In-game store", "Publish & grow"] },
      say: [
        "Nine modules.",
        "One complete game,",
        "from an empty baseplate,",
        "to menus,",
        "saved progress,",
        "an in-game store,",
        "and a public launch.",
      ],
    },
    {
      scene: { type: "grid", heading: "Then pick your *genre*", tiles: [{ label: "Obby", color: "#c6ff3d" }, { label: "Tycoon", color: "#ffd23d" }, { label: "Simulator", color: "#3de0ff" }, { label: "Horror", color: "#ff4fa3" }, { label: "Heist", color: "#c6ff3d" }, { label: "Tower Defense", color: "#ffd23d" }] },
      say: "Then level up with genre packs: obby, tycoon, simulator, horror, heist and tower defense.",
    },
    {
      scene: { type: "cta", title: "Your first lesson is *free.*", sub: "Learn Roblox Studio. Ship real games.", button: "LINK IN BIO" },
      say: "Your first lesson is free. Link in bio.",
    },
  ],
};
