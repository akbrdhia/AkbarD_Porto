import React from 'react';
import Manifesto from './components/Manifesto';
import SkillsCloud from './components/SkillsCloud';

const AboutPage = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <Manifesto />
      <SkillsCloud />
    </div>
  );
};

export default AboutPage;
