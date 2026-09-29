# Module 2 · World Building

A good map does half of your game design for you. It tells players where to go, what's dangerous, and what's worth reaching. In this module you'll build the Coin Rush arena: platforms, a lava floor, terrain around it, and lighting that makes it look finished.

**You'll ship:** the complete map for Coin Rush.

---

## 2.1 Parts, size, color and materials

Parts come in a few shapes: **Block**, **Sphere**, **Cylinder**, **Wedge** and **Corner Wedge** (Home tab → arrow under Part). Most maps are 90% blocks and wedges.

Properties you'll use constantly:

| Property | What it does |
|---|---|
| `Size` | Width, height, depth in studs (1 stud ≈ 28 cm). |
| `Position` / `Orientation` | Where it is and how it's rotated. |
| `Color` | Any RGB color. |
| `Material` | Surface look and sound: Plastic, SmoothPlastic, Neon, Wood, Slate, Glass… |
| `Transparency` | 0 = solid, 1 = invisible. |
| `CanCollide` | Whether players and objects bump into it. |
| `CastShadow` | Turn off for tiny decorative parts to save performance. |

**Readable design rules for Coin Rush:**

- **Safe ground** is calm and matte: SmoothPlastic or Slate in greys and blues.
- **Danger** is loud: bright orange/red **Neon** for lava.
- **Rewards** glow: yellow **Neon** coins.

Players learn these rules in seconds, without any tutorial text.

### Try it

Build the arena floor: a 120×2×120 lava plate (Neon, orange), and eight to ten stone platforms of different heights floating above it. Leave gaps a player can jump (up to about 10 studs wide and 7 studs up with default settings).

## 2.2 Anchoring and physics

Every part is simulated by the physics engine unless it's **Anchored**. An unanchored platform will fall into the void the moment you press Play.

- **Anchored = true**: the part never moves on its own. Use this for all map geometry.
- **Anchored = false**: gravity and collisions apply. Use this for things that should tumble, like crates.

To anchor everything at once: select the parts (or a whole model) and tick **Anchored** in Properties, or use the **Anchor** button in the Home tab.

**Welds** hold unanchored parts together. If you build a moving object (like a swinging hammer later), weld its parts with **WeldConstraint** and anchor only what should stay still.

> **Watch out:** If a playtest "explodes" your build, something important isn't anchored. Stop, select all, anchor, test again.

## 2.3 Terrain and water

Terrain gives you natural ground, mountains and water that parts can't easily fake.

1. Open the **Terrain Editor** (Home tab → Editor).
2. Use **Generate** for a quick landscape, or **Add / Subtract / Grow / Smooth** with brushes.
3. **Paint** changes the material: Grass, Rock, Sand, Snow, Water…
4. Use **Sea Level** to add water across an area.

For Coin Rush, surround the arena with rocky cliffs so the world feels enclosed and players look *inward* at the action. Keep terrain away from the playable area so it doesn't interfere with lava and platforms.

> **Tip:** Terrain is heavier to render than simple parts. Use it for backgrounds and big natural shapes, and keep gameplay surfaces as parts.

## 2.4 Lighting and atmosphere

Lighting is the fastest way to make a map look professional. Select **Lighting** in the Explorer:

- `ClockTime`: time of day (try 17.5 for a warm sunset).
- `Brightness`, `Ambient`, `OutdoorAmbient`: overall light and shadow color.
- `Technology`: **Future** gives the best shadows and light from Neon parts.

Add these objects inside **Lighting** for instant mood:

| Object | Use |
|---|---|
| `Atmosphere` | Haze and depth. `Density` 0.3–0.4 feels cinematic. |
| `Sky` | Custom skybox. |
| `BloomEffect` | Makes Neon glow. Keep `Intensity` low (0.5–1). |
| `ColorCorrectionEffect` | Tint and contrast. Small changes go far. |
| `SunRaysEffect` | Light shafts through gaps. |

A good Coin Rush look: sunset clock time, orange-pink atmosphere, subtle bloom so the lava and coins glow.

> **Tip:** Test your lighting on a phone. Very dark scenes look fine on a monitor and unplayable on a bright mobile screen.

## 2.5 Using models safely (no backdoors)

The Toolbox saves time, but free models are also the #1 way games get hacked. Some models contain hidden scripts (called *backdoors*) that let a stranger run code in your game.

**Before using any model:**

1. Prefer assets from verified creators and Roblox itself.
2. Insert it, then expand it in the Explorer and look for any **Script**, **LocalScript** or **ModuleScript** you didn't expect.
3. Delete scripts you don't need. A tree or a rock never needs a script.
4. Be suspicious of scripts that use `require(` with a number, `getfenv`, `loadstring`, or long unreadable strings.
5. Search your whole game: in the Explorer filter box type `ClassName:Script` or use **Find All (Ctrl+Shift+F)** for `require(`.

> **Watch out:** A plugin can edit your game too. Only install plugins with many users and good reviews, and remove the ones you don't use.

---

## Module recap

- [ ] Arena built: lava floor, platforms, and gaps players can jump
- [ ] Every map part is anchored
- [ ] Terrain cliffs frame the arena
- [ ] Lighting set: time of day, Atmosphere, Bloom, color correction
- [ ] No unknown scripts from the Toolbox anywhere in the game
