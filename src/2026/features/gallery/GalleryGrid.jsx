import React from 'react';
import ProjectCard from './ProjectCard';

const GalleryGrid = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-[60fr_40fr] gap-0 w-full">
      <ProjectCard color="#4A7EF5" />
      <ProjectCard color="#F5426C" />
      <ProjectCard color="#42F5A1" />
      <ProjectCard color="#F5C842" />
    </section>
  );
};

export default GalleryGrid;