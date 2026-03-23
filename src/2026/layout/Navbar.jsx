import React, { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';

const navItems = [
  { id: 'home', label: 'home', path: '/2026' },
  { id: 'about', label: 'about', path: '/2026/about' },
  { id: 'projects', label: 'projects', path: '/2026' },
  { id: 'play', label: 'play', path: '/2026/play' },
  { id: 'team', label: 'team', path: '/2026/team' },
  { id: 'contact', label: 'contact', path: '/2026/contact' }
];

const NavItem = ({ label, path, isActive }) => {
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
      <Link to={path}>
        <motion.button
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ x, y }}
          className={`text-[1rem] font-medium cursor-pointer transition-colors relative ${
            isActive ? 'text-white/40' : 'text-white hover:text-white/60'
          }`}
        >
          {label}
        </motion.button>
      </Link>
    </motion.div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isProjectPage = location.pathname.includes('/project/');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      layout
      className={`fixed z-[100] w-full transition-all duration-500 ease-in-out font-['Sora',sans-serif] text-white ${
        isScrolled 
          ? 'top-4 left-6 right-6 py-6 px-10 bg-white/10 backdrop-blur-2xl rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]' 
          : 'top-0 left-0 py-8 px-12 bg-transparent'
      }`}
    >
      <div className="max-w-[1800px] mx-auto flex items-center justify-between px-4">
        {/* Left: Brand */}
        <motion.div layout className="flex-1">
          <Link to="/2026" className="text-[1.1rem] font-bold tracking-tighter text-white no-underline">
            AkbarD
          </Link>
        </motion.div>

        {/* Center: Links */}
        <motion.div 
          layout
          className={`flex-[2] flex items-center justify-center gap-6 transition-all duration-500 ${
            isScrolled ? 'ml-0' : 'ml-[25%]'
          }`}
        >
          {navItems.map((item) => {
            let isActive = false;
            if (item.id === 'projects') {
              isActive = isProjectPage;
            } else if (item.id === 'home') {
              isActive = location.pathname === '/2026' && !isProjectPage;
            } else {
              isActive = location.pathname === item.path;
            }

            return (
              <NavItem 
                key={item.id} 
                label={item.label} 
                path={item.path}
                isActive={isActive}
              />
            );
          })}
        </motion.div>

        {/* Right: Location */}
        <div className="flex-1 flex justify-end">
          <motion.div layout className={`flex items-center gap-2 text-white transition-all duration-500 ${
            isScrolled ? 'mr-0' : 'mr-80'
          }`}>
            <div className="text-[1.1rem] font-bold tracking-tighter whitespace-nowrap">Bogor, Indonesia</div>
            <div className="w-2 h-2 rounded-full bg-white" />
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;