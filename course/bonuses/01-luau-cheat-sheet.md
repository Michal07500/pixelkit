# Bonus · Luau Cheat Sheet

Everything you'll type 90% of the time, on a few pages. Keep it open next to Roblox Studio.

**You'll get:** the syntax, services and patterns every Roblox game uses.

---

## Basics

```lua
local name = "Coin Rush"     -- string
local coins = 0              -- number
local alive = true           -- boolean
local nothing = nil          -- no value

coins += 10                  -- also -=, *=, /=
local label = `Coins: {coins}`   -- string interpolation
print(#name)                 -- length of a string or list: 9
```

| Compare | Meaning | Logic | Meaning |
|---|---|---|---|
| `==` | equal | `and` | both true |
| `~=` | not equal | `or` | either true |
| `<` `>` `<=` `>=` | order | `not` | flip |

## Control flow

```lua
if coins >= 100 then
	print("Rich")
elseif coins > 0 then
	print("Getting there")
else
	print("Broke")
end

for i = 1, 10 do print(i) end           -- 1..10
for i = 10, 1, -1 do print(i) end       -- countdown
for index, value in list do end         -- lists
for key, value in dict do end           -- dictionaries

while running do
	task.wait(1)                        -- ALWAYS wait inside a loop
end
```

## Functions

```lua
local function add(a: number, b: number): number
	return a + b
end

local ok, result = pcall(riskyFunction)  -- catch errors
task.spawn(fn)                           -- run without waiting
task.delay(2, fn)                        -- run after 2 seconds
```

## Tables

```lua
local list = { "Red", "Blue" }
table.insert(list, "Green")
table.remove(list, 1)
print(list[1], #list)

local prices = { Speed = 100, Jump = 150 }
prices.Shield = 500
prices.Speed = nil                      -- delete a key
local copy = table.clone(prices)
```

## Services you'll use constantly

```lua
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local ServerStorage = game:GetService("ServerStorage")
local TweenService = game:GetService("TweenService")
local RunService = game:GetService("RunService")
local DataStoreService = game:GetService("DataStoreService")
local MarketplaceService = game:GetService("MarketplaceService")
local SoundService = game:GetService("SoundService")
local Debris = game:GetService("Debris")
```

## Instances

```lua
local part = Instance.new("Part")
part.Size = Vector3.new(4, 1, 4)
part.Position = Vector3.new(0, 10, 0)
part.Anchored = true
part.Color = Color3.fromRGB(198, 255, 61)
part.Material = Enum.Material.Neon
part.Parent = workspace                 -- set Parent LAST

local obj = workspace:WaitForChild("Lava")      -- waits until it exists
local maybe = workspace:FindFirstChild("Lava")  -- nil if missing
obj:Destroy()
```

## Players & characters

```lua
Players.PlayerAdded:Connect(function(player)
	player.CharacterAdded:Connect(function(character)
		local humanoid = character:WaitForChild("Humanoid")
		humanoid.WalkSpeed = 20
	end)
end)

local player = Players:GetPlayerFromCharacter(hit.Parent)  -- who touched?
local me = Players.LocalPlayer                            -- client only
```

## Patterns you'll reuse forever

**Debounce (stop an event firing 30× a second)**
```lua
local busy = false
part.Touched:Connect(function(hit)
	if busy then return end
	busy = true
	-- do the thing
	task.wait(1)
	busy = false
end)
```

**Secure remote (client asks, server decides)**
```lua
Remote.OnServerEvent:Connect(function(player, itemName)
	if typeof(itemName) ~= "string" then return end
	local price = Prices[itemName]
	if not price or coins.Value < price then return end
	coins.Value -= price
end)
```

**Tween (smooth animation)**
```lua
TweenService:Create(frame, TweenInfo.new(0.3, Enum.EasingStyle.Back),
	{ Position = UDim2.fromScale(0.5, 0.5) }):Play()
```

**Save data safely**
```lua
local ok, err = pcall(function()
	store:UpdateAsync("Player_" .. player.UserId, function()
		return data
	end)
end)
if not ok then warn("Save failed:", err) end
```

## UI quick reference

| Want | Use |
|---|---|
| Same size on every screen | `UDim2.fromScale(0.2, 0.1)` |
| Center something | `AnchorPoint = Vector2.new(0.5, 0.5)`, `Position = UDim2.fromScale(0.5, 0.5)` |
| Keep a shape square | `UIAspectRatioConstraint` with `AspectRatio = 1` |
| Rounded corners | `UICorner` |
| Outline text | `UIStroke` |
| Stack items | `UIListLayout` |
| Button that works on touch + mouse + gamepad | `button.Activated:Connect(...)` |

## Where scripts go

| Script type | Put it in | Runs on |
|---|---|---|
| Script | ServerScriptService | Server |
| LocalScript | StarterPlayerScripts, StarterGui, ReplicatedFirst | Player's device |
| ModuleScript | ReplicatedStorage (shared) or ServerScriptService (server-only) | Whoever requires it |

> **Tip:** When something doesn't work, open **View → Output** first. The error message and line number tell you where to look 90% of the time.
