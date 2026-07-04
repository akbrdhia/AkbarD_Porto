import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from './Navbar';
import Footer from './Footer';
import SmoothScroll from './SmoothScroll';

const MainLayout = ({ children, onOpenContact }) => {
  return (
    <SmoothScroll>
      <Helmet>
        <title>Akbar Dhia — Android &amp; Full-Stack Developer</title>
      </Helmet>
      <div className="min-h-screen w-full bg-black text-white overflow-x-hidden font-['Sora',sans-serif]">
        <Navbar onOpenContact={onOpenContact} />
        <main>
          {children}
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default MainLayout;