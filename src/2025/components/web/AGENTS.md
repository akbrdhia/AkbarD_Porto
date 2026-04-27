# 2025 Web Mode Components

Web-mode UI only (`/2025/web`). Scroll-based portfolio experience, visually distinct from IDE mode.

## STRUCTURE
```
web/
├── index.js             # Barrel export for web components
├── WarpBackground.jsx   # Animated canvas background
├── WebCursor.jsx        # Custom cursor (desktop only)
├── WebGlobalStyles.jsx  # Global style injector for web mode
├── WebLoadingScreen.jsx # Loading animation
├── WebNavbar.jsx        # Sticky nav bar
├── WebSideNav.jsx       # Side navigation dots
└── sections/            # Page sections (ordered scroll)
    ├── HeroSection.jsx
    ├── AboutSection.jsx
    ├── ProjectsSection.jsx
    ├── SkillsSection.jsx
    ├── ExperienceSection.jsx
    ├── MarqueeSection.jsx
    └── ContactSection.jsx
```

## CONVENTIONS
- Sections are assembled in `pages/WebModePage.jsx` in scroll order
- Uses Tailwind classes (unlike IDE components which use JS style objects)
- `index.js` barrel: import web components from `./web` not individual files
- `WebGlobalStyles.jsx` injects CSS into `<head>` — only one instance per page

## ANTI-PATTERNS
- ❌ Importing these inside IDE-mode components (Editor, Terminal, Sidebar)
- ❌ Duplicating `WarpBackground` — reuse the existing component
- ❌ Adding sections outside the `sections/` subfolder
