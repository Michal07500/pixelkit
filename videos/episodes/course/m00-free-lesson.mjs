export default {
  id: "course-m00-free-lesson-intro-screen",
  format: "landscape",
  badge: "FREE LESSON · 4.1",
  music: "calm",
  segments: [
    {
      scene: { type: "title", eyebrow: "FREE LESSON", title: "A studio-grade *intro screen*", sub: "Black screen, your logo, a smooth fade and pop. Ten minutes." },
      say: "Launch any big game and the first thing you see is a black screen with the studio's logo. In the next few minutes, you'll build the same thing for your own Roblox game.",
    },
    {
      scene: { type: "flow", heading: "Four *steps*", nodes: [{ icon: "01", label: "Upload logo", sub: "Asset Manager" }, { icon: "02", label: "LocalScript", sub: "in ReplicatedFirst" }, { icon: "03", label: "Paste code", sub: "your asset ID" }, { icon: "04", label: "Play", sub: "test on mobile too" }] },
      say: [
        "Here's the plan. Upload your logo in the Asset Manager and copy its ID.",
        "Create a LocalScript inside Replicated First. It runs before anything else loads.",
        "Paste the code, and put in your logo's ID.",
        "Then press Play, and test it on mobile too.",
      ],
    },
    {
      scene: { type: "code", eyebrow: "BUILD THE SCREEN", file: "ReplicatedFirst / IntroSplash",
        code: `ReplicatedFirst:RemoveDefaultLoadingScreen()\n\nlocal gui = Instance.new("ScreenGui")\ngui.IgnoreGuiInset = true\ngui.DisplayOrder = 1000\ngui.ResetOnSpawn = false\n\nlocal bg = Instance.new("Frame")\nbg.Size = UDim2.fromScale(1, 1)\nbg.BackgroundColor3 = Color3.new(0, 0, 0)`,
        steps: [[1, 1], [3, 6], [8, 10]], focus: [[1, 1], [3, 6], [8, 10]] },
      say: [
        "First, we remove Roblox's default loading screen.",
        "Then we create a screen gui that covers the whole screen, sits on top of everything, and survives respawning.",
        "Inside it, a black frame that fills the screen.",
      ],
    },
    {
      scene: { type: "code", eyebrow: "ADD THE LOGO", file: "ReplicatedFirst / IntroSplash",
        code: `local logo = Instance.new("ImageLabel")\nlogo.Image = "rbxassetid://YOUR_ASSET_ID"\nlogo.AnchorPoint = Vector2.new(0.5, 0.5)\nlogo.Position = UDim2.fromScale(0.5, 0.5)\nlogo.Size = UDim2.fromScale(0.4, 0.4)\nlogo.ImageTransparency = 1\n\nlocal ratio = Instance.new("UIAspectRatioConstraint")\nratio.AspectRatio = 1\nratio.Parent = logo`,
        steps: [[1, 2], [3, 6], [8, 10]], focus: [[1, 2], [3, 5], [8, 10]] },
      say: [
        "Now the logo, an image label with your asset ID.",
        "Anchor point and position put it dead center, at forty percent of the screen, starting invisible.",
        "And an aspect ratio constraint keeps it perfectly square on every device.",
      ],
    },
    {
      scene: { type: "code", eyebrow: "ANIMATE IT", file: "ReplicatedFirst / IntroSplash",
        code: `local fadeIn = TweenService:Create(logo,\n\tTweenInfo.new(0.25, Enum.EasingStyle.Back),\n\t{ ImageTransparency = 0 })\nfadeIn:Play()\nfadeIn.Completed:Wait()\n\ntask.wait(1.75)\n\nlocal fadeOut = TweenService:Create(bg,\n\tTweenInfo.new(0.4), { BackgroundTransparency = 1 })\nfadeOut:Play()\nfadeOut.Completed:Wait()\ngui:Destroy()`,
        steps: [[1, 5], [7, 7], [9, 13]], focus: [[1, 5], [7, 7], [9, 13]] },
      say: [
        "TweenService fades the logo in over a quarter of a second, with a playful back easing.",
        "We hold it, so it's on screen for two seconds in total.",
        "Then fade everything out, and destroy the gui, so nothing blocks the player.",
      ],
    },
    {
      scene: { type: "compare", eyebrow: "REMEMBER #1 · SCALE VS OFFSET",
        bad: { tag: "✕ OFFSET", title: "Pixels", code: `UDim2.new(0, 300, 0, 300)` },
        good: { tag: "✓ SCALE", title: "Percent of screen", code: `UDim2.fromScale(0.4, 0.4)` } },
      say: ["Three things to remember. One: offset is pixels, and falls apart on phones.", "Scale is a percentage of the screen, and works everywhere."],
    },
    {
      scene: { type: "statement", eyebrow: "REMEMBER #2 · ANCHORPOINT", text: "Position things by their *center*, not their corner." },
      say: "Two: set the anchor point to point five, point five, and you're placing things by their center instead of their top left corner.",
    },
    {
      scene: { type: "statement", eyebrow: "REMEMBER #3 · TWEENSERVICE", text: "Tell it *what*, *to what*, and *how long.*" },
      say: "Three: TweenService animates anything. You tell it what to change, to what value, and how long, and it does the rest.",
    },
    {
      scene: { type: "cta", title: "That's *one* of 43 lessons.", sub: "The full course takes you from empty baseplate to a published game.", button: "GET PIXEL KIT →" },
      say: "That was one lesson out of forty three. In the full course, you build a complete game, from an empty baseplate to a published game with an in game store. See you inside.",
    },
  ],
};
