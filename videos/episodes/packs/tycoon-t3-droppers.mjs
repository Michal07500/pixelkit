export default {
  id: "pack-tycoon-t3-droppers",
  format: "landscape",
  badge: "TYCOON PACK · T.3 Droppers",
  music: "calm",
  segments: [
    {
      scene: { type: "title", eyebrow: "TYCOON PACK · T.3", title: "The *money machine*", sub: "Droppers, conveyors, a collector and a collect pad." },
      say: "Lesson three. The money machine.",
    },
    {
      scene: { type: "flow", heading: "From oven to *wallet*", nodes: [{ icon: "🍕", label: "Dropper", sub: "every 2 s" }, { icon: "→", label: "Conveyor", sub: "carries it" }, { icon: "$", label: "Collector", sub: "stores cash" }] },
      say: ["Droppers spawn pizzas every few seconds.", "Conveyors carry them.", "And the collector turns them into cash, waiting on the collect pad."],
    },
    {
      scene: { type: "code", eyebrow: "A CONVEYOR IN ONE LINE", file: "ServerScriptService / Droppers",
        code: `for _, conveyor in CollectionService:GetTagged("Conveyor") do\n\tconveyor.AssemblyLinearVelocity =\n\t\tconveyor.CFrame.LookVector * 8\nend`,
        steps: [[1, 4]] },
      say: "Here's a trick. An anchored part with a velocity pushes everything that touches it. Tag your conveyor parts, and they all move pizzas with one line.",
    },
    {
      scene: { type: "code", eyebrow: "THE COLLECTOR", file: "ServerScriptService / Droppers",
        code: `plot.Collector.Touched:Connect(function(hit)\n\tlocal value = hit:GetAttribute("DropValue")\n\tif not value then return end\n\thit:Destroy()\n\tlocal amount = value * TycoonData.getMultiplier(owner)\n\tplot:SetAttribute("Stored", stored + amount)\nend)`,
        steps: [[1, 4], [5, 6]] },
      say: ["When a pizza touches the collector, read its value and destroy it.", "Multiply by the player's bonus from rebirths and passes, and add it to the stored cash."],
    },
    {
      scene: { type: "bullets", headingBeat: true, heading: "Six busy plots, *zero lag*", items: ["Max 60 drops per plot", "Debris cleans up fallen drops", "Server owns the physics"] },
      say: ["Six busy plots create a lot of parts, so keep it fast.", "Cap the drops per plot.", "Let Debris clean up anything that falls off.", "And keep the physics on the server."],
    },
    {
      scene: { type: "cta", title: "Next: *rebirth*", sub: "T.4 · the reason to keep playing", button: "KEEP GOING →" },
      say: "Your tycoon makes money. Next, the reason players keep playing for weeks. Rebirth.",
    },
  ],
};
