import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PROJECTS } from '../../../constants/projects';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const project = PROJECTS.find(p => p.id === projectId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) return <div>Project not found</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen w-screen bg-black text-white font-['Sora',sans-serif] overflow-x-hidden"
    >
      <section className="px-6 md:px-12 pt-24 md:pt-32 pb-8 md:pb-12">
        <motion.h1 
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(2.5rem,6vw,6rem)] font-black leading-[0.9] tracking-tighter uppercase max-w-[1200px]"
        >
          {project.name.split(',').map((part, i) => (
            <React.Fragment key={i}>
              {part.trim()}
              {i === 0 && <br />}
            </React.Fragment>
          ))}
        </motion.h1>
      </section>

      <section className="px-6 md:px-12 pb-8">
        <div className="flex justify-between items-end w-full border-b border-white/10 pb-8">
          {[
            { label: 'Brand', value: project.brand },
            { label: 'Led By', value: project.ledBy },
            { label: 'Roles', value: project.roles },
            { label: 'Year', value: project.year }
          ].map((item, i) => (
            <div key={item.label} className={i === 3 ? 'text-right' : ''}>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] mb-1" style={{ color: project.accentColor || '#ffffff' }}>({item.label})</p>
              <p className="text-sm md:text-base font-medium text-white tracking-tight">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative w-full group overflow-hidden">
        <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full aspect-video bg-[#111]"
        >
          <img 
            src={project.preview} 
            alt={project.name}
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/1a1a1a/666666?text=unavailable' }}
            style={{ viewTransitionName: `project-image-${project.id.replace(/[^a-zA-Z0-9]/g, '-')}` }}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </section>

      {/* 4. Description */}
      <section className="px-6 md:px-12 py-8 md:py-12 border-b border-white/5 pb-16 md:pb-24">
        <p className="text-[clamp(2rem,4.5vw,4.5rem)] font-black leading-[0.9] tracking-tighter uppercase w-full">
          {project.description}
        </p>
      </section>

      {/* 5. Credits */}
      <section className="px-6 md:px-12 py-16 md:py-32 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16 md:gap-20">
        <div>
          <h2 className="text-[clamp(3rem,6vw,5rem)] font-black tracking-tighter leading-none uppercase">Credits.</h2>
          <div className="w-16 md:w-20 h-[3px] md:h-[4px] mt-4" style={{ backgroundColor: project.accentColor || '#ffffff' }} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
          {[
            { label: 'Client', value: project.brand },
            { label: 'Design', value: 'Akbar Dhia' },
            { label: 'Development', value: 'Akbar Dhia' },
            { label: 'Stack', value: project.tech.join(', ') },
            { label: 'Status', value: project.status, accent: project.accentColor },
            { label: 'Location', value: project.location }
          ].map((item) => (
            <div key={item.label}>
              <p className="text-xs uppercase tracking-[0.2em] mb-2" style={{ color: item.accent || project.accentColor || '#ffffff' }}>({item.label})</p>
              <p className="text-base md:text-xl font-bold uppercase" style={item.accent ? { color: item.accent } : {}}>{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. More Projects */}
      <section className="px-6 md:px-12 py-16 md:py-40 border-t border-white/10">
        <p className="text-white/30 text-[0.6rem] md:text-xs uppercase tracking-[0.5em] mb-8 md:mb-12">(More Projects)</p>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          {PROJECTS.filter(p => p.id !== project.id).map((otherProject, index, array) => (
            <React.Fragment key={otherProject.id}>
              <Link 
                to={`/2026/project/${otherProject.id}`}
                className="text-[clamp(2rem,5vw,5rem)] font-black tracking-tighter uppercase transition-all duration-500 opacity-40 hover:opacity-100"
              >
                {otherProject.name}
              </Link>
              {index < array.length - 1 && <span className="text-white/20 text-[clamp(1.5rem,3vw,3rem)] font-black mx-1">,</span>}
            </React.Fragment>
          ))}
        </div>
        <div className="mt-8 md:mt-12">
          <Link to="/2026/projects" className="text-white/20 hover:text-white/60 transition-colors duration-300 text-[0.7rem] uppercase tracking-[0.2em]">
            ← Back to projects
          </Link>
        </div>
      </section>
    </motion.div>
  );
};

export default ProjectDetail;