// Instagram week · Day 4 (Thu) · Mini tutorial: lava in 8 lines
export default {
  id: "ig-day4-lava",
  format: "portrait",
  badge: "30-SECOND TUTORIAL",
  style: "adhd",
  music: "phonk",
  musicDb: -23,
  speed: 1.18,
  segments: [
    {
      scene: { broll: "lava-run", sticker: "🌋", type: "punch", text: "*Lava.* 8 lines.", sub: "Save this for later." },
      say: ["Lava in Roblox. Eight lines of code.", "Save this for later!"],
    },
    {
      scene: {
        type: "code", file: "LavaFloor / Script",
        code: `local lava = script.Parent\n\nlava.Touched:Connect(function(hit)\n\tlocal hum = hit.Parent\n\t\t:FindFirstChildOfClass("Humanoid")\n\tif hum then\n\t\thum.Health = 0\n\tend\nend)`,
        steps: [[1, 1], [3, 3], [4, 9]], focus: [[1, 1], [3, 3], [4, 9]],
      },
      say: [
        "Put a script inside your lava part.",
        "Listen to the Touched event.",
        "If a Humanoid touched it, health goes to zero. Done!",
      ],
    },
    {
      scene: { sticker: "✨", type: "bullets", headingBeat: true, heading: "Make it *epic*", items: ["Neon orange material", "Bloom in Lighting", "Bubbling particles", "A sizzle sound"] },
      say: ["Now make it epic.", "Neon orange.", "Bloom in lighting.", "Bubbling particles.", "And a sizzle sound!"],
    },
    {
      scene: { broll: "lava-run", sticker: "🔥", type: "punch", text: "That's how *obbies* start.", sub: "Some of the biggest games on Roblox are built on hazards like this." },
      say: ["That's how obbies start.", "Some of the biggest games on Roblox are built on hazards exactly like this."],
    },
    {
      scene: { type: "cta", title: "Build a *whole game* like this.", sub: "9 modules · 1 shipped game", button: "LINK IN BIO" },
      say: "Want to build a whole game? First lesson free. Link in bio.",
    },
  ],
};
