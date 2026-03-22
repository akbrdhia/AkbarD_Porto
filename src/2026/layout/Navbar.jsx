import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const navItems = [
  { id: 'home', label: 'home' },
  { id: 'about', label: 'about' },
  { id: 'projects', label: 'projects' },
  { id: 'play', label: 'play' },
  { id: 'team', label: 'team' },
  { id: 'contact', label: 'contact' }
];
const NavItem = ({ label }) => {
  // Random initial offsets for "acak-acak" feel
  const [initialOffset] = useState({
    x: Math.random() * 40 - 20,
    y: Math.random() * 20 - 10,
    rotate: Math.random() * 10 - 5
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for magnetic effect
  const springConfig = { damping: 15, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from center to mouse
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // "Repel" effect: move away from mouse
    mouseX.set(distanceX * -0.4);
    mouseY.set(distanceY * -0.4);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      animate={{
        x: [0, Math.random() * 25 - 12.5, Math.random() * 25 - 12.5, Math.random() * 25 - 12.5, 0],
        y: [0, Math.random() * 15 - 7.5, Math.random() * 15 - 7.5, Math.random() * 15 - 7.5, 0],
        rotate: [0, Math.random() * 10 - 5, Math.random() * 10 - 5, 0],
      }}
      transition={{
        duration: 4 + Math.random() * 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <motion.button
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x, y, rotate: initialOffset.rotate }}
        className="text-[0.85rem] font-normal cursor-pointer hover:text-[#F5C842] transition-colors relative"
        onClick={() => console.log(`Navigating to ${label}...`)}
      >
        {label}
      </motion.button>
    </motion.div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed z-[100] flex justify-between transition-all duration-500 ease-in-out font-['Sora',sans-serif] ${
      isScrolled 
        ? 'top-4 left-6 right-6 py-6 px-8 bg-white/5 backdrop-blur-xl rounded-3xl' 
        : 'top-0 left-0 right-0 py-8 px-8 bg-transparent'
    }`}>
      <div className="flex items-center gap-2">
        <div className="text-[0.9rem] font-bold tracking-tighter">AkbarD</div>
      </div>

      <div className="flex items-center gap-6 md:gap-8 flex-wrap justify-center max-w-[70%]">
        {navItems.map((item) => (
          <NavItem key={item.id} label={item.label} />
        ))}
      </div>
      <motion.div className="flex items-center gap-2">
        <div className="text-[0.9rem] font-bold tracking-tighter">Bogor, Indonesia</div>
        <div className="w-1.5 h-1.5 rounded-full bg-[#ffffff]" />
      </motion.div>
    </nav>
  );
};

export default Navbar;