export default {
  id: "pack-tycoon-t2-buttons",
  format: "landscape",
  badge: "TYCOON PACK · T.2 Buttons",
  music: "calm",
  segments: [
    {
      scene: { type: "title", eyebrow: "TYCOON PACK · T.2", title: "Purchase *buttons*", sub: "Walk on it, pay, something new appears." },
      say: "Lesson two. Walk onto a button, pay, and something new appears. That's the whole genre in one sentence.",
    },
    {
      scene: { type: "flow", heading: "How it's *built*", nodes: [{ icon: "▣", label: "Item", sub: "Price + Requires" }, { icon: "●", label: "Button", sub: "same name" }, { icon: "✓", label: "Bought", sub: "item appears" }] },
      say: ["Every item is a model built right where it belongs, with a price and an optional requirement.", "Its button has exactly the same name.", "At start, items go into storage, and buying brings them back."],
    },
    {
      scene: { type: "code", eyebrow: "ONLY THE OWNER, ONLY THE SERVER", file: "ServerScriptService / Buttons",
        code: `if player.UserId ~= plot:GetAttribute("Owner") then return end\nif TycoonData.spend(player, price) then\n\tTycoonData.markOwned(player, button.Name)\n\tplace(plot, button.Name)\n\trefresh(plot)\nend`,
        steps: [[1, 1], [2, 6]] },
      say: ["Only the owner can press their own buttons.", "The server spends the cash, saves the purchase, places the item, and shows the next buttons."],
    },
    {
      scene: { type: "statement", eyebrow: "THE MAGIC NUMBER", text: "Every button costs about *×1.6* more.", sub: "First purchase: free. Second: 25. Then 40, 65, 100, 170…" },
      say: "Pricing. Make the first purchase free, and every next button about one point six times more expensive. Progress stays fast, but never too fast.",
    },
    {
      scene: { type: "bullets", headingBeat: true, heading: "Keep them *hooked*", items: ["First purchase in 10 seconds", "Always 2–3 buttons visible", "A real choice: oven or walls?"] },
      say: ["Keep them hooked.", "The first purchase within ten seconds.", "Always show two or three buttons.", "Because a choice feels better than a single path."],
    },
    {
      scene: { type: "cta", title: "Next: the *money machine*", sub: "T.3 · droppers, conveyors, collector", button: "KEEP GOING →" },
      say: "Now players need money to spend. Next: the money machine.",
    },
  ],
};
