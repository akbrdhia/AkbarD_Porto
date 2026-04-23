import React from 'react';
import { motion } from 'framer-motion';

const StatementText = ({ text }) => {
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { 
      y: 20, 
      opacity: 0,
      filter: 'blur(10px)',
    },
    visible: { 
      y: 0, 
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="flex flex-wrap gap-x-[0.3em] gap-y-[0.1em]"
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordVariants}
          className="text-[clamp(1.5rem,4vw,3.5rem)] font-medium leading-[1.2] tracking-tight text-white/90"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default StatementText;
