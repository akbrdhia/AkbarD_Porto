import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="pt-[10vh] pl-6 min-h-[70vh] overflow-hidden">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-[clamp(18vw,22vw,26vw)] font-black leading-[0.85] tracking-tight whitespace-nowrap m-0 p-0 font-['Sora',sans-serif]">
          AkbarD
        </h1>
      </motion.div>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8"
      >
        <p className="text-[clamp(1.5rem,3vw,2.8rem)] font-semibold leading-tight font-['Sora',sans-serif]">
          Software engineer who gives a damn about how things work <br />and how they look.
        </p>
      </motion.div>
    </section>
  );
};

export default Hero;