# 2026 FEATURES

## OVERVIEW
Feature-based modules for the Motion Studio redesign. Each directory is a self-contained visual or functional unit.

## WHERE TO LOOK
- **about/**: AboutHero, bio sections.
- **gallery/**: GalleryGrid (60/40 asymmetric) + ProjectCard.
- **hero/**: Typographic wordmark + Mascot illustration.
- **projects/**: ProjectDetail route and specific project views.

## CONVENTIONS
- **Self-Containment**: No cross-feature imports. Features are isolated.
- **Components**: Sub-components live in `features/<feature>/components/`.
- **Data**: Gallery consumes shared `PROJECTS` constant from `src/constants/projects.js`.
- **AboutHero**: Hero layout with left text, right photo frame, connected by decorative rule.
- **Styling**: Tailwind CSS 4 exclusively. Pure black (#000000) backgrounds.
- **Animation**: Framer Motion for reveals, GSAP for complex timelines.
- **Routing**: Relative paths only (e.g., `about` not `/about`) within features.
