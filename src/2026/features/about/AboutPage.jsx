import React from 'react';
import AboutHero from './components/AboutHero';

const AboutPage = () => {
  return (
    <div className="bg-black text-white">
      <AboutHero />
      <div className="h-screen flex items-center justify-center">
        <h2 className="text-2xl">Scroll to see parallax</h2>
      </div>
    </div>
  );
};

export default AboutPage;
