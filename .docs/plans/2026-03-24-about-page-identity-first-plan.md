# About Page Identity-First Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a high-impact, motion-centric "About" page at `/2026/about` with massive typography layered over a portrait.

**Architecture:** Create a self-contained feature directory `src/2026/features/about/`. Use Framer Motion for parallax and entry animations. Register the route in the 2026 main entry point.

**Tech Stack:** React 19, Tailwind CSS 4, Framer Motion, Lucide React.

---

### Task 1: Route Registration & Directory Setup

**Files:**
- Create: `src/2026/features/about/AboutPage.jsx`
- Modify: `src/2026/Portfolio2026.jsx`

- [ ] **Step 1: Create the `src/2026/features/about/` directory.**
- [ ] **Step 2: Create a placeholder `AboutPage.jsx`.**

```jsx
import React from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-32 px-8">
      <h1 className="text-4xl font-bold">About Page Placeholder</h1>
    </div>
  );
};

export default AboutPage;
```

- [ ] **Step 3: Register the route `/about` in `src/2026/Portfolio2026.jsx`.**

```jsx
// ... existing imports
import AboutPage from './features/about/AboutPage';

// Inside Routes:
<Route path="/about" element={<AboutPage />} />
```

- [ ] **Step 4: Commit.**

---

### Task 2: Identity-First Hero (Typography Over Photo)

**Files:**
- Create: `src/2026/features/about/components/AboutHero.jsx`
- Modify: `src/2026/features/about/AboutPage.jsx`

- [ ] **Step 1: Implement the `AboutHero` component with z-index layering.**

```jsx
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AboutHero = () => {
  const { scrollY } = useScroll();
  
  // Parallax: Text moves faster than Photo
  const textY = useTransform(scrollY, [0, 500], [0, -150]);
  const photoY = useTransform(scrollY, [0, 500], [0, -50]);

  return (
    <section className="relative h-screen w-full bg-black overflow-hidden select-none">
      {/* Photo Layer (z-10) */}
      <motion.div 
        style={{ y: photoY }}
        className="absolute bottom-0 right-0 w-1/2 h-[80vh] z-10"
      >
        <img 
          src="/about-portrait.jpg" 
          alt="Portrait" 
          className="w-full h-full object-cover grayscale brightness-75 transition-all duration-700"
        />
      </motion.div>

      {/* Typography Layer (z-20) */}
      <motion.div 
        style={{ y: textY }}
        className="relative z-20 pt-[20vh] pl-[8vw] pointer-events-none"
      >
        <div className="flex flex-col gap-0">
          {['HELLO', 'I AM', '— AKBAR.'].map((line, i) => (
            <motion.h1 
              key={line}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + (i * 0.2), duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[16vw] font-black leading-[0.8] tracking-tighter text-white"
            >
              {line}
            </motion.h1>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default AboutHero;
```

- [ ] **Step 2: Add `AboutHero` to `AboutPage.jsx`.**
- [ ] **Step 3: Commit.**

---

### Task 3: Manifesto & Storytelling Content

**Files:**
- Create: `src/2026/features/about/components/Manifesto.jsx`
- Modify: `src/2026/features/about/AboutPage.jsx`

- [ ] **Step 1: Create the `Manifesto` component using the 2025 bio content.**

```jsx
import React from 'react';
import { motion } from 'framer-motion';

const Manifesto = () => {
  return (
    <section className="bg-black py-32 px-[8vw]">
      <div className="max-w-6xl">
        <motion.p 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-medium leading-tight text-white/90"
        >
          I'm a software engineer who likes to keep Android, backend, and web in
          the same conversation. That usually means prototyping flows on mobile,
          wiring the data layer, and mirroring the experience on the web so users
          never feel lost.
        </motion.p>
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 text-xl text-white/60">
          <p>
            Most sessions start with headphones on—music is the metronome that keeps
            me iterating fast. I care about launching things that feel intentional,
            even when the timeline is aggressive.
          </p>
          <p>
            I architect stacks that scale across platforms without losing coherence. 
            Iteration speed and human signal are my core dependencies.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
```

- [ ] **Step 2: Add `Manifesto` to `AboutPage.jsx`.**
- [ ] **Step 3: Commit.**

---

### Task 4: Final Polishing & Responsive Adjustments

**Files:**
- Modify: `src/2026/features/about/components/AboutHero.jsx`

- [ ] **Step 1: Ensure typography scales gracefully for mobile.**
- [ ] **Step 2: Verify `z-index` layering (Text strictly over Photo).**
- [ ] **Step 3: Commit.**
