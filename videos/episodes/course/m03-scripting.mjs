export default {
  id: "course-m03-scripting-fundamentals",
  format: "landscape",
  badge: "MODULE 03 · Scripting Fundamentals",
  music: "calm",
  segments: [
    {
      scene: { type: "title", eyebrow: "MODULE 03", title: "Scripting *Fundamentals*", sub: "Learn Luau and make your world react." },
      say: "Module three. This is where your world starts reacting. Let's learn Luau, the scripting language behind every Roblox game.",
    },
    {
      scene: { type: "bullets", headingBeat: true, heading: "Three kinds of *script*", items: ["Script: runs on the server", "LocalScript: runs on one player's device", "ModuleScript: shared code you require"] },
      say: [
        "Roblox has three kinds of script.",
        "A Script runs on the server, where the game rules live.",
        "A LocalScript runs on one player's device, for things like UI and effects.",
        "And a ModuleScript holds shared code that other scripts can require.",
      ],
    },
    {
      scene: { type: "statement", eyebrow: "THE GOLDEN RULE", text: "Anything that *matters* runs on the *server.*", sub: "Health, coins, winning, buying. The client only shows things and asks." },
      say: ["Here's the rule to remember.", "Anything that matters, like health, coins, winning or buying, runs on the server. The client only shows things and asks."],
    },
    {
      scene: {
        type: "code", eyebrow: "VARIABLES", file: "ServerScriptService / Hello",
        code: `local playerName = "Alex"\nlocal coins = 0\nlocal isAlive = true\n\ncoins = coins + 10\nprint(playerName, "has", coins, "coins")`,
        steps: [[1, 3], [5, 6]],
      },
      say: [
        "A variable is a named box for a value: text, a number, or true and false.",
        "You can change it any time, and print it to the Output window to see what's going on.",
      ],
    },
    {
      scene: {
        type: "code", eyebrow: "CONDITIONS & LOOPS", file: "ServerScriptService / Countdown",
        code: `if coins >= 100 then\n\tprint("Buy the speed upgrade!")\nelse\n\tprint("Keep collecting.")\nend\n\nfor i = 3, 1, -1 do\n\tprint(i)\n\ttask.wait(1)\nend\nprint("GO!")`,
        steps: [[1, 5], [7, 11]],
        focus: [[1, 5], [7, 11]],
      },
      say: [
        "Conditions choose what happens. If you have a hundred coins, you can buy the upgrade. Otherwise, keep collecting.",
        "Loops repeat things. Here's a three, two, one countdown, with a one second wait between numbers.",
      ],
    },
    {
      scene: {
        type: "code", eyebrow: "EVENTS · BUILD A LAVA FLOOR", file: "LavaFloor / Script",
        code: `local lava = script.Parent\n\nlava.Touched:Connect(function(hit)\n\tlocal character = hit.Parent\n\tlocal humanoid = character:FindFirstChildOfClass("Humanoid")\n\tif humanoid then\n\t\thumanoid.Health = 0\n\tend\nend)`,
        steps: [[1, 1], [3, 3], [4, 9]],
        focus: [[1, 1], [3, 3], [4, 9]],
      },
      say: [
        "Now the fun part: a lava floor. This script lives inside the lava part.",
        "Touched is an event. Every time something touches the lava, Roblox runs our function.",
        "If the thing that touched it belongs to a character with a Humanoid, we set its health to zero. The lava works.",
      ],
    },
    {
      scene: {
        type: "compare", eyebrow: "DEBOUNCE",
        bad: { title: "No debounce", code: `platform.Touched:Connect(function(hit)\n    vanish() -- runs 30× a second!\nend)` },
        good: { title: "With a debounce", code: `local busy = false\nplatform.Touched:Connect(function(hit)\n    if busy then return end\n    busy = true\n    vanish()\n    busy = false\nend)` },
      },
      say: [
        "Careful though. Touched fires many times per second while you stand on a part, so your code would run dozens of times at once.",
        "The fix is a debounce: a simple flag that ignores new touches while the code is already running.",
      ],
    },
    {
      scene: {
        type: "code", eyebrow: "TABLES", file: "ReplicatedStorage / GameConfig",
        code: `local GameConfig = {\n\tRoundLength = 90,\n\tCoinValue = 1,\n\tUpgradePrices = {\n\t\tSpeed = 100,\n\t\tJump = 150,\n\t},\n}\n\nreturn GameConfig`,
      },
      say: "Finally, tables. We keep every tuning value for Coin Rush in one ModuleScript called GameConfig, so balancing the whole game means editing a single file.",
    },
    {
      scene: { type: "checklist", headingBeat: true, heading: "Module 03 *recap*", items: ["Script, LocalScript, ModuleScript", "Variables, conditions, loops", "A lava floor with Touched", "Vanishing platforms with a debounce", "One GameConfig for all your numbers"] },
      say: ["Quick recap.", "You know the three script types,", "variables, conditions and loops,", "you built a working lava floor,", "vanishing platforms with a debounce,", "and one config file for all your numbers."],
    },
    {
      scene: { type: "cta", title: "Next: *Player & UI*", sub: "Module 04 · intro screen, main menu and HUD", button: "KEEP GOING →" },
      say: "Next module, we give Coin Rush a studio quality intro, a main menu, and a HUD. See you there.",
    },
  ],
};
