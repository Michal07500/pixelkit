# PIXEL KIT: ako to celé spustiť (krok za krokom)

Tento návod ťa prevedie od stiahnutia až po prvú predaj. Predpokladá, že nič z toho si ešte nerobil.

## Čo je hotové v repozitári

| Priečinok / súbor | Čo to je |
|---|---|
| `site/` | Web: landing page, `thanks.html` (po zaplatení), `privacy.html`, lekcia zadarmo v `site/free/`, trailer v `site/media/` |
| `course/modules/` | Celý kurz v textovej podobe (9 modulov, 43 lekcií) |
| `course/pdf/` | PDF: 9 modulov, lekcia zadarmo, celý kurz v jednom PDF a 3 bonusy |
| `videos/out/` | Všetky hotové videá s komentátorom (kurz + reklamy) |
| `social/` | Instagram: plán na týždeň, popisky, hashtagy, karusely |
| `assets/brand/` | Logo, profilovka na Instagram, logo pre Roblox intro |
| `index.ts`, `scripts/hf-generate.ts` | Higgsfield (Seedance 2.5): test a generovanie AI klipov |
| `PLAN.md` | Obchodný plán (ceny, marketing, čísla) |

---

## 1. Web online (15 minút, zadarmo)

1. Choď na **app.netlify.com** a prihlás sa cez GitHub.
2. **Add new site → Import an existing project → GitHub →** vyber repozitár **pixelkit**.
3. Build command nechaj **prázdny**. Súbor `netlify.toml` sám nastaví, že sa zverejní len priečinok `site/`.
4. Klikni **Deploy**. O minútu máš adresu typu `nieco.netlify.app`.
5. (Voliteľné) **Domain settings → Add a custom domain**, ak si kúpiš doménu (napr. `pixelkit.gg`).

Odteraz sa web aktualizuje sám pri každej zmene na GitHube.

## 2. Zbieranie e-mailov (10 minút, zadarmo)

1. Založ si účet na **formspree.io** a vytvor nový formulár.
2. Skopíruj jeho adresu (napr. `https://formspree.io/f/abcdwxyz`).
3. Na GitHube otvor `site/index.html`, klikni na ceruzku (Edit) a nájdi blok `CONFIG` úplne dole.
4. Vlož adresu do `FORM_ENDPOINT: "https://formspree.io/f/abcdwxyz",` a ulož (Commit changes).
5. Otvor web, zapíš sa vlastným e-mailom. Hneď uvidíš odkazy na lekciu zadarmo (PDF + video) a e-mail sa objaví vo Formspree.

## 3. Platobná brána (30 minút)

Odporúčam **Lemon Squeezy**: rieši platby kartou, PayPal aj Apple Pay, **sám odvádza DPH v EÚ** a po zaplatení sám pošle zákazníkovi súbory na stiahnutie.

**3.1 Priprav balík kurzu** (na počítači, pozri časť 7.1 ako rozbehnúť projekt):
```bash
npm run release
```
Vznikne `dist/PIXEL-KIT-Core-Course.zip` (všetky PDF + videá + návod „START HERE“).

**3.2 Nastav obchod:**
1. Registrácia na **lemonsqueezy.com**, vytvor obchod (Store). Vyplň údaje na výplaty (Payouts) a over identitu.
2. **Products → New product**, vytvor tri produkty:

| Produkt | Cena (early access) | Súbor |
|---|---|---|
| PIXEL KIT Core Course | $29 | `PIXEL-KIT-Core-Course.zip` |
| PIXEL KIT Creator Bundle | $59 | ten istý ZIP (Genre Packy doplníš, keď budú hotové) |
| PIXEL KIT All Access | $99 | ten istý ZIP |

3. Pri každom produkte v časti **Confirmation modal / Redirect** nastav návratovú adresu na `https://TVOJ-WEB/thanks.html`.
4. Pri produkte klikni **Share** a skopíruj **Checkout link**.
5. V `site/index.html` v bloku `CONFIG` vlož odkazy:
   ```js
   CHECKOUT: {
     course: "https://tvoj-obchod.lemonsqueezy.com/buy/...",
     bundle: "https://tvoj-obchod.lemonsqueezy.com/buy/...",
     all: "https://tvoj-obchod.lemonsqueezy.com/buy/...",
   },
   ```
   Web potom sám otvorí platobné okno priamo na stránke (overlay).
