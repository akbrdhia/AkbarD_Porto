# Portfolio 2026: Initialization & Feature Architecture

**Status:** Draft
**Date:** 2026-03-23
**Owner:** Gemini CLI

## 1. Executive Summary
Initialize the "2026 Gallery Mode" of the portfolio using a **Feature-Oriented (Screaming) Architecture**. This version will be strictly isolated from the 2025 "IDE Mode" while leveraging the modern **React 19 + Tailwind 4** stack.

## 2. Architecture & Folder Structure
To ensure "Screaming Intent," the code is organized by feature rather than technical type:

```text
src/2026/
├── Portfolio2026.jsx        # Sub-router & Context Provider
├── theme/                   # Tailwind 4 Tokens (Section 7-9)
│   ├── theme.css            # @theme block with p26- prefix
│   └── typography.css       # Section 10 fluid type
├── layout/                  # Page Shell (Section 12)
│   ├── MainLayout.jsx
│   └── Navbar.jsx           # Glassmorphism
├── features/
│   ├── hero/                # "The Entrance" (Section 9 Parallax)
│   ├── gallery/             # "The Showcase" (Section 10 Asymmetry)
│   └── inquiry/             # "The Contact" (Section 11 Forms)
└── shared/
    ├── ui/                  # Material 3 Primitives
    └── hooks/               # useParallax, useReveal
```

## 3. Technical Strategy

### 3.1 Styling (Tailwind 4 + Isolation)
- **Zero Leakage:** All 2026-specific tokens will use the `p26-` prefix (e.g., `bg-p26-surface`).
- **Scoped Entry:** `src/2026/theme/theme.css` is imported **only** in `Portfolio2026.jsx`.
- **Material 3 Tokens:** Directly mapped from `DESIGN.md` Section 7.

### 3.2 Motion (Framer Motion)
- **Cinematic Transitions:** Use `framer-motion` for Section 9's "deliberate and calm" reveals.
- **Timing:**
  - `duration-languid`: 600ms (reveals)
  - `duration-cinematic`: 900ms (parallax)
- **Easing:** `cubic-bezier(0.2, 0.0, 0, 1.0)` (Standard Workhorse).

### 3.3 Routing
- `src/App.jsx` will map `/2026/*` to `Portfolio2026.jsx`.
- `Portfolio2026.jsx` will handle internal scroll-snapping or sub-pages.

## 4. Components to Initialize
1. **`Portfolio2026.jsx`**: The root container.
2. **`theme.css`**: The Tailwind 4 `@theme` configuration.
3. **`MainLayout.jsx`**: The high-level shell with Glassmorphism (Section 12).
4. **`Hero.jsx`**: The initial feature entry point.

## 5. Verification Plan
- **Route Test:** Visit `/2026` and verify the new theme is active.
- **Isolation Test:** Verify `/2025` still looks like the Android Studio IDE (no style bleeding).
- **Token Test:** Verify `text-p26-primary` (Amber/Gold) renders correctly.
