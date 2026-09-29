export default {
  id: "course-m02-world-building",
  format: "landscape",
  badge: "MODULE 02 · World Building",
  music: "calm",
  segments: [
    {
      scene: { type: "title", eyebrow: "MODULE 02", title: "World *Building*", sub: "Parts, physics, terrain and lighting for the Coin Rush arena." },
      say: "Module two. A good map does half of your game design for you. Let's build the Coin Rush arena.",
    },
    {
      scene: { type: "grid", heading: "Colors that *teach*", tiles: [{ label: "Safe ground", color: "#3de0ff" }, { label: "Lava = danger", color: "#ff4fa3" }, { label: "Coins = reward", color: "#ffd23d" }, { label: "Goal glows", color: "#c6ff3d" }] },
      say: [
        "Your map should teach players without a single word of text.",
        "Calm, matte colors mean safe ground. Loud orange neon means danger. Glowing yellow means reward. Players learn these rules in seconds.",
      ],
    },
    {
      scene: { type: "bullets", headingBeat: true, heading: "Part *properties* you'll use daily", items: ["Size and Position", "Color and Material", "Transparency", "CanCollide"] },
      say: [
        "Every part has properties you'll use every day.",
        "Size and position, measured in studs.",
        "Color and material, like neon, wood or slate.",
        "Transparency, from solid to invisible.",
        "And Can Collide, which decides whether players bump into it.",
      ],
    },
    {
      scene: { type: "compare", eyebrow: "ANCHORING",
        bad: { tag: "✕ UNANCHORED", title: "Falls on Play", text: "Physics pulls every unanchored part down. Your whole map collapses into the void." },
        good: { tag: "✓ ANCHORED", title: "Stays put", text: "Anchor all map geometry. Leave only things that should tumble, like crates, unanchored." } },
      say: [
        "Here's the mistake everyone makes once. Unanchored parts fall the moment you press Play.",
        "So anchor all of your map geometry, and only leave things unanchored when they're supposed to move.",
      ],
    },
    {
      scene: { type: "flow", heading: "Terrain in *three moves*", nodes: [{ icon: "01", label: "Generate", sub: "rough landscape" }, { icon: "02", label: "Sculpt", sub: "add, subtract, smooth" }, { icon: "03", label: "Paint", sub: "rock, grass, water" }] },
      say: [
        "For the world around the arena, use terrain. Generate a rough landscape,",
        "sculpt it with the add, subtract and smooth brushes,",
        "then paint it with materials like rock, grass and water. Keep terrain out of the playable area.",
      ],
    },
    {
      scene: { type: "bullets", headingBeat: true, heading: "Lighting in *60 seconds*", items: ["ClockTime 17.5 for a warm sunset", "Atmosphere for haze and depth", "Bloom so neon glows", "Future lighting for real shadows"] },
      say: [
        "Lighting is the fastest way to look professional.",
        "Set clock time to seventeen point five for a warm sunset.",
        "Add an Atmosphere for haze and depth.",
        "Add a little bloom so the lava and coins glow.",
        "And switch lighting technology to Future for real shadows.",
      ],
    },
    {
      scene: { type: "statement", eyebrow: "SAFETY", text: "Free models can hide *backdoors.*", sub: "Open every model. A rock never needs a script." },
      say: [
        "One warning. Free models from the toolbox are the number one way games get hacked.",
        "Open every model you insert and delete any script you didn't expect. A rock never needs a script.",
      ],
    },
    {
      scene: { type: "checklist", headingBeat: true, heading: "Module 02 *recap*", items: ["Arena: lava floor and jumpable platforms", "Everything anchored", "Terrain cliffs frame the arena", "Sunset lighting with glow", "No unknown scripts anywhere"] },
      say: ["Recap time.", "Your arena has a lava floor and jumpable platforms,", "everything is anchored,", "terrain cliffs frame the action,", "the lighting glows,", "and there are no mystery scripts."],
    },
    {
      scene: { type: "cta", title: "Next: *Scripting*", sub: "Module 03 · make the lava actually hurt", button: "KEEP GOING →" },
      say: "Next module, we write our first scripts and make that lava actually hurt.",
    },
  ],
};