6. **Otestuj:** v Lemon Squeezy zapni **Test mode**, kúp si kurz testovacou kartou `4242 4242 4242 4242`, over, že prišiel e-mail so ZIP-om a presmerovalo ťa na `thanks.html`. Potom test mode vypni.

> Ak by bol ZIP na nahratie príliš veľký, nahraj videá na YouTube ako **Unlisted** (nezaradené) a do ZIP-u daj len PDF a súbor s odkazmi na videá.

**Alternatívy:** Gumroad (rovnako jednoduchý, tiež rieši DPH) alebo Stripe Payment Links (DPH si riešiš sám). Do `CHECKOUT` vložíš ich odkaz rovnakým spôsobom.

## 4. Doplň posledné údaje na webe

- `site/thanks.html` → na konci súboru `DISCORD_INVITE` (odkaz na tvoj Discord server) a `SUPPORT_EMAIL`.
- `site/privacy.html` → všetko v `[HRANATÝCH ZÁTVORKÁCH]` (meno, kontakt, dátum, poskytovatelia).
- Na webe sľubujeme **14-dňovú garanciu vrátenia peňazí**, a v balíku All Access **mesačný live Q&A** a **spätnú väzbu na hru**. Buď ich dodržuj, alebo ich z textu webu odstráň.

### 4.1 Prvky, ktoré predávajú (voliteľné, ale odporúčam)

V `site/index.html` v bloku `CONFIG`:

- **`FOUNDING_DEADLINE`**: dátum, kedy skončí cena pre zakladajúcich členov (napr. `"2026-11-01T23:59:00+01:00"`). V úvode webu sa zobrazí živý odpočet. **Nastav len skutočný termín a po ňom naozaj zvýš cenu na $49**, inak je to klamlivá reklama.
- **`FOUNDER`**: tvoja karta „Who's teaching“. Ľudia kupujú od ľudí. Vyplň meno, fotku (ulož ju do `site/media/founder.jpg`) a 2–3 vety, napr.:
  > *I'm building PIXEL HEIST, a Roblox heist game, and I made PIXEL KIT to teach exactly what I had to figure out the hard way: from the first part to a published game with a store.*
- **Recenzie:** keď prví kupujúci dokončia moduly, popros ich o krátku vetu a screenshot ich hry a pridaj ich na web. Nikdy si recenzie nevymýšľaj.

## 5. Videá: ako ich pustiť a kam nahrať

Všetky videá sú v `videos/out/` ako **MP4 (H.264 + AAC)**. Prehrá ich hocičo: prehliadač, VLC, telefón, Windows aj Mac.

| Súbor | Na čo |
|---|---|
| `course-m00-…free-lesson…mp4` | Video k lekcii zadarmo (už je aj na webe v `site/free/`) |
| `course-m01-…` až `course-m09-…` | Videá kurzu pre kupujúcich (sú v ZIP-e) |
| `ad-trailer-16x9.mp4` | Trailer na web (je v `site/media/`), YouTube, Facebook |
| `ig-day1-…` až `ig-day7-…` | Instagram Reels na celý týždeň (9:16), s našim phonk beatom |
| `ig-day…-nomusic.mp4` | Tie isté Reels bez hudby, na pridanie trendového songu priamo v Instagrame |
| `ig-extra1-30-days`, `ig-extra2-pov-first-game` | Bonusové Reels o vysnenom výsledku (2. týždeň alebo platená reklama) |

**Ako ich dostať na telefón:** stiahni ich z GitHubu (otvor súbor → **Download raw file**) alebo si ich pošli cez Google Drive / AirDrop / WhatsApp sebe.

**Najpohodlnejšie plánovanie:** **Meta Business Suite** (business.facebook.com) na počítači. Prepoj Instagram, **Create reel**, nahraj video, vlož popisku z `social/INSTAGRAM-WEEK.md` a daj **Schedule** na konkrétny deň a čas. Celý týždeň naplánuješ za 20 minút.

**Trendový song:** chceš známu pesničku? Nahraj verziu **`-nomusic`**, v Instagrame ťukni na **♪ Audio**, vyber trendový song (šípka ↗ = trenduje) a v **Mix audio** daj song na 20–30 %, pôvodný zvuk na 100 %. Songy z knižnice Instagramu sú licencované, takže reel nebude stlmený. (Známe songy nemôžem vložiť priamo do súborov, to by porušilo autorské práva.)

**Karusely:** v `social/carousels/<názov>/` sú obrázky `slide-01.png` a ďalšie. Na Instagrame daj nový príspevok, vyber všetky slidy v poradí.

Celý plán s popiskami, hashtagmi a časmi je v **`social/INSTAGRAM-WEEK.md`**.

## 6. Higgsfield (AI videá a obrázky)

**Prečo to zatiaľ nebežalo:** cloudové prostredie, v ktorom pracuje Claude, má zablokované domény `*.higgsfield.ai`. Kód je hotový, ale z cloudu sa nedá spojiť s Higgsfieldom.

**Dôležité:** API kľúč, ktorý si poslal do chatu, **zruš** na higgsfield.ai (je v histórii konverzácie) a vytvor si nový. Nový kľúč nikomu neposielaj do chatu.

**Možnosť A: spustiť u seba na počítači (odporúčam)**
1. Rozbehni projekt podľa časti 7.1.
2. V priečinku projektu vytvor súbor **`.env.local`** s jedným riadkom:
   ```
   HF_CREDENTIALS=tvoj-key-id:tvoj-key-secret
   ```
   (Súbor sa nikdy nenahrá na GitHub, je v `.gitignore`.)
3. Test (jedno 5-sekundové video, spoplatnené):
   ```bash
   npm run seedance
   ```
   Keď vypíše `Video URL: …`, funguje to.
4. Plán AI klipov do reklám (zadarmo, len vypíše zoznam):
   ```bash
   npm run hf:plan
   ```
5. V Higgsfield dashboarde si pozri, koľko stojí jedno video Seedance 2.5. S rozpočtom **$30** si vyber počet klipov (napr. `--only lava-run,coin-burst,heist-lasers`) a spusti:
   ```bash
   npm run hf:generate
   ```
   Klipy sa uložia do `videos/ai/`. Skript sa sám zastaví, keď dôjdu kredity, a pri opakovanom spustení neplatí znova za už stiahnuté klipy.
6. Prerenderuj reklamy (potrebuješ nastavenie z časti 7.3):
   ```bash
   npm run build:ads
   ```
   AI zábery sa samy vložia do pozadia scén v Reels (každá reklama vie, ktorý klip kam patrí). Výsledok nájdeš opäť vo `videos/out/`.

**Možnosť B: povoliť Higgsfield v cloude pre Clauda**
V nastaveniach cloudového prostredia (menu prostredia v hlavičke session → **Edit**):
- **Network access**: pridaj povolené domény `api.higgsfield.ai` a `platform.higgsfield.ai` (alebo zvoľ širší prístup).
- **Environment variables**: pridaj `HF_CREDENTIALS` s novým kľúčom.
Potom otvor novú session a Claude to vie spustiť priamo.

## 7. Pre pokročilých: úpravy a pregenerovanie

### 7.1 Rozbehnutie projektu na počítači
1. Nainštaluj **Node.js 20+** (nodejs.org) a **Git**.
2. ```bash
   git clone https://github.com/Michal07500/pixelkit.git
   cd pixelkit
   npm install
   npx playwright install chromium
   ```

### 7.2 PDF
Uprav text v `course/modules/*.md` a spusti `npm run build:pdf`.

### 7.3 Videá
Každé video je scenár v `videos/episodes/…/*.mjs` (text komentátora + scény). Na pregenerovanie treba aj Python a ffmpeg:
```bash
python3 -m venv .venv && .venv/bin/pip install -r videos/tts/requirements.txt
bash videos/tts/download-models.sh     # hlasový model (~120 MB)
# ffmpeg: Mac → brew install ffmpeg, Windows → winget install ffmpeg
PYTHON=.venv/bin/python npm run build:video -- videos/episodes/ads/day4-lava.mjs
```

### 7.4 Karusely
`IG_HANDLE=@tvojnick npm run build:carousels`

## 8. Kontrolný zoznam pred spustením

- [ ] Web beží na Netlify
- [ ] Formspree napojený, testovací zápis funguje a ponúkne lekciu zadarmo
- [ ] Lemon Squeezy: 3 produkty, ZIP nahratý, testovací nákup prešiel, redirect na `thanks.html`
- [ ] `CHECKOUT` odkazy vložené v `site/index.html`
- [ ] Discord a support e-mail v `thanks.html`, údaje v `privacy.html`
- [ ] Instagram profil nastavený, týždeň naplánovaný v Meta Business Suite
- [ ] Starý Higgsfield kľúč zrušený
- [ ] Živnosť (predaj je podnikanie). Ak máš menej ako 18 rokov, musí sa zapojiť rodič

Veľa šťastia so spustením. 🎮
