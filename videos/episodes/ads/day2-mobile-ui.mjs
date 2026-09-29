// Instagram week · Day 2 (Tue) · Tip: why Roblox UI breaks on mobile
export default {
  id: "ig-day2-mobile-ui",
  format: "portrait",
  badge: "ROBLOX DEV TIP #1",
  music: "hype",
  speed: 1.06,
  segments: [
    {
      scene: { type: "statement", text: "Your Roblox UI is *broken* on phones.", sub: "Here's the one-line fix." },
      say: ["Your Roblox UI is probably broken on phones.", "Here's the one line fix."],
    },
    {
      scene: { type: "compare",
        bad: { tag: "✕ OFFSET", title: "Pixels", code: `UDim2.new(0, 300, 0, 60)` },
        good: { tag: "✓ SCALE", title: "Percent of screen", code: `UDim2.new(0.2, 0, 0.08, 0)` } },
      say: [
        "Offset sizes are in pixels. Three hundred pixels is huge on a phone and tiny on a big monitor.",
        "Scale sizes are a percent of the screen, so it looks right on every device.",
      ],
    },
    {
      scene: { type: "bullets", headingBeat: true, heading: "Pro *checklist*", items: ["Size with Scale", "Lock shapes: UIAspectRatio", "Center with AnchorPoint 0.5", "Test in the device emulator"] },
      say: ["The pro checklist.", "Size with scale.", "Lock shapes with an aspect ratio constraint.", "Center things with an anchor point of point five.", "And test in the device emulator."],
    },
    {
      scene: { type: "cta", title: "Learn Roblox Studio *properly.*", sub: "First lesson free", button: "LINK IN BIO" },
      say: "Follow for a Roblox dev tip every day. First lesson free, link in bio.",
    },
  ],
};
