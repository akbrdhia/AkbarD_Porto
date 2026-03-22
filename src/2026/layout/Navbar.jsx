import React from 'react';
import '../theme/typography.css';

const Navbar = () => {
  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      display: 'flex',
      justifyContent: 'space-between',
      padding: '1.25rem 1.5rem',
      background: 'transparent',
      zIndex: 100
    }}>
      <div className="nav-text" style={{ fontWeight: 600 }}>champ studio</div>
      <div className="nav-text">home, about, projects, play, team, contact</div>
      <div className="nav-text">los angeles, ca <span style={{ color: '#00ff00' }}>●</span></div>
    </nav>
  );
};

export default Navbar;
