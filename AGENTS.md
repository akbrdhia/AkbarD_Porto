# PROJECT KNOWLEDGE BASE

**Generated:** 2026-04-27
**Commit:** de4a5bb
**Branch:** develop

## OVERVIEW
Dual-version personal portfolio. `2025` = Android Studio IDE imitation (Darcula theme, terminal, drag panels). `2026` = Motion Studio redesign (pure black, typographic maximalism, Framer Motion, Lenis scroll). Stack: React 19 + Vite + Tailwind CSS 4 + react-router-dom v7.

## STRUCTURE
```
src/
├── main.jsx             # Entry point: BrowserRouter + HelmetProvider
├── App.jsx              # Top-level router: /2025 and /2026 prefixes
├── components/          # Shared UI (VersionSwitcher)
├── constants/           # Shared data (projects.js)
├── 2025/                # IDE-mode module (legacy, stable)
│   ├── pages/           # Portofolio.jsx (misspelled entry)
│   └── constants/       # portfolioData.js (source of truth for personal info)
└── 2026/                # Motion Studio module (active development)
    ├── Portfolio2026.jsx # Module entry
    └── constants/       # config.js (imports from 2025/constants)
```

## WHERE TO LOOK
| Task | Location |
|------|----------|
| Routing logic | `src/App.jsx` (top-level) |
| 2026 active dev | `src/2026/features/` |
| 2025 IDE logic | `src/2025/components/` |
| Shared project data | `src/constants/projects.js` |
| Personal info | `src/2025/constants/portfolioData.js` |
| 2026 design system | `src/2026/DESIGN.md` |
| Implementation plans | `docs/plans/` |

## CONVENTIONS
- **Routing Isolation**: All 2025 routes must prefix `/2025/`. All 2026 routes must prefix `/2026/`.
- **2025 Styling**: CSS-in-JS via plain objects (`globalStyles.js`). No Tailwind in IDE components.
- **2026 Styling**: Tailwind CSS 4 utility classes exclusively. Pure `#000000` background.
- **Animation (2026)**: Framer Motion for reveals, GSAP for timelines, Lenis for smooth scroll.
- **State**: 2025 uses `PortfolioContext`. 2026 uses prop-drilling/local state.

## ANTI-PATTERNS
- ❌ **Absolute Nested Routes**: Current bug in `Portfolio2026.jsx` and `Portofolio.jsx` uses leading slashes (e.g., `/about`). Should be relative (e.g., `about`) to avoid breaking under version prefixes.
- ❌ **Cross-Version Imports**: Avoid importing 2026 code into 2025. Exception: `2026/constants/config.js` imports `PERSONAL_INFO` from `2025/constants/portfolioData.js`.
- ❌ **Misspelling Fixes**: Do not rename `Portofolio.jsx` without updating `App.jsx`.
- ❌ **TypeScript**: Project is pure JSX. No `as any` or `@ts-ignore`.

## COMMANDS
```bash
npm run dev       # Start Vite development server
npm run build     # Production build (Vite)
npm run lint      # Execute ESLint checks
npm run preview   # Preview production build locally
npm test          # Run minimal terminal logic tests (node script)
```

## NOTES
- **Entry Flow**: `main.jsx` mounts `App.jsx` which handles version-level routing.
- **Shared Data**: `src/constants/projects.js` is the intended shared projects list, though 2025 still relies heavily on `portfolioData.js`.
- **IDE Mode**: 2025 version includes a functional custom terminal and resizable panels.
- **Vite Artifacts**: `.vite/deps/` and `dist/` are currently tracked in git; ignore them in PRs.
