# About Page Sections Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement Experience and Skills sections in the 2026 About Page with high-motion aesthetics.

**Architecture:** 
- `ExperienceTimeline`: GSAP ScrollTrigger for masked reveals of experience items.
- `SkillsCloud`: Framer Motion for interactive floating skill pills with mouse repulsion.
- Integration into `AboutPage.jsx`.

**Tech Stack:** React, GSAP, Framer Motion, Tailwind CSS 4.

---

### Task 1: Create ExperienceTimeline Component

**Files:**
- Create: `src/2026/features/about/components/ExperienceTimeline.jsx`

**Step 1: Implement the basic structure and data**
Define the experience data extracted from `portfolioData.js`.

**Step 2: Implement GSAP ScrollTrigger for masked reveal**
Use `useGSAP` to animate the reveal of each experience item.

**Step 3: Style with 'Motion Studio' aesthetic**
Pure black background, massive white bold text for years.

### Task 2: Create SkillsCloud Component

**Files:**
- Create: `src/2026/features/about/components/SkillsCloud.jsx`

**Step 1: Implement the basic structure and data**
Define the skills data.

**Step 2: Implement floating animation with Framer Motion**
Use `animate` prop with `repeat: Infinity` and `repeatType: "reverse"`.

**Step 3: Implement mouse repulsion logic**
Track mouse position and adjust pill positions based on proximity.

### Task 3: Integrate into AboutPage

**Files:**
- Modify: `src/2026/features/about/AboutPage.jsx`

**Step 1: Import and add components**
Add `ExperienceTimeline` and `SkillsCloud` after `Manifesto`.

**Step 2: Verify transitions and spacing**
Ensure smooth flow between sections.
