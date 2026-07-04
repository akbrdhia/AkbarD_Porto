# Hero Section Parallax Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a layered parallax effect in the 2026 Hero section where the "akbard" title moves slower than the tagline.

**Architecture:** Use `framer-motion`'s `useScroll` and `useTransform` to drive a `y` offset on an absolute-positioned background title. Wrap the transform in `useSpring` for fluid motion.

**Tech Stack:** React, TailwindCSS, Framer Motion.

---

### Task 1: Component Refactoring & Basic Layering

**Files:**
- Modify: `src/2026/features/hero/Hero.jsx`

- [ ] **Step 1: Update imports and add container ref**
Add `useRef` from 'react' and `useScroll`, `useTransform`, `useSpring`, `useReducedMotion` from 'framer-motion'. Create a `containerRef`.

- [ ] **Step 2: Restructure the JSX for layering**
Wrap the content in a relative container with `overflow-hidden` and `min-h-[120vh]`. Attach `ref={containerRef}` to the `<section>` element. Move the title to a background layer (`z-0`) and the tagline to a foreground layer (`z-10`).

- [ ] **Step 3: Update title text to lowercase**
Change "AkbarD" to "akbard" and add `aria-hidden="true"`.

- [ ] **Step 4: Commit**
```bash
git add src/2026/features/hero/Hero.jsx
git commit -m "feat(hero): restructure layout for layering and accessibility"
```

---

### Task 2: Implement Parallax Motion logic

**Files:**
- Modify: `src/2026/features/hero/Hero.jsx`

- [ ] **Step 1: Set up scroll tracking and transform**
Implement `useScroll({ target: containerRef, offset: ["start start", "end start"] })`. Use `useTransform` to map the scroll from `[0, 1]` to a `y` offset (e.g., `0` to `200px`).

- [ ] **Step 2: Add smoothness and reduced motion support**
Wrap the transform in `useSpring` with `{ stiffness: 100, damping: 30 }`. Check `useReducedMotion()` and use it to set the final `y` value: `const y = shouldReduceMotion ? 0 : springY;`.

- [ ] **Step 3: Apply parallax to the background title**
Add the calculated `y` value to the title's `style` prop.

- [ ] **Step 4: Commit**
```bash
git add src/2026/features/hero/Hero.jsx
git commit -m "feat(hero): implement smooth parallax motion using framer-motion"
```

---

### Task 3: Performance & Visual Refinements

**Files:**
- Modify: `src/2026/features/hero/Hero.jsx`

- [ ] **Step 1: Add GPU acceleration hint**
Add `will-change: transform` to the background title's className.

- [ ] **Step 2: Fine-tune parallax intensity**
Adjust the `useTransform` output range to ensure the title moves "just a bit" as requested (e.g., 15-20% of scroll speed).

- [ ] **Step 3: Verify "about" link interactivity**
Ensure the foreground layer doesn't block clicks to the `about →` link.

- [ ] **Step 4: Commit**
```bash
git add src/2026/features/hero/Hero.jsx
git commit -m "perf(hero): optimize parallax performance and fine-tune motion"
```
