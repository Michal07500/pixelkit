export default {
  id: "pack-tycoon-t4-rebirth",
  format: "landscape",
  badge: "TYCOON PACK · T.4 Rebirth",
  music: "calm",
  segments: [
    {
      scene: { type: "title", eyebrow: "TYCOON PACK · T.4", title: "Rebirth: the *long game*", sub: "Reset everything, keep a permanent bonus." },
      say: "Lesson four. After half an hour a player owns everything. Without a reason to continue, they leave. Rebirth is that reason.",
    },
    {
      scene: { type: "compare", eyebrow: "THE TRADE",
        bad: { tag: "YOU LOSE", title: "Cash and items", text: "Your whole pizza empire goes back to an empty plot." },
        good: { tag: "YOU KEEP", title: "+50% forever", text: "Every rebirth adds a permanent cash bonus. You rebuild faster every time." } },
      say: ["The trade: you lose your cash and every item.", "But you keep fifty percent more cash, forever. And the next run is faster."],
    },
    {
      scene: { type: "code", eyebrow: "THE SERVER DECIDES", file: "ServerScriptService / Rebirth",
        code: `remote.OnServerEvent:Connect(function(player)\n\tif TycoonData.rebirth(player, rebirthCost(rebirths)) then\n\t\tplot.Drops:ClearAllChildren()\n\t\tButtons.clear(plot)\n\tend\nend)`,
        steps: [[1, 2], [3, 5]] },
      say: ["The client only asks. The server checks the price from its own data, so nobody can rebirth for free.", "Then it clears the plot, and the first buttons come back."],
    },
    {
      scene: { type: "statement", eyebrow: "THE FEELING", text: "\"I'm *so much faster* now.\"", sub: "First rebirth after 20–30 minutes. That feeling brings players back tomorrow." },
      say: "Tune the cost so the first rebirth takes twenty to thirty minutes. The second run feels so much faster, and that feeling brings players back tomorrow.",
    },
    {
      scene: { type: "cta", title: "Next: *passes & launch*", sub: "T.5 · 2× Cash, Auto Collect, polish", button: "KEEP GOING →" },
      say: "Last lesson: game passes players actually want, polish, and launch.",
    },
  ],
};
