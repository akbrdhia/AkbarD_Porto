# About Page GSAP Scroll-Linked Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the About page hero to use GSAP ScrollTrigger for a cinematic, scroll-linked reveal with pinning and staggered typography.

**Architecture:** Use a `useGSAP` hook for a scroll-linked timeline. The section will be pinned for 300vh, scrubbing through portrait and typography animations.

**Tech Stack:** React 19, GSAP, @gsap/react, ScrollTrigger, Tailwind CSS 4.

---

### Task 1: GSAP Dependency & Setup

**Files:**
- Modify: `package.json`
- Modify: `src/2026/features/about/components/AboutHero.jsx`

- [ ] **Step 1: Install GSAP dependencies.**

Run: `npm install gsap @gsap/react`

- [ ] **Step 2: Register ScrollTrigger and setup basic `useGSAP` skeleton in `AboutHero.jsx`.**

```jsx
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const AboutHero = () => {
  const container = useRef();
  // ...
};
```

- [ ] **Step 3: Commit.**

---

### Task 2: Implement Sticky-Scrub Layout

**Files:**
- Modify: `src/2026/features/about/components/AboutHero.jsx`

- [ ] **Step 1: Wrap existing content in a high-scroll container and a sticky visual wrapper.**

```jsx
return (
  <div ref={container} className="relative h-[300vh] bg-black">
    <div className="sticky top-0 h-screen w-full overflow-hidden select-none flex items-center">
      {/* Visual content goes here */}
    </div>
  </div>
);
```

- [ ] **Step 2: Apply `gsap.set()` for initial hidden states.**

```javascript
useGSAP(() => {
  gsap.set('.hero-line', { y: 100, opacity: 0 });
  gsap.set('.hero-photo', { opacity: 0, scale: 1.1 });
}, { scope: container });
```

- [ ] **Step 3: Commit.**

---

### Task 3: Create Scroll-Linked Timeline

**Files:**
- Modify: `src/2026/features/about/components/AboutHero.jsx`

- [ ] **Step 1: Implement the ScrollTrigger timeline.**

```javascript
useGSAP(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
    }
  });

  tl.to('.hero-photo', { opacity: 1, scale: 1, duration: 1 })
    .to('.line-1', { y: 0, opacity: 1, duration: 1 }, '-=0.5')
    .to('.line-2', { x: 0, opacity: 1, duration: 1 }, '-=0.5')
    .to('.line-3', { x: 0, opacity: 1, duration: 1 }, '-=0.5');
}, { scope: container });
```

- [ ] **Step 2: Update JSX with specific class names for the timeline targets.**
- [ ] **Step 3: Verify z-index (Typography `z-20` over Photo `z-10`).**
- [ ] **Step 4: Commit.**

---

### Task 4: Final Polishing & Responsive GSAP

**Files:**
- Modify: `src/2026/features/about/components/AboutHero.jsx`

- [ ] **Step 1: Ensure responsive values for `x` and `y` offsets.**
- [ ] **Step 2: Verify Smooth Scroll (Lenis) compatibility.**
- [ ] **Step 3: Commit.**
