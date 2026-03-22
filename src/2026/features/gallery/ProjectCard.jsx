import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project, colSpan = 4 }) => {
  const colSpanClass = {
    8: 'md:col-span-8',
    4: 'md:col-span-4',
    12: 'md:col-span-12',
  }[colSpan];

  return (
    <motion.div
      className={`relative h-[400px] md:h-[500px] overflow-hidden group ${colSpanClass} bg-p26-bg-deep`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.2, 0.0, 0, 1.0] }}
    >
      <motion.div className="absolute inset-0 w-full h-full">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-p26-standard group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
      </motion.div>
      
      {/* Editorial Overlay */}
      <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between z-10">
        <div className="flex justify-between items-start">
          <span className="p26-label-mono text-p26-on-surface/60">
            {project.year}
          </span>
          <span className="p26-label-mono text-p26-on-surface/60 opacity-0 group-hover:opacity-100 transition-opacity">
            {project.category}
          </span>
        </div>
        
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="p26-display-lg text-p26-on-surface leading-none mb-2">
              {project.title}
            </h3>
            <p className="p26-label-mono text-p26-primary-container opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
              Explore Project →
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
