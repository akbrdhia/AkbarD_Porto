import React from 'react';
import Navbar from './Navbar';
import '../theme/theme.css';
import '../theme/typography.css';

const MainLayout = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh', width: '100vw', background: 'var(--bg)', color: 'var(--text)' }}>
      <Navbar />
      <main>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
