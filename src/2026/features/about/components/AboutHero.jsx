import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AboutHero = () => {
  const { scrollY } = useScroll();
  
  // Parallax: Text moves faster than Photo
  const textY = useTransform(scrollY, [0, 500], [0, -150]);
  const photoY = useTransform(scrollY, [0, 500], [0, -50]);

  return (
    <section className="relative h-screen w-full bg-black overflow-hidden select-none">
      {/* Photo Layer (z-10) */}
      <motion.div 
        style={{ y: photoY }}
        className="absolute bottom-0 right-0 w-1/2 h-[80vh] z-10"
      >
        <img 
          src="/about-portrait.jpg" 
          alt="Portrait" 
          className="w-full h-full object-cover grayscale brightness-75 transition-all duration-700"
        />
      </motion.div>

      {/* Typography Layer (z-20) */}
      <motion.div 
        style={{ y: textY }}
        className="relative z-20 pt-[20vh] pl-[8vw] pointer-events-none"
      >
        <div className="flex flex-col gap-0">
          {['HELLO', 'I AM', '— AKBAR.'].map((line, i) => (
            <motion.h1 
              key={line}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + (i * 0.2), duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[16vw] font-black leading-[0.8] tracking-tighter text-white"
            >
              {line}
            </motion.h1>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default AboutHero;
