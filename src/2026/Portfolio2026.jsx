import React from 'react';
import './theme/theme.css';
import './theme/typography.css';
import MainLayout from './layout/MainLayout';

// Note: Hero will be implemented in Task 3. For now, use a placeholder or 
// wait to create this file until Task 3 if you prefer, but the plan says 
// to create it now. Let's use a simple placeholder for Hero in Task 2.
const HeroPlaceholder = () => (
  <section className="min-h-screen flex items-center justify-center">
    <h1 className="p26-display-lg text-p26-primary">2026 Gallery Mode</h1>
  </section>
);

const Portfolio2026 = () => {
  return (
    <MainLayout>
      <HeroPlaceholder />
    </MainLayout>
  );
};

export default Portfolio2026;
