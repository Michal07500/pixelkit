# PIXEL KIT: ako to celé spustiť (krok za krokom)

Tento návod ťa prevedie od nuly až po prvý predaj. Predpokladá, že nič z toho si ešte nerobil. Na konci bude všetko automatické: **človek zadá e-mail → do minúty mu príde lekcia zadarmo**, **človek zaplatí → hneď mu prídu súbory na stiahnutie**, bez toho, aby si čokoľvek robil ručne.

## Ako to celé funguje

| Čo spraví zákazník | Čo sa stane automaticky | Kto to robí |
|---|---|---|
| Na webe zadá e-mail | Do minúty mu príde e-mail s lekciou zadarmo (PDF + video), potom 5 ďalších e-mailov počas 9 dní, ktoré predávajú kurz | Netlify funkcia `subscribe` → **MailerLite** |
| Klikne „Get the course“ a zaplatí | Hneď mu príde potvrdenie s odkazmi na stiahnutie ZIP-ov (PDF + videá) | **Lemon Squeezy** |
| (po zaplatení) | Príde mu uvítací e-mail „Start here“ a prestanú mu chodiť predajné e-maily | Netlify funkcia `lemon-webhook` → MailerLite |

Kupujúci dostanú len prehľadné **PDF a MP4 videá v ZIP-e**, nič z GitHubu.

## Čo je hotové

| Súbor / priečinok | Čo to je |
|---|---|
| `site/` | Web: landing page, `thanks.html` (po zaplatení), `privacy.html`, lekcia zadarmo v `site/free/` |
| `netlify/functions/` | Automatické e-maily: prihlásenie na lekciu zadarmo a webhook z Lemon Squeezy |
| `email/SEQUENCE.md` | Texty všetkých 7 e-mailov, pripravené na skopírovanie do MailerLite |
| `course/pdf/` | PDF: 9 modulov, lekcia zadarmo, celý kurz, 4 bonusy, **Horror Pack** a **Tycoon Pack** |
| `videos/out/` | Všetky videá s komentátorom (kurz, 2 packy, reklamy na 2 týždne) |
| `delivery/` | **Hotové ZIP-y na predaj**, pripravené na nahratie do Lemon Squeezy |
| `social/` | Instagram + TikTok + YouTube Shorts: plán na 2 týždne, popisky, hashtagy, karusely |
| `docs/PIXEL-KIT-Navod.pdf` | Tento návod ako PDF |

---

## 1. Web online (15 minút, zadarmo)

1. Choď na **app.netlify.com** a prihlás sa cez GitHub.
2. **Add new site → Import an existing project → GitHub →** vyber repozitár **pixelkit**.
3. Build command nechaj **prázdny**. Súbor `netlify.toml` sám nastaví web (`site/`) aj e-mailové funkcie (`netlify/functions/`).
4. Klikni **Deploy**. O minútu máš adresu typu `nieco.netlify.app`.
5. (Voliteľné, odporúčam) **Domain settings → Add a custom domain**, ak si kúpiš doménu (napr. `pixelkit.gg`, ~10–15 € ročne).

> **Dôležité:** web musí byť prepojený s GitHubom (tento postup). Keby si priečinok `site/` len pretiahol do Netlify (drag & drop), e-mailové funkcie by nefungovali.

Odteraz sa web aktualizuje sám pri každej zmene na GitHube.

## 2. Automatické e-maily (30 minút, zadarmo)

Používame **MailerLite**: zadarmo do 1 000 odberateľov a vie posielať automatické série e-mailov.

**2.1 Účet a skupiny**
1. Registrácia na **mailerlite.com** (vyber bezplatný plán). Over svoju doménu alebo e-mail odosielateľa podľa ich návodu. Ak máš vlastnú doménu, over ju (DKIM/SPF), e-maily potom nepadajú do spamu.
2. **Subscribers → Groups → Create group**, vytvor dve skupiny: `Free lesson` a `Customers`.
3. Pri každej skupine si zapíš jej **ID** (číslo v adrese URL, keď skupinu otvoríš, alebo v detailoch skupiny).

**2.2 API kľúč**
1. **Integrations → MailerLite API → Use → Generate new token**. Pomenuj ho `netlify`.
2. Kľúč skopíruj a **nikam ho neposielaj** (ani do chatu, ani na GitHub). Patrí len do Netlify.

**2.3 Premenné v Netlify**

V Netlify: **Site configuration → Environment variables → Add a variable** a pridaj:

| Názov | Hodnota |
|---|---|
| `MAILERLITE_API_KEY` | API kľúč z 2.2 |
| `MAILERLITE_GROUP_FREE` | ID skupiny `Free lesson` |
| `MAILERLITE_GROUP_CUSTOMERS` | ID skupiny `Customers` |
| `LEMON_WEBHOOK_SECRET` | vymyslené dlhé heslo, napr. 30 náhodných znakov (použiješ ho aj v 3.4) |

Potom **Deploys → Trigger deploy → Deploy site**, aby sa premenné načítali.

**2.4 Automatizácie (tu sa posielajú e-maily)**
1. **Automations → Create workflow → Start from scratch**, názov `Free lesson`.
2. Trigger: **When subscriber joins a group → Free lesson**.
3. Pridaj **Email** a vlož text **Email 1** z `email/SEQUENCE.md` (predmet, text, odkazy). `https://YOUR-SITE` nahraď adresou tvojho webu.
4. Pridaj **Delay 1 day → Email 2**, potom **Delay 2 days → Email 3**, a tak ďalej až po Email 6 (presné poradie je v tabuľke v `email/SEQUENCE.md`).
5. Pred Email 3 vlož **Condition: Group membership → is in Customers**. Vetvu „Yes“ nechaj prázdnu (automatizácia končí), vetvu „No“ pokračuj e-mailami. Tak kupujúcim prestanú chodiť predajné e-maily.
6. Zapni workflow (**Activate**).
7. Druhý workflow `Customers`: trigger **joins group → Customers**, jeden e-mail **C1**. Doplň odkaz na Discord. Aktivuj.

**2.5 Test**
1. Otvor web, zadaj svoj e-mail, zaškrtni súhlas a klikni **Send me the lesson**.
2. Na webe uvidíš „Check your inbox!“. Do minúty ti príde Email 1 s lekciou zadarmo.
3. Keby nie: v Netlify pozri **Logs → Functions → subscribe**. Chyba tam presne napíše, čo chýba (napr. nesprávne ID skupiny).

> Plán B bez MailerLite: v Lemon Squeezy vytvor produkt „Free lesson“ za **$0** a nahraj k nemu PDF a video. Lemon Squeezy si vypýta e-mail a súbory pošle sám. Chýba ti ale séria predajných e-mailov, preto odporúčam MailerLite.

## 3. Platobná brána a automatické doručenie súborov (40 minút)

Odporúčam **Lemon Squeezy**: rieši platby kartou, PayPal aj Apple Pay, **sám odvádza DPH v EÚ** a hneď po zaplatení **sám pošle zákazníkovi e-mail s odkazmi na stiahnutie**.

**3.1 ZIP-y na predaj**

Hotové ZIP-y sú na GitHube v priečinku **`delivery/`**. Otvor súbor a klikni na **Download raw file** (ikona ↓ vpravo hore). Každý má menej ako 100 MB.

| Súbor | Obsah |
|---|---|
| `PIXEL-KIT-Core-Course-Part-1.zip` | 15 PDF (moduly, lekcia zadarmo, celý kurz, 4 bonusy) + videá modulov 00–03 + START HERE |
| `PIXEL-KIT-Core-Course-Part-2.zip` | videá modulov 04–09 + START HERE |
| `PIXEL-KIT-Horror-Pack.zip` | Horror Pack PDF + 5 videí + START HERE |
| `PIXEL-KIT-Tycoon-Pack.zip` | Tycoon Pack PDF + 5 videí + START HERE |

Keď kurz neskôr upravíš, ZIP-y vytvoríš znova na počítači (pozri 7.1) príkazmi `npm run build:pdf` a `npm run release`. Vzniknú v priečinku `dist/`.

