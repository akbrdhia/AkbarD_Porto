import React, { useState, useEffect } from 'react';
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
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) * -0.4);
    mouseY.set((e.clientY - centerY) * -0.4);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div>
      <motion.button
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x, y }}
        className="text-[1rem] font-medium cursor-pointer hover:text-[#F5C842] transition-colors relative"
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
    <motion.nav 
      layout
      className={`fixed z-[100] transition-all duration-500 ease-in-out font-['Sora',sans-serif] text-white ${
        isScrolled 
          ? 'top-4 left-6 right-6 py-6 px-10 bg-white/10 backdrop-blur-2xl rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]' 
          : 'top-0 left-0 right-0 py-8 px-12 bg-transparent'
      }`}
    >
      <div className="max-w-[1800px] mx-auto flex items-center justify-between">
        {/* Left: Brand */}
        <motion.div layout className="flex-1">
          <div className="text-[1.1rem] font-bold tracking-tighter">AkbarD</div>
        </motion.div>

        {/* Center: Links */}
        <motion.div 
          layout
          className={`flex-[2] flex items-center justify-center gap-6 transition-all duration-500 ${
            isScrolled ? 'ml-0' : 'ml-[22%]'
          }`}
        >
          {navItems.map((item) => (
            <NavItem key={item.id} label={item.label} />
          ))}
        </motion.div>

        {/* Right: Location */}
        <motion.div layout className="flex-1 flex justify-end">
          <motion.div layout className={`flex items-center gap-2 text-white transition-all duration-500 ${
            isScrolled ? 'mr-0' : 'mr-80'
          }`}>
            <div className="text-[1.1rem] font-bold tracking-tighter whitespace-nowrap">Bogor, Indonesia</div>
            <div className="w-2 h-2 rounded-full bg-white " />
          </motion.div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;