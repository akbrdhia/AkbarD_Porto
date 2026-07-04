import { useRef, useMemo } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { motion } from 'framer-motion';
import { CONFIG_2026 } from '../../constants/config';

const MotionDiv = motion.div;
const MotionSpan = motion.span;

const CATEGORY_LABEL = {
  mobile: 'MOBILE',
  frontend: 'WEB',
  backend: 'BACKEND',
};

const WHITELIST = ['mobile', 'frontend', 'backend'];

const ease = [0.16, 1, 0.3, 1];

const Act = ({ data, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'end 0.3'],
  });

  const y = useTransform(scrollYProgress, [0, 0.4, 1], [100, 0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.75, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 1], [0.88, 1, 1.06]);
  const subY = useTransform(scrollYProgress, [0, 0.35, 1], [40, 0, -30]);
  const subOpacity = useTransform(scrollYProgress, [0.15, 0.4, 0.7, 1], [0, 1, 1, 0]);

  const isEven = index % 2 === 0;

  return (
    <section
      ref={ref}
      className="relative min-h-[110vh] bg-black text-white font-['Sora',sans-serif] flex items-center overflow-hidden"
    >
      <MotionDiv
        style={{ y, opacity, scale }}
        className={`absolute inset-0 flex flex-col justify-center px-6 md:px-20 lg:px-32 ${
          isEven ? 'items-start' : 'items-end'
        }`}
      >
        <MotionSpan
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease }}
          className="block font-mono text-[0.65rem] tracking-[0.25em] text-zinc-700 mb-4"
        >
          {String(index + 1).padStart(2, '0')}
        </MotionSpan>

        <h2
          className={`text-[clamp(4.5rem,18vw,18rem)] font-black leading-[0.85] tracking-[-0.04em] text-white select-none ${
            isEven ? '' : 'text-right'
          }`}
        >
          {data.label}
        </h2>

        <MotionDiv
          style={{ y: subY, opacity: subOpacity }}
          className={`flex flex-wrap gap-4 md:gap-6 mt-6 ${isEven ? '' : 'justify-end'}`}
        >
          {data.skills.map((s) => (
            <span
              key={s}
              className="font-mono text-[0.65rem] md:text-[0.75rem] tracking-[0.2em] uppercase text-zinc-500"
            >
              {s}
            </span>
          ))}
        </MotionDiv>
      </MotionDiv>
    </section>
  );
};

const AboutSkills = () => {
  const containerRef = useRef(null);

  const acts = useMemo(() => {
    const nodes = CONFIG_2026.skills?.nodes ?? [];
    return WHITELIST
      .map((cat) => ({
        category: cat,
        label: CATEGORY_LABEL[cat],
        skills: nodes
          .filter((n) => n.category === cat || (cat === 'backend' && n.category === 'database'))
          .map((n) => n.name),
      }))
      .filter((act) => act.skills.length > 0);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const creditsOpacity = useTransform(scrollYProgress, [0.82, 0.9, 1], [0, 1, 0]);
  const creditsY = useTransform(scrollYProgress, [0.82, 0.92], [30, 0]);

  return (
    <div ref={containerRef} className="bg-black">
      {acts.map((act, i) => (
        <Act key={act.category} data={act} index={i} />
      ))}

      <section className="relative min-h-[50vh] bg-black flex items-center justify-center overflow-hidden">
        <MotionDiv
          style={{ opacity: creditsOpacity, y: creditsY }}
          className="flex items-center"
        >
          {acts.map((act, i) => (
            <span
              key={act.category}
              className="font-mono text-[0.6rem] md:text-[0.7rem] tracking-[0.3em] uppercase text-zinc-600 flex items-center"
            >
              {i > 0 && (
                <span className="mx-5 md:mx-8 text-zinc-800">·</span>
              )}
              {act.label}
            </span>
          ))}
        </MotionDiv>
      </section>
    </div>
  );
};

export default AboutSkills;
