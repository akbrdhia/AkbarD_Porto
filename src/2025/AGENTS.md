# 2025 MODULE: IDE PORTFOLIO

## OVERVIEW
Legacy Android Studio IDE imitation (Darcula theme) for maintenance and stability.

## STRUCTURE
- `components/`: IDE UI (Terminal, Editor, Sidebar, etc.) and legacy web sections.
- `constants/`: `portfolioData.js` (content source for both 2025 and 2026).
- `context/`: `PortfolioContext.jsx` (central state for IDE simulation).
- `pages/`: Route entries including misspelled `Portofolio.jsx`.
- `styles/`: `globalStyles.js` (Darcula theme inline style objects).
- `utils/`: Terminal command logic and syntax highlighting.

## WHERE TO LOOK
- **IDE State**: `context/PortfolioContext.jsx`
- **Terminal Logic**: `utils/terminalCommands.js`
- **Editor Simulation**: `components/Editor.jsx`
- **Terminal UI**: `components/Terminal.jsx`
- **Styling/Theme**: `styles/globalStyles.js`
- **Main Entry**: `pages/Portofolio.jsx` (Note: intentional typo in filename)

## CONVENTIONS
- Use `usePortfolio()` hook for all IDE state.
- Styles must be imported from `globalStyles.js` as JS objects.
- No Tailwind for IDE components; maintain Darcula pixel-perfection.
- Internal links use relative paths to stay within `/2025/` prefix.

## ANTI-PATTERNS
- ❌ Renaming `Portofolio.jsx` (breaks top-level routing).
- ❌ Adding Tailwind classes to IDE components.
- ❌ Importing 2026 features into this module.
- ❌ Using absolute paths without `/2025/` prefix.
