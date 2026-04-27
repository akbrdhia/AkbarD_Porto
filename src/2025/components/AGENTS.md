# 2025 Components

IDE-mode and web-mode UI components. Two distinct visual systems in one directory.

## STRUCTURE
```
components/
├── Editor.jsx           # Code editor with auto-typing animation
├── MenuBar.jsx          # Top menu bar
├── MobileBlocker.jsx    # Mobile warning (2025 IDE is desktop-only)
├── ModeCard.jsx         # Mode selection card UI
├── Notifications.jsx    # Toast notifications
├── SEO.jsx              # Helmet-based SEO wrapper
├── Sidebar.jsx          # File tree sidebar (resizable)
├── StatusBar.jsx        # Bottom status bar
├── Terminal.jsx         # Functional terminal component
├── Toolbar.jsx          # Toolbar with build button
└── web/                 # Web-mode components only (see web/AGENTS.md)
```

## CONVENTIONS
- IDE components use style objects from `../styles/globalStyles.js` — never Tailwind
- All IDE components consume state via `usePortfolio()` from `../context/PortfolioContext`
- Sidebar and Terminal are resizable via mouse drag — do not break drag event handlers
- Max 5 tabs open at once (enforced in Editor.jsx)

## ANTI-PATTERNS
- ❌ Mixing Tailwind classes with JS style objects in the same IDE component
- ❌ Local state that duplicates PortfolioContext state
- ❌ Adding web-mode UI code into the IDE components (Editor, Terminal, etc.)
