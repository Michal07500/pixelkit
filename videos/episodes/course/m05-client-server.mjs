export default {
  id: "course-m05-client-and-server",
  format: "landscape",
  badge: "MODULE 05 · Client & Server",
  music: "calm",
  segments: [
    {
      scene: { type: "title", eyebrow: "MODULE 05", title: "Client & *Server*", sub: "The module that separates hobby projects from real games." },
      say: "Module five. This is the one that separates hobby projects from real games. Let's talk client and server.",
    },
    {
      scene: { type: "flow", heading: "One game, *two places*", nodes: [{ icon: "▣", label: "Client", sub: "each player's device" }, { icon: "▣", label: "Server", sub: "source of truth" }, { icon: "▣", label: "Every player", sub: "sees the result" }], edges: ["asks", "replicates"] },
      say: [
        "Every player runs a client on their own device. It draws the world, plays sounds and reads input.",
        "The server is one Roblox computer per game. It holds the truth: coins, health, rounds and purchases.",
        "When the server changes something, it replicates to every player automatically.",
      ],
    },
    {
      scene: { type: "code", eyebrow: "REMOTE EVENTS", file: "Client → Server",
        code: `-- LocalScript: ask the server\nBuyUpgrade:FireServer("Speed")\n\n-- Script: the server answers\nBuyUpgrade.OnServerEvent:Connect(function(player, name)\n\tprint(player.Name, "wants", name)\nend)`,
        steps: [[1, 2], [4, 7]], focus: [[1, 2], [4, 7]] },
      say: [
        "Clients and servers talk through Remote Events. The client fires a request,",
        "and the server listens. Notice the server gets the player automatically. Nobody can pretend to be someone else.",
      ],
    },
    {
      scene: { type: "statement", eyebrow: "THE GOLDEN RULE", text: "Never trust the *client.*", sub: "Exploiters can fire any remote, with any value, as often as they like." },
      say: [
        "Now the golden rule of Roblox development: never trust the client.",
        "Exploiters can fire any remote event, with any value, as often as they want.",
      ],
    },
    {
      scene: { type: "compare", eyebrow: "SEND INTENT, NOT RESULTS",
        bad: { title: "Client decides", code: `AddCoins.OnServerEvent:Connect(\n  function(player, amount)\n    coins.Value += amount\n  end)\n-- exploiter: FireServer(999999)` },
        good: { title: "Server decides", code: `BuyUpgrade.OnServerEvent:Connect(\n  function(player, name)\n    local price = Prices[name]\n    if not price then return end\n    if coins.Value < price then return end\n    coins.Value -= price\n  end)` } },
      say: [
        "This code lets the client say how many coins it gets. An exploiter sends nine hundred ninety nine thousand, and your economy is gone.",
        "Instead, the client sends intent: I'd like the speed upgrade. The server checks the price and the balance, and decides the result.",
      ],
    },
    {
      scene: { type: "checklist", headingBeat: true, heading: "Check *every* remote", items: ["Validate types with typeof", "Validate ranges and values", "Check the player's state", "Rate-limit requests", "Sanity-check distances"] },
      say: [
        "Run this checklist on every remote event.",
        "Validate the types.",
        "Validate the ranges.",
        "Check the player is allowed to do this right now.",
        "Rate limit requests that come too fast.",
        "And sanity check distances, so nobody collects a coin from across the map.",
      ],
    },
    {
      scene: { type: "cta", title: "Next: *Data & Progression*", sub: "Module 06 · save coins, XP and levels", button: "KEEP GOING →" },
      say: "With that, Coin Rush is secure. Next, we save progress so players come back tomorrow.",
    },
  ],
};
