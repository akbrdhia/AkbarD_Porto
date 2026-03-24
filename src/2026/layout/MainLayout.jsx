import React from 'react';
import Navbar from './Navbar';
import SmoothScroll from './SmoothScroll';

const MainLayout = ({ children }) => {
  return (
    <SmoothScroll>
      <div className="min-h-screen w-screen bg-black text-white overflow-x-hidden font-['Sora',sans-serif]">
        <Navbar />
        <main>
          {children}
        </main>
      </div>
    </SmoothScroll>
  );
};

export default MainLayout;