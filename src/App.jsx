import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Portfolio2025 from './2025/pages/Portofolio';
import Portfolio2026 from './2026/Portfolio2026';
import VersionSwitcher from './components/VersionSwitcher';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/2025" replace />} />
        <Route path="/2025/*" element={<Portfolio2025 />} />
        <Route path="/2026/*" element={<Portfolio2026 />} />
      </Routes>
      <VersionSwitcher />
    </>
  );
};

export default App;
