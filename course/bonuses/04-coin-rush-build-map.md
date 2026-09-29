# Bonus · Coin Rush Build Map

Coin Rush is spread across nine modules. This map puts it all on a few pages: every object and script in the finished game, where it lives in the Explorer, and which lesson has its code. Use it to check your project, to find a script fast, or to rebuild Coin Rush from scratch in the right order.

**You'll get:** the complete Explorer tree, the build order and a final test plan.

---

## The finished Explorer

Lesson numbers in brackets tell you where the code or setup is. When a script is extended in a later lesson, use the **latest** version.

```
Workspace
├── Lobby (Model)
│   └── LobbySpawn (Part)                         [7.2]
├── Arena (Folder)                                [7.2]
│   ├── Spawns (Folder of Parts)
│   └── CoinSpots (Folder of invisible Parts)
├── LavaFloor (Part)                              [3.5]
│   └── Script: lava damage                       [3.5]
└── Platforms (Model)
    └── each platform: Script (vanish + debounce) [3.5]

ReplicatedFirst
└── IntroSplash (LocalScript)                     [4.1, free lesson]

ReplicatedStorage
├── GameConfig (ModuleScript)                     [3.6]
└── Remotes (Folder)
    ├── BuyUpgrade (RemoteEvent)                  [5.2, 7.4]
    ├── LevelUp (RemoteEvent)                     [6.4]
    └── CoinCollected (RemoteEvent)               [7.5]
    (+ attributes RoundStatus, TimeLeft set by RoundManager [7.2])

ServerStorage
└── Coin (Part template)                          [7.3]

ServerScriptService
├── PlayerDataService (ModuleScript)              [6.3, shared in 6.4]
├── PlayerData (Script, requires the module)      [6.4]
├── RoundManager (Script)                         [7.2]
├── CoinSpawner (ModuleScript)                    [7.3, + effects 7.5]
├── Shop (Script)                                 [7.4]
├── GamePasses (Script, 2x Coins)                 [8.1]
└── Purchases (Script, ProcessReceipt)            [8.3]

StarterGui
├── HUD (ScreenGui)                               [4.2]
│   ├── CoinPanel / CoinText + LocalScript        [4.5]
│   └── TimerPanel / TimerText + LocalScript      [4.5]
└── MainMenu (ScreenGui)
    └── LocalScript (PLAY, SHOP)                  [4.5, 7.4]

StarterPlayer
└── StarterPlayerScripts
    ├── CoinSpin (LocalScript)                    [7.3]
    └── CoinEffects (LocalScript)                 [7.5]
```

> **Tip:** Name every script exactly like in this map. When something breaks, the error in Output shows the script's full name, and you'll know instantly which lesson to reopen.

## Build order

Build in this order and **playtest after every step**. Each step only depends on the ones above it.

| Step | Build | Lesson | Test |
|---|---|---|---|
| 1 | Map: lobby, arena, lava floor, platforms | 2.1–2.4 | Everything anchored, nothing falls on Play |
| 2 | Lava damage and vanishing platforms | 3.5 | Touching lava kills, platforms vanish and return |
| 3 | `GameConfig` with all tuning values | 3.6 | Change one value, see it in game |
| 4 | Intro splash | 4.1 | Logo fades in and out once on join |
| 5 | HUD and main menu | 4.2–4.5 | Looks right on phone and desktop in the emulator |
| 6 | `Remotes` folder and a secure `BuyUpgrade` handler | 5.2–5.4 | Firing the remote with bad values does nothing |
| 7 | `PlayerDataService` + `PlayerData`: coins, XP, saving | 6.1–6.4 | Coins survive leaving and rejoining |
| 8 | `RoundManager` | 7.2 | Intermission → round → results loops |
| 9 | `CoinSpawner`, coin template, spinning coins | 7.3 | Coins appear during rounds and add to your total |
| 10 | `Shop` | 7.4 | Buying Speed costs coins and survives a respawn |
| 11 | Sounds and effects | 7.5 | Pickup sparkle and sound play instantly |
| 12 | Game Pass and `Purchases` | 8.1–8.3 | Test purchases in Studio grant the right item once |
| 13 | Icon, thumbnails, analytics funnel | 9.1–9.3 | Funnel events show up in Analytics |
| 14 | Publish as Public | 9.2 | Play it from your phone |

## Final test plan

Run this before every public update. It takes about 15 minutes.

**Solo test (Play)**
- [ ] Intro splash plays once, then the main menu shows
- [ ] PLAY starts the game, the HUD shows coins and the round timer
- [ ] No red errors in Output during a full round

**Multiplayer test (Test → Clients and Servers, 2 players)**
- [ ] Both players teleport into the arena when the round starts
- [ ] A coin collected by one player disappears for both
- [ ] The winner gets the bonus, both get XP
- [ ] Buying an upgrade on one client doesn't change the other player

**Data test (published place, API access on)**
- [ ] Coins, XP and upgrades survive leaving and rejoining
- [ ] Coins survive a server shutdown (stop the test while playing, rejoin)

**Store test**
- [ ] 2× Coins pass doubles coins without rejoining
- [ ] Coin Pack product grants coins exactly once per purchase

**Device test**
- [ ] Device emulator: phone, tablet, desktop, console
- [ ] One real phone, from your own account

## When something doesn't work

| Symptom | Most likely cause | Look at |
|---|---|---|
| `X is not a valid member of Y` | Wrong name or wrong location | This map, then the lesson in brackets |
| `Infinite yield possible on WaitForChild` | The object doesn't exist or is misspelled | The object's exact name and parent |
| HUD shows 0 coins | `leaderstats` not created, or created too late | 6.1, 6.4 |
| Coins don't save in Studio | API access for Studio is off | 6.2 |
| Upgrade works once, then disappears | Not applied on `CharacterAdded` | 7.4 |
| Purchase granted twice or never | Product granted outside `ProcessReceipt` | 8.3 |
