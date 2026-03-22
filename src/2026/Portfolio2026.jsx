import React from 'react';
import './theme/theme.css';
import './theme/typography.css';
import MainLayout from './layout/MainLayout';
import Navbar from './layout/Navbar';
import Hero from './features/hero/Hero';

const Portfolio2026 = () => {
  return (
    <MainLayout>
      <Navbar />
      <Hero />
    </MainLayout>
  );
};

export default Portfolio2026;
