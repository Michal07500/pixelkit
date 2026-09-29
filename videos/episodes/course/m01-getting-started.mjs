export default {
  id: "course-m01-getting-started",
  format: "landscape",
  badge: "MODULE 01 · Getting Started",
  music: "calm",
  segments: [
    {
      scene: { type: "title", eyebrow: "MODULE 01", title: "Getting *Started*", sub: "Install Studio, learn the interface, publish your first place." },
      say: "Welcome to PIXEL KIT. In this first module, you'll go from zero to a published Roblox place, and meet the game we'll build together.",
    },
    {
      scene: { type: "statement", eyebrow: "THE PROJECT", text: "You'll build *Coin Rush.*", sub: "Race for coins. Dodge lava. Buy upgrades. Come back tomorrow." },
      say: [
        "Over the next nine modules, you'll build one real game: Coin Rush.",
        "Players race to grab coins, dodge lava, buy upgrades, and come back tomorrow, because their progress is saved.",
      ],
    },
    {
      scene: { type: "bullets", headingBeat: true, heading: "What Studio *gives you*", items: ["A 3D world with physics and lighting", "Luau, a fast scripting language", "Multiplayer servers, built in", "Release to every device instantly"] },
      say: [
        "Roblox Studio is a full game engine, and it's free.",
        "You get a 3D world with physics and lighting,",
        "Luau, a fast and friendly scripting language,",
        "multiplayer servers that just work,",
        "and instant release to phones, computers and consoles.",
      ],
    },
    {
      scene: { type: "flow", heading: "Install in *three steps*", nodes: [{ icon: "01", label: "create.roblox.com", sub: "sign in" }, { icon: "02", label: "Download Studio", sub: "Windows or Mac" }, { icon: "03", label: "Turn on 2FA", sub: "protect your account" }] },
      say: [
        "Setting up takes a few minutes. Go to create dot roblox dot com and sign in.",
        "Download Roblox Studio. It runs on Windows and Mac.",
        "Then turn on two step verification. You'll be publishing games and earning Robux, so protect your account.",
      ],
    },
    {
      scene: { type: "bullets", headingBeat: true, heading: "The *Explorer* holds everything", items: ["Workspace: the 3D world", "ServerScriptService: server scripts", "StarterGui: each player's UI", "ReplicatedStorage: shared by server and players"] },
      say: [
        "The Explorer is a tree of everything in your game.",
        "Workspace is the 3D world itself.",
        "Server Script Service holds scripts that only run on the server.",
        "Starter Gui is the interface every player gets.",
        "And Replicated Storage is shared by the server and every player.",
      ],
    },
    {
      scene: { type: "statement", text: "*Where* you put something decides *how* it behaves." },
      say: "Remember this: where you put something decides how it behaves.",
    },
    {
      scene: { type: "bullets", headingBeat: true, heading: "Fly like a *builder*", items: ["Right mouse + drag: look around", "W A S D: move", "Q and E: down and up", "F: focus on what you selected"] },
      say: [
        "Now let's move around like a builder.",
        "Hold the right mouse button and drag to look around.",
        "W, A, S and D move you.",
        "Q and E go down and up.",
        "And F focuses the camera on whatever you selected.",
      ],
    },
    {
      scene: { type: "checklist", headingBeat: true, heading: "Your first *publish*", items: ["Build a spawn area and group it", "Press Play (F5) to test", "Publish as Coin Rush (dev)", "Keep it Private while you build"] },
      say: [
        "Time to ship something.",
        "Build a small spawn area with a floor and walls, and group it.",
        "Press Play to test it as a real player.",
        "Publish it to Roblox as Coin Rush dev.",
        "And keep it private while you build. You'll go public in module nine.",
      ],
    },
    {
      scene: { type: "cta", title: "Next: *World Building*", sub: "Module 02 · build the Coin Rush arena", button: "KEEP GOING →" },
      say: "That's module one done. Next up, we build the Coin Rush arena. See you there.",
    },
  ],
};
