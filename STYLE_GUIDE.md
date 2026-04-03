# aipec — Stijlgids

## Merkidentiteit

**aipec** = altijd lowercase, altijd in **Dyson Sans Modern** font.
Gebruik nooit "AIPEC", "Aipec" of andere kapitalisatie.

```tsx
<span style={{ fontFamily: "'Dyson Sans Modern', sans-serif" }}>aipec</span>
```

---

## Typografie


| Rol           | Font         | Gewicht | Klasse       |
| ------------- | ------------ | ------- | ------------ |
| Body          | Inte         | 400–900 | inline style |
| Labels / mono | Inter (mono) | 400     | `font-mono`  |


### Heading-hiërarchie

- **H1 hero**: `text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight`
- **H2 sectie**: `text-5xl sm:text-6xl font-black tracking-tight`
- **H3 kaart**: `text-2xl–text-4xl font-black tracking-tight`
- **Body groot**: `text-lg leading-relaxed`
- **Body normaal**: `text-sm leading-relaxed`
- **Label / mono**: `text-xs font-mono tracking-widest`

### Ghost text (tweede regel headings)

Tweede regel is altijd `text-[#1D1D1F]/20` of `text-white/25` — 20% opaciteit.

---

## Kleurenpalet


| Naam         | Hex       | Gebruik                              |
| ------------ | --------- | ------------------------------------ |
| Foreground   | `#1D1D1F` | Primaire tekst, achtergronden        |
| Achtergrond  | `#FFFFFF` | Witte secties                        |
| Lichtgrijs   | `#F5F5F7` | Kaartachtergronden                   |
| Accent blauw | `#4B9FFF` | Primaire accentkleur, labels, iconen |
| Muted tekst  | `#6E6E73` | Secondaire tekst                     |
| Hero dark    | `#0A0F1E` | Hero achtergrond                     |


### Opaciteitsniveaus (zwart)

- `black/4` = kaartborders (lichtste)
- `black/6` = standaard borders
- `black/8` = scheidingslijnen
- `black/12` = zichtbare borders
- `[#1D1D1F]/20` = ghost text
- `[#1D1D1F]/30` = disabled tekst
- `[#1D1D1F]/40–50` = secundaire tekst
- `[#1D1D1F]/70` = body tekst

---

## Spacing & Layout

- **Max breedte**: `max-w-7xl mx-auto`
- **Padding x**: `px-4 sm:px-6 lg:px-8`
- **Sectie padding top**: `pt-4` (sectielabel is sticky)
- **Sectie padding bottom**: `pb-32`
- **Ruimte tussen secties intern**: `mb-16` tot `mb-20`

---

## Componenten

### Sectielabel (sticky)

```tsx
<p className="section-label text-xs font-mono text-[#4B9FFF] tracking-widest mb-6">
  01 / SECTIENAAM
</p>
```

Geen em dashes (`—`). Formaat: `NN / NAAM`.

### Kaart

```tsx
<div className="card-hover bg-[#F5F5F7] border border-black/6 rounded-2xl p-6">
```

`card-hover` voegt een `translateY(-4px)` hover-animatie toe.

### Primaire CTA-knop

```tsx
<a className="px-7 py-3.5 bg-[#1D1D1F] text-white rounded-full font-semibold text-sm hover:bg-[#1D1D1F]/80 transition-colors">
```

### Secundaire knop (outline)

```tsx
<a className="px-5 py-2.5 border border-black/12 text-[#1D1D1F]/50 hover:text-[#1D1D1F] rounded-full text-sm font-medium transition-colors">
```

### Tool-chip

```tsx
<span className="px-2.5 py-1 bg-[#F5F5F7] border border-black/8 text-[#1D1D1F]/50 rounded-full text-xs font-mono">
```

---

## Animaties

### Scroll reveal

- `.reveal` — fade + slide omhoog (75ms easing)
- `.reveal-stagger` — kinderen verschijnen sequentieel (80ms stagger)
- `.reveal-line` — lijn tekent van links naar rechts
- `.reveal-heading` — tekst schuift omhoog uit clip

Activeer via IntersectionObserver in `useReveal.ts`: voeg `.is-visible` toe.

### Mount animaties (eenmalig)

```tsx
style={{ opacity: 0, animation: 'fadeIn 0.7s ease 0.3s forwards' }}
style={{ transform: 'translateY(110%)', animation: 'slideUp 0.85s cubic-bezier(0.16,1,0.3,1) 0.3s forwards' }}
```

### Liquid drift (hero achtergrond)

```css
animation: liquid-drift 42s ease-in-out infinite;
```

Gecombineerd met SVG `feTurbulence` + `feDisplacementMap` (scale: 70).

---

## Regels

1. **Geen em dashes** (`—`) in tekst of labels.
2. **aipec** altijd lowercase in Dyson Sans Modern.
3. **Geen witte border-boxes** rond logo's op donkere achtergronden — gebruik `mix-blend-mode: screen` of `mix-blend-mode: multiply`.
4. **Geen max-w beperking** op accordion/vragen secties (full-width).
5. **3 kolommen max** voor case study grid (`lg:grid-cols-3`).
6. Scroll reveal actief via `.is-visible` class — geen inline `opacity: 0` op elementen met `.reveal`.

---

## Bestandsstructuur (relevant)

```
src/
  assets/
    aipec-logo-hero.png       — aipec logo (wit, voor hero)
    hero-bg.png               — hero achtergrondafbeelding
    logo_UGent_NL_RGB_...png  — UGent logo (witte achtergrond)
    1cb2ac71...png            — UAntwerpen logo
    ccb6f66f...png            — Imec logo
    fonts/
      DysonSansModern.ttf
  components/
    Hero.tsx
    About.tsx
    Questions.tsx
    Mapping.tsx               — scroll-driven NPD-timeline
    CaseStudies.tsx
    Participation.tsx
    Contact.tsx
    Navigation.tsx
    PartnerCarousel.tsx
  styles/
    globals.css               — custom cursor, reveal systeem, animaties
  hooks/
    useReveal.ts              — IntersectionObserver voor scroll reveals
```

