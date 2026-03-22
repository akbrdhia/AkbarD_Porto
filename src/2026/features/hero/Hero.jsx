import React from 'react';
import { motion } from 'framer-motion';
import '../../theme/typography.css';

const Hero = () => {
  return (
    <section style={{ 
      paddingTop: '20vh', 
      paddingLeft: '1.5rem', 
      minHeight: '70vh',
      overflow: 'hidden'
    }}>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="hero-text" style={{ margin: 0, padding: 0 }}>
          champ
        </h1>
      </motion.div>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginTop: '2rem', marginLeft: '3%' }}
      >
        <p className="statement-text">
          we make things move. an independent creative studio focused on motion and typographic storytelling.
        </p>
      </motion.div>
    </section>
  );
};

export default Hero;
