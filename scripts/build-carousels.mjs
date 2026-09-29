// Renders Instagram carousel slides (1080×1350 PNG) into social/carousels/<name>/.
//
//   node scripts/build-carousels.mjs

import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const FONTS = pathToFileURL(join(ROOT, "assets/fonts/fonts.css")).href;
// Your Instagram handle, shown in the slide footer: IG_HANDLE=@yourname node scripts/build-carousels.mjs
const HANDLE = process.env.IG_HANDLE || "@pixelkit";

const CAROUSELS = {
  "studio-shortcuts": [
    { kind: "cover", eyebrow: "SAVE THIS", title: "7 Roblox Studio shortcuts that make you *2× faster*", foot: "Swipe →" },
    { kind: "key", n: 1, keys: ["F"], title: "Focus", text: "Jump the camera to whatever you selected. Never get lost in your map again." },
    { kind: "key", n: 2, keys: ["Ctrl", "D"], title: "Duplicate", text: "Copy the selected part in place. Build a row of platforms in seconds." },
    { kind: "key", n: 3, keys: ["Ctrl", "G"], title: "Group", text: "Turn a pile of parts into one model. Name it right away." },
    { kind: "key", n: 4, keys: ["Ctrl", "2 3 4"], title: "Move · Scale · Rotate", text: "Switch tools without touching the toolbar. Ctrl+1 goes back to Select." },
    { kind: "key", n: 5, keys: ["F5"], title: "Play", text: "Test as a real player. Shift+F5 stops. Edits during Play are thrown away." },
    { kind: "key", n: 6, keys: ["Ctrl", "Shift", "F"], title: "Find in all scripts", text: "Search every script at once. Great for hunting hidden require( backdoors." },
    { kind: "key", n: 7, keys: ["Shift"], title: "Slow camera", text: "Hold Shift while flying for precise placement." },
    { kind: "cta", title: "Want to build a *whole game?*", text: "PIXEL KIT: 9 modules, 43 lessons, one shipped Roblox game. First lesson free.", foot: "Link in bio" },
  ],
  "first-game-roadmap": [
    { kind: "cover", eyebrow: "ROADMAP", title: "Your first Roblox game in *9 steps*", foot: "Swipe →" },
    { kind: "steps", title: "Build it", items: ["01 · Install Studio, publish a test place", "02 · Build the map: parts, terrain, lighting", "03 · Learn Luau: make lava hurt"] },
    { kind: "steps", title: "Make it work", items: ["04 · Intro screen, menu and HUD", "05 · Client vs server: stop exploiters", "06 · Save coins, XP and levels"] },
    { kind: "steps", title: "Make it a game", items: ["07 · Rounds, coins, upgrade shop", "08 · Game passes and a safe store", "09 · Launch, analytics, updates"] },
    { kind: "cta", title: "We teach *all 9.*", text: "Narrated videos + PDF workbooks. Pay once, keep forever. First lesson free.", foot: "Link in bio" },
  ],
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
const em = (s) => esc(s).replace(/\*(.+?)\*/g, '<span class="hl">$1</span>');
const LOGO = `<svg viewBox="0 0 8 8" shape-rendering="crispEdges"><rect width="8" height="8" fill="#000"/><path fill="#c6ff3d" d="M1 1h4v1H1zM1 2h1v5H1zM4 2h1v2H4zM2 3h2v1H2zM6 1h1v6H6z"/></svg>`;

function slideHTML(s, i, total) {
  let body = "";
  if (s.kind === "cover") body = `<div class="eyebrow">${esc(s.eyebrow)}</div><h1>${em(s.title)}</h1>`;
  if (s.kind === "key") body = `<div class="num">${String(s.n).padStart(2, "0")}</div><div class="keys">${s.keys.map((k) => `<kbd>${esc(k)}</kbd>`).join('<span class="plus">+</span>')}</div><h2>${esc(s.title)}</h2><p>${esc(s.text)}</p>`;
  if (s.kind === "steps") body = `<h2>${esc(s.title)}</h2><div class="steps">${s.items.map((t) => { const [n, x] = t.split(" · "); return `<div class="step"><b>${esc(n)}</b><span>${esc(x)}</span></div>`; }).join("")}</div>`;
  if (s.kind === "cta") body = `<h1>${em(s.title)}</h1><p>${esc(s.text)}</p><div class="btn">${esc(s.foot)} →</div>`;
  return `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="${FONTS}"><style>
    *{box-sizing:border-box;margin:0} html,body{width:1080px;height:1350px;overflow:hidden}
    body{background:#07070a;color:#f5f5f7;font-family:"Space Grotesk",sans-serif;position:relative;padding:110px 90px;display:flex;flex-direction:column;justify-content:center}
    body::before{content:"";position:absolute;inset:0;opacity:.45;background-image:linear-gradient(#23232e 2px,transparent 2px),linear-gradient(90deg,#23232e 2px,transparent 2px);background-size:72px 72px}
    body::after{content:"";position:absolute;width:1100px;height:1100px;right:-420px;top:-380px;border-radius:50%;background:radial-gradient(circle,rgba(198,255,61,.18),transparent 62%)}
    body>*{position:relative;z-index:1}
    .brand{position:absolute;top:70px;left:90px;display:flex;gap:14px;align-items:center;font:700 30px Silkscreen,monospace}.brand svg{width:40px;height:40px}
    .page{position:absolute;top:78px;right:90px;font:400 24px Silkscreen,monospace;color:#9b9bad}
    .foot{position:absolute;bottom:70px;left:90px;right:90px;display:flex;justify-content:space-between;font:400 24px Silkscreen,monospace;color:#9b9bad}
    .foot b{color:#c6ff3d;font-weight:400}
    .hl{color:#c6ff3d}
    .eyebrow{font:400 34px Silkscreen,monospace;color:#c6ff3d;margin-bottom:36px;letter-spacing:.06em}
    h1{font-size:112px;line-height:1;letter-spacing:-.04em}
    h2{font-size:84px;letter-spacing:-.035em;line-height:1.02;margin-bottom:28px}
    p{font:500 40px/1.4 "Space Grotesk";color:#c8c8d4;max-width:880px}
    .num{font:700 150px/1 Silkscreen,monospace;color:#c6ff3d;margin-bottom:40px}
    .keys{display:flex;align-items:center;gap:18px;margin-bottom:54px}
    kbd{font:700 58px "JetBrains Mono",monospace;background:#17171f;border:3px solid #30303d;border-bottom-width:10px;padding:18px 34px;border-radius:14px;color:#fff}
    .plus{font:700 50px "Space Grotesk";color:#6b6b80}
    .steps{display:grid;gap:26px}.step{display:grid;grid-template-columns:120px 1fr;align-items:center;gap:20px;background:#121218;border:3px solid #23232e;padding:34px 34px}
    .step b{font:400 44px Silkscreen,monospace;color:#c6ff3d}.step span{font:600 44px/1.2 "Space Grotesk"}
    .btn{margin-top:60px;align-self:flex-start;font:400 40px Silkscreen,monospace;background:#c6ff3d;color:#0b0f00;padding:28px 42px;box-shadow:12px 12px 0 #6f9a00}
  </style></head><body>
    <div class="brand">${LOGO}PIXEL KIT</div><div class="page">${i + 1}/${total}</div>
    ${body}
    <div class="foot"><span>${esc(HANDLE)}</span><b>${s.kind === "cta" ? "" : esc(s.foot || "Swipe →")}</b></div>
  </body></html>`;
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
for (const [name, slides] of Object.entries(CAROUSELS)) {
  const dir = join(ROOT, "social", "carousels", name);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  for (const [i, s] of slides.entries()) {
    // Load from a file (not setContent) so the local font files are allowed to load.
    const tmp = join(dir, `.slide-${i}.html`);
    writeFileSync(tmp, slideHTML(s, i, slides.length));
    await page.goto(pathToFileURL(tmp).href, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: join(dir, `slide-${String(i + 1).padStart(2, "0")}.png`) });
    rmSync(tmp);
  }
  console.log(`social/carousels/${name}: ${slides.length} slides`);
}
await browser.close();
