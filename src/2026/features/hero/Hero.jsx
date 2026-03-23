import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  // 0. Handle responsiveness
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 1. Set up scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // 2. Map scroll to y offset (Scale down for mobile viewports)
  // Adjusted to ~20% of scroll distance (240px for 120vh container)
  const yTransform = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 150 : 240]);

  // 3. Smooth the motion (Updated to spec: stiffness 400, damping 90)
  const springY = useSpring(yTransform, {
    stiffness: 400,
    damping: 90,
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
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center will-change-transform"
        >
          <motion.h1 
            style={{ y }}
            aria-hidden="true"
            className="text-[clamp(22vw,26vw,30vw)] font-black leading-[0.8] tracking-tighter m-0 p-0 lowercase opacity-80 whitespace-nowrap will-change-transform"
          >
            akbard
          </motion.h1>
        </motion.div>
      </div>

      {/* Foreground Layer (Tagline) */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 mt-12"
      >
        <p className="text-[2.75rem] md:text-[3.5rem] font-bold leading-tight w-full">
          <Link to="/2026/about" className="inline-block mr-[100px] cursor-pointer group relative text-[1.5rem] md:text-[1.5rem] tracking-widest align-middle text-white no-underline">
            about →
            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-white transition-transform duration-500 origin-left scale-x-100 group-hover:origin-right group-hover:scale-x-0"></span>
          </Link>
          Software engineer who gives a damn about how things work and how they look.
        </p>
      </motion.div>
    </section>
  );
};

export default Hero;