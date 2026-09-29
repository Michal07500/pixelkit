export default {
  id: "pack-horror-h5-escape",
  format: "landscape",
  badge: "HORROR PACK · H.5 Escape",
  music: "calm",
  segments: [
    {
      scene: { type: "title", eyebrow: "HORROR PACK · H.5", title: "Objective and *escape*", sub: "Five fuses, one generator, one way out." },
      say: "Lesson five. Without a goal, players hide in a corner forever. So let's give them one.",
    },
    {
      scene: { type: "flow", heading: "One round of *Night Shift*", nodes: [{ icon: "⚡", label: "Find fuses", sub: "7 hidden, 5 needed" }, { icon: "⚙", label: "Generator", sub: "insert them" }, { icon: "🚪", label: "Escape", sub: "the exit opens" }] },
      say: ["Players search the map for fuses. Seven are hidden, five are needed.", "They bring them to the generator.", "And when all five are in, the exit opens. Run."],
    },
    {
      scene: { type: "code", eyebrow: "PROXIMITY PROMPTS", file: "ServerScriptService / Objectives",
        code: `fuse.ProximityPrompt.Triggered:Connect(function(player)\n\tfuse:Destroy()\n\tplayer:SetAttribute("Fuses", held + 1)\nend)\n\nif placed >= FUSES_NEEDED then\n\topenExit()\nend`,
        steps: [[1, 4], [6, 8]] },
      say: ["Every fuse has a proximity prompt. Hold to pick it up, and the server counts it on the player.", "At the generator, the fuses are added up. At five, the exit opens."],
    },
    {
      scene: { type: "statement", eyebrow: "TEAMWORK", text: "Caught? Your fuses *drop* back on the map.", sub: "Nothing is lost for the team, so the round is never unwinnable." },
      say: "And when someone gets caught, their fuses reappear somewhere on the map. The team never loses progress, so every round can still be won.",
    },
    {
      scene: { type: "checklist", headingBeat: true, heading: "Your *horror game*", items: ["Scary light and sound", "Flashlight with a battery", "A hunting monster", "Instant jumpscares", "Fuses, generator, escape"] },
      say: ["Look at what you built.", "Light and sound that scare,", "a flashlight with a battery,", "a monster that hunts,", "instant jumpscares,", "and a real objective. That's a complete horror game."],
    },
    {
      scene: { type: "cta", title: "Now make it *yours.*", sub: "New monster, new map, same systems", button: "SHIP IT →" },
      say: "Now change the monster, change the map, and ship it. Record your friends playing, and post the best scream. Good luck.",
    },
  ],
};
