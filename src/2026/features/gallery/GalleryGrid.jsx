import React from 'react';
import ProjectCard from './ProjectCard';

const GalleryGrid = () => {
  return (
    <section style={{
      display: 'grid',
      gridTemplateColumns: '60fr 40fr',
      gap: 0,
      width: '100vw',
      marginTop: '5rem'
    }}>
      <ProjectCard color="#4A7EF5" />
      <ProjectCard color="#F5426C" />
      <ProjectCard color="#42F5A1" />
      <ProjectCard color="#F5C842" />
    </section>
  );
};

export default GalleryGrid;
