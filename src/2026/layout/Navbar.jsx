import React, { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import FloatingIsland from './FloatingIsland';

const navItems = [
  { id: 'home', label: 'home', path: '/2026' },
  { id: 'about', label: 'about', path: '/2026/about' },
  { id: 'projects', label: 'projects', path: '/2026/projects' },
  { id: 'play', label: 'play', path: '/2026/play' },
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

const Navbar = ({ onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isProjectPage = location.pathname.includes('/project/');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav 
        layout
        className={`z-[100] transition-all duration-500 ease-in-out font-['Sora',sans-serif] text-white top-0 left-0 right-0 py-8 px-6 md:px-12 bg-transparent ${
          isScrolled 
            ? 'lg:fixed lg:top-4 lg:left-4 lg:right-4 lg:py-4 lg:px-10 lg:bg-white/10 lg:backdrop-blur-2xl lg:rounded-3xl lg:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] lg:max-w-[1800px] lg:mx-auto' 
            : 'lg:fixed'
        }`}
      >
        <div className="grid grid-cols-[1fr_auto_1fr] items-center">
          {/* Left: Brand */}
          <motion.div layout className="flex justify-start">
            <Link to="/2026" className="text-[1.1rem] font-bold tracking-tighter text-white no-underline">
              AkbarD
            </Link>
          </motion.div>

          {/* Center: Links (Hidden on mobile) */}
          <motion.div 
            layout
            className={`hidden lg:flex items-center justify-center gap-6 transition-all duration-500 ${
              isScrolled ? 'lg:pl-0' : 'lg:pl-[20vw]'
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

              if (item.id === 'contact') {
                return (
                  <button
                    key={item.id}
                    onClick={() => onOpenContact()}
                    className={`text-[1rem] font-medium cursor-pointer transition-colors bg-transparent border-none ${
                      'text-white hover:text-white/60'
                    }`}
                  >
                    {item.label}
                  </button>
                );
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
          <div className="flex justify-end">
            <motion.div 
              layout 
              className="flex items-center gap-2"
              animate={{ color: isScrolled ? '#ffffff' : '#ffffff' }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-[1.1rem] font-bold tracking-tighter whitespace-nowrap hidden lg:block">
                Bogor, Indonesia
              </div>
              <motion.div 
                className="w-2 h-2 rounded-full animate-pulse hidden lg:block"
                animate={{ backgroundColor: '#ffffff' }}
              />
            </motion.div>
          </div>
        </div>
      </motion.nav>

      <FloatingIsland onOpenContact={onOpenContact} />
    </>
  );
};

export default Navbar;