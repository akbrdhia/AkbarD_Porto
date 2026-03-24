import React from 'react';
import ProjectCard from './ProjectCard';
import { PROJECTS } from '../../../constants/projects';

const GalleryGrid = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-[60fr_40fr] gap-0 w-full bg-black border-t border-white/5">
      {PROJECTS.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </section>
  );
};

export default GalleryGrid;