import React, { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';

const navItems = [
  { id: 'home', label: 'home', path: '/2026' },
  { id: 'about', label: 'about', path: '/2026/about' },
  { id: 'projects', label: 'projects', path: '/2026' },
  { id: 'play', label: 'play', path: '/2026/play' },
  { id: 'team', label: 'team', path: '/2026/team' },
  { id: 'contact', label: 'contact', path: '/2026/contact' }
];

const KineticOverlay = ({ isOpen, onClose, location, isProjectPage }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.1,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: {
      y: -50,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
          className="fixed inset-0 z-[150] bg-black flex flex-col justify-center px-10 md:px-20"
        >
          {/* Close Trigger - Minimal Button */}
          <button 
            onClick={onClose}
            className="absolute top-10 right-10 group flex items-center gap-4 text-white uppercase tracking-[0.2em] text-xs"
          >
            <span className="opacity-40 group-hover:opacity-100 transition-opacity">Close</span>
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute w-full h-[1px] bg-white rotate-45" />
              <div className="absolute w-full h-[1px] bg-white -rotate-45" />
            </div>
          </button>

          <div className="flex flex-col gap-4">
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
                <motion.div key={item.id} variants={itemVariants} className="overflow-hidden">
                  <Link 
                    to={item.path} 
                    onClick={onClose}
                    className={`block text-[12vw] leading-[1.1] font-black uppercase tracking-tighter transition-colors ${
                      isActive ? 'text-white/20' : 'text-white hover:text-white/40'
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

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
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const location = useLocation();
  const isProjectPage = location.pathname.includes('/project/');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const handleToggleMenu = () => setIsOverlayOpen(true);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('toggle-mobile-menu', handleToggleMenu);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('toggle-mobile-menu', handleToggleMenu);
    };
  }, []);

  return (
    <>
      <motion.nav 
        layout
        initial={false}
        animate={{ 
          opacity: isScrolled ? 1 : (window.innerWidth < 1024 ? 0 : 1),
          pointerEvents: isScrolled ? 'auto' : (window.innerWidth < 1024 ? 'none' : 'auto')
        }}
        className={`fixed z-[100] transition-all duration-500 ease-in-out font-['Sora',sans-serif] text-white ${
          isScrolled 
            ? 'top-4 left-4 right-4 md:left-6 md:right-6 py-4 px-6 md:py-6 md:px-10 bg-white/10 backdrop-blur-2xl rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] max-w-[1800px] mx-auto' 
            : 'top-0 left-0 right-0 py-8 px-6 md:px-12 bg-transparent'
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

          {/* Mobile Toggle - Minimal Button */}
          <div className="lg:hidden flex justify-center">
            <button 
              onClick={() => setIsOverlayOpen(true)}
              className="group flex flex-col gap-1.5 items-center justify-center p-2"
            >
              <div className="w-6 h-[1px] bg-white transform group-hover:scale-x-125 transition-transform origin-center" />
              <div className="w-4 h-[1px] bg-white group-hover:w-6 transition-all" />
            </button>
          </div>

          {/* Right: Location */}
          <div className="flex justify-end">
            <motion.div 
              layout 
              className="flex items-center gap-2"
              animate={{ color: isScrolled ? '#ffffff' : '#000000' }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-[1.1rem] font-bold tracking-tighter whitespace-nowrap hidden sm:block">
                Bogor, Indonesia
              </div>
              <motion.div 
                className="w-2 h-2 rounded-full animate-pulse"
                animate={{ backgroundColor: isScrolled ? '#ffffff' : '#000000' }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          </div>
        </div>
      </motion.nav>

      <KineticOverlay 
        isOpen={isOverlayOpen} 
        onClose={() => setIsOverlayOpen(false)} 
        location={location}
        isProjectPage={isProjectPage}
      />
    </>
  );
};

export default Navbar;