import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
      {/* 1. Project Title Section */}
      <section className="px-12 pt-24 pb-12">
        <motion.h1 
          initial={{ y: 100, opacity: 0 }}
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

      {/* 2. Metadata Row */}
      <section className="px-12 pb-8 mt-32">
        <div className="flex justify-between items-end w-full border-b border-white/10 pb-8">
          {[
            { label: 'Brand', value: project.brand },
            { label: 'Led By', value: project.ledBy },
            { label: 'Roles', value: project.roles },
            { label: 'Year', value: project.year }
          ].map((item, i) => (
            <div key={item.label} className={i === 3 ? 'text-right' : ''}>
              <p className="text-white/60 text-[12px] uppercase tracking-[0.2em] mb-1">({item.label})</p>
              <p className="text-lg font-medium text-white tracking-tight">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Full-Bleed Visual Hero Section */}
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
            className="w-full h-full object-cover"
          />
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
      <section className="px-12 py-40 border-t border-white/10">
        <h2 className="text-white/30 text-xs uppercase tracking-[0.5em] mb-12">(More Projects)</h2>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          {PROJECTS.filter(p => p.id !== project.id).map((otherProject, index, array) => (
            <React.Fragment key={otherProject.id}>
              <Link 
                to={`/2026/project/${otherProject.id}`}
                className="text-[clamp(2rem,5vw,5rem)] font-black tracking-tighter uppercase transition-all duration-500 opacity-40 hover:opacity-100 hover:text-white"
              >
                {otherProject.name}
              </Link>
              {index < array.length - 1 && (
                <span className="text-[clamp(2rem,5vw,5rem)] font-black opacity-20">,</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default ProjectDetail;