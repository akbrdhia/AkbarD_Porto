import React, { useRef } from 'react';
import { motion as Motion, useScroll, useTransform } from 'framer-motion';
import { PERSONAL_INFO } from '../../../../2025/constants/portfolioData';

const KineticWord = ({ word, index, progress }) => {
  // Each word has a unique parallax speed and direction
  const y = useTransform(progress, [0, 1], [200 * (index % 5 - 2), -200 * (index % 5 - 2)]);
  const opacity = useTransform(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(progress, [0, 0.5, 1], [0.7, 1.2, 0.7]);
  
  return (
    <Motion.span
      style={{ y, opacity, scale }}
      className="inline-block text-[clamp(3rem,15vw,18rem)] font-black leading-[0.75] tracking-tighter text-white uppercase italic select-none"
    >
      {word}
    </Motion.span>
  );
};

const Manifesto = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["top start", "bottom end"]
  });

  const bioWords = PERSONAL_INFO.bio.trim().split(/\s+/);

  return (
    <section 
      ref={containerRef} 
      className="relative bg-black min-h-[400vh] px-[4vw] overflow-hidden"
    >
      {/* Sticky Kinetic Wall - The "Stack" */}
      <div className="sticky top-0 h-screen flex flex-col justify-center items-center overflow-hidden">
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-0 max-w-[95vw]">
          {bioWords.map((word, i) => (
            <KineticWord 
              key={i} 
              word={word} 
              index={i} 
              progress={scrollYProgress} 
            />
          ))}
        </div>
      </div>

      {/* Transition to next section */}
      <div className="h-screen flex items-center justify-center">
        <div className="w-full h-[1px] bg-white/20" />
      </div>
    </section>
  );
};

export default Manifesto;
