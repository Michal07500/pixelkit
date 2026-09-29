// Instagram week · Day 3 (Wed) · Story: the exploit that ruins a game
export default {
  id: "ig-day3-never-trust-client",
  format: "portrait",
  badge: "ROBLOX DEV TIP #2",
  style: "adhd",
  music: "phonk",
  musicDb: -23,
  speed: 1.18,
  segments: [
    {
      scene: { broll: "tower-defense", sticker: "🚀", type: "statement", text: "Your game *finally* takes off.", sub: "Hundreds of players. Your first sales." },
      say: ["Picture this. Your game finally takes off.", "Hundreds of players. Your first sales."],
    },
    {
      scene: { broll: "horror-hall", sticker: "💀", type: "punch", text: "Then *this* happens.", sub: "One exploiter. 999,999 coins. Economy ruined." },
      say: ["Then this happens.", "One exploiter gives himself nine hundred ninety nine thousand coins, and your whole economy is ruined overnight."],
    },
    {
      scene: { type: "code", file: "ServerScript (the bug)", code: `AddCoins.OnServerEvent:Connect(\n  function(player, amount)\n    coins.Value += amount\n  end)`, focus: [[2, 3]] },
      say: "The cause? One line that trusts the number the player sends.",
    },
    {
      scene: { sticker: "🛡️", type: "punch", text: "Never trust the *client.*" },
      say: "The golden rule: never trust the client!",
    },
    {
      scene: { type: "code", file: "ServerScript (the fix)", code: `BuyUpgrade.OnServerEvent:Connect(\n  function(player, name)\n    local price = Prices[name]\n    if not price then return end\n    if coins.Value < price then return end\n    coins.Value -= price\n  end)`, focus: [[3, 5]] },
      say: "The player asks. The server checks the real price and the balance, and decides. Exploit closed.",
    },
    {
      scene: { sticker: "🔒", type: "cta", title: "Build games that *can't be broken.*", sub: "PIXEL KIT · Module 05", button: "LINK IN BIO" },
      say: "Protect the game you worked so hard on. Link in bio.",
    },
  ],
};
