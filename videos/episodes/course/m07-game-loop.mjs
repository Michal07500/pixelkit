export default {
  id: "course-m07-the-game-loop",
  format: "landscape",
  badge: "MODULE 07 · The Game Loop",
  music: "calm",
  segments: [
    {
      scene: { type: "title", eyebrow: "MODULE 07", title: "The Game *Loop*", sub: "Rounds, coins, an upgrade shop and effects: the full Coin Rush." },
      say: "Module seven. Everything comes together. By the end of this one, Coin Rush is a complete, playable game.",
    },
    {
      scene: { type: "flow", heading: "One round of *Coin Rush*", nodes: [{ icon: "15s", label: "Intermission", sub: "countdown in lobby" }, { icon: "90s", label: "Round", sub: "collect coins, dodge lava" }, { icon: "5s", label: "Results", sub: "winner bonus, XP" }] },
      say: [
        "First, design on paper. A round starts with a fifteen second intermission in the lobby.",
        "Then ninety seconds in the arena, collecting coins and dodging lava.",
        "Then results: the winner gets a bonus, everyone earns XP, and it repeats.",
      ],
    },
    {
      scene: { type: "code", eyebrow: "ROUND MANAGER", file: "ServerScriptService / RoundManager",
        code: `while true do\n\tcountdown("Intermission", 15)\n\tteleportPlayers(arena.Spawns)\n\n\tCoinSpawner.start(onCoin)\n\tcountdown("Round", 90)\n\tCoinSpawner.stop()\n\n\tawardWinner()\nend`,
        steps: [[1, 3], [5, 7], [9, 10]], focus: [[2, 3], [5, 7], [9, 9]] },
      say: [
        "The round manager is one loop on the server. Count down the intermission, then teleport everyone into the arena.",
        "Start spawning coins, run the round timer, then stop.",
        "Award the winner, and loop forever. The HUD reads the timer from attributes.",
      ],
    },
    {
      scene: { type: "statement", eyebrow: "SECURE COINS", text: "The *server* spawns coins and detects the *touch.*", sub: "Coins live in ServerStorage, and GetPlayerFromCharacter decides who collected them." },
      say: "Coins are spawned by the server from Server Storage, and the server detects the touch. So nobody can claim a coin they never touched.",
    },
    {
      scene: { type: "grid", heading: "The *upgrade shop*", tiles: [{ label: "Speed 16 → 22", color: "#3de0ff" }, { label: "Jump 50 → 60", color: "#c6ff3d" }, { label: "100 coins", color: "#ffd23d" }, { label: "150 coins", color: "#ff4fa3" }] },
      say: [
        "Then the shop. Two upgrades: speed and jump, bought with coins.",
        "The server checks the price, saves the upgrade, and applies it every time the character spawns.",
      ],
    },
    {
      scene: { type: "bullets", headingBeat: true, heading: "Add the *juice*", items: ["Coin pickup sound + sparkles", "Countdown beeps, end-of-round horn", "Bubbling lava particles", "Lobby vs. round music"] },
      say: [
        "Finally, juice. This is what turns it works into it feels amazing.",
        "A pickup sound and a burst of sparkles for every coin.",
        "Countdown beeps and a horn when the round ends.",
        "Bubbling particles on the lava.",
        "And different music in the lobby and the round.",
      ],
    },
    {
      scene: { type: "cta", title: "Next: *Monetization*", sub: "Module 08 · game passes and a safe store", button: "KEEP GOING →" },
      say: "Coin Rush is playable. Next, we add a store, the right way.",
    },
  ],
};
