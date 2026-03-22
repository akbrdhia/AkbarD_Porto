# Portfolio Design Reference
> Extracted from: pleasecallmechamp.com
> Style: Typographic Maximalism / Motion Studio Portfolio

---

## 1. Color System

| Role | Value | Notes |
|---|---|---|
| Background | `#000000` | Pure black — no warm/cool tint |
| Primary text | `#FFFFFF` | Pure white |
| Accent | `#F5C842` | Yellow-gold, used sparingly (event label) |
| Project card — blue | `#4A7EF5` → `#7AB3FF` | Gradient, vibrant |
| Project card — rainbow | Multi (concentric arcs) | Full spectrum, black bg |

**Rules observed:**
- Background is always `#000000` — never dark gray, never warm black
- White is the only text color on dark — no grays for hierarchy, size/weight does the work
- Accent color appears max once per viewport — never floods
- Project card colors are fully saturated — they pop against the black base

---

## 2. Typography

### Typeface
- **Display:** Rounded geometric sans-serif, ultra-bold (weight 900), lowercase
- Closest match: **Geist**, **Mona Sans**, **Sora**, or **Nunito Black** — rounded terminals, closed apertures, uniform stroke width
- **Body/UI:** Same family or similar geometric sans, lighter weight (400–500)

### Scale & Usage

| Role | Size | Weight | Case | Notes |
|---|---|---|---|---|
| Hero wordmark | `~20vw` | 900 | lowercase | Bleeds off viewport edges intentionally |
| Statement body | `~2.8rem` clamp | 600–700 | sentence | Center-right aligned, large but not display |
| Nav links | `~0.85rem` | 400 | sentence | Comma-separated inline, zero decoration |
| CTA link | `~0.9rem` | 500 | sentence | `The Studio →` — plain text + arrow |
| Location tag | `~0.85rem` | 400 | title | Right-aligned, minimal |

### Key Typography Rules
- **Hero text IS the layout** — no background image, no illustration behind it. The type fills the entire viewport
- Lowercase hero with ultra-bold weight = confident without being aggressive
- Statement text is NOT body text — it's display-sized prose, reads like a manifesto
- Zero letter-spacing manipulation — the typeface's natural spacing is trusted
- No italic, no underline, no decorative treatment anywhere

---

## 3. Layout & Spacing

### Grid
- **No traditional grid** — everything is full-bleed or full-width
- Hero text: `padding: 0` — letterforms touch viewport edges
- Content below hero: loose left-aligned with generous left margin (~3–4% viewport)
- Project cards: asymmetric widths (roughly 60% / 40% split visible in screenshot)

### Spacing Philosophy
- Vertical rhythm is set by the massive type itself — no explicit section padding needed above fold
- Statement text sits directly below hero text with minimal gap (~2–3rem)
- "The Studio →" CTA is isolated bottom-left — creates breathing room asymmetry

### Viewport Behavior
- Hero wordmark designed to overflow horizontally — the "p" in "champ" clips at right edge
- This overflow is intentional: signals confidence, anti-template, owns the space

---

## 4. Navigation

```
[Studio Name — plain text, top-left]    [Links inline, top-center]    [Location + dot, top-right]
```

- **No nav container** — no bar, no background, no blur. Just text floating over black
- Links: `Home, About, Projects, Play, Team, Contact, Talents` — comma-separated, single line
- Active state: implied by position ("Home" listed first), no underline or color change visible
- Location: `Los Angeles, CA` + green dot (online/available indicator)
- Font size identical to body labels — nav doesn't assert hierarchy over content

---

## 5. Illustration Style

- **Avatar character** embedded inside letterform counter space (inside the "c")
- Style: flat vector, minimal detail, rounded shapes, thick outlines
- Black & white only — no color on illustration, preserves monochrome palette
- Character wears glasses, has a casual/friendly vibe — humanizes the studio brand
- Sits on a baseline rule (thin white line) — grounds it in the typography

**Technique:** The illustration doesn't float on top of the text — it occupies the negative space *within* the letterform. This requires precise sizing relative to the font.

---

## 6. Project Cards (Partial — bottom of viewport)

- Full-bleed thumbnails, no border, no caption overlay visible
- Asymmetric widths — larger card left (~60vw), smaller right (~40vw)
- No card border, no shadow, no border-radius visible
- Colors are fully saturated motion work — the work speaks for itself
- Cards are flush to each other (no gap or minimal gap)

---

## 7. Motion (Inferred — Motion Studio)

Site is built by a motion studio so animation is expected to be central:
- Hero wordmark likely has entrance animation (scale from oversized, or letter-by-letter reveal)
- Avatar illustration likely has idle animation (blink, subtle movement)
- Project cards likely have hover state (scale, brightness, or cursor-following)
- Page transitions likely are smooth (fade or slide, not abrupt)

---

## 8. Design Principles to Steal

| Principle | Implementation |
|---|---|
| **Type is identity** | Make your name/title so large it IS the hero |
| **Confidence via overflow** | Let elements bleed off screen — shows you own the space |
| **Illustration in letterforms** | Put character/mascot inside counter space of a letter |
| **Monochrome + one accent** | Black + white + single saturated accent only |
| **Nav is invisible** | No container, just text floating — less is more |
| **Work sells itself** | Project thumbnails are full-bleed, no labels needed |
| **Statement text, not body text** | Make your tagline display-sized — not paragraph-sized |
| **Lowercase bold = approachable confidence** | Avoids the stiff all-caps corporate feel |

---

## 9. CSS Starting Point

```css
:root {
  --bg: #000000;
  --text: #ffffff;
  --accent: #F5C842;
  --font: 'Mona Sans', 'Sora', 'Nunito', sans-serif;
}

/* Hero wordmark */
.hero-word {
  font-family: var(--font);
  font-size: clamp(18vw, 22vw, 26vw);
  font-weight: 900;
  line-height: 0.85;
  color: var(--text);
  letter-spacing: -0.02em;
  overflow: hidden; /* clip the bleed */
  white-space: nowrap;
}

/* Statement text */
.statement {
  font-family: var(--font);
  font-size: clamp(1.5rem, 3vw, 2.8rem);
  font-weight: 600;
  line-height: 1.2;
  color: var(--text);
  max-width: 900px;
}

/* Nav */
nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.25rem 1.5rem;
  background: transparent; /* no bg */
  z-index: 100;
}

.nav-links {
  font-size: 0.85rem;
  font-weight: 400;
  color: var(--text);
  /* Comma-separated — use spans with ::after { content: ', ' } */
}

/* Project cards grid */
.projects {
  display: grid;
  grid-template-columns: 60fr 40fr;
  gap: 0; /* flush, no gap */
}

.project-card {
  aspect-ratio: 16/9;
  overflow: hidden;
}

.project-card img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 400ms cubic-bezier(0.2, 0, 0, 1);
}

.project-card:hover img {
  transform: scale(1.03);
}
```

---

## 10. What NOT to Do (Anti-patterns to avoid)

- ❌ Rounded card borders — makes it look like a template
- ❌ Colored nav background or blur — destroys the "floating text" feel
- ❌ Centered hero text — this layout is intentionally left-anchored and overflowing
- ❌ Multiple accent colors — one is confident, two is indecisive
- ❌ Small hero text — if it doesn't feel uncomfortably large, it's not large enough
- ❌ Captions on project cards in the grid — let thumbnails speak
- ❌ Gradient on the black background — pure black only
- ❌ Regular weight fonts — this style only works with 700+ weight display text