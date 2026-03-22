# Portfolio 2026: Initialization & Feature Architecture Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Initialize the 2026 "Gallery Mode" portfolio version with a feature-oriented architecture, Tailwind 4 tokens, and Framer Motion integration.

**Architecture:** A sub-router (`Portfolio2026.jsx`) handles the `/2026/*` route. Styling is isolated via `p26-` prefixed Tailwind 4 tokens and scoped CSS imports. Features are organized in domain-driven folders (`hero`, `gallery`, etc.).

**Tech Stack:** React 19, Tailwind CSS 4, Framer Motion, Lucide React.

---

### Task 1: Initialize Theme & Tokens

**Files:**
- Create: `src/2026/theme/theme.css`
- Create: `src/2026/theme/typography.css`

- [ ] **Step 1: Create `src/2026/theme/theme.css`**
Define the Material 3 / VCASS palette and motion tokens using the Tailwind 4 `@theme` block with `p26-` prefixes.

```css
@import "tailwindcss";

@theme {
  /* Primary (Amber/Gold) */
  --color-p26-primary: #875200;
  --color-p26-on-primary: #FFFFFF;
  --color-p26-primary-container: #F59D21;
  --color-p26-on-primary-container: #2B1700;

  /* Neutral / Surface */
  --color-p26-surface: #FCF9F8;
  --color-p26-surface-bright: #FFF8F5;
  --color-p26-surface-container-low: #F6F3F2;
  --color-p26-surface-container: #F0EDEC;
  --color-p26-surface-container-high: #EAE7E6;
  --color-p26-surface-container-highest: #E4E1E0;

  /* On-Surface (Text) */
  --color-p26-on-surface: #1C1B1B;
  --color-p26-on-surface-variant: #4D4443;
  --color-p26-outline: #7F7373;

  /* Motion Timing (Section 9) */
  --duration-p26-instant: 80ms;
  --duration-p26-fast: 150ms;
  --duration-p26-base: 250ms;
  --duration-p26-slow: 400ms;
  --duration-p26-languid: 600ms;
  --duration-p26-cinematic: 900ms;

  /* Easing (Section 9) */
  --ease-p26-standard: cubic-bezier(0.2, 0.0, 0, 1.0);
  --ease-p26-out: cubic-bezier(0.0, 0.0, 0.2, 1);
  --ease-p26-expressive: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

- [ ] **Step 2: Create `src/2026/theme/typography.css`**
Implement Section 10 fluid typography using CSS `clamp`.

```css
@layer base {
  .p26-display-lg {
    font-size: clamp(2rem, 5vw + 0.5rem, 3.5rem);
    letter-spacing: -0.02em;
    line-height: 1.1;
    font-family: var(--font-display);
  }
  .p26-body-lg {
    font-size: 1rem;
    line-height: 1.6;
    font-family: var(--font-body);
  }
}
```

- [ ] **Step 3: Commit**
```bash
git add src/2026/theme/
git commit -m "feat(2026): initialize tailwind 4 tokens and typography"
```

---

### Task 2: Build the Core Layout & Shell

**Files:**
- Create: `src/2026/layout/MainLayout.jsx`
- Create: `src/2026/Portfolio2026.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create `src/2026/layout/MainLayout.jsx`**
Build the page shell that overrides global styles and provides the glassmorphism base.

```jsx
import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-p26-surface text-p26-on-surface selection:bg-p26-primary-container selection:text-p26-on-primary-container font-body">
      {/* Background layer for potential parallax/noise */}
      <div className="fixed inset-0 pointer-events-none bg-[url('/setup.jpg')] opacity-5 bg-cover bg-center mix-blend-multiply" />
      
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
```

- [ ] **Step 2: Create `src/2026/Portfolio2026.jsx`**
The entry point that imports tokens and sets up the sub-router.

```jsx
import React from 'react';
import './theme/theme.css';
import './theme/typography.css';
import MainLayout from './layout/MainLayout';
import Hero from './features/hero/Hero';

const Portfolio2026 = () => {
  return (
    <MainLayout>
      <Hero />
      {/* Future feature sections will be added here */}
    </MainLayout>
  );
};

export default Portfolio2026;
```

- [ ] **Step 3: Update `src/App.jsx`**
Replace `Placeholder2026` with the real `Portfolio2026` component.

```jsx
// src/App.jsx
import Portfolio2026 from './2026/Portfolio2026';

// Replace Placeholder2026 in the routes:
<Route path="/2026/*" element={<Portfolio2026 />} />
```

- [ ] **Step 4: Commit**
```bash
git add src/2026/layout/ src/2026/Portfolio2026.jsx src/App.jsx
git commit -m "feat(2026): setup core layout and replace placeholder route"
```

---

### Task 3: Implement Initial Hero Feature

**Files:**
- Create: `src/2026/features/hero/Hero.jsx`

- [ ] **Step 1: Create `src/2026/features/hero/Hero.jsx`**
Implement a minimal hero section with Framer Motion reveals (Section 9).

```jsx
import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-20 py-32 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0.0, 0, 1.0] }}
        className="max-w-4xl"
      >
        <span className="text-p26-primary font-mono text-sm tracking-widest uppercase mb-4 block">
          Portfolio v2026
        </span>
        <h1 className="p26-display-lg mb-8">
          Crafting digital <br />
          <span className="text-p26-primary">experiences</span> that breathe.
        </h1>
        <p className="p26-body-lg text-p26-on-surface-variant max-w-xl">
          An editorial approach to software engineering. Focus on motion, 
          typography, and intentional asymmetry.
        </p>
      </motion.div>
    </section>
  );
};

export default Hero;
```

- [ ] **Step 2: Verify in Browser**
Visit `/2026`. Verify:
1. "Portfolio v2026" is Gold/Amber.
2. Background is light (`#FCF9F8`).
3. Heading has the `display-lg` scale.
4. Smooth reveal animation on load.

- [ ] **Step 3: Commit**
```bash
git add src/2026/features/hero/
git commit -m "feat(2026): implement initial hero section with motion"
```
