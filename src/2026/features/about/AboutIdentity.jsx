import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG_2026 } from '../../constants/config';

const facts = [
  {
    num: '01',
    title: 'Who I Am',
    body: 'Akbar Dhia. 18, Bogor. fresh out of vocational school. already shipping to production.',
  },
  {
    num: '02',
    title: 'What I Code',
    body: 'Android first \u2014 Kotlin, Compose. then web \u2014 React, Next. then backend \u2014 Laravel, Express, Go. still expanding.',
  },
  {
    num: '03',
    title: 'Experience',
    body: 'interned at KEMENKOP RI, worked on ODS Form and some internal tools. shipped things that got used.',
  },
  {
    num: '04',
    title: 'How I Work',
    body: 'I don\u2019t wait until I know everything. I pick up what I need, build it, and figure out the rest while shipping.',
  },
  {
    num: '05',
    title: 'Vibe',
    body: 'homelab guy. self-hosted everything. I like systems that are simple and things that actually get used. open for work.',
  },
];

const ease = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.25, delayChildren: 0.1 },
  },
};

const childVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease },
  },
};

const navVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease, delay: 0.6 },
  },
};

const meshStyle = {
  backgroundImage: 'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(/image-mesh-gradient.webp)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundColor: '#000000',
};

const AboutIdentity = ({ onOpenContact }) => {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [expandedIdx, setExpandedIdx] = useState(null);
  const backgroundNumber = useMemo(() => facts[active]?.num ?? '01', [active]);

  const isExperience = active === 2;

  useEffect(() => {
    if (isExperience) {
      setExpandedIdx((prev) => (prev === null ? 0 : prev));
    }
  }, [active, isExperience]);

  return (
    <section
      className="relative flex flex-col text-white font-['Sora',sans-serif] px-6 md:px-16 lg:px-24 py-24 md:py-36 h-dvh"
      style={meshStyle}
    >
      <div className='absolute inset-0 flex items-center justify-center pointer-events-none select-none'>
        <AnimatePresence mode='wait'>
          <motion.span
            key={backgroundNumber}
            initial={{ opacity: 0, scale: 1.5, y: 40 }}
            animate={{ opacity: 0.035, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: -40 }}
            transition={{ duration: 0.7, ease }}
            className='text-[clamp(15rem,40vw,50rem)] font-black text-white leading-none tracking-[-0.06em]'
          >
            {backgroundNumber}
          </motion.span>
        </AnimatePresence>
      </div>

      <motion.div
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-80px' }}
        className='relative z-10 w-full max-w-6xl mx-auto flex flex-col flex-1 min-h-0'
      >
        <motion.span
          variants={childVariants}
          className='block font-mono text-[0.7rem] md:text-xs tracking-[0.25em] uppercase text-zinc-500 mb-12 md:mb-20 shrink-0'
        >
          identity
        </motion.span>

        <div className='flex-1 overflow-y-auto min-h-0'>
          <motion.div variants={childVariants} className='grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10 md:gap-20'>
            <div className='min-h-[200px] md:min-h-[280px] flex flex-col justify-end'>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={active}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5, ease }}
                >
                  <h3 className='text-[clamp(2.2rem,5vw,4rem)] font-black tracking-tight leading-[1.1] mb-6 text-white'>
                    {facts[active].title}
                  </h3>
                {isExperience ? (
                  <div className='flex gap-6 md:gap-10'>
                    <div className='shrink-0 space-y-1'>
                      {CONFIG_2026.experience.map((exp, i) => (
                        <button
                          key={i}
                          onClick={() => setExpandedIdx(i)}
                          className={`w-full text-left cursor-pointer bg-transparent border-none py-1.5 group transition-all duration-300 ${
                            expandedIdx === i ? '' : 'opacity-40 hover:opacity-70'
                          }`}
                        >
                          <span className='block text-[clamp(0.9rem,1.5vw,1.1rem)] font-bold tracking-tight text-white'>
                            {exp.company}
                          </span>
                        </button>
                      ))}
                    </div>
                    <div className='flex-1 min-w-0 min-h-[200px]'>
                      <AnimatePresence mode='wait'>
                        {expandedIdx !== null && (
                          <motion.div
                            key={expandedIdx}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                          >
                            {(() => {
                              const exp = CONFIG_2026.experience[expandedIdx];
                              return (
                                <div>
                                  <div className='flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3'>
                                    <span className='text-[clamp(0.95rem,1.5vw,1.2rem)] font-bold tracking-tight text-white'>
                                      {exp.role}
                                    </span>
                                    <span className='text-[0.7rem] font-mono tracking-[0.15em] text-white/20'>
                                      {exp.year}
                                    </span>
                                  </div>
                                  <div className='flex flex-wrap gap-1.5 mb-3'>
                                    {exp.tech.split(', ').map((t) => (
                                      <span
                                        key={t}
                                        className='text-[0.65rem] tracking-wider uppercase px-2 py-1 bg-white/5 text-white/50'
                                      >
                                        {t}
                                      </span>
                                    ))}
                                  </div>
                                  <ul className='space-y-1'>
                                    {exp.items.map((item, j) => (
                                      <li key={j} className='text-[0.85rem] text-white/50 leading-relaxed pl-4 relative'>
                                        <span className='absolute left-0 top-[0.6em] w-1.5 h-[1px] bg-white/30' />
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              );
                            })()}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                ) : (
                  <p className='text-[clamp(0.95rem,1.5vw,1.2rem)] leading-[1.8] text-white/50 max-w-lg'>
                    {facts[active].body}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          <div />
        </motion.div>
        </div>

        <motion.div
          variants={navVariants}
          className='mt-16 md:mt-24 pt-8 border-t border-white/5 shrink-0'
        >
          <div className='flex items-start md:items-center justify-between gap-4'>
            <div className='flex items-center justify-between w-full md:w-auto gap-0 sm:gap-4 md:gap-2'>
              {facts.map((item, i) => {
                const isActive = active === i;
                const isHovered = hovered === i;
                return (
                  <motion.button
                    key={item.num}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    whileTap={{ scale: 0.92 }}
                    className={`
                      group relative text-center md:text-left cursor-pointer
                      flex-1 md:flex-none
                      py-3 md:px-5
                      transition-all duration-500
                    `}
                  >
                    <span
                      className={`
                        block font-black tracking-tighter transition-all duration-500
                        ${isActive || isHovered
                          ? 'text-white text-[1.4rem] md:text-[1.6rem]'
                          : 'text-zinc-700 text-[1.1rem] md:text-[1.2rem]'
                        }
                      `}
                    >
                      {item.num}
                    </span>
                    <span
                      className={`
                        absolute bottom-0 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 h-[2px] transition-all duration-500
                        ${isActive
                          ? 'w-8 md:w-12 bg-white'
                          : 'w-0 bg-white/30 group-hover:w-6 group-hover:bg-white/50'
                        }
                      `}
                    />
                  </motion.button>
                );
              })}
            </div>

            <div className='hidden md:block text-white/30 text-[0.85rem] tracking-[0.15em] uppercase font-bold'>
              <a href='/CV_Akbardhia_EN.pdf' download className='hover:text-white/60 transition-all duration-300'>See My Work</a>
              <span>, </span>
              <button onClick={onOpenContact} className='hover:text-white/60 transition-all duration-300 bg-transparent border-none text-white/30 text-[0.85rem] tracking-[0.15em] uppercase font-bold cursor-pointer'>Get In Touch</button>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={navVariants}
          className='mt-8 md:hidden text-white/30 text-[0.85rem] tracking-[0.15em] uppercase font-bold shrink-0'
        >
          <a href='/CV_Akbardhia_EN.pdf' download className='hover:text-white/60 transition-all duration-300'>See My Work</a>
          <span>, </span>
          <button onClick={onOpenContact} className='hover:text-white/60 transition-all duration-300 bg-transparent border-none text-white/30 text-[0.85rem] tracking-[0.15em] uppercase font-bold cursor-pointer'>Get In Touch</button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutIdentity;
