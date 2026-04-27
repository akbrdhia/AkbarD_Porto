# 2026 — Motion Studio Module

Active development. READ `DESIGN.md` before touching anything visual.

## STRUCTURE
```
2026/
├── Portfolio2026.jsx    # Module entry: Routes + MainLayout wrapper
├── DESIGN.md            # ← MANDATORY READ before any UI work
├── layout/              # Navbar, Footer, SmoothScroll, MainLayout
├── features/            # Feature-based modules (hero, gallery, projects, about)
│   ├── hero/            # Hero.jsx + Mascot.jsx
│   ├── gallery/         # GalleryGrid.jsx + ProjectCard.jsx
│   ├── projects/        # ProjectDetail.jsx (route: /project/:projectId)
│   └── about/           # AboutPage.jsx + components/
├── constants/           # config.js (nav, social, location)
└── style/               # Global 2026 styles (if any)
```

## ROUTES (relative to /2026)
| Path | Component |
|------|-----------|
| `/` | Hero + GalleryGrid |
| `/about` | AboutPage |
| `/project/:projectId` | ProjectDetail |
| `/projects` | ⚠️ DEAD — listed in config.js nav but route doesn't exist |

## WHERE TO LOOK
| Task | Location |
|------|----------|
| Add new page | Create `features/<name>/` + add Route in `Portfolio2026.jsx` |
| Edit nav links | `constants/config.js` |
| Change layout | `layout/MainLayout.jsx` |
| Smooth scroll behavior | `layout/SmoothScroll.jsx` (Lenis) |
| About page sections | `features/about/components/` |

## DESIGN LAWS (from DESIGN.md)
- Background: `#000000` — pure black, no dark gray, no warm black
- Text: `#FFFFFF` only — no gray hierarchy; use size/weight for hierarchy
- Accent: `#F5C842` — appears max once per viewport, never floods
- Hero text: 20vw+, font-weight 900, lowercase, intentional overflow bleed
- Nav: no background, no blur, just text floating over black

## ANTI-PATTERNS
- ❌ Any background color other than `#000000`
- ❌ Gradient on black background
- ❌ Rounded card borders (looks template-like)
- ❌ Nav container background or blur
- ❌ Centered hero text (layout is left-anchored + overflowing)
- ❌ Multiple accent colors
- ❌ Inline style objects — Tailwind only
- ❌ Adding new cross-imports to `src/2025/`

## ANIMATION PRIORITY
1. Framer Motion — component enter/exit, scroll reveals
2. GSAP — complex sequenced timelines
3. Lenis — smooth scroll (already wired in SmoothScroll.jsx)
4. anime.js — lightweight supplementary
5. Three.js — sparingly, for 3D accents only
