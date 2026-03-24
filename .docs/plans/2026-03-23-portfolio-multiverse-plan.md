# Portfolio Multiverse Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a "Multiverse" architecture to support multiple yearly portfolio versions (2025, 2026) with an isolated context per year and a global UI switcher.

**Architecture:** A top-level `App.jsx` handles routing between `/2025` and `/2026`. Each route renders a fully isolated tree. A global `VersionSwitcher.jsx` component floats above the routes and dynamically changes its styling based on the active URL path.

**Tech Stack:** React 19, React Router DOM, Tailwind CSS.

---

### Task 1: Create Global Router Setup

**Files:**
- Create: `src/App.jsx`
- Modify: `src/main.jsx`

- [ ] **Step 1: Create `src/App.jsx`**
Create a new file that will serve as the global router and layout container.

```jsx
// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Portfolio2025 from './2025/pages/Portofolio';

// Placeholder for 2026 to ensure routing works
const Placeholder2026 = () => (
  <div className="flex items-center justify-center h-screen bg-black text-white text-2xl font-mono">
    Initializing 2026 Environment...
  </div>
);

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/2025" replace />} />
        <Route path="/2025/*" element={<Portfolio2025 />} />
        <Route path="/2026/*" element={<Placeholder2026 />} />
      </Routes>
    </>
  );
};

export default App;
```

- [ ] **Step 2: Update `src/main.jsx`**
Replace the direct rendering of `Portfolio` with the new `App` component.

```jsx
// src/main.jsx (relevant parts)
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
```

- [ ] **Step 3: Run the app and verify routing**
Start the dev server and verify that visiting `/` redirects to `/2025` and loads the IDE, while visiting `/2026` shows the placeholder text.

- [ ] **Step 4: Commit**
```bash
git add src/App.jsx src/main.jsx
git commit -m "feat(core): setup global router for multiverse architecture"
```

---

### Task 2: Build the Dynamic Version Switcher

**Files:**
- Create: `src/components/VersionSwitcher.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create `VersionSwitcher.jsx`**
Build a floating button that uses `useLocation` to determine its style and a simple dropdown state to navigate.

```jsx
// src/components/VersionSwitcher.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const VersionSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const currentYear = location.pathname.startsWith('/2026') ? '2026' : '2025';

  const handleSwitch = (year) => {
    setIsOpen(false);
    if (year !== currentYear) {
      navigate(`/${year}`);
    }
  };

  // The Chameleon Effect: Style changes based on URL
  const buttonStyle = currentYear === '2026'
    ? 'bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full hover:bg-white/20 shadow-lg'
    : 'bg-[#3C3F41] border border-[#232525] text-[#A9B7C6] rounded-none hover:bg-[#4B4F52] shadow-md';

  const menuStyle = currentYear === '2026'
    ? 'bg-black/80 backdrop-blur-xl border border-white/20 text-white rounded-2xl shadow-xl'
    : 'bg-[#2B2B2B] border border-[#4B4F52] text-[#A9B7C6] rounded-none shadow-md';

  const itemHoverStyle = currentYear === '2026'
    ? 'hover:bg-white/10 rounded-xl'
    : 'hover:bg-[#4B4F52]';

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      {isOpen && (
        <div className={`mb-2 p-1 min-w-[120px] overflow-hidden ${menuStyle}`}>
          <div
            onClick={() => handleSwitch('2026')}
            className={`px-4 py-2 cursor-pointer transition-colors flex items-center justify-between ${itemHoverStyle} ${currentYear === '2026' ? 'opacity-100 font-bold' : 'opacity-70'}`}
          >
            <span>v2026</span>
            {currentYear === '2026' && <span className="text-xs">✓</span>}
          </div>
          <div
            onClick={() => handleSwitch('2025')}
            className={`px-4 py-2 cursor-pointer transition-colors flex items-center justify-between ${itemHoverStyle} ${currentYear === '2025' ? 'opacity-100 font-bold' : 'opacity-70'}`}
          >
            <span>v2025</span>
            {currentYear === '2025' && <span className="text-xs">✓</span>}
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-4 py-2 flex items-center gap-2 font-mono text-sm transition-all duration-300 ${buttonStyle}`}
      >
        <span>v{currentYear}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
};

export default VersionSwitcher;
```

- [ ] **Step 2: Inject into `App.jsx`**
Import and place the switcher at the bottom of the App component.

```jsx
// src/App.jsx (append inside the fragment)
import VersionSwitcher from './components/VersionSwitcher';

// ... inside App return:
    <>
      <Routes>
        {/* ... routes ... */}
      </Routes>
      <VersionSwitcher />
    </>
```

- [ ] **Step 3: Run and verify**
Click the button in the bottom right. Verify the dropdown opens, clicking a year navigates properly, and the styling morphs based on the URL.

- [ ] **Step 4: Commit**
```bash
git add src/components/VersionSwitcher.jsx src/App.jsx
git commit -m "feat(ui): implement dynamic chameleon version switcher"
```