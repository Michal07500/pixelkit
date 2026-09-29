export default {
  id: "pack-horror-h2-flashlight",
  format: "landscape",
  badge: "HORROR PACK · H.2 Flashlight",
  music: "calm",
  segments: [
    {
      scene: { type: "title", eyebrow: "HORROR PACK · H.2", title: "A flashlight with a *battery*", sub: "Players choose where to look, and the clock is ticking." },
      say: "Lesson two. A flashlight turns darkness into gameplay, and a draining battery adds pressure.",
    },
    {
      scene: { type: "flow", heading: "The *tool*", nodes: [{ icon: "🔦", label: "Tool", sub: "in StarterPack" }, { icon: "▣", label: "Handle", sub: "a small part" }, { icon: "💡", label: "SpotLight", sub: "angle 50, range 40" }] },
      say: ["Build it as a tool in the starter pack.", "Give it a handle part,", "and a spotlight inside, pointing forward."],
    },
    {
      scene: { type: "code", eyebrow: "SERVER OWNS THE BATTERY", file: "Flashlight / FlashlightServer",
        code: `tool.Activated:Connect(function()\n\tif tool:GetAttribute("Battery") <= 0 then return end\n\tlight.Enabled = not light.Enabled\nend)\n\nif light.Enabled then\n\tbattery -= DRAIN_PER_SECOND * dt\nelse\n\tbattery += RECHARGE_PER_SECOND * dt\nend`,
        steps: [[1, 4], [6, 10]] },
      say: ["Clicking toggles the light, but only if there's battery left. This runs on the server, so nobody can hack infinite power.", "While it's on, the battery drains. While it's off, it slowly recharges."],
    },
    {
      scene: { type: "statement", eyebrow: "THE DETAIL THAT SELLS IT", text: "Below *15%*, the light starts to *flicker.*", sub: "The battery label turns red. Players feel the pressure without reading a single word." },
      say: "And the detail that sells it. Below fifteen percent, the light flickers and the label turns red. Nobody has to read anything to feel the panic.",
    },
    {
      scene: { type: "checklist", headingBeat: true, heading: "H.2 *recap*", items: ["Flashlight tool with a SpotLight", "Battery on the server", "Low-battery flicker", "Works on mobile and gamepad"] },
      say: ["Recap.", "A flashlight tool with a spotlight,", "a server-side battery,", "a low battery flicker,", "and it works on phones and gamepads with no extra code."],
    },
    {
      scene: { type: "cta", title: "Next: the *monster*", sub: "H.3 · pathfinding, sight and chase", button: "KEEP GOING →" },
      say: "Next, the part everyone's waiting for. The monster.",
    },
  ],
};
