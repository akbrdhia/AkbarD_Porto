import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../../../constants/projects';

const categories = ['All', 'Web', 'Android', 'Backend', 'AI', 'Tools'];

const ProjectsPage = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.tech.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchCategory =
        activeCategory === 'All' || p.category.includes(activeCategory);
      return matchSearch && matchCategory;
    });
  }, [search, activeCategory]);

  return (
    <section className='min-h-screen bg-black text-white font-["Sora",sans-serif] pt-28 pb-32 px-6 md:px-16 lg:px-24 overflow-hidden'>
      <div className='flex flex-col md:flex-row gap-10 md:gap-16 lg:gap-24'>
        <div className='md:w-40 lg:w-48 shrink-0 flex flex-col gap-6 md:gap-8'>
          <div className='flex-1 md:flex-none'>
            <input
              type='text'
              placeholder='/ search'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='w-full bg-transparent border-b border-white/10 pb-2.5 text-base md:text-lg font-bold text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors duration-300'
            />
          </div>

          <div className='flex flex-wrap gap-x-4 gap-y-1 md:flex-col md:gap-0'>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-left px-0 py-2 md:py-2.5 text-[0.75rem] uppercase tracking-[0.2em] font-black transition-all duration-300 ${
                  activeCategory === cat
                    ? 'text-white'
                    : 'text-white/25 hover:text-white/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className='flex-1 min-w-0'>
          <div className='mb-8 md:mb-10'>
            <p className='text-[0.7rem] uppercase tracking-[0.25em] text-white/40 font-bold'>
              {filtered.length === 0
                ? 'no projects found'
                : activeCategory === 'All' && !search
                  ? `${filtered.length} Projects`
                  : `Showing ${filtered.length} of ${PROJECTS.length}`}
            </p>
          </div>

          <div className='columns-1 md:columns-2 gap-5 md:gap-6'>
            <AnimatePresence mode='popLayout'>
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1], layout: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
                  className='break-inside-avoid mb-5 md:mb-6'
                >
                  <Link
                    to={`/2026/project/${project.id}`}
                    viewTransition
                    className='group relative block overflow-hidden bg-zinc-900'
                  >
                    <img
                      src={project.preview}
                      alt={project.name}
                      onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/1a1a1a/666666?text=unavailable' }}
                      className='w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.03]'
                    />

                    <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent' />

                    <div className='absolute bottom-0 left-0 right-0 p-6 md:p-8'>
                      <p className='text-[0.65rem] md:text-[0.75rem] uppercase tracking-[0.25em] text-white/50 font-bold mb-1.5'>
                        {project.year}
                      </p>
                      <h2 className='text-xl md:text-2xl lg:text-3xl font-black text-white leading-tight tracking-tight'>
                        {project.name}
                      </h2>
                      <p className='text-[0.55rem] uppercase tracking-[0.15em] text-white/40 font-medium mt-2 max-h-0 group-hover:max-h-10 opacity-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden'>
                        {project.tech.join(' / ')}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsPage;
