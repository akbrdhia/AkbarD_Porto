# 2026 Layout

Shared layout shell for all 2026 routes. Controls nav, footer, smooth scroll.

## FILES
| File | Role |
|------|------|
| `MainLayout.jsx` | Wraps all 2026 routes — renders Navbar + SmoothScroll + Footer |
| `Navbar.jsx` | Fixed transparent nav — no background, no blur, text-only floating |
| `Footer.jsx` | Champ-style global footer |
| `SmoothScroll.jsx` | Lenis smooth scroll wrapper — must wrap all scrollable content |

## CONVENTIONS
- `MainLayout` is instantiated once in `Portfolio2026.jsx` — never nest it
- `Navbar` must remain `position: fixed`, `background: transparent` — DESIGN.md rule
- `SmoothScroll` uses Lenis; any new scroll-dependent animation must hook into the existing Lenis instance (via `@gsap/react` ScrollTrigger integration if needed)
- Nav links sourced from `constants/config.js` — edit nav there, not in Navbar.jsx

## ANTI-PATTERNS
- ❌ Adding a background or backdrop-blur to Navbar
- ❌ Wrapping routes in a second `MainLayout`
- ❌ Adding page-specific logic into `MainLayout` — it's layout-only
- ❌ Bypassing SmoothScroll for page-level scroll containers
