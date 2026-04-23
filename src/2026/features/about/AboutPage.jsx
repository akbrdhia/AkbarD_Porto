import React from 'react';
import AboutHero from './components/AboutHero';
import StatementText from './components/StatementText';
import { PERSONAL_INFO } from '../../../2025/constants/portfolioData';

const AboutPage = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <AboutHero />
      
      {/* Bio Section */}
      <section className="px-[8vw] py-32 md:py-64 max-w-[1400px]">
        <h2 className="text-white/30 text-xs uppercase tracking-[0.5em] mb-16 md:mb-24">
          (THE STORY)
        </h2>
        <StatementText text={PERSONAL_INFO.bio} />
      </section>

      {/* Spacing for future content */}
      <div className="h-[20vh]" />
    </div>
  );
};

export default AboutPage;
