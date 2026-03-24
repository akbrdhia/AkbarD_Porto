import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const VersionSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const currentYear = location.pathname.startsWith('/2026') ? '2026' : '2025';

  const handleSwitch = (year) => {
    setIsOpen(false);
    if (year !== currentYear) {
      navigate(`/${year}`);
    }
  };

  // The Chameleon Effect: Style changes based on URL
  const buttonStyle = currentYear === '2026'
    ? 'bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full hover:bg-white/20 shadow-lg'
    : 'bg-[#3C3F41] border border-[#232525] text-[#A9B7C6] rounded-none hover:bg-[#4B4F52] shadow-md';

  const menuStyle = currentYear === '2026'
    ? 'bg-black/80 backdrop-blur-xl border border-white/20 text-white rounded-2xl shadow-xl'
    : 'bg-[#2B2B2B] border border-[#4B4F52] text-[#A9B7C6] rounded-none shadow-md';

  const itemHoverStyle = currentYear === '2026'
    ? 'hover:bg-white/10 rounded-xl'
    : 'hover:bg-[#4B4F52]';

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      {isOpen && (
        <div className={`mb-2 p-1 min-w-[120px] overflow-hidden ${menuStyle}`}>
          <div
            onClick={() => handleSwitch('2026')}
            className={`px-4 py-2 cursor-pointer transition-colors flex items-center justify-between ${itemHoverStyle} ${currentYear === '2026' ? 'opacity-100 font-bold' : 'opacity-70'}`}
          >
            <span>v2026</span>
            {currentYear === '2026' && <span className="text-xs">✓</span>}
          </div>
          <div
            onClick={() => handleSwitch('2025')}
            className={`px-4 py-2 cursor-pointer transition-colors flex items-center justify-between ${itemHoverStyle} ${currentYear === '2025' ? 'opacity-100 font-bold' : 'opacity-70'}`}
          >
            <span>v2025</span>
            {currentYear === '2025' && <span className="text-xs">✓</span>}
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-4 py-2 flex items-center gap-2 font-mono text-sm transition-all duration-300 ${buttonStyle}`}
      >
        <span>v{currentYear}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
};

export default VersionSwitcher;
