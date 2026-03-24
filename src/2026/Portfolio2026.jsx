import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MainLayout from './layout/MainLayout';
import Hero from './features/hero/Hero';
import GalleryGrid from './features/gallery/GalleryGrid';
import ProjectDetail from './features/projects/ProjectDetail';
import About from './features/about/About';

const Portfolio2026 = () => {
  const location = useLocation();

  return (
    <MainLayout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <>
              <Hero />
              <GalleryGrid />
            </>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/project/:projectId" element={<ProjectDetail />} />
        </Routes>
      </AnimatePresence>
    </MainLayout>
  );
};

export default Portfolio2026;