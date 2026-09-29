// Instagram week · Day 2 (Tue) · Tip: why Roblox UI breaks on mobile
export default {
  id: "ig-day2-mobile-ui",
  format: "portrait",
  badge: "ROBLOX DEV TIP #1",
  style: "adhd",
  music: "phonk",
  musicDb: -23,
  speed: 1.18,
  segments: [
    {
      scene: { sticker: "📱", type: "statement", text: "Over *half* your players are on phones." },
      say: "Over half of your players are on phones.",
    },
    {
      scene: { sticker: "⏱️", type: "punch", text: "*5 seconds.*", sub: "That's how long they give a broken UI." },
      say: ["Five seconds.", "That's how long they give a broken UI before they leave. Forever."],
    },
    {
      scene: { type: "compare",
        bad: { tag: "✕ OFFSET", title: "Pixels", code: `UDim2.new(0, 300, 0, 60)\n-- huge on phones` },
        good: { tag: "✓ SCALE", title: "Percent of screen", code: `UDim2.new(0.2, 0, 0.08, 0)\n-- right on every screen` } },
      say: [
        "The usual culprit? Offset. Pixel sizes look fine on your monitor, and completely broken on a phone.",
        "Use scale instead. It's a percent of the screen, so it looks right everywhere.",
      ],
    },
    {
      scene: { type: "bullets", headingBeat: true, heading: "The pro *checklist*", items: ["Size with Scale", "Lock shapes: UIAspectRatio", "Center: AnchorPoint 0.5", "Test in the device emulator"] },
      say: ["The pro checklist!", "Size with scale.", "Lock shapes with an aspect ratio constraint.", "Center with anchor point point five.", "And always test in the device emulator."],
    },
    {
      scene: { sticker: "💰", type: "punch", text: "More players. *More Robux.*" },
      say: "Players who stay are players who pay.",
    },
    {
      scene: { sticker: "🚀", type: "cta", title: "Build games that *keep players.*", sub: "First lesson free", button: "LINK IN BIO" },
      say: "Save this, and grab the free lesson. Link in bio.",
    },
  ],
};
