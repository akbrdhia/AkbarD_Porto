import React from 'react';
import ProjectCard from './ProjectCard';

const projects = [
  {
    id: 1,
    title: 'THE CORE SYSTEM',
    category: 'Digital Ecosystem',
    year: '2026',
    image: '/setup.jpg',
    colSpan: 8
  },
  {
    id: 2,
    title: 'AMBER VISION',
    category: 'Product Design',
    year: '2025',
    image: '/about-portrait.jpg',
    colSpan: 4
  },
  {
    id: 3,
    title: 'RESONANCE',
    category: 'Audio Visual',
    year: '2024',
    image: '/Manager_usahav2.png',
    colSpan: 4
  },
  {
    id: 4,
    title: 'CHROME STATIC',
    category: 'Web Experience',
    year: '2026',
    image: '/Sako-login.png',
    colSpan: 8
  }
];

const GalleryGrid = () => {
  return (
    <section id="gallery" className="bg-p26-bg-deep py-24 px-6 md:px-20 min-h-screen relative z-10 snap-start">
      {/* Section Header Pattern: Label left + CTA right */}
      <div className="flex justify-between items-baseline mb-16 border-b border-white/5 pb-8">
        <span className="p26-label-mono text-p26-on-surface/40 uppercase tracking-widest">
          Selected Works
        </span>
        <button className="p26-body-md text-p26-on-surface hover:text-p26-primary-container transition-all flex items-center gap-2 group uppercase tracking-widest font-bold">
          All Projects <span className="group-hover:translate-x-2 transition-transform">→</span>
        </button>
      </div>

      {/* Asymmetrical Bleed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-[1px] bg-white/10 border border-white/10 overflow-hidden shadow-2xl">
        {projects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            colSpan={project.colSpan} 
          />
        ))}
      </div>
      
      {/* Background bleed technique - showing grid gaps via container bg */}
      <style dangerouslySetInnerHTML={{ __html: `
        .grid > * {
          background-color: var(--color-p26-bg-deep);
        }
      `}} />
    </section>
  );
};

export default GalleryGrid;
