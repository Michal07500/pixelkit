export default {
  id: "pack-horror-h4-jumpscares",
  format: "landscape",
  badge: "HORROR PACK · H.4 Jumpscares",
  music: "calm",
  segments: [
    {
      scene: { type: "title", eyebrow: "HORROR PACK · H.4", title: "Jumpscares that *don't lag*", sub: "Preload on join, play on the client, shake the camera." },
      say: "Lesson four. A jumpscare that appears half a second late isn't scary. It's funny. Let's make it instant.",
    },
    {
      scene: { type: "code", eyebrow: "PRELOAD", file: "StarterPlayerScripts / Jumpscare",
        code: `task.spawn(function()\n\tContentProvider:PreloadAsync({ face, scream })\nend)\n\njumpscare.OnClientEvent:Connect(function()\n\tface.Visible = true\n\tscream:Play()\n\tshake(0.7, 8)\nend)`,
        steps: [[1, 3], [5, 9]] },
      say: ["When the player joins, preload the face image and the scream. They're downloaded long before they're needed.", "When the server says you've been caught, show the face, play the scream, and shake the camera. Instantly."],
    },
    {
      scene: { type: "statement", eyebrow: "DON'T FORGET", text: "*ResetOnSpawn* off.", sub: "The player dies right after the scare. A resetting GUI would cut it off halfway." },
      say: "One setting you can't forget: reset on spawn, off. The player dies right after the scare, and a resetting screen would cut it off.",
    },
    {
      scene: { type: "bullets", headingBeat: true, heading: "Small scares, *big* fear", items: ["A door slams behind you", "Lights flicker", "Footsteps above you", "Each one fires once"] },
      say: ["Big jumpscares should be rare. Most fear comes from small scripted events.", "A door slamming behind you.", "Lights that flicker.", "Footsteps on the floor above.", "Each scare zone fires only once per player, so it never gets old."],
    },
    {
      scene: { type: "grid", heading: "The *rules*", tiles: [{ label: "Anticipation first", color: "#ff4fa3" }, { label: "One every 60–90 s", color: "#ffd23d" }, { label: "Never repeat", color: "#c6ff3d" }, { label: "Test on phone", color: "#3de0ff" }] },
      say: ["The rules. Anticipation beats the scare itself.", "Space scares out, one every minute or so. Never repeat one. And always test on a phone."],
    },
    {
      scene: { type: "cta", title: "Next: the *escape*", sub: "H.5 · fuses, generator, exit and rounds", button: "KEEP GOING →" },
      say: "Last lesson: a goal. Fuses, a generator, and the escape.",
    },
  ],
};
