# 2026 Features

Feature-based modules. Each feature = one route or one reusable visual unit.

## STRUCTURE
```
features/
├── hero/
│   ├── Hero.jsx         # Landing hero — massive typographic wordmark
│   └── Mascot.jsx       # Character illustration (currently disabled on mobile)
├── gallery/
│   ├── GalleryGrid.jsx  # Project grid on home route — 60/40 asymmetric layout
│   └── ProjectCard.jsx  # Individual card (full-bleed, no border, no caption overlay)
├── projects/
│   └── ProjectDetail.jsx # Route: /2026/project/:projectId
└── about/
    ├── AboutPage.jsx    # Route: /2026/about — assembles subcomponents
    └── components/
        ├── AboutHero.jsx
        ├── ExperienceTimeline.jsx
        ├── LiquidHero.jsx
        ├── Manifesto.jsx
        ├── SkillsCloud.jsx
        └── TheVoid.jsx
```

## CONVENTIONS
- Each feature is self-contained — no cross-feature imports
- `AboutPage.jsx` assembles `about/components/` — components are NOT used elsewhere
- `GalleryGrid` consumes project data from `src/2025/constants/portfolioData.js` (via config.js — known coupling)
- `ProjectCard`: no border-radius, no shadow, no caption overlay on the grid — DESIGN.md rule

## ADDING A NEW FEATURE
1. Create `features/<name>/` with `<Name>.jsx` as the route component
2. Add `<Route path="/<name>" element={<Name />} />` in `Portfolio2026.jsx`
3. Add nav entry in `constants/config.js` if publicly navigable
4. Follow DESIGN.md — read it first

## ANTI-PATTERNS
- ❌ Importing one feature's components inside another feature
- ❌ Adding state management — use prop drilling or React context if truly needed
- ❌ Rounded card borders or box shadows on project cards
- ❌ Adding captions/overlays on GalleryGrid cards
