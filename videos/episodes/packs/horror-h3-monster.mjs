export default {
  id: "pack-horror-h3-monster",
  format: "landscape",
  badge: "HORROR PACK · H.3 The Monster",
  music: "calm",
  segments: [
    {
      scene: { type: "title", eyebrow: "HORROR PACK · H.3", title: "A monster that *hunts*", sub: "Patrol, chase on sight, and give up when it loses you." },
      say: "Lesson three. The monster. It needs three behaviors: patrol, chase, and give up.",
    },
    {
      scene: { type: "flow", heading: "How it *thinks*", nodes: [{ icon: "👣", label: "Patrol", sub: "random patrol points" }, { icon: "👁", label: "Chase", sub: "sees you: runs at you" }, { icon: "…", label: "Give up", sub: "4 s without sight" }] },
      say: ["When it sees nobody, it walks between patrol points.", "When it sees you, it chases.", "And after four seconds without seeing you, it gives up. That moment is what players earn by hiding well."],
    },
    {
      scene: { type: "code", eyebrow: "LINE OF SIGHT", file: "ServerScriptService / MonsterAI",
        code: `local function canSee(character)\n\tlocal offset = target.Position - root.Position\n\tif offset.Magnitude > SIGHT_RANGE then return false end\n\tlocal hit = workspace:Raycast(root.Position, offset, rayParams)\n\treturn hit and hit.Instance:IsDescendantOf(character)\nend`,
        steps: [[2, 3], [4, 5]] },
      say: ["Seeing is one ray. First, is the player close enough?", "Then fire a ray at them. If the first thing it hits is the player, there's a clear line of sight. Walls and doors block it."],
    },
    {
      scene: { type: "compare", eyebrow: "CHASE",
        bad: { tag: "IN SIGHT", title: "Run straight at them", code: `humanoid:MoveTo(targetRoot.Position)` },
        good: { tag: "OUT OF SIGHT", title: "Follow a path", code: `path:ComputeAsync(root.Position,\n    targetRoot.Position)` } },
      say: ["While chasing, if it can see you, it runs straight at you.", "If you break line of sight, it computes a path around the corners to where you are. Pathfinding service does the hard work."],
    },
    {
      scene: { type: "statement", eyebrow: "THE SECRET NUMBER", text: "Monster *17*. Player *16.*", sub: "On a straight line the monster slowly wins. Players survive by using loops and doors." },
      say: "And the secret number. The monster runs at seventeen, the player at sixteen. On a straight line it slowly wins, so players have to use the map to survive. That's where the fun is.",
    },
    {
      scene: { type: "cta", title: "Next: *jumpscares*", sub: "H.4 · instant, preloaded, no lag", button: "KEEP GOING →" },
      say: "When it catches you, it needs a jumpscare. That's next.",
    },
  ],
};
