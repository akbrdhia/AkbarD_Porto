import React from 'react';
import Navbar from './Navbar';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-screen bg-black text-white overflow-x-hidden font-['Sora',sans-serif]">
      <Navbar />
      <main>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;