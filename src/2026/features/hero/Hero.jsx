import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="pt-[10vh] px-12 min-h-[70vh] bg-black text-white font-['Sora',sans-serif]">
      {/* Name */}
      <motion.h1 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-[clamp(22vw,26vw,30vw)] font-black leading-[0.8] tracking-tighter m-0 p-0"
      >
        AkbarD
      </motion.h1>

      {/* Subtext */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-12"
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