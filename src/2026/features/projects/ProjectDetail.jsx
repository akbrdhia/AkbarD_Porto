import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PROJECTS } from '../../../constants/projects';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const project = PROJECTS.find(p => p.id === projectId);

  if (!project) return <div>Project not found</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen w-screen bg-black text-white font-['Sora',sans-serif] overflow-x-hidden"
    >
      {/* 1. Full-Bleed Visual Hero Section (Moved to TOP for Cinematic View Transition) */}
      <section className="relative w-full h-[55vh] md:h-[75vh] group overflow-hidden">
        <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 md:hidden pointer-events-none" />

        <div className="w-full h-full bg-[#111]">
          <img 
            src={project.preview} 
            alt={project.name}
            style={{ viewTransitionName: `project-image-${project.id.replace(/[^a-zA-Z0-9]/g, '-')}` }}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* 2. Project Title Section (Overlapping on mobile) */}
      <section className="px-6 md:px-12 -mt-[8vh] md:mt-16 relative z-30 pointer-events-none">
        <motion.h1 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(3.5rem,10vw,9rem)] font-black leading-[0.85] tracking-tighter uppercase max-w-[1400px] mix-blend-difference pointer-events-auto"
        >
          {project.name.split(',').map((part, i) => (
            <React.Fragment key={i}>
              {part.trim()}
              {i === 0 && <br />}
            </React.Fragment>
          ))}
        </motion.h1>
      </section>

      {/* 3. Metadata Row (2x2 Grid on Mobile) */}
      <section className="px-6 md:px-12 pb-8 mt-16 md:mt-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 w-full border-b border-white/10 pb-12"
        >
          {[
            { label: 'Brand', value: project.brand },
            { label: 'Led By', value: project.ledBy },
            { label: 'Roles', value: project.roles },
            { label: 'Year', value: project.year }
          ].map((item, i) => (
            <div key={item.label} className={i === 3 ? 'md:text-right' : ''}>
              <p className="text-white/60 text-[10px] md:text-[12px] uppercase tracking-[0.2em] mb-2">({item.label})</p>
              <p className="text-base md:text-lg font-medium text-white tracking-tight">{item.value}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* 4. Description Section */}
      <section className="px-12 py-8 w-full border-b border-white/5 pb-32">
        <p className="text-[clamp(2.5rem,5vw,5rem)] font-black leading-[0.9] tracking-tighter uppercase w-full">
          {project.description}
        </p>
      </section>

      {/* 5. Credits Section */}
      <section className="px-12 py-32 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-20">
        <div>
          <h2 className="text-[5rem] font-black tracking-tighter leading-none mb-4 uppercase">Credits.</h2>
          <div className="w-20 h-[4px] bg-white" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
          {[
            { label: 'Client', value: project.brand },
            { label: 'Design', value: 'Akbar Dhia' },
            { label: 'Development', value: 'Akbar Dhia' },
            { label: 'Stack', value: project.tech.join(', ') },
            { label: 'Status', value: project.status },
            { label: 'Location', value: 'Remote / Indonesia' }
          ].map((item) => (
            <div key={item.label}>
              <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-2">({item.label})</p>
              <p className="text-xl font-bold uppercase">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. More Projects Section */}
      <section className="px-6 md:px-12 py-20 md:py-40 border-t border-white/10">
        <h2 className="text-white/30 text-xs uppercase tracking-[0.5em] mb-12">(More Projects)</h2>
        <div className="flex flex-col md:flex-row md:flex-wrap md:items-baseline gap-y-4 md:gap-x-4 md:gap-y-2">
          {PROJECTS.filter(p => p.id !== project.id).map((otherProject, index, array) => (
            <React.Fragment key={otherProject.id}>
              <Link 
                to={`/2026/project/${otherProject.id}`}
                className="text-[clamp(2.5rem,5vw,5rem)] font-black tracking-tighter uppercase transition-all duration-500 opacity-40 hover:opacity-100 hover:text-white leading-[1]"
              >
                {otherProject.name}
              </Link>
              {index < array.length - 1 && (
                <span className="hidden md:inline-block text-[clamp(2.5rem,5vw,5rem)] font-black opacity-20 leading-[1]">,</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default ProjectDetail;