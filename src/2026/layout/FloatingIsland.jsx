import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { id: 'home', label: 'home', path: '/2026' },
  { id: 'about', label: 'about', path: '/2026/about' },
  { id: 'projects', label: 'projects', path: '/2026/projects' },
  { id: 'contact', label: 'contact', path: '/2026/contact' },
];

const socialLinks = [
  { label: 'github', href: 'https://github.com/akbrdhia' },
  { label: 'instagram', href: 'https://www.instagram.com/bukan__akbarr/' },
];

const ease = [0.16, 1, 0.3, 1];

const FloatingIsland = ({ onOpenContact }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isProjectPage = location.pathname.includes('/project/');

  const close = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 z-[199]"
            onClick={close}
          />
        )}
      </AnimatePresence>

      <motion.div
        className="lg:hidden fixed top-5 left-1/2 -translate-x-1/2 z-[200] bg-[#111] text-[#f8f8f8] overflow-hidden"
        animate={{
          width: isOpen ? '344px' : '10em',
          height: isOpen ? 'auto' : '2.6em',
          borderRadius: isOpen ? '24px' : '1.3em',
        }}
        transition={{ duration: 0.4, ease }}
        onClick={!isOpen ? () => setIsOpen(true) : undefined}
      >
      <div
        className="flex items-center justify-between px-5 h-[2.6em]"
      >
        <Link
          to="/2026"
          onClick={() => setIsOpen(false)}
          className="text-sm font-mono tracking-tight text-[#f8f8f8] no-underline hover:text-[#f8f8f8]/50 transition-colors"
        >
          []
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-sm font-mono tracking-tight text-[#f8f8f8]/60 bg-transparent border-none cursor-pointer hover:text-[#f8f8f8] transition-colors"
        >
          {isOpen ? 'close' : 'menu'}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="px-5 pb-6 pt-2"
          >
            <nav className="flex flex-col gap-3 mb-6">
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
                      onClick={() => {
                        setIsOpen(false);
                        onOpenContact();
                      }}
                      className={`text-left text-sm font-medium tracking-tight py-1 transition-colors bg-transparent border-none cursor-pointer ${
                        'text-[#f8f8f8] hover:text-[#f8f8f8]/50'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                }

                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-sm font-medium tracking-tight py-1 transition-colors no-underline ${
                      isActive
                        ? 'text-[#f8f8f8]/30'
                        : 'text-[#f8f8f8] hover:text-[#f8f8f8]/50'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex gap-4 border-t border-[#f8f8f8]/10 pt-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.7rem] uppercase tracking-[0.15em] text-[#f8f8f8]/40 hover:text-[#f8f8f8] transition-colors no-underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
    </>
  );
};

export default FloatingIsland;
