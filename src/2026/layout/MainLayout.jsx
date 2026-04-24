import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import SmoothScroll from './SmoothScroll';

const MainLayout = ({ children }) => {
  return (
    <SmoothScroll>
      <div className="min-h-screen w-full bg-black text-white overflow-x-hidden font-['Sora',sans-serif]">
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default MainLayout;