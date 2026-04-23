import React from 'react';
import AboutHero from './components/AboutHero';
import Manifesto from './components/Manifesto';
import ExperienceTimeline from './components/ExperienceTimeline';
import SkillsCloud from './components/SkillsCloud';

const AboutPage = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <AboutHero />
      <Manifesto />
      <ExperienceTimeline />
      <SkillsCloud />
      
      {/* Footer Spacing */}
      <div className="h-[20vh]" />
    </div>
  );
};

export default AboutPage;
