import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-20 py-32 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0.0, 0, 1.0] }}
        className="max-w-4xl"
      >
        <span className="text-p26-primary font-mono text-sm tracking-widest uppercase mb-4 block">
          Portfolio v2026
        </span>
        <h1 className="p26-display-lg mb-8">
          Crafting digital <br />
          <span className="text-p26-primary">experiences</span> that breathe.
        </h1>
        <p className="p26-body-lg text-p26-on-surface-variant max-w-xl">
          An editorial approach to software engineering. Focus on motion, 
          typography, and intentional asymmetry.
        </p>
      </motion.div>
    </section>
  );
};

export default Hero;
