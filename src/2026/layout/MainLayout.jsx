import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-p26-surface text-p26-on-surface selection:bg-p26-primary-container selection:text-p26-on-primary-container font-body">
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
