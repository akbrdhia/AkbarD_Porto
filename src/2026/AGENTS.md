# 2026 — Motion Studio Module

OVERVIEW: Motion Studio redesign (Active development) — pure black, typographic maximalism.

STRUCTURE:
- constants/: config.js (nav, social, location)
- features/: Feature-based modules (hero, gallery, projects, about)
- layout/: Navbar, Footer, SmoothScroll, MainLayout
- style/: Global 2026 styles

WHERE TO LOOK:
- Entry point: Portfolio2026.jsx (Routes + MainLayout)
- Design system: DESIGN.md (MANDATORY READ)
- Feature components: features/<feature>/components/*.
- Nav/Social config: constants/config.js
- Smooth scroll: layout/SmoothScroll.jsx (Lenis)

CONVENTIONS:
- Tech: Tailwind CSS 4, Framer Motion, GSAP, Lenis.
- Naming: features/<feature>/components/*.
- Coupling: Imports PERSONAL_INFO from src/2025/constants/portfolioData.js.
- Background: #000000 (pure black).
- Text: #FFFFFF only.
- Accent: #F5C842 (max once per viewport).
- Hero text: 20vw+, weight 900, lowercase, intentional overflow.

ANTI-PATTERNS:
- ❌ Backgrounds other than #000000.
- ❌ Gradients on black.
- ❌ Rounded card borders.
- ❌ Nav container background/blur.
- ❌ Inline style objects (Tailwind only).
- ❌ New cross-imports to src/2025/.
- ❌ Centered hero text (left-anchored only).
