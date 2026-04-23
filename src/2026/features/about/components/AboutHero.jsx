import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AboutHero = () => {
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Parallax: Text moves faster than Photo
  const textY = useTransform(scrollY, [0, 500], [0, -150]);
  const photoY = useTransform(scrollY, [0, 500], [0, -50]);

  return (
    <section className="relative h-screen w-full bg-black overflow-hidden select-none">
      {/* Photo Layer */}
      <motion.div 
        style={{ y: isMobile ? 0 : photoY }}
        className="absolute bottom-0 right-0 w-full md:w-1/2 h-[50vh] md:h-[80vh] z-10"
      >
        <img 
          src="/about-portrait.jpg" 
          alt="Portrait" 
          className="w-full h-full object-cover grayscale brightness-50 md:brightness-75 transition-all duration-700"
        />
      </motion.div>

      {/* Typography Layer */}
      <motion.div 
        style={{ y: isMobile ? 0 : textY }}
        className="relative z-20 pt-[15vh] md:pt-[20vh] px-[6vw] md:pl-[8vw] pointer-events-none"
      >
        <div className="flex flex-col gap-0">
          {['HELLO', 'I AM', '— AKBAR.'].map((line, i) => (
            <motion.h1 
              key={line}
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + (i * 0.1), duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(3.5rem,15vw,16vw)] font-black leading-[0.85] md:leading-[0.8] tracking-tighter text-white"
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
