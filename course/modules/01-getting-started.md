# Module 1 · Getting Started

Every Roblox game you've ever played started as an empty baseplate in Roblox Studio. In this module you'll install Studio, learn to move around like a builder, place your first parts, and publish a private test place to your profile.

**You'll ship:** a playable test place on your Roblox profile.

**The project for this course:** over the next nine modules you'll build **Coin Rush**, a round-based game where players race to collect coins, dodge lava, buy upgrades, and come back tomorrow because their progress is saved. Every lesson adds one real piece of it.

---

## 1.1 What you can build in Roblox Studio

Roblox Studio is a full game engine. The same tool is used by solo creators and by studios with dozens of developers. With it you get:

- **A 3D world** with physics, lighting, terrain and water.
- **Luau**, a fast scripting language based on Lua, with optional types.
- **Multiplayer by default.** Every game runs on Roblox servers, and players join automatically. You never set up networking hardware.
- **Built-in services:** saving data, in-game purchases, matchmaking, chat, analytics.
- **Instant distribution** to PC, Mac, phones, tablets, consoles and VR.

Most successful Roblox games fit a small set of genres: obbies (obstacle courses), tycoons, simulators, horror, roleplay, tower defense, and competitive round-based games. Coin Rush is round-based on purpose: it teaches the loop that powers almost every genre, which is *start → play → reward → repeat*.

> **Tip:** Play three popular games in the genre you like before you build. Write down what happens in the first 30 seconds of each. First impressions decide whether a player stays.

## 1.2 Installing Studio and setting up your account

1. Go to **create.roblox.com** and sign in with your Roblox account (create one if you don't have it).
2. Click **Start Creating** / **Download Studio** and run the installer.
3. Open Studio and sign in with the same account.
4. Turn on **2-step verification** in your Roblox account settings. You'll be publishing games and later handling Robux, so protect the account.

Studio runs on Windows and macOS. It does not run on phones, tablets or Chromebooks, although you can *test* your game on those devices later.

> **Watch out:** Never sign in to Studio plugins or websites that ask for your Roblox password or cookie. No legitimate tool needs it.

## 1.3 The interface: Explorer, Properties, Toolbox

Create a new place from the **Baseplate** template. You'll see four areas you'll use every day:

| Window | What it's for |
|---|---|
| **Viewport** | The 3D view of your world. |
| **Explorer** | A tree of everything in your game: parts, scripts, UI, services. |
| **Properties** | Settings of whatever you selected: size, color, material, name… |
| **Toolbox** | Free models, images, sounds and plugins from the community. |

If a window is missing, open it again from the **View** (or **Window**) menu.

The Explorer is the most important one. Everything in a Roblox game is an **Instance** that lives somewhere in this tree:

- **Workspace**: everything that exists in the 3D world.
- **Players**: the people currently in the game.
- **Lighting**: sky, sun, fog, time of day.
- **ReplicatedStorage**: things both the server and players can access.
- **ServerScriptService**: scripts that only run on the server.
- **StarterGui**: UI that gets copied to each player.
- **StarterPlayer**: scripts and settings copied into each player's character.

You'll learn what each of these is for as you need it. For now, remember: *where* you put something decides *how* it behaves.

## 1.4 Camera controls and your first part

**Camera:**

- **Right mouse button + drag**: look around.
- **W A S D**: move. **Q / E**: down / up.
- **Shift** (hold): move slower for precise placement.
- **F**: focus the camera on the selected object.
- **Mouse wheel**: zoom.

**Your first part:**

1. In the **Home** tab click **Part**. A grey block appears.
2. Use the **Move**, **Scale** and **Rotate** tools (Home tab, or **Ctrl+2 / Ctrl+3 / Ctrl+4**) to shape it.
3. In **Properties**, change **BrickColor** or **Color**, and **Material** (try Neon, Wood, Metal).
4. Rename it in the Explorer (double-click the name) to `StartPlatform`.

> **Tip:** Name things as you create them. `Part (37)` means nothing in two weeks. `LavaFloor_Arena2` does.

**Snapping:** in the Model tab, set **Move** to 1 stud and **Rotate** to 15°. Clean, aligned builds are much easier to script later.

### Try it

- Build a simple spawn area: a floor, four low walls, and a **SpawnLocation** (Model tab → Spawn).
- Group the walls: select them, press **Ctrl+G**, and name the model `SpawnWalls`.

## 1.5 Playtesting and your first private publish

**Playtest:**

- **Play (F5)** spawns you as a character in the game.
- **Stop (Shift+F5)** ends the test.
- **Run (F8)** runs the game without a character, which is useful for watching physics.

Anything you change *during* a playtest is thrown away when you stop. Make edits after stopping.

**Publish:**

1. **File → Publish to Roblox**.
2. Choose **Create new game**, name it `Coin Rush (dev)` and add a short description.
3. After publishing, open **File → Game Settings → Permissions** (or the experience settings on the Creator Hub) and keep it **Private** while you build.

Now your place is saved in the cloud. You can open it from any computer, and you can join it from your phone to test mobile controls.

> **Watch out:** **Ctrl+S** in a published place saves to Roblox. Use **File → Save to File** now and then as an extra local backup.

---

## Module recap

- [ ] Studio installed and 2-step verification enabled
- [ ] You can find Explorer, Properties and Toolbox, and you know what Workspace and ServerScriptService are for
- [ ] You can fly the camera and place, scale and rotate parts with snapping
- [ ] Your spawn area is built and grouped
- [ ] `Coin Rush (dev)` is published as a private place
