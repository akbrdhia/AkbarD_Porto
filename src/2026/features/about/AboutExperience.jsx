import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CONFIG_2026 } from '../../constants/config';

const experiences = CONFIG_2026.experience;

const ease = [0.16, 1, 0.3, 1];

const TimelineItem = ({ data, index }) => {
  const ref = useRef(null);
  const isLast = index === experiences.length - 1;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'center 0.7'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 0, 1]);
  const dotScale = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0, 1]);
  const lineScale = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);

  const techArr = data.tech ? data.tech.split(', ') : [];

  return (
    <div ref={ref} className="relative pb-20 md:pb-28 last:pb-0">
      <span className="absolute -top-8 left-0 text-[clamp(6rem,15vw,15rem)] font-black leading-none text-white/[0.03] select-none pointer-events-none">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="relative flex items-start gap-4 md:gap-8">
        <div className="flex flex-col items-center shrink-0 pt-2">
          <motion.div
            style={{ scale: dotScale }}
            className="w-[16px] h-[16px] bg-white relative z-10"
          />
          <motion.div
            style={{ scaleY: lineScale, originY: 0 }}
            className={`w-[1px] bg-gradient-to-b from-white/60 via-white/20 to-transparent ${isLast ? 'h-[calc(100%-20px)]' : 'h-full'}`}
          />
        </div>

        <motion.div style={{ y, opacity }} className="flex-1 min-w-0 pb-8 md:pb-12">
          <span className="block font-mono text-[0.7rem] md:text-xs tracking-[0.2em] text-zinc-600 mb-2">
            {data.year}
          </span>

          <h3 className="text-[clamp(3rem,6vw,5.5rem)] font-black tracking-tighter leading-[0.9] mb-1 text-white">
            {data.company}
          </h3>

          <p className="text-[clamp(1rem,1.5vw,1.35rem)] text-white/40 font-medium mb-4">
            {data.role}
          </p>

          {techArr.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {techArr.map((t, i) => (
                <span
                  key={i}
                  className="text-[0.75rem] md:text-[0.8rem] tracking-wider uppercase px-3 py-1.5 bg-white/5 text-white/70 font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          <ul className="space-y-1.5">
            {data.items.map((item, i) => (
              <li key={i} className="text-[clamp(0.9rem,1.1vw,1.05rem)] text-white/60 leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

const AboutExperience = () => {
  return (
    <div className="bg-black py-28 md:py-40 px-6 md:px-20 lg:px-32">
      <div className="max-w-5xl mx-auto">
        <motion.span
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="block font-mono text-[0.7rem] md:text-xs tracking-[0.25em] uppercase text-zinc-500 mb-16 md:mb-20"
        >
          [02] (experience)
        </motion.span>

        <div className="space-y-4">
          {experiences.map((exp, i) => (
            <TimelineItem key={i} data={exp} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutExperience;
