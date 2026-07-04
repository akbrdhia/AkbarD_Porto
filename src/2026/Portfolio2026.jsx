import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Hero from './features/hero/Hero';
import GalleryGrid from './features/gallery/GalleryGrid';
import ProjectDetail from './features/projects/ProjectDetail';
import AboutPage from './features/about/AboutPage';
import ProjectsPage from './features/projects/ProjectsPage';
import ContactSheet from './features/contact/ContactSheet';

const Portfolio2026 = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <MainLayout onOpenContact={() => setIsContactOpen(true)}>
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <GalleryGrid />
          </>
        } />
        <Route path="about" element={<AboutPage onOpenContact={() => setIsContactOpen(true)} />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="project/:projectId" element={<ProjectDetail />} />
      </Routes>
      <ContactSheet 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />
    </MainLayout>
  );
};

export default Portfolio2026;