**3.2 Obchod a produkty**
1. Registrácia na **lemonsqueezy.com**, vytvor obchod (Store). Vyplň údaje na výplaty (Payouts) a over identitu.
2. **Products → New product**. Pri každom produkte v časti **Files** nahraj ZIP-y podľa tabuľky (k jednému produktu môžeš nahrať viac súborov):

| Produkt | Cena | Súbory (Files) | Kľúč v `CHECKOUT` |
|---|---|---|---|
| PIXEL KIT Core Course | $29 | Core-Course-Part-1.zip + Part-2.zip | `course` |
| PIXEL KIT Creator Bundle | $59 | obe časti kurzu + Horror-Pack.zip + Tycoon-Pack.zip | `bundle` |
| PIXEL KIT All Access | $99 | všetky štyri ZIP-y | `all` |
| Horror Pack | $19 | Horror-Pack.zip | `horror` |
| Tycoon Pack | $19 | Tycoon-Pack.zip | `tycoon` |

3. Pri každom produkte v **Confirmation modal / Redirect** nastav adresu `https://TVOJ-WEB/thanks.html`.
4. Pri produkte klikni **Share** a skopíruj **Checkout link**.

**3.3 Odkazy na web**

V `site/index.html` úplne dole v bloku `CONFIG` vlož odkazy (na GitHube: otvor súbor → ceruzka → uprav → **Commit changes**):
```js
CHECKOUT: {
  course: "https://tvoj-obchod.lemonsqueezy.com/buy/...",
  bundle: "https://tvoj-obchod.lemonsqueezy.com/buy/...",
  all: "https://tvoj-obchod.lemonsqueezy.com/buy/...",
  horror: "https://tvoj-obchod.lemonsqueezy.com/buy/...",
  tycoon: "https://tvoj-obchod.lemonsqueezy.com/buy/...",
},
```
Web potom otvorí platobné okno priamo na stránke. Horror a Tycoon Pack sa na webe samé ukážu ako „Out now“ s tlačidlom na kúpu.

**3.4 Webhook (kupujúci dostanú uvítací e-mail)**
1. Lemon Squeezy: **Settings → Webhooks → +**.
2. Callback URL: `https://TVOJ-WEB/api/lemon-webhook`
3. Signing secret: **to isté heslo** ako `LEMON_WEBHOOK_SECRET` v Netlify (2.3).
4. Udalosti (events): zaškrtni **order_created**. Ulož.

**3.5 Test celého nákupu**
1. V Lemon Squeezy zapni **Test mode**.
2. Na webe kúp Core Course testovacou kartou `4242 4242 4242 4242` (ľubovoľný dátum v budúcnosti a CVC).
3. Over: presmerovalo ťa na `thanks.html`, prišiel e-mail od Lemon Squeezy s odkazmi na stiahnutie, prišiel uvítací e-mail C1 a v MailerLite si v skupine `Customers`.
4. Potom test mode vypni. Ak chceš prijímať skutočné platby, v Lemon Squeezy musíš mať schválený obchod (store activation).

**Alternatívy:** Gumroad (tiež rieši DPH a posiela súbory) alebo Stripe Payment Links (DPH aj doručenie súborov si riešiš sám). Webhook `lemon-webhook` funguje len s Lemon Squeezy.

## 4. Doplň posledné údaje na webe

- `site/thanks.html` → na konci súboru `DISCORD_INVITE` (odkaz na tvoj Discord server) a `SUPPORT_EMAIL`.
- `site/privacy.html` → všetko v `[HRANATÝCH ZÁTVORKÁCH]` (meno, kontakt, dátum). MailerLite a Lemon Squeezy sú tam už doplnené.
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
| `pack-horror-…`, `pack-tycoon-…` | Videá Genre Packov, 5 pre každý (sú v ich ZIP-och) |
| `ad-trailer-16x9.mp4` | Trailer na web (je v `site/media/`), YouTube, Facebook |
| `ig-day1-…` až `ig-day7-…` | Instagram Reels na celý týždeň (9:16), s našim phonk beatom |
| `ig-day…-nomusic.mp4` | Tie isté Reels bez hudby, na pridanie trendového songu priamo v Instagrame |
| `ig-extra1-30-days`, `ig-extra2-pov-first-game`, `ig-w2-…` | Reels na 2. týždeň (launch Horror a Tycoon Packu, lekcia zadarmo e-mailom, POV) |

