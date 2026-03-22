import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed z-[100] flex justify-between transition-all duration-300 ease-in-out font-['Sora',sans-serif] ${
      isScrolled 
        ? 'top-4 left-6 right-6 py-4 px-6 bg-white/5 backdrop-blur-md rounded-2xl' 
        : 'top-0 left-0 right-0 py-5 px-6 bg-transparent'
    }`}>
      <div className="text-[0.85rem] font-semibold">AkbarD</div>
      <div className="text-[0.85rem] font-normal">home, about, projects, play, team, contact</div>
      <div className="text-[0.85rem] font-normal">Bogor, Indonesia <span className="ml-2 text-[#fffff]">●</span></div>
    </nav>
  );
};

export default Navbar;