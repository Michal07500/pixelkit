export default {
  id: "pack-tycoon-t1-foundation",
  format: "landscape",
  badge: "TYCOON PACK · T.1 Foundation",
  music: "calm",
  segments: [
    {
      scene: { type: "title", eyebrow: "TYCOON PACK · T.1", title: "Plots and *player data*", sub: "The foundation every tycoon stands on." },
      say: "Welcome to the Tycoon Pack. We're building Pizza Tycoon, and we start with the foundation: plots, and data that saves.",
    },
    {
      scene: { type: "grid", heading: "One *plot*", tiles: [{ label: "Base", color: "#3de0ff" }, { label: "ClaimPad", color: "#c6ff3d" }, { label: "Buttons + Items", color: "#ffd23d" }, { label: "Collector + CollectPad", color: "#ff4fa3" }] },
      say: ["Everything a player owns lives inside their plot.", "A base, a claim pad, folders for buttons and items, and a collector with a collect pad. Build one, then copy it six times."],
    },
    {
      scene: { type: "statement", eyebrow: "RULE NUMBER ONE", text: "Lose their progress *once*, lose the player *forever.*", sub: "That's why saving comes first, not last." },
      say: "Rule number one of tycoons. If a player loses their empire once, they never come back. So saving comes first, not last.",
    },
    {
      scene: { type: "code", eyebrow: "SAFE LOADING", file: "ServerScriptService / TycoonData",
        code: `for attempt = 1, 3 do\n\tlocal ok, result = pcall(store.GetAsync, store, key(player))\n\tif ok then data = result or {}; break end\n\ttask.wait(2 * attempt)\nend\nif data == nil then\n\tplayer:Kick("Couldn't load your tycoon.")\nend`,
        steps: [[1, 5], [6, 8]] },
      say: ["Loading retries three times, waiting a little longer each time.", "And if it still fails, the player is kicked with a message, instead of starting with an empty tycoon that would overwrite their save."],
    },
    {
      scene: { type: "code", eyebrow: "CLAIMING", file: "ServerScriptService / Plots",
        code: `plot.ClaimPad.Touched:Connect(function(hit)\n\tlocal player = Players:GetPlayerFromCharacter(hit.Parent)\n\tif not player or plotOf[player] then return end\n\tplot:SetAttribute("Owner", player.UserId)\n\tButtons.restore(plot, player)\nend)`,
        steps: [[1, 3], [4, 5]] },
      say: ["Claiming is one touch. Is it a player, and don't they own a plot already?", "Then the plot's owner attribute becomes their user ID, and everything they bought before is rebuilt."],
    },
    {
      scene: { type: "cta", title: "Next: *buttons*", sub: "T.2 · walk on it, pay, it appears", button: "KEEP GOING →" },
      say: "Next, the core loop of every tycoon. Purchase buttons.",
    },
  ],
};
