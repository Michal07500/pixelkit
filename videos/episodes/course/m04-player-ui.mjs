export default {
  id: "course-m04-player-and-ui",
  format: "landscape",
  badge: "MODULE 04 · Player & UI",
  music: "calm",
  segments: [
    {
      scene: { type: "title", eyebrow: "MODULE 04", title: "Player & *UI*", sub: "An intro screen, a main menu and a HUD that work on every device." },
      say: "Module four. UI is the first thing players judge. Let's make Coin Rush look like a studio made it.",
    },
    {
      scene: { type: "code", eyebrow: "4.1 · INTRO SCREEN", file: "ReplicatedFirst / IntroSplash",
        code: `ReplicatedFirst:RemoveDefaultLoadingScreen()\n\nlocal fadeIn = TweenService:Create(logo,\n\tTweenInfo.new(0.25, Enum.EasingStyle.Back),\n\t{ ImageTransparency = 0 })\nfadeIn:Play()\n\ntask.wait(2)\ngui:Destroy()`,
        steps: [[1, 1], [3, 6], [8, 9]], focus: [[1, 1], [3, 6], [8, 9]] },
      say: [
        "First, the intro. A LocalScript in Replicated First removes Roblox's default loading screen.",
        "Then TweenService fades your logo in, with a little pop.",
        "Two seconds later, it fades away and cleans itself up. Full walkthrough in the free lesson.",
      ],
    },
    {
      scene: { type: "bullets", headingBeat: true, heading: "UI *building blocks*", items: ["ScreenGui: the canvas", "Frame: panels and containers", "TextLabel and TextButton", "UICorner, UIStroke, UIListLayout"] },
      say: [
        "All 2D interface is built from a few blocks.",
        "A ScreenGui is the canvas.",
        "Frames are panels and containers.",
        "Text labels and buttons show text and take clicks.",
        "And UI modifiers add rounded corners, outlines and automatic layout.",
      ],
    },
    {
      scene: { type: "compare", eyebrow: "SCALE VS OFFSET",
        bad: { tag: "✕ OFFSET", title: "Pixels", code: `UDim2.new(0, 300, 0, 60)\n-- huge on phones,\n-- tiny on 4K screens` },
        good: { tag: "✓ SCALE", title: "Percent of screen", code: `UDim2.new(0.2, 0, 0.08, 0)\n-- 20% wide, 8% tall\n-- on every screen` } },
      say: [
        "More than half of Roblox players are on phones. Offset sizes are in pixels, so they look huge on phones and tiny on big screens.",
        "Scale sizes are percentages of the screen, so your UI looks right everywhere. Use scale.",
      ],
    },
    {
      scene: { type: "statement", eyebrow: "TWEENSERVICE", text: "Tell it *what*, *to what*, and *how long.*", sub: "Quad feels calm. Back feels playful. Keep UI animations under 0.4 seconds." },
      say: [
        "TweenService animates anything smoothly. You tell it what to change, to what value, and how long it should take.",
        "Easing styles change the feel. And keep UI animations short. Slow UI feels laggy.",
      ],
    },
    {
      scene: { type: "code", eyebrow: "4.5 · HUD COIN COUNTER", file: "StarterGui / HUD / LocalScript",
        code: `local coins = player:WaitForChild("leaderstats")\n\t:WaitForChild("Coins")\n\ncoinText.Text = tostring(coins.Value)\ncoins.Changed:Connect(function(value)\n\tcoinText.Text = tostring(value)\n\tpop()\nend)`,
        steps: [[1, 2], [4, 8]], focus: [[1, 2], [5, 8]] },
      say: [
        "The HUD's coin counter finds the player's coins value.",
        "Whenever it changes, we update the text and make the number pop. Tiny detail, huge difference in feel.",
      ],
    },
    {
      scene: { type: "checklist", headingBeat: true, heading: "Module 04 *recap*", items: ["Intro screen on join", "HUD with coins and round timer", "Main menu with an animated PLAY", "Tested in the device emulator"] },
      say: ["Recap.", "An intro screen that runs once on join,", "a HUD with coins and a round timer,", "a main menu with an animated play button,", "all tested at phone size in the device emulator."],
    },
    {
      scene: { type: "cta", title: "Next: *Client & Server*", sub: "Module 05 · make Coin Rush exploit-proof", button: "KEEP GOING →" },
      say: "Next module is the big one: client and server. We make Coin Rush exploit proof.",
    },
  ],
};
