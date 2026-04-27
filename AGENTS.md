# PROJECT KNOWLEDGE BASE

**Generated:** 2026-04-27
**Commit:** de4a5bb
**Branch:** develop

## OVERVIEW
Dual-version personal portfolio: `2025` = Android Studio IDE imitation (Darcula theme, terminal, drag panels); `2026` = Motion Studio redesign (pure black, typographic maximalism, Framer Motion, Lenis scroll). Stack: React 19 + Vite + Tailwind CSS 4 + react-router-dom v7.

## STRUCTURE
```
src/
├── App.jsx              # SOLE top-level router — mount point for both versions
├── main.jsx             # BrowserRouter + HelmetProvider wrap
├── components/          # Cross-version: VersionSwitcher only
├── constants/           # Shared top-level (minimal)
├── 2025/                # IDE-mode portfolio (legacy, stable)
└── 2026/                # Motion Studio redesign (active development)
public/
docs/plans/              # Markdown implementation plans
```

## ROUTING
```
/          → redirect → /2025
/2025/*    → src/2025/pages/Portofolio.jsx (note: typo filename, intentional)
  /2025/        → ModeSelectionPage (IDE vs Web choice)
  /2025/ide     → IDEModePage
  /2025/web     → WebModePage
/2026/*    → src/2026/Portfolio2026.jsx
  /2026/              → Hero + GalleryGrid
  /2026/about         → AboutPage
  /2026/project/:id   → ProjectDetail
```

## WHERE TO LOOK
| Task | Location |
|------|----------|
| Add/change routes | `src/App.jsx` (top-level) or version entry |
| 2026 active dev | `src/2026/features/<feature>/` |
| 2026 layout/nav/footer | `src/2026/layout/` |
| 2026 design system | `src/2026/DESIGN.md` ← READ FIRST |
| 2025 IDE components | `src/2025/components/` |
| 2025 Web sections | `src/2025/components/web/sections/` |
| Personal data / content | `src/2025/constants/portfolioData.js` |
| 2026 nav/social config | `src/2026/constants/config.js` |
| Version toggle UI | `src/components/VersionSwitcher.jsx` |
| Dev plans | `docs/plans/` |

## CRITICAL RULES

1. **Version isolation**: 2026 code must NOT regress 2025. Test both routes after any routing change.
2. **Cross-version import (known issue)**: `src/2026/constants/config.js` imports `PERSONAL_INFO` from `../../2025/constants/portfolioData`. Tolerated but do not add more cross-imports.
3. **Route prefixes are STRICT**: All 2026 internal routes use `/2026/` prefix. All 2025 routes use `/2025/` prefix. Never use un-prefixed absolute paths inside version components.
4. **Dead nav item**: `config.js` nav has `{ name: 'Projects', path: '/2026/projects' }` — this route does NOT exist in Portfolio2026.jsx. Do not add links to it without creating the route.
5. **2026 design law**: Pure `#000000` background. No dark gray. No multiple accent colors. Follow `src/2026/DESIGN.md`.

## ANTI-PATTERNS
- ❌ `as any`, `@ts-ignore` — project is JSX, no TypeScript compiler
- ❌ Importing 2026 code inside 2025 or vice versa (beyond the known config.js coupling)
- ❌ Using absolute routes without version prefix inside version components
- ❌ Gradient on black background in 2026 — pure `#000000` only
- ❌ Adding new global state outside existing Context (2025) or prop-drilling (2026)
- ❌ Styled-components or additional CSS-in-JS libraries — 2025 uses plain JS objects, 2026 uses Tailwind

## STYLING APPROACH
- **2025**: CSS-in-JS via plain JS style objects (`src/2025/styles/globalStyles.js`) + some Tailwind
- **2026**: Tailwind CSS 4 utility classes exclusively — no inline style objects

## ANIMATION STACK (2026)
- **Framer Motion** — component transitions, scroll-triggered reveals
- **GSAP + @gsap/react** — complex timeline animations
- **Lenis** — smooth scroll (wraps content in `SmoothScroll.jsx`)
- **anime.js** — supplementary lightweight animations
- **Three.js / @react-three/fiber** — 3D elements (installed, use sparingly)

## COMMANDS
```bash
npm run dev       # Vite dev server
npm run build     # Production build
npm run lint      # ESLint
npm run preview   # Preview production build
npm test          # node src/2025/utils/terminalCommands.test.js (minimal)
```

## KNOWN ISSUES / GOTCHAS
- `src/2025/pages/Portofolio.jsx` — filename is misspelled (missing 'f'). Import uses same misspelling. Do not rename without updating App.jsx.
- No vitest/jest config — `npm test` runs a raw node script, not a test runner.
- `.vite/deps/` and `dist/` tracked in repo — likely should be gitignored but currently committed.
- VersionSwitcher navigates to version root only (e.g., `/2026`) — does not preserve sub-routes.
- `console.log` debug statements left in `PortfolioContext.jsx` (viewMode/loading changes).
