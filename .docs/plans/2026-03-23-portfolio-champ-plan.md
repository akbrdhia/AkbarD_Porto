# Champ Style Portfolio 2026 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the 2026 portfolio using the "Champ Style" typographic maximalism design (pure black background, massive bleeding text, invisible navigation, and motion-first animations).

**Architecture:** A visually aggressive React application using modular CSS for strict style enforcement. It utilizes `MainLayout` to wrap the `Navbar` (floating, text-only), a massive full-bleed `Hero` section with Framer Motion entrance animations, and a flush, asymmetric `GalleryGrid`. 

**Tech Stack:** React 19, Framer Motion, CSS.

---

### Task 1: Setup Theme and Typography Core

**Files:**
- Modify: `src/2026/theme/theme.css`
- Modify: `src/2026/theme/typography.css`

- [ ] **Step 1: Define CSS Variables and Core Layout**
Update `theme.css` to define the pure black/white theme.

```css
:root {
  --bg: #000000;
  --text: #ffffff;
  --accent: #F5C842;
}

body {
  background-color: var(--bg);
  color: var(--text);
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* Crucial for text bleed */
}
```

- [ ] **Step 2: Define Typography Rules**
Update `typography.css` to import a geometric sans-serif (e.g., Sora) and define utility classes.

```css
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;900&display=swap');

:root {
  --font-family: 'Sora', sans-serif;
}

body {
  font-family: var(--font-family);
}

.hero-text {
  font-size: clamp(18vw, 22vw, 26vw);
  font-weight: 900;
  line-height: 0.85;
  letter-spacing: -0.02em;
  white-space: nowrap;
}

.statement-text {
  font-size: clamp(1.5rem, 3vw, 2.8rem);
  font-weight: 600;
  line-height: 1.2;
}

.nav-text {
  font-size: 0.85rem;
  font-weight: 400;
}
```

- [ ] **Step 3: Test visual changes**
Run: `npm run dev`
Expected: Background should be black, and text (if any) should be white and use the Sora font.

- [ ] **Step 4: Commit**
```bash
git add src/2026/theme/theme.css src/2026/theme/typography.css
git commit -m "feat: setup black/white theme and max typography for 2026 portfolio"
```

---

### Task 2: Implement Invisible Navbar

**Files:**
- Modify: `src/2026/layout/Navbar.jsx`

- [ ] **Step 1: Write Navbar Implementation**

```jsx
import React from 'react';
import '../theme/typography.css';

const Navbar = () => {
  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      display: 'flex',
      justifyContent: 'space-between',
      padding: '1.25rem 1.5rem',
      background: 'transparent',
      zIndex: 100
    }}>
      <div className="nav-text" style={{ fontWeight: 600 }}>champ studio</div>
      <div className="nav-text">home, about, projects, play, team, contact</div>
      <div className="nav-text">los angeles, ca <span style={{ color: '#00ff00' }}>●</span></div>
    </nav>
  );
};

export default Navbar;
```

- [ ] **Step 2: Test rendering**
Run: `npm run dev` (Ensure Navbar is mounted somewhere temporarily, or tested in Task 3).
Expected: Three elements spread across the top, floating text over background.

- [ ] **Step 3: Commit**
```bash
git add src/2026/layout/Navbar.jsx
git commit -m "feat: implement floating text-only navbar"
```

---

### Task 3: Implement Main Layout

**Files:**
- Modify: `src/2026/layout/MainLayout.jsx`

- [ ] **Step 1: Write MainLayout Implementation**

```jsx
import React from 'react';
import Navbar from './Navbar';
import '../theme/theme.css';
import '../theme/typography.css';

const MainLayout = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh', width: '100vw', background: 'var(--bg)', color: 'var(--text)' }}>
      <Navbar />
      <main>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
```

- [ ] **Step 2: Commit**
```bash
git add src/2026/layout/MainLayout.jsx
git commit -m "feat: implement MainLayout with Navbar"
```

---

### Task 4: Implement Full-Bleed Hero Section

**Files:**
- Modify: `src/2026/features/hero/Hero.jsx`

- [ ] **Step 1: Write Hero Implementation with Framer Motion**

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import '../../theme/typography.css';

const Hero = () => {
  return (
    <section style={{ 
      paddingTop: '20vh', 
      paddingLeft: '1.5rem', 
      minHeight: '70vh',
      overflow: 'hidden'
    }}>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="hero-text" style={{ margin: 0, padding: 0 }}>
          champ
        </h1>
      </motion.div>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginTop: '2rem', marginLeft: '3%' }}
      >
        <p className="statement-text">
          we make things move. an independent creative studio focused on motion and typographic storytelling.
        </p>
      </motion.div>
    </section>
  );
};

export default Hero;
```

- [ ] **Step 2: Commit**
```bash
git add src/2026/features/hero/Hero.jsx
git commit -m "feat: implement maximalist bleeding hero section"
```

---

### Task 5: Implement Asymmetric Gallery Grid

**Files:**
- Modify: `src/2026/features/gallery/ProjectCard.jsx`
- Modify: `src/2026/features/gallery/GalleryGrid.jsx`

- [ ] **Step 1: Write ProjectCard Implementation**

```jsx
import React from 'react';

const ProjectCard = ({ color }) => {
  return (
    <div style={{
      aspectRatio: '16/9',
      width: '100%',
      backgroundColor: color,
      overflow: 'hidden',
      cursor: 'pointer'
    }}>
      {/* Visual placeholder since we don't have rich media assets yet */}
      <div style={{
        width: '100%', height: '100%',
        transition: 'transform 400ms cubic-bezier(0.2, 0, 0, 1)'
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      />
    </div>
  );
};

export default ProjectCard;
```

- [ ] **Step 2: Write GalleryGrid Implementation**

```jsx
import React from 'react';
import ProjectCard from './ProjectCard';

const GalleryGrid = () => {
  return (
    <section style={{
      display: 'grid',
      gridTemplateColumns: '60fr 40fr',
      gap: 0,
      width: '100vw',
      marginTop: '5rem'
    }}>
      <ProjectCard color="#4A7EF5" />
      <ProjectCard color="#F5426C" />
      <ProjectCard color="#42F5A1" />
      <ProjectCard color="#F5C842" />
    </section>
  );
};

export default GalleryGrid;
```

- [ ] **Step 3: Commit**
```bash
git add src/2026/features/gallery/ProjectCard.jsx src/2026/features/gallery/GalleryGrid.jsx
git commit -m "feat: implement asymmetric flush gallery grid"
```

---

### Task 6: Assemble Portfolio2026

**Files:**
- Modify: `src/2026/Portfolio2026.jsx`

- [ ] **Step 1: Assemble layout and components**

```jsx
import React from 'react';
import MainLayout from './layout/MainLayout';
import Hero from './features/hero/Hero';
import GalleryGrid from './features/gallery/GalleryGrid';

const Portfolio2026 = () => {
  return (
    <MainLayout>
      <Hero />
      <GalleryGrid />
    </MainLayout>
  );
};

export default Portfolio2026;
```

- [ ] **Step 2: Final Verification**
Run: `npm run dev`
Expected: The app mounts without errors. You should see a pure black background, floating nav, an animated massive "champ" hero, and a 60/40 grid of colored blocks representing projects.

- [ ] **Step 3: Commit**
```bash
git add src/2026/Portfolio2026.jsx
git commit -m "feat: assemble complete 2026 portfolio layout"
```