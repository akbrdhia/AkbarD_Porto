import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Hero from './features/hero/Hero';
import GalleryGrid from './features/gallery/GalleryGrid';
import ProjectDetail from './features/projects/ProjectDetail';

const Portfolio2026 = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <GalleryGrid />
          </>
        } />
        <Route path="/project/:projectId" element={<ProjectDetail />} />
      </Routes>
    </MainLayout>
  );
};

export default Portfolio2026;