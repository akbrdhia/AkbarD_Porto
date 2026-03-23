import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project, index }) => {
  const isLarge = index === 0 || index === 3; 
  const projectId = project.name.toLowerCase().replace(/\s+/g, '-');

  return (
    <Link to={`/2026/project/${projectId}`} className="block">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={`relative group cursor-pointer overflow-hidden bg-black ${
          isLarge ? 'aspect-[16/10] md:col-span-1' : 'aspect-square md:col-span-1'
        }`}
      >
        {/* Background Image */}
        <motion.img 
          src={project.preview} 
          alt={project.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out scale-110 group-hover:scale-100"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

        {/* Content */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end">
          <p className="text-[#F5C842] text-xs font-bold tracking-widest uppercase mb-2">
            {project.year} — {project.status}
          </p>
          <h3 className="text-white text-3xl md:text-4xl font-black tracking-tighter leading-none mb-4">
            {project.name}
          </h3>
          <div className="flex gap-2 flex-wrap">
            {project.tech.map((t) => (
              <span key={t} className="text-[10px] text-white/60 border border-white/20 px-2 py-1 rounded-full uppercase tracking-widest">
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProjectCard;