import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-20 py-32 overflow-hidden bg-p26-surface text-p26-on-surface snap-start">
      {/* Background layer with parallax effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          style={{ y }}
          className="absolute inset-0 bg-[url('/setup.jpg')] bg-cover bg-center scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-p26-bg-hero/60 to-p26-bg-deep/90 backdrop-brightness-50" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0.0, 0, 1.0] }}
        className="relative z-10 max-w-4xl mt-8"
      >
        <span className="text-p26-primary-container font-mono text-sm tracking-widest uppercase mb-6 block font-semibold">
          Selected Works 2026
        </span>
        <h1 className="p26-display-lg mb-8 leading-[0.9]">
          Crafting 
          <motion.span 
            initial={{ scale: 0, opacity: 0, rotate: -5 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.2, 0.0, 0, 1.0] }}
            className="inline-block w-12 h-12 md:w-20 md:h-20 mx-3 md:mx-4 bg-[url('/about-portrait.jpg')] bg-cover bg-center rounded-xl border border-white/10 align-middle -mt-2 md:-mt-4 shadow-2xl overflow-hidden"
          />
          experiences 
          <br />
          <motion.span 
            initial={{ scale: 0, opacity: 0, rotate: 5 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.2, 0.0, 0, 1.0] }}
            className="inline-block w-12 h-12 md:w-24 md:h-16 mx-3 md:mx-4 bg-[url('/setup.jpg')] bg-cover bg-center rounded-xl border border-white/10 align-middle -mt-2 md:-mt-4 shadow-2xl overflow-hidden"
          />
          that <span className="text-p26-primary-container italic">breathe.</span>
        </h1>
        <p className="p26-body-lg text-p26-on-surface/80 max-w-xl mb-12">
          An editorial perspective on digital craft. Specializing in high-performance 
          interfaces where motion meets mathematical rigor.
        </p>
        
        <motion.button 
          whileHover={{ x: 5 }}
          className="p26-pill-cta"
        >
          View Case Studies <span className="text-xl">→</span>
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
