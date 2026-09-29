export default {
  id: "course-m06-data-and-progression",
  format: "landscape",
  badge: "MODULE 06 · Data & Progression",
  music: "calm",
  segments: [
    {
      scene: { type: "title", eyebrow: "MODULE 06", title: "Data & *Progression*", sub: "Coins, XP and levels that survive leaving and server shutdowns." },
      say: "Module six. Players come back to games that remember them. Let's save their progress.",
    },
    {
      scene: { type: "code", eyebrow: "LEADERSTATS", file: "ServerScriptService / PlayerData",
        code: `Players.PlayerAdded:Connect(function(player)\n\tlocal leaderstats = Instance.new("Folder")\n\tleaderstats.Name = "leaderstats"\n\tleaderstats.Parent = player\n\n\tlocal coins = Instance.new("IntValue")\n\tcoins.Name = "Coins"\n\tcoins.Parent = leaderstats\nend)`,
        steps: [[1, 4], [6, 9]], focus: [[2, 4], [6, 8]] },
      say: [
        "First, the leaderboard. A folder named exactly leaderstats inside the player,",
        "with an int value called Coins, shows up in the player list automatically.",
      ],
    },
    {
      scene: { type: "flow", heading: "DataStores *remember*", nodes: [{ icon: "01", label: "Player joins", sub: "GetAsync" }, { icon: "02", label: "Plays", sub: "session copy in memory" }, { icon: "03", label: "Leaves", sub: "UpdateAsync" }] },
      say: [
        "A Data Store is a free cloud database. When a player joins, we load their saved table.",
        "While they play, we keep a copy in memory.",
        "When they leave, we write it back. Next time, their coins are still there.",
      ],
    },
    {
      scene: { type: "statement", eyebrow: "NETWORK CALLS FAIL", text: "Wrap every call in *pcall*, and *retry.*", sub: "If loading fails, kick with a friendly message. Never overwrite real data with a blank profile." },
      say: [
        "Data Store calls go over the network, and sometimes they fail. So wrap every call in p call, and retry with a short wait.",
        "If loading still fails, kick the player with a friendly message. Letting them play with a blank profile would overwrite their real progress.",
      ],
    },
    {
      scene: { type: "bullets", headingBeat: true, heading: "Save at the *right moments*", items: ["When the player leaves", "Autosave every 3 minutes", "On server shutdown: BindToClose"] },
      say: [
        "Save at three moments.",
        "When a player leaves.",
        "Every few minutes, as an autosave.",
        "And when the server shuts down, using Bind To Close. Otherwise an update could wipe recent progress.",
      ],
    },
    {
      scene: { type: "stats", heading: "XP to *level up*", items: [{ value: "50", label: "XP for level 2" }, { value: "559", label: "XP for level 6" }, { value: "1581", label: "XP for level 11" }] },
      say: [
        "Levels give players a reason for one more round. Level two needs fifty XP.",
        "Level six needs about five hundred sixty.",
        "And level eleven around fifteen hundred. When players level up, celebrate it with sound and particles.",
      ],
    },
    {
      scene: { type: "cta", title: "Next: *The Game Loop*", sub: "Module 07 · rounds, coins, shop and effects", button: "KEEP GOING →" },
      say: "Next module, everything comes together into the full Coin Rush game loop.",
    },
  ],
};
