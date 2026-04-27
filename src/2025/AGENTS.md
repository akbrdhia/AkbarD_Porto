# 2025 — IDE Portfolio Module

Legacy version. Stable. Active dev is in `src/2026/`.

## STRUCTURE
```
2025/
├── pages/         # Route-level components (Portofolio.jsx, IDEModePage, WebModePage, ModeSelectionPage)
├── components/    # IDE UI + web mode UI
│   └── web/       # Web-mode only: navbar, cursor, sections
├── context/       # PortfolioContext — sole state manager
├── constants/     # portfolioData.js — personal info + project content (shared by 2026 config)
├── styles/        # globalStyles.js — CSS-in-JS object map for IDE components
├── utils/         # terminalCommands.js + test file
└── assets/        # react.svg only
```

## WHERE TO LOOK
| Task | File |
|------|------|
| Content/personal data | `constants/portfolioData.js` |
| IDE state | `context/PortfolioContext.jsx` |
| IDE editor simulation | `components/Editor.jsx` |
| Terminal logic | `utils/terminalCommands.js` |
| Web mode sections | `components/web/sections/` |
| All IDE styles | `styles/globalStyles.js` |
| Route entry | `pages/Portofolio.jsx` (misspelled — intentional) |

## CONVENTIONS
- State via Context only — no props passed 3+ levels; use `usePortfolio()` hook
- Styles as JS objects from `globalStyles.js`, not inline or Tailwind
- Internal navigation: use relative paths (`navigate('ide')` not `navigate('/2025/ide')`)
- ModeSelectionPage persists user choice to sessionStorage + localStorage

## ANTI-PATTERNS
- ❌ Renaming `Portofolio.jsx` without updating `src/App.jsx`
- ❌ Adding Tailwind classes to IDE components — use JS style objects
- ❌ Using React Router absolute paths inside these nested routes
- ❌ Importing anything from `src/2026/` into this module
- ❌ Removing the `PortfolioProvider` wrapper from `Portofolio.jsx`

## NOTES
- `console.log` debug statements in `PortfolioContext.jsx` — known, not removed yet
- `terminalCommands.test.js` is a raw Node script, not vitest/jest
- Web mode (`/2025/web`) is a separate scroll-based experience distinct from IDE mode
