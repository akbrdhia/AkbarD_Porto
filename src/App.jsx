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
