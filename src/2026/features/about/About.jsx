import React from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../../../2025/constants/portfolioData';
import { Link } from 'react-router-dom';

const About = () => {
  // Motion Studio Aesthetic: Pure black background, bold kinetic typography.

  // Clean up bio text slightly for display
  const cleanBio = PERSONAL_INFO.bio.replace(/\s+/g, ' ').trim();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.2,
      }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5, ease: "easeInOut" }
    }
  };

  const wordVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const bioWords = cleanBio.split(' ');

  return (
    <motion.div
      className="min-h-screen bg-black text-white px-6 md:px-12 pt-[15vh] pb-[10vh] overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Decorative Geometric Shapes */}
      <motion.div
        className="absolute top-[20%] right-[10%] w-[30vw] h-[30vw] border-[1px] border-[#333333] rounded-full opacity-30 pointer-events-none"
        animate={{ rotate: 360, scale: [1, 1.05, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-[10%] left-[5%] w-[15vw] h-[15vw] bg-white opacity-5 mix-blend-overlay pointer-events-none"
        animate={{ rotate: -180, borderRadius: ["0%", "50%", "0%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      {/* Hero Title */}
      <div className="relative mb-16 md:mb-24 overflow-hidden">
        <motion.h1
          className="text-[clamp(12vw,16vw,20vw)] font-black leading-[0.8] tracking-tighter m-0 p-0 whitespace-nowrap lowercase"
          initial={{ x: "-10%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          about me
        </motion.h1>
      </div>

      {/* Statement Text Container */}
      <div className="max-w-[1200px] ml-auto mr-0 md:mr-[5%] pr-4 md:pr-0">
        <motion.p className="text-[clamp(1.5rem,3vw,2.8rem)] font-bold leading-[1.2] text-right">
          {bioWords.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.25em] mb-[0.1em]">
              <motion.span
                className="inline-block"
                variants={wordVariants}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.p>
      </div>

      {/* Roles / Tech tags */}
      <motion.div
        className="mt-32 max-w-[1200px] ml-auto mr-0 md:mr-[5%] flex flex-wrap justify-end gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <span className="text-sm font-medium tracking-widest uppercase border border-white/20 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-colors duration-300">
          Android Development
        </span>
        <span className="text-sm font-medium tracking-widest uppercase border border-white/20 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-colors duration-300">
          UI/UX Design
        </span>
        <span className="text-sm font-medium tracking-widest uppercase border border-white/20 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-colors duration-300">
          Backend Engineering
        </span>
      </motion.div>

      {/* Back CTA */}
      <motion.div
        className="absolute bottom-12 left-6 md:left-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <Link
          to="/2026"
          className="text-[0.9rem] font-medium tracking-widest hover:opacity-70 transition-opacity"
        >
          ← Back
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default About;