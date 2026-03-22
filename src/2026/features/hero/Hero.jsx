import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-20 py-32 overflow-hidden bg-p26-surface text-p26-on-surface">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0.0, 0, 1.0] }}
        className="max-w-4xl"
      >
        <span className="text-p26-primary-container font-mono text-sm tracking-widest uppercase mb-6 block font-semibold">
          Selected Works 2026
        </span>
        <h1 className="p26-display-lg mb-8 leading-[0.9]">
          The Art of <br />
          <span className="text-p26-primary-container">Precise</span> Engineering.
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
