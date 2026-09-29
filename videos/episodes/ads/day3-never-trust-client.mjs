// Instagram week · Day 3 (Wed) · Story: the exploit that ruins games
export default {
  id: "ig-day3-never-trust-client",
  format: "portrait",
  badge: "ROBLOX DEV TIP #2",
  music: "hype",
  speed: 1.06,
  segments: [
    {
      scene: { type: "statement", text: "One line of code gave a hacker *999,999 coins.*" },
      say: "One line of code gave a hacker nine hundred ninety nine thousand coins.",
    },
    {
      scene: { type: "code", file: "ServerScript (DON'T)", code: `AddCoins.OnServerEvent:Connect(\n  function(player, amount)\n    coins.Value += amount\n  end)`, focus: [[2, 3]] },
      say: "This server code trusts the number the player sends. An exploiter just sends a huge one.",
    },
    {
      scene: { type: "statement", eyebrow: "THE GOLDEN RULE", text: "Never trust the *client.*", sub: "Send intent. Let the server decide." },
      say: ["The golden rule of Roblox: never trust the client.", "The player sends what they want to do. The server checks the rules and decides."],
    },
    {
      scene: { type: "code", file: "ServerScript (DO)", code: `BuyUpgrade.OnServerEvent:Connect(\n  function(player, name)\n    local price = Prices[name]\n    if not price then return end\n    if coins.Value < price then return end\n    coins.Value -= price\n  end)`, focus: [[3, 5]] },
      say: "Like this. The server looks up the real price, checks the balance, and only then takes the coins.",
    },
    {
      scene: { type: "cta", title: "Build games that *can't be broken.*", sub: "PIXEL KIT · Module 05", button: "LINK IN BIO" },
      say: "We teach this in module five of PIXEL KIT. Link in bio.",
    },
  ],
};
