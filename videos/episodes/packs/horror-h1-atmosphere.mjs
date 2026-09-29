export default {
  id: "pack-horror-h1-atmosphere",
  format: "landscape",
  badge: "HORROR PACK · H.1 Atmosphere",
  music: "calm",
  segments: [
    {
      scene: { type: "title", eyebrow: "HORROR PACK · H.1", title: "Atmosphere that *scares*", sub: "Light, sound and level design: the fear starts before the monster." },
      say: "Welcome to the Horror Pack. Players decide in the first ten seconds if your game is scary, and that decision is made by light and sound. Not by the monster.",
    },
    {
      scene: { type: "compare", eyebrow: "DARKNESS",
        bad: { tag: "✕ PURE BLACK", title: "Frustrating", text: "Players can't see anything, so they stop exploring and quit." },
        good: { tag: "✓ READABLE DARK", title: "Scary", text: "Shapes are visible, details are not. The brain fills in the rest." } },
      say: ["Pure black isn't scary. It's just frustrating.", "You want readable darkness: players see shapes, but never the details. Their imagination does the rest."],
    },
    {
      scene: { type: "code", eyebrow: "ONE SCRIPT, WHOLE LOOK", file: "ServerScriptService / HorrorLighting",
        code: `Lighting.ClockTime = 0\nLighting.Brightness = 0.4\n\natmosphere.Density = 0.45\natmosphere.Haze = 2\n\ngrade.Saturation = -0.35\ngrade.TintColor = Color3.fromRGB(215, 225, 255)`,
        steps: [[1, 2], [4, 5], [7, 8]] },
      say: ["One script sets the whole mood. Midnight, and low brightness.", "Thick atmosphere, so the end of every hallway disappears.", "And a cold, desaturated color grade."],
    },
    {
      scene: { type: "bullets", headingBeat: true, heading: "Sound is *half* the fear", items: ["Reverb: StoneCorridor", "A low ambient drone", "3D sounds inside parts", "Silence, used on purpose"] },
      say: ["Now sound. It's half of all fear.", "Set the reverb to stone corridor, so every step echoes.", "Add a low ambient drone.", "Put one-off sounds inside parts, so they come from a direction.", "And use silence on purpose. A quiet room after a loud hallway makes players nervous."],
    },
    {
      scene: { type: "grid", heading: "Level design for *fear*", tiles: [{ label: "Short sightlines", color: "#ff4fa3" }, { label: "Loops to escape", color: "#c6ff3d" }, { label: "Landmarks", color: "#ffd23d" }, { label: "Warm safe zones", color: "#3de0ff" }] },
      say: ["Last, the map. Keep sightlines short, with corners and doorways.", "Build loops, so a skilled player can escape a chase.", "Add landmarks so fear doesn't turn into confusion. And warm pools of light as safe zones."],
    },
    {
      scene: { type: "cta", title: "Next: a *flashlight*", sub: "H.2 · with a battery that drains", button: "KEEP GOING →" },
      say: "Your world is scary. Next, we give players a flashlight, and a battery that runs out.",
    },
  ],
};
