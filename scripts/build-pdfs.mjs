// Builds the course PDFs from the markdown in course/.
//
//   node scripts/build-pdfs.mjs
//
// Output (course/pdf/):
//   00-free-lesson-intro-screen.pdf   lead magnet
//   01-…09-*.pdf                      one PDF per module
//   pixelkit-full-course.pdf          everything, with a course cover and table of contents
//   bonus-*.pdf                       bonus PDFs from course/bonuses/
//   pack-*.pdf                        Genre Packs from course/packs/ (sold separately)
//   docs/PIXEL-KIT-Navod.pdf          the Slovak launch guide (SPUSTENIE.md), for the owner

import { readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { Marked } from "marked";
import hljs from "highlight.js";
import { chromium } from "playwright";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const COURSE = join(ROOT, "course");
const OUT = join(COURSE, "pdf");
const BUILD = join(OUT, ".build");

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const marked = new Marked({
  gfm: true,
  renderer: {
    code({ text, lang }) {
      const language = lang && hljs.getLanguage(lang) ? lang : "plaintext";
      const html = language === "plaintext" ? esc(text) : hljs.highlight(text, { language }).value;
      // Long listings may split across pages; short ones stay together.
      const long = text.split("\n").length > 36 ? " long" : "";
      return `<pre class="code${long}"><code class="hljs lang-${language}">${html}</code></pre>\n`;
    },
  },
});

function render(md) {
  let html = marked.parse(md);
  // Callouts: > **Tip:** … / > **Watch out:** …
  html = html.replace(/<blockquote>\s*<p><strong>(Tip|Watch out):<\/strong>/g, (_, kind) => {
    const cls = kind === "Tip" ? "tip" : "warn";
    return `<blockquote class="callout ${cls}"><p><span class="callout-label">${kind}</span>`;
  });
  // "Try it" exercise blocks: wrap the h3 and following list
  html = html.replace(/<h3>Try it<\/h3>\s*(<ol>[\s\S]*?<\/ol>|<ul>[\s\S]*?<\/ul>)/g,
    (_, list) => `<div class="tryit"><div class="tryit-label">Try it</div>${list}</div>`);
  // Lesson headings: <h2>3.4 Functions</h2> → number chip
  html = html.replace(/<h2>([A-Z0-9]+\.\d+)\s+([^<]+)<\/h2>/g,
    (_, n, t) => `<h2 class="lesson"><span class="num">${n}</span>${t}</h2>`);
  return html;
}

function parseModule(file) {
  const md = readFileSync(join(COURSE, "modules", file), "utf8");
  const [, num, title] = md.match(/^#\s+Module\s+(\d+)\s+·\s+(.+)$/m);
  const ship = (md.match(/^\*\*You'll ship:\*\*\s*(.+)$/m) || [])[1] || "";
  const lessons = [...md.matchAll(/^##\s+(\d+\.\d+)\s+(.+)$/gm)].map((m) => ({ n: m[1], t: m[2] }));
  const body = md.replace(/^#\s+Module.*$/m, "").replace(/^\*\*You'll ship:\*\*.*$/m, "");
  const shipText = ship.charAt(0).toUpperCase() + ship.slice(1);
  return { file, num: Number(num), title, ship: shipText, lessons, html: render(body) };
}

const LOGO = `<svg viewBox="0 0 8 8" shape-rendering="crispEdges" aria-hidden="true"><rect width="8" height="8" fill="#000"/><path fill="#c6ff3d" d="M1 1h4v1H1zM1 2h1v5H1zM4 2h1v2H4zM2 3h2v1H2zM6 1h1v6H6z"/></svg>`;

const CSS = `
@import url("${pathToFileURL(join(ROOT, "assets/fonts/fonts.css")).href}");
@page {
  size: A4;
  margin: 18mm 17mm 20mm 17mm;
  @bottom-left { content: "PIXEL KIT"; font: 600 7.5pt "Space Grotesk"; color: #8a8a99; letter-spacing: .08em; }
  @bottom-right { content: counter(page); font: 600 8pt "Space Grotesk"; color: #8a8a99; }
}
@page cover { margin: 0; @bottom-left { content: none } @bottom-right { content: none } }
* { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; font: 10.2pt/1.62 Inter, sans-serif; color: #1a1a22; }
h1, h2, h3 { font-family: "Space Grotesk", sans-serif; letter-spacing: -0.01em; line-height: 1.2; color: #0b0b10; }
h2 { font-size: 17pt; margin: 26pt 0 8pt; break-after: avoid; }
h2.lesson { display: flex; align-items: center; gap: 10pt; padding-top: 6pt; border-top: 1.2pt solid #e6e6ee; }
h2.lesson .num { font: 700 10pt Silkscreen, monospace; background: #0b0b10; color: #c6ff3d; padding: 4pt 7pt 3pt; border-radius: 3pt; letter-spacing: .04em; }
h3 { font-size: 12pt; margin: 16pt 0 6pt; break-after: avoid; }
p { margin: 0 0 8pt; }
a { color: #4d7a00; }
strong { font-weight: 600; color: #0b0b10; }
hr { border: 0; height: 0; margin: 12pt 0; }
ul, ol { padding-left: 16pt; margin: 0 0 9pt; }
li { margin: 2pt 0; }
li::marker { color: #6f9a00; font-weight: 600; }
code { font: 8.6pt "JetBrains Mono", monospace; background: #f0f0f5; color: #3a1d6e; padding: 0.5pt 3.5pt; border-radius: 3pt; }
pre.code { background: #0e0e13; color: #e6e6ee; border-radius: 6pt; padding: 11pt 13pt; margin: 6pt 0 12pt; border-left: 3pt solid #c6ff3d; break-inside: avoid; white-space: pre-wrap; word-break: break-word; }
pre.code.long { break-inside: auto; }
pre.code code { background: none; color: inherit; padding: 0; font-size: 8.3pt; line-height: 1.55; }
code, pre { font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; tab-size: 3; }
.hljs-keyword, .hljs-built_in.hljs-keyword { color: #ff6fb3; }
.hljs-string, .hljs-template-string { color: #c6ff3d; }
.hljs-number, .hljs-literal { color: #ffd23d; }
.hljs-comment { color: #75758c; font-style: italic; }
.hljs-built_in, .hljs-title, .hljs-title.function_ { color: #5ee6ff; }
.hljs-params, .hljs-attr { color: #e6e6ee; }
table { width: 100%; border-collapse: collapse; margin: 6pt 0 12pt; font-size: 9pt; break-inside: avoid; }
th { background: #0b0b10; color: #fff; text-align: left; font: 600 8.6pt "Space Grotesk"; padding: 6pt 8pt; }
td { padding: 5.5pt 8pt; border-bottom: 0.8pt solid #e6e6ee; vertical-align: top; }
tr:nth-child(even) td { background: #f7f7fa; }
.callout { margin: 8pt 0 12pt; padding: 9pt 12pt; border-radius: 6pt; break-inside: avoid; }
.callout p { margin: 0; }
.callout-label { display: inline-block; font: 700 7.5pt Silkscreen, monospace; letter-spacing: .06em; padding: 2pt 6pt 1pt; margin-right: 7pt; border-radius: 3pt; text-transform: uppercase; }
.callout.tip { background: #f4ffe0; border: 1pt solid #cdea8f; }
.callout.tip .callout-label { background: #c6ff3d; color: #0b0f00; }
.callout.warn { background: #fff1f7; border: 1pt solid #ffc2dc; }
.callout.warn .callout-label { background: #ff4fa3; color: #fff; }
.tryit { margin: 12pt 0; padding: 12pt 14pt 6pt; border: 1.4pt dashed #6f9a00; border-radius: 8pt; background: #fbfff2; break-inside: avoid; }
.tryit-label { font: 700 9pt Silkscreen, monospace; color: #4d7a00; margin-bottom: 6pt; letter-spacing: .05em; }
ul:has(> li > input[type=checkbox]) { list-style: none; padding-left: 0; }
li:has(> input[type=checkbox]) { position: relative; padding-left: 17pt; }
li > input[type=checkbox] { appearance: none; position: absolute; left: 0; top: 3.5pt; width: 9pt; height: 9pt; border: 1.4pt solid #6f9a00; border-radius: 2pt; margin: 0; }

/* Cover pages */
.cover { page: cover; break-after: page; height: 297mm; width: 210mm; background: #07070a; color: #f5f5f7; position: relative; overflow: hidden; padding: 26mm 20mm; display: flex; flex-direction: column; }
.cover::before { content: ""; position: absolute; inset: 0; opacity: .5; background-image: linear-gradient(#23232e 1px, transparent 1px), linear-gradient(90deg, #23232e 1px, transparent 1px); background-size: 9mm 9mm; }
.cover::after { content: ""; position: absolute; width: 170mm; height: 170mm; right: -60mm; top: -30mm; background: radial-gradient(circle, rgba(198,255,61,.22), transparent 62%); }
.cover > * { position: relative; z-index: 1; }
.brand { display: flex; align-items: center; gap: 8pt; font: 700 13pt Silkscreen, monospace; }
.brand svg { width: 20pt; height: 20pt; }
.cover .eyebrow { margin-top: auto; font: 400 11pt Silkscreen, monospace; color: #c6ff3d; letter-spacing: .08em; }
.cover .bignum { font: 700 110pt/0.9 Silkscreen, monospace; color: #c6ff3d; margin: 6pt 0 10pt -4pt; }
.cover h1 { color: #fff; font-size: 40pt; line-height: 1.02; letter-spacing: -0.035em; margin: 0 0 16pt; }
.cover .ship { display: inline-flex; gap: 8pt; align-items: center; align-self: flex-start; font-size: 10.5pt; border: 1pt solid #3a3a48; background: rgba(18,18,24,.9); padding: 7pt 12pt; border-radius: 4pt; color: #d6d6e0; }
.cover .ship b { font: 700 8pt Silkscreen, monospace; color: #0b0f00; background: #c6ff3d; padding: 2pt 6pt 1pt; border-radius: 2pt; }
.cover ol { list-style: none; padding: 0; margin: 22pt 0 0; border-top: 1pt solid #2a2a36; }
.cover ol li { display: flex; gap: 12pt; padding: 7pt 0; border-bottom: 1pt solid #2a2a36; font: 500 11pt "Space Grotesk"; color: #e6e6ee; }
.cover ol li span { font: 400 9pt Silkscreen, monospace; color: #c6ff3d; width: 30pt; padding-top: 2pt; }
.cover .foot { margin-top: 18pt; font-size: 8.5pt; color: #8a8a99; display: flex; justify-content: space-between; }
.course-cover h1 { font-size: 54pt; }
.pack-cover .eyebrow, .pack-cover .bignum { color: var(--pc); }
.pack-cover .bignum { font-size: 64pt; line-height: 1; margin: 10pt 0 14pt; }
.pack-cover::after { background: radial-gradient(circle, color-mix(in srgb, var(--pc) 24%, transparent), transparent 62%); }
.pack-cover .ship b { background: var(--pc); }
.pack-cover ol li span { color: var(--pc); }
.course-cover .lead { font-size: 13pt; color: #b8b8c8; max-width: 140mm; margin: 0 0 20pt; }

/* Table of contents */
.toc { break-after: page; }
.toc h2 { border: 0; margin-top: 0; font-size: 26pt; }
.toc-mod { display: grid; grid-template-columns: 34pt 1fr; gap: 4pt 10pt; padding: 9pt 0; border-bottom: 1pt solid #e6e6ee; break-inside: avoid; }
.toc-mod .n { font: 700 16pt Silkscreen, monospace; color: #6f9a00; }
.toc-mod .t { font: 600 13pt "Space Grotesk"; }
.toc-mod .ls { grid-column: 2; font-size: 9pt; color: #55556a; }
`;

function moduleCover(m) {
  return `<section class="cover">
    <div class="brand">${LOGO}PIXEL KIT</div>
    <div class="eyebrow">Module ${String(m.num).padStart(2, "0")} of 09</div>
    <div class="bignum">${String(m.num).padStart(2, "0")}</div>
    <h1>${esc(m.title)}</h1>
    ${m.ship ? `<div class="ship"><b>YOU'LL SHIP</b>${esc(m.ship)}</div>` : ""}
    <ol>${m.lessons.map((l) => `<li><span>${l.n}</span>${esc(l.t)}</li>`).join("")}</ol>
    <div class="foot"><span>Learn Roblox Studio. Ship real games.</span><span>pixelkit</span></div>
  </section>`;
}

function page(title, inner) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(title)}</title><style>${CSS}</style></head><body>${inner}</body></html>`;
}

const moduleFiles = readdirSync(join(COURSE, "modules")).filter((f) => /^\d\d-.*\.md$/.test(f)).sort();
const modules = moduleFiles.map(parseModule);

// Free lesson
const freeMd = readFileSync(join(COURSE, "free-lesson-intro-screen.md"), "utf8");
const freeTitle = (freeMd.match(/^#\s+(Build .+)$/m) || [])[1] || "Free Lesson";
const freeBody = freeMd.replace(/^#\s+PIXEL KIT.*$/m, "").replace(/^#\s+Build .*$/m, "");
const freeCover = `<section class="cover">
  <div class="brand">${LOGO}PIXEL KIT</div>
  <div class="eyebrow">Free lesson · from Module 04</div>
  <div class="bignum">4.1</div>
  <h1>${esc(freeTitle)}</h1>
  <div class="ship"><b>YOU'LL SHIP</b>A black-screen logo intro with a smooth fade and scale pop</div>
  <div class="foot" style="margin-top:auto"><span>Learn Roblox Studio. Ship real games.</span><span>pixelkit</span></div>
</section>`;

const docs = [
  { name: "00-free-lesson-intro-screen", title: freeTitle, html: page(freeTitle, freeCover + `<main>${render(freeBody)}</main>`) },
  ...modules.map((m) => ({
    name: m.file.replace(/\.md$/, ""),
    title: `Module ${m.num} · ${m.title}`,
    html: page(`Module ${m.num} · ${m.title}`, moduleCover(m) + `<main class="module">${m.html}</main>`),
  })),
];

// Bonuses (course/bonuses/NN-*.md with "# Bonus · Title")
const bonusFiles = readdirSync(join(COURSE, "bonuses")).filter((f) => /^\d\d-.*\.md$/.test(f)).sort();
for (const [i, file] of bonusFiles.entries()) {
  const md = readFileSync(join(COURSE, "bonuses", file), "utf8");
  const title = (md.match(/^#\s+Bonus\s+·\s+(.+)$/m) || [])[1] || file;
  const ship = (md.match(/^\*\*You'll get:\*\*\s*(.+)$/m) || [])[1] || "";
  const body = md.replace(/^#\s+Bonus.*$/m, "").replace(/^\*\*You'll get:\*\*.*$/m, "");
  const cover = `<section class="cover">
    <div class="brand">${LOGO}PIXEL KIT</div>
    <div class="eyebrow">Bonus ${i + 1} of ${bonusFiles.length}</div>
    <div class="bignum">+${i + 1}</div>
    <h1>${esc(title)}</h1>
    ${ship ? `<div class="ship"><b>YOU GET</b>${esc(ship.charAt(0).toUpperCase() + ship.slice(1))}</div>` : ""}
    <div class="foot" style="margin-top:auto"><span>Learn Roblox Studio. Ship real games.</span><span>pixelkit</span></div>
  </section>`;
  docs.push({ name: `bonus-${file.replace(/\.md$/, "")}`, title: `Bonus · ${title}`, html: page(`Bonus · ${title}`, cover + `<main>${render(body)}</main>`) });
}

const courseCover = `<section class="cover course-cover">
  <div class="brand">${LOGO}PIXEL KIT</div>
  <div class="eyebrow">The complete course</div>
  <h1>Learn Roblox Studio.<br><span style="color:#c6ff3d">Ship real games.</span></h1>
  <p class="lead">Nine modules, ${modules.reduce((n, m) => n + m.lessons.length, 0)} lessons, one shipped game: take Coin Rush from an empty baseplate to a published, monetized Roblox game.</p>
  <div class="foot" style="margin-top:auto"><span>PIXEL KIT is not affiliated with Roblox Corporation.</span><span>pixelkit</span></div>
</section>`;
const toc = `<section class="toc"><h2>Contents</h2>${modules.map((m) => `
  <div class="toc-mod"><div class="n">${String(m.num).padStart(2, "0")}</div><div class="t">${esc(m.title)}</div>
  <div class="ls">${m.lessons.map((l) => `${l.n} ${esc(l.t)}`).join(" · ")}</div></div>`).join("")}</section>`;
docs.push({
  name: "pixelkit-full-course",
  title: "PIXEL KIT – The Complete Course",
  html: page("PIXEL KIT – The Complete Course",
    courseCover + toc + modules.map((m) => moduleCover(m) + `<main class="module">${m.html}</main>`).join("")),
});

// Genre Packs (course/packs/<slug>.md with "# Name Pack · Subtitle")
const PACK_COLORS = { horror: "#ff4fa3", tycoon: "#ffd23d", obby: "#c6ff3d", simulator: "#5ee6ff" };
const packFiles = existsSync(join(COURSE, "packs")) ? readdirSync(join(COURSE, "packs")).filter((f) => f.endsWith(".md")).sort() : [];
for (const file of packFiles) {
  const slug = file.replace(/\.md$/, "");
  const md = readFileSync(join(COURSE, "packs", file), "utf8");
  const [, name, subtitle] = md.match(/^#\s+(.+?)\s+·\s+(.+)$/m);
  const ship = (md.match(/^\*\*You'll ship:\*\*\s*(.+)$/m) || [])[1] || "";
  const lessons = [...md.matchAll(/^##\s+([A-Z]\.\d+)\s+(.+)$/gm)].map((m) => ({ n: m[1], t: m[2] }));
  const body = md.replace(/^#\s+.*$/m, "").replace(/^\*\*You'll ship:\*\*.*$/m, "");
  const c = PACK_COLORS[slug] || "#c6ff3d";
  const cover = `<section class="cover pack-cover" style="--pc:${c}">
    <div class="brand">${LOGO}PIXEL KIT</div>
    <div class="eyebrow">Genre Pack · ${lessons.length} lessons</div>
    <div class="bignum">${esc(name.replace(/\s*Pack$/, "").toUpperCase())}</div>
    <h1>${esc(subtitle)}</h1>
    ${ship ? `<div class="ship"><b>YOU'LL SHIP</b>${esc(ship.charAt(0).toUpperCase() + ship.slice(1))}</div>` : ""}
    <ol>${lessons.map((l) => `<li><span>${l.n}</span>${esc(l.t)}</li>`).join("")}</ol>
    <div class="foot"><span>PIXEL KIT is not affiliated with Roblox Corporation.</span><span>pixelkit</span></div>
  </section>`;
  docs.push({ name: `pack-${slug}`, title: `${name} · ${subtitle}`, html: page(`${name} · ${subtitle}`, cover + `<main class="module">${render(body)}</main>`) });
}

// Owner's launch guide (Slovak)
const guideMd = readFileSync(join(ROOT, "SPUSTENIE.md"), "utf8");
const guideTitle = (guideMd.match(/^#\s+(.+)$/m) || [])[1] || "Návod";
const guideCover = `<section class="cover">
  <div class="brand">${LOGO}PIXEL KIT</div>
  <div class="eyebrow">Návod pre majiteľa</div>
  <h1>${esc(guideTitle)}</h1>
  <div class="ship"><b>OBSAH</b>Web · e-maily · platby · videá · Instagram a TikTok</div>
  <div class="foot" style="margin-top:auto"><span>Interný dokument, nezdieľaj ho so zákazníkmi.</span><span>pixelkit</span></div>
</section>`;
docs.push({
  name: "PIXEL-KIT-Navod", out: join(ROOT, "docs"), title: guideTitle,
  html: page(guideTitle, guideCover + `<main>${render(guideMd.replace(/^#\s+.*$/m, ""))}</main>`).replace('lang="en"', 'lang="sk"'),
});

rmSync(BUILD, { recursive: true, force: true });
mkdirSync(BUILD, { recursive: true });

const browser = await chromium.launch();
const pageObj = await browser.newPage();
for (const doc of docs) {
  const htmlPath = join(BUILD, `${doc.name}.html`);
  writeFileSync(htmlPath, doc.html);
  await pageObj.goto(pathToFileURL(htmlPath).href, { waitUntil: "load" });
  await pageObj.evaluate(() => document.fonts.ready);
  const outDir = doc.out || OUT;
  mkdirSync(outDir, { recursive: true });
  await pageObj.pdf({ path: join(outDir, `${doc.name}.pdf`), format: "A4", printBackground: true, preferCSSPageSize: true });
  console.log(join(outDir, `${doc.name}.pdf`).replace(ROOT + "/", ""));
}
await browser.close();
rmSync(BUILD, { recursive: true, force: true });
