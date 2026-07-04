import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG_2026 } from '../../constants/config';

const ease = [0.16, 1, 0.3, 1];

const { nodes } = CONFIG_2026.skills;

const CATEGORIES = [
  { id: 'mobile', num: '01', label: 'Mobile' },
  { id: 'frontend', num: '02', label: 'Frontend' },
  { id: 'backend', num: '03', label: 'Backend' },
  { id: 'database', num: '04', label: 'Database' },
  { id: 'tools', num: '05', label: 'Tools' },
];

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.08 },
  },
};

const textReveal = {
  hidden: { y: 60 },
  visible: {
    y: 0,
    transition: { duration: 0.55, ease },
  },
};

const AboutSkills = () => {
  const [active, setActive] = useState('mobile');
  const lines = nodes.filter((n) => n.category === active).map((n) => n.name);

  return (
    <section className="bg-black text-white py-28 md:py-40 px-6 md:px-20 lg:px-32 overflow-hidden">
      <div className="max-w-6xl mx-auto">


        <div className="flex flex-col md:flex-row gap-10 md:gap-16 lg:gap-24">
          <div className="md:w-56 shrink-0 space-y-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className="group w-full text-left flex items-center gap-3 md:gap-4 py-2.5 cursor-pointer transition-all duration-500"
              >
                <span
                  className={`font-mono text-[0.6rem] md:text-[0.65rem] tracking-[0.2em] transition-all duration-500 ${active === cat.id ? 'text-white' : 'text-zinc-700'}`}
                >
                  {cat.num}
                </span>
                <span
                  className={`text-[clamp(0.9rem,1.8vw,1.4rem)] font-bold tracking-tight transition-all duration-500 ${active === cat.id ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'}`}
                >
                  {cat.label}
                </span>
                {active === cat.id && (
                  <motion.span
                    layoutId="active-bar"
                    className="w-6 h-[2px] bg-white"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex-1 min-h-[320px] flex items-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-flow-col grid-rows-[repeat(2,auto)] sm:grid-rows-[repeat(4,auto)] gap-x-4 md:gap-x-8 lg:gap-x-12"
                >
                  {lines.map((line) => (
                    <div key={line} className="overflow-hidden">
                      <motion.p
                        variants={textReveal}
                        className="text-[clamp(1.8rem,5vw,4.5rem)] font-black leading-[1.08] tracking-tighter text-white"
                      >
                        {line}
                      </motion.p>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSkills;
