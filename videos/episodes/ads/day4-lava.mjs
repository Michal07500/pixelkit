// Instagram week · Day 4 (Thu) · Mini tutorial: lava in 8 lines
export default {
  id: "ig-day4-lava",
  format: "portrait",
  badge: "30-SECOND TUTORIAL",
  music: "hype",
  speed: 1.06,
  segments: [
    {
      scene: { type: "statement", text: "Make *lava* in Roblox in 8 lines.", sub: "Save this for later." },
      say: ["Make lava in Roblox in eight lines of code.", "Save this for later."],
    },
    {
      scene: {
        type: "code", file: "LavaFloor / Script",
        code: `local lava = script.Parent\n\nlava.Touched:Connect(function(hit)\n\tlocal hum = hit.Parent\n\t\t:FindFirstChildOfClass("Humanoid")\n\tif hum then\n\t\thum.Health = 0\n\tend\nend)`,
        steps: [[1, 1], [3, 3], [4, 9]], focus: [[1, 1], [3, 3], [4, 9]],
      },
      say: [
        "Put a script inside your lava part, and grab the part.",
        "Listen to the Touched event.",
        "If whatever touched it has a Humanoid, set its health to zero. Done.",
      ],
    },
    {
      scene: { type: "bullets", headingBeat: true, heading: "Make it *pro*", items: ["Neon orange material", "Bloom in Lighting", "Bubbling particles", "A sizzle sound"] },
      say: ["Want it to look pro?", "Use neon orange.", "Add bloom in lighting.", "Add bubbling particles.", "And a sizzle sound."],
    },
    {
      scene: { type: "cta", title: "Build a *whole game* like this.", sub: "9 modules · 1 shipped game", button: "LINK IN BIO" },
      say: "Want to build a whole game like this? Link in bio.",
    },
  ],
};
