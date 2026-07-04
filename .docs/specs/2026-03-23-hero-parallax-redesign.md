# Hero Section Parallax Redesign Spec (2026)

## Overview
Redesign the 2026 Portfolio Hero section to feature a layered, parallax effect. The large "akbard" title will sit behind the tagline text and move at a slower rate during scroll to create depth.

## Goals
- Layer the "akbard" title behind the tagline ("about → ...").
- Implement a subtle parallax effect where the title moves slower than the scroll speed.
- Maintain existing entrance animations and interactive "about" link.
- Align with "Typographic Maximalism" style (lowercase title, bold weights).

## Architecture

### 1. Layout & Layering
- **Container:** `Hero.jsx` will be a `relative` container with `min-h-[120vh]` to allow for scroll space and `overflow-hidden` to prevent horizontal scrollbars from the oversized title.
- **Background Layer (z-0):** The "akbard" title.
  - Position: `absolute` or `fixed` within the hero container.
  - Styling: `text-[clamp(22vw,26vw,30vw)]`, `font-black`, `lowercase`, `opacity-80`, `will-change: transform`.
  - Accessibility: `aria-hidden="true"`.
  - Overflow: Allowed to bleed off edges as per `DESIGN.md`.
- **Foreground Layer (z-10):** The tagline text.
  - Position: `relative`.
  - Content: `about → Software engineer who gives a damn about how things work and how they look.`
  - Styling: `text-[2.75rem] md:text-[3.5rem]`, `font-bold`.

### 2. Motion & Parallax
- **Library:** `framer-motion`.
- **Scroll Tracking:** Use `useScroll` with a `target` ref pointing to the Hero section container.
- **Motion Reduction:** Use `useReducedMotion` to dampen or disable the parallax effect for users with motion sensitivities.
- **Parallax Transform:** 
  - Use `useTransform` to map scroll progress (e.g., `0` to `500px`) to a subtle `y` offset for the background title.
  - Intensity: Move ~15-20% of scroll distance (e.g., `0` to `100px`). Scale this intensity down for mobile viewports.
  - Smoothness: Wrap the transform output in `useSpring` (e.g., `useSpring(yTransform, { stiffness: 400, damping: 90 })`) for fluid motion.
- **Entrance Animation:** 
  - Title: Fade in and slide up slightly on mount.
  - Tagline: Slide up from `y: 30` with a slight delay.

### 3. Interactions & Performance
- The `about →` link within the tagline must remain clickable and maintain its hover state (animated underline).
- Leverage GPU acceleration by ensuring the parallax is purely transform-based.

## Success Criteria
- [ ] Title "akbard" is visually behind the tagline.
- [ ] Title is lowercase and accessible (`aria-hidden`).
- [ ] Title moves noticeably slower than the tagline when scrolling.
- [ ] "about →" link remains interactive.
- [ ] No horizontal scrollbars created by the overflowing title.
- [ ] Parallax is disabled or minimal if "Reduced Motion" is enabled.
