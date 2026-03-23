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

  const [isHovered, setIsHovered] = useState(false);

  return (
    <section 
      ref={containerRef}
      className="relative overflow-hidden pt-[10vh] px-12 min-h-[80vh] bg-black text-white font-['Sora',sans-serif]"
    >
      {/* Background Layer (Title) */}
      <div className="absolute top-0 left-0 z-0 pointer-events-none overflow-hidden w-screen mt-[2vh]">
        <motion.div
          initial={{ y: "100vh" }}
          animate={{ y: 0 }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          className="will-change-transform"
        >
          <motion.h1 
            style={{ y }}
            aria-hidden="true"
            className="text-[clamp(24vw,28vw,32vw)] font-black leading-[0.8] tracking-tighter m-0 p-0 text-white whitespace-nowrap will-change-transform"
          >
            AkbarD
          </motion.h1>
        </motion.div>
      </div>

      {/* Foreground Layer (Tagline) */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mt-[45vh]"
      >
        <p className="text-[3.25rem] md:text-[4.5rem] font-bold leading-tight w-full">
          <Link to="/2026/about" className="inline-block mr-[350px] cursor-pointer group relative text-[2rem] md:text-[2.2rem] tracking-widest align-middle text-white no-underline">
            About →
            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-white transition-transform duration-500 origin-left scale-x-100 group-hover:origin-right group-hover:scale-x-0"></span>
          </Link>
          Software engineer who 
          <motion.span 
            animate={{ rotate: 360, scale: isHovered ? 1.1 : 1 }}
            transition={{ 
              rotate: {
                duration: isHovered ? 1000000 : 8, 
                repeat: Infinity, 
                ease: "linear" 
              },
              scale: {
                duration: 0.3,
                ease: "easeOut"
              }
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="inline-block align-middle mx-6 overflow-hidden rounded-2xl"
          >
            <img 
              src="/about-portrait.jpg" 
              alt="Portrait" 
              className="h-[1.4em] md:h-[1.6em] w-auto object-cover"
            />
          </motion.span>
          gives a damn about how things work and how they look.
        </p>
      </motion.div>
    </section>
  );
};

export default Hero;