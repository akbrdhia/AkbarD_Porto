# Portofolio Multiverse Architecture: Versioning & Switcher Design

## 1. Overview
The goal of this project is to evolve the personal portfolio into a "Multiverse" architecture, allowing different yearly versions (e.g., 2025, 2026) to coexist within a single React application. Each version will have its own isolated environment (styling, state, components) while sharing a common routing layer. A global UI component will allow recruiters and visitors to seamlessly "time travel" between these versions.

## 2. Goals & Success Criteria
*   **Isolation:** The `2025` (IDE theme) and `2026` (future theme) directories must operate independently without state leakage or CSS conflicts.
*   **Seamless Navigation:** Switching between versions should be instant without full page reloads, leveraging React Router.
*   **Dynamic UI Switcher:** A persistent global switcher must exist that visually adapts its own styling to match the currently active year's theme (e.g., Material UI for 2025, Glassmorphism for 2026).
*   **URL as Source of Truth:** Direct linking to `/2025` or `/2026` must load the correct environment, and the root `/` must redirect to the primary/latest version.

## 3. Architecture Design

### 3.1 Directory Structure
We will introduce a top-level routing and component layer outside the yearly folders.
```text
src/
├── main.jsx                  # Entry point, sets up BrowserRouter
├── App.jsx                   # NEW: Global Router & Context isolation layer
├── components/               # NEW: Global components shared across versions
│   └── VersionSwitcher.jsx   # NEW: The time-machine toggle
├── 2025/                     # Existing 2025 environment
│   ├── pages/Portofolio.jsx  # Entry for 2025
│   └── context/...           # Isolated state for 2025
└── 2026/                     # Future 2026 environment
    └── ...
```

### 3.2 Routing Strategy (`App.jsx`)
The `App` component will manage the top-level routes. By wrapping each route's element in its respective Context Provider, we ensure that state (like the IDE terminal history in 2025) is completely destroyed and garbage-collected when navigating away, preventing state leakage.

```javascript
// Conceptual snippet for App.jsx
<Routes>
  <Route path="/" element={<Navigate to="/2025" replace />} />
  <Route path="/2025/*" element={<Portfolio2025 />} />
  <Route path="/2026/*" element={<Portfolio2026 />} />
</Routes>
<VersionSwitcher /> // Rendered outside routes so it persists
```

### 3.3 The `VersionSwitcher` Component
*   **Position:** Fixed at `bottom-4 right-4` (bottom right corner).
*   **Behavior:** A floating action button that, when clicked, opens a small upward-opening dropdown menu listing available years.
*   **Dynamic Styling (The Chameleon Effect):** The component will use `react-router-dom`'s `useLocation` hook to determine the current active path. Based on the path, it will dynamically apply different CSS classes to itself.
    *   *Path `/2025`:* Applies rigid, dark, border-heavy styles matching the Android Studio IDE theme (e.g., `bg-[#3C3F41] border-[#232525]`).
    *   *Path `/2026`:* Applies modern, rounded, glassmorphism styles (e.g., `bg-white/20 backdrop-blur-md`).

## 4. Implementation Steps
1.  **Create `App.jsx`:** Move the routing logic from `main.jsx` into a new `App.jsx` file to set up the `/2025` route and the root redirect.
2.  **Update `main.jsx`:** Clean up `main.jsx` to simply render `App` inside `BrowserRouter`.
3.  **Build `VersionSwitcher.jsx`:** Create the global floating component with state for the dropdown toggle and dynamic styling logic based on `useLocation`.
4.  **Integrate Switcher:** Mount the `VersionSwitcher` inside `App.jsx`.
5.  **Refactor 2025 Router (Optional but recommended):** Ensure internal links within the 2025 portfolio use relative paths or are prefixed with `/2025`.

## 5. Potential Risks & Mitigations
*   **CSS Collisions:** Since Tailwind is used globally, class names might leak if not scoped. *Mitigation:* Rely on folder-specific component structures and ensure global CSS in `index.css` is kept to an absolute minimum, pushing styling to component-level or module CSS where possible.
*   **Z-Index Conflicts:** The global switcher might be hidden behind absolute-positioned elements in specific years. *Mitigation:* Assign a definitive, high `z-index` (e.g., `z-[9999]`) to the `VersionSwitcher`.