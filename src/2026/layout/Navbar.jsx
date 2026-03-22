import React from 'react';
import { motion } from 'framer-motion';

const navItems = [
  { id: '01', label: 'WORK', href: '#gallery' },
  { id: '02', label: 'STORY', href: '#about' },
  { id: '03', label: 'INQUIRY', href: '#contact' },
];

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-6 flex justify-between items-center">
      {/* Glassmorphism Backdrop (70% opacity + 20px blur) */}
      <div className="absolute inset-0 bg-p26-surface/70 backdrop-blur-xl border-b border-white/10" />
      
      <div className="relative z-10 flex justify-between items-center w-full max-w-7xl mx-auto">
        {/* Logo / Name */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p26-display-lg text-lg tracking-tighter"
        >
          AKBAR D. <span className="text-p26-primary">©26</span>
        </motion.div>

        {/* Navigation Items */}
        <div className="hidden md:flex gap-12">
          {navItems.map((item, index) => (
            <motion.a
              key={item.id}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group flex items-start gap-1 font-mono text-[10px] tracking-widest text-p26-on-surface/60 hover:text-p26-primary transition-colors"
            >
              <span className="text-[8px] text-p26-primary/50 group-hover:text-p26-primary">{item.id}</span>
              <span className="font-bold">{item.label}</span>
            </motion.a>
          ))}
        </div>

        {/* Mobile Menu Trigger (Pill style) */}
        <div className="md:hidden px-4 py-2 bg-p26-primary-container/20 rounded-full border border-white/10 text-[10px] font-mono tracking-widest text-p26-primary">
          MENU
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
