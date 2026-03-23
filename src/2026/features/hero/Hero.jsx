import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';

const Hero = () => {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // 1. Set up scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // 2. Map scroll to y offset
  const yTransform = useTransform(scrollYProgress, [0, 1], [0, 200]);

  // 3. Smooth the motion
  const springY = useSpring(yTransform, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 4. Apply final y value based on reduced motion preference
  const y = shouldReduceMotion ? 0 : springY;

  return (
    <section 
      ref={containerRef}
      className="relative overflow-hidden pt-[10vh] px-12 min-h-[120vh] bg-black text-white font-['Sora',sans-serif]"
    >
      {/* Background Layer (Title) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.h1 
          style={{ y }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          aria-hidden="true"
          className="text-[clamp(22vw,26vw,30vw)] font-black leading-[0.8] tracking-tighter m-0 p-0 lowercase opacity-80 will-change-transform whitespace-nowrap"
        >
          akbard
        </motion.h1>
      </div>

      {/* Foreground Layer (Tagline) */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 mt-12"
      >
        <p className="text-[2.75rem] md:text-[3.5rem] font-bold leading-tight w-full">
          <span className="inline-block mr-[100px] cursor-pointer group relative text-[1.5rem] md:text-[1.5rem] tracking-widest align-middle">
            about →
            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-white transition-transform duration-500 origin-left scale-x-100 group-hover:origin-right group-hover:scale-x-0"></span>
          </span>
          Software engineer who gives a damn about how things work and how they look.
        </p>
      </motion.div>
    </section>
  );
};

export default Hero;