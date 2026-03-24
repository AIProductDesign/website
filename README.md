# AIPEC – TETRA Project Website

Dit is de broncode van de projectwebsite voor AIPEC, een TETRA-onderzoeksproject over AI in productontwikkeling. Deze README legt uit hoe de website in elkaar zit — ook als je geen software-achtergrond hebt.

---

## Wat is deze website eigenlijk?

De website is één lange scrollbare pagina (zoals een digitale brochure) die bezoekers informeert over het AIPEC-project en hen uitnodigt om deel te nemen. Er is **geen server, geen database en geen login**. De pagina laadt één keer in de browser en alles staat er al in — net als een PDF, maar dan interactief.

---

## Hoe werkt een website als deze? (analogie)

Stel je een website voor als een **gebouw**:

- **Het fundament** (`index.html`) is de lege ruimte waar alles in geplaatst wordt. Bezoekers zien dit nooit rechtstreeks.
- **De aannemer** (`main.tsx`) bouwt het gebouw op zodra iemand de pagina bezoekt.
- **Het gebouw zelf** (`App.tsx`) is de container die alle kamers op volgorde plaatst.
- **De kamers** (de componenten) zijn de zichtbare secties van de pagina — elk met hun eigen inhoud en opmaak.

```
Browser opent de pagina
  └── index.html         ← lege "ruimte" in de browser
        └── main.tsx     ← start alles op
              └── App.tsx  ← plaatst alle secties op volgorde
                    ├── Navigation    ← vaste menubalk bovenaan
                    ├── Hero          ← grote openingssectie (volledige scherm)
                    ├── About         ← "Over het project"
                    ├── Questions     ← kernvragen van het onderzoek
                    ├── Participation ← deelnemen + prijstabel
                    ├── Mapping       ← AI-tools per fase in het ontwerpproces
                    └── Contact       ← contactinfo, partners en footer
```

Klikken op een menulink (bijv. "Over") scrollt de pagina gewoon naar die sectie — er wordt geen nieuwe pagina geladen.

---

## Wat doet elke sectie?

| Sectie | Wat de bezoeker ziet |
|---|---|
| **Navigation** | Vaste blauwe menubalk met links en een "Neem deel"-knop |
| **Hero** | Openingsscherm met titel, beschrijving, partnerlogo's en sfeerbeelden |
| **About** | Vier kaarten die uitleggen waar het project over gaat |
| **Questions** | De vier centrale onderzoeksvragen |
| **Participation** | Voor wie het project bedoeld is, wat deelnemers krijgen en wat het kost |
| **Mapping** | Overzicht van AI-tools per fase in het productontwikkelingsproces |
| **Contact** | Contactpersoon (Jelle Saldien), partnerlogo's (UAntwerpen, UGent, Imec) en footer |

---

## Hoe is de code georganiseerd?

```
website-variant/
├── src/
│   ├── main.tsx              ← startpunt: zet de website in de browser
│   ├── App.tsx               ← plaatst alle secties in de juiste volgorde
│   ├── components/           ← elke sectie van de pagina als apart bestand
│   │   ├── Navigation.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Questions.tsx
│   │   ├── Participation.tsx
│   │   ├── Mapping.tsx
│   │   ├── Contact.tsx
│   │   ├── figma/
│   │   │   └── ImageWithFallback.tsx   ← toont een placeholder als een foto niet laadt
│   │   └── ui/                         ← kant-en-klare UI-bouwstenen (knoppen, tabellen…)
│   ├── assets/               ← afbeeldingen (logo's, sfeerbeelden)
│   └── styles/
│       └── globals.css       ← kleurthema en basisopmaak
├── index.html                ← het HTML-skelet
├── vite.config.ts            ← instellingen voor het bouwproces
└── package.json              ← lijst van gebruikte software-bibliotheken
```

### De `ui/` map uitgelegd

Die map bevat meer dan 40 kant-en-klare interface-elementen zoals knoppen, dialoogvensters, tabellen en formuliervelden. Ze worden momenteel niet actief gebruikt op de pagina, maar staan klaar voor toekomstige uitbreidingen — vergelijkbaar met een gereedschapskist die al gevuld is.

---

## Welke tools zijn gebruikt om dit te bouwen?

Je hoeft deze tools niet te kennen om de website aan te passen, maar het is handig te weten wat ze doen:

| Tool | Waarvoor |
|---|---|
| **React** | Bouwt de pagina op uit herbruikbare "bouwblokken" (componenten) |
| **TypeScript** | Een versie van JavaScript die typefouten voorkomt tijdens het schrijven van code |
| **Vite** | Zorgt dat je wijzigingen meteen zichtbaar zijn tijdens het ontwikkelen |
| **Tailwind CSS** | Stijlt de pagina via korte klasse-namen direct in de code (geen apart CSS-bestand nodig) |
| **Radix UI / shadcn** | Kant-en-klare toegankelijke interface-elementen |
| **Lucide** | Icoontjes (pijlen, vinkjes, gebouwen…) |
| **gh-pages** | Publiceert de website automatisch op GitHub Pages |

---

## Afbeeldingen

Afbeeldingen komen uit twee bronnen:

1. **Geëxporteerd vanuit Figma** (het ontwerpprogramma) — opgeslagen in `src/assets/` met een lange technische naam (een zogenaamde hash). Vite vertaalt die namen automatisch naar de juiste bestanden.
2. **Handmatig toegevoegd** — het UGent-logo is rechtstreeks in de map geplaatst.

| Afbeelding | Wat het is |
|---|---|
| `1d9145f4…` | Grote hero-afbeelding bovenaan |
| `0e898025…` | Sketching op digitaal tablet |
| `478eefbb…` | 3D CAD-software schermopname |
| `d88ed88c…` | Brainstorming met post-its |
| `1cb2ac71…` | Logo Universiteit Antwerpen |
| `ccb6f66f…` | Logo Imec |
| `logo_UGent…` | Logo UGent |

---

## De website lokaal bekijken of aanpassen

> Je hebt Node.js nodig (gratis te downloaden op nodejs.org).

```bash
# 1. Installeer de benodigde software-bibliotheken (eenmalig)
npm install

# 2. Start de lokale voorbeeldserver
npm run dev
```

Open daarna je browser op: **http://localhost:3000/website/**

Elke wijziging die je opslaat is meteen zichtbaar zonder herladen.

```bash
# Klaar om te publiceren? Maak een productiebuild en zet hem online:
npm run deploy
```

De website is dan live op het `/website/` pad van de GitHub-repository.

---

## Samenvatting in één zin

> De website is een statische, scrollbare informatiepagina opgebouwd uit losse React-componenten, gestyled met Tailwind CSS, en gepubliceerd via GitHub Pages — zonder server of database.
