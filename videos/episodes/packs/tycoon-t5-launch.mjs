export default {
  id: "pack-tycoon-t5-launch",
  format: "landscape",
  badge: "TYCOON PACK · T.5 Passes & Launch",
  music: "calm",
  segments: [
    {
      scene: { type: "title", eyebrow: "TYCOON PACK · T.5", title: "Passes, polish, *launch*", sub: "Earn Robux without making it pay-to-win." },
      say: "Final lesson. Game passes, polish, and launch.",
    },
    {
      scene: { type: "grid", heading: "Passes players *want*", tiles: [{ label: "2× Cash", color: "#ffd23d" }, { label: "Auto Collect", color: "#3de0ff" }, { label: "VIP area", color: "#ff4fa3" }, { label: "✕ Skip the tycoon", color: "#555566" }] },
      say: ["Two passes players actually want: double cash, and auto collect.", "A VIP area works too. But never sell skip the whole tycoon. Players who skip have nothing left to do, and quit."],
    },
    {
      scene: { type: "code", eyebrow: "ALREADY WIRED IN", file: "ServerScriptService / TycoonData",
        code: `local PASSES = {\n\tDoubleCash = 123456789,\n\tAutoCollect = 987654321,\n}`,
        steps: [[1, 4]] },
      say: "The data module already supports both. Create the passes, paste the IDs, done. They work the moment they're bought, no rejoin needed.",
    },
    {
      scene: { type: "bullets", headingBeat: true, heading: "Polish that *sells*", items: ["A sound for every purchase", "Items pop in, not just appear", "An arrow to the next button", "Floating +$25 on collect"] },
      say: ["Polish.", "A sound for every purchase.", "Items that pop in.", "An arrow to the next button for new players.", "And a floating plus twenty five when cash is collected."],
    },
    {
      scene: { type: "checklist", headingBeat: true, heading: "Your *tycoon*", items: ["Plots and saving", "Buttons with a progression tree", "Droppers and conveyors", "Rebirths", "Two fair game passes"] },
      say: ["Look at what you built.", "Plots and saving,", "buttons with a progression tree,", "a money machine,", "rebirths,", "and two fair game passes. That's a real tycoon."],
    },
    {
      scene: { type: "cta", title: "Now *ship it.*", sub: "New theme, same systems: burgers, cars, space", button: "SHIP IT →" },
      say: "Change the theme to burgers, cars, or a space station. The systems stay the same. Now ship it.",
    },
  ],
};
