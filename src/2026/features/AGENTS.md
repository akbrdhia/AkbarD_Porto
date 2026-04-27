# 2026 FEATURES

## OVERVIEW
Feature-based modules for the Motion Studio redesign. Each directory is a self-contained visual or functional unit.

## WHERE TO LOOK
- **about/**: Manifesto kinetic text, ExperienceTimeline, SkillsCloud.
- **gallery/**: GalleryGrid (60/40 asymmetric) + ProjectCard.
- **hero/**: Typographic wordmark + Mascot illustration.
- **projects/**: ProjectDetail route and specific project views.

## CONVENTIONS
- **Self-Containment**: No cross-feature imports. Features are isolated.
- **Components**: Sub-components live in `features/<feature>/components/`.
- **Data**: Gallery consumes shared `PROJECTS` constant from `src/constants/projects.js`.
- **Kinetic Text**: About feature uses `Manifesto.jsx` for kinetic typography.
- **Styling**: Tailwind CSS 4 exclusively. Pure black (#000000) backgrounds.
- **Animation**: Framer Motion for reveals, GSAP for complex timelines.
- **Routing**: Relative paths only (e.g., `about` not `/about`) within features.