**Ako ich dostať na telefón:** stiahni ich z GitHubu (otvor súbor → **Download raw file**) alebo si ich pošli cez Google Drive / AirDrop / WhatsApp sebe.

**Najpohodlnejšie plánovanie:** **Meta Business Suite** (business.facebook.com) na počítači. Prepoj Instagram, **Create reel**, nahraj video, vlož popisku z `social/INSTAGRAM-WEEK.md` a daj **Schedule** na konkrétny deň a čas. Celý týždeň naplánuješ za 20 minút.

**Trendový song:** chceš známu pesničku? Nahraj verziu **`-nomusic`**, v Instagrame ťukni na **♪ Audio**, vyber trendový song (šípka ↗ = trenduje) a v **Mix audio** daj song na 20–30 %, pôvodný zvuk na 100 %. Songy z knižnice Instagramu sú licencované, takže reel nebude stlmený. (Známe songy nemôžem vložiť priamo do súborov, to by porušilo autorské práva.)

**Karusely:** v `social/carousels/<názov>/` sú obrázky `slide-01.png` a ďalšie. Na Instagrame daj nový príspevok, vyber všetky slidy v poradí.

Celý plán s popiskami, hashtagmi a časmi je v **`social/INSTAGRAM-WEEK.md`** (1. týždeň) a **`social/WEEK-2-AND-TIKTOK.md`** (2. týždeň).

### 5.1 TikTok a YouTube Shorts

Tie isté 9:16 videá môžeš dať aj na **TikTok** a **YouTube Shorts**. Tri platformy = trikrát viac ľudí bez práce navyše.

- **TikTok:** nahraj verziu **s hudbou** (náš beat je vlastný, takže sa nestlmí), alebo `-nomusic` a pridaj trendový zvuk z TikTok knižnice. Popisky a hashtagy sú v `social/WEEK-2-AND-TIKTOK.md`. Prepni si účet na **Business** (Settings → Account), vtedy väčšinou môžeš dať odkaz na web do profilu hneď, bez 1 000 followerov. Ak to ešte nejde, do profilu napíš „free lesson → link on my Instagram“.
- **YouTube Shorts:** v appke YouTube **+ → Create a Short → Upload**, vyber video s hudbou. Do popisu daj odkaz na web (v popise Shorts odkazy fungujú).
- Neposielaj video s vodoznakom z inej platformy. Vždy nahraj originál z `videos/out/`.

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
Uprav text v `course/modules/*.md` (kurz), `course/packs/*.md` (Genre Packy) alebo `SPUSTENIE.md` (tento návod) a spusti `npm run build:pdf`.

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
- [ ] MailerLite: 2 skupiny, API kľúč a ID skupín v Netlify, 2 automatizácie aktívne
- [ ] Testovací zápis na webe → do minúty prišiel e-mail s lekciou zadarmo
- [ ] Lemon Squeezy: 5 produktov, ZIP-y nahraté, webhook nastavený
- [ ] Testovací nákup: e-mail so súbormi, uvítací e-mail, redirect na `thanks.html`
- [ ] `CHECKOUT` odkazy (aj `horror` a `tycoon`) vložené v `site/index.html`
- [ ] Discord a support e-mail v `thanks.html`, údaje v `privacy.html`
- [ ] Instagram profil nastavený, 2 týždne naplánované v Meta Business Suite
- [ ] TikTok a YouTube Shorts účty založené
- [ ] Starý Higgsfield kľúč zrušený
- [ ] Živnosť (predaj je podnikanie). Ak máš menej ako 18 rokov, musí sa zapojiť rodič

Veľa šťastia so spustením. 🎮
