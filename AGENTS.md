# Agent Roles & Responsibilities

## 🏛️ System Architect
- **Focus:** Project structure, routing (`App.jsx`), and version isolation.
- **Mandate:** Ensure that changes to the `2026/` directory do not regress the `2025/` (IDE Mode) legacy code. Maintain strict path prefixing (`/2025/*` and `/2026/*`).

## 🎨 UI/UX Specialist (2026)
- **Focus:** `src/2026/features/`, `src/2026/theme/`.
- **Expertise:** Tailwind CSS 4, Framer Motion, Typographic Maximalism.
- **Mandate:** Adhere strictly to `src/2026/DESIGN.md`. Prioritize "Motion Studio" aesthetics (pure black, large type, cinematic motion).

## 🛠️ Legacy Maintainer
- **Focus:** `src/2025/`, IDE mode components, and terminal logic.
- **Mandate:** Maintain stability for the existing portfolio while 2026 is under construction. Fix navigation bugs that break the sub-route prefix.

## 🧪 Quality Assurance (QA)
- **Focus:** Verification of responsive design across both versions and cross-route navigation.
- **Mandate:** Always verify that `/2026` and `/2025` routes function independently and correctly prefix their sub-paths.
