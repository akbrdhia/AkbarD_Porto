# AkbarD_Porto: Portfolio Project Mandates

## 🏛️ Project Architecture
- **Dual-Version Strategy:** This project maintains two distinct versions:
  - `src/2025/`: The "IDE Mode" legacy portfolio. Accessible via `/2025/*`.
  - `src/2026/`: The "Gallery Mode" modern portfolio. Accessible via `/2026/*`.
- **Prefix Isolation:** All internal navigation within `src/2025` or `src/2026` MUST preserve its respective path prefix. Use relative navigation (`navigate('subpath')`) or correctly prefixed absolute paths (`navigate('/2025/subpath')`).
- **Isolation Rule:** Never modify `src/2025/` unless specifically directed for maintenance. All new feature work happens in `src/2026/`.

## 🎨 Design System (2026)
- **Style:** "Typographic Maximalism" (Ref: `src/2026/DESIGN.md`).
- **Tailwind 4:** Use `p26-` prefixed tokens (e.g., `text-p26-primary`).
- **Pure Black:** Backgrounds intended to be black must be `#000000` (no grays).
- **Motion:** All interactions MUST use `framer-motion`. Transitions should be smooth and cinematic.

## 🛠️ Engineering Standards
- **React 19:** Use modern functional components and hooks.
- **Icons:** Standardize on `lucide-react`.
- **Test-Driven Development (TDD):** Mandatory for utility and business logic.
- **Validation:** Always verify that `/2026` routes do not break the `/2025` routes.

## 🤖 AI Workflow & Jules
- **Task Delegation:** Use `/jules` for cross-cutting refactors or boilerplate-heavy features.
- **Plan First:** Update relevant `.docs/plans/` before starting a major implementation.
- **Brevity:** High-signal, low-noise communication. Follow senior engineer persona.
