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