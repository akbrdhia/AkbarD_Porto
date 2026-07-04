import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import ShimmerText from './ShimmerText';

const AboutHero = () => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [150, -150]);

  return (
    <section ref={ref} className="relative min-h-screen bg-black text-white font-['Sora',sans-serif] overflow-hidden">
      <motion.div style={{ y }} className="relative mx-auto min-h-screen pt-[18vh] md:pt-0 md:flex md:items-center">
        <div className="flex flex-col md:block mx-6 md:mx-20 lg:mx-32">
        <h1 className="relative z-20 text-[clamp(3rem,10vw,5rem)] md:text-[clamp(4rem,10vw,14rem)] font-bold leading-[1.05] tracking-tighter">
          <span className="block overflow-hidden leading-[1.05]">
            <motion.span
              initial={{ y: reduce ? 0 : '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              Please
            </motion.span>
          </span>

          <span className="relative block">
            <span className="block overflow-hidden leading-[1.05]">
              <motion.span
                initial={{ y: reduce ? 0 : '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
              >
                Call me akbar
              </motion.span>
            </span>

            <div className="hidden md:block absolute top-0 left-[clamp(350px,48vw,850px)] z-[-1] w-[clamp(350px,42vw,650px)]">
              <motion.img
                src="/about-portrait.webp"
                alt=""
                initial={reduce ? {} : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-auto block"
              />
            </div>
          </span>

          <span className="relative block overflow-hidden leading-[1.05] z-10">
            <motion.span
              initial={{ maxWidth: 0 }}
              animate={{ maxWidth: '8rem' }}
              transition={{ duration: 1.2, delay: 1.6, ease: [0.25, 1, 0.5, 1] }}
              className="inline-block overflow-hidden whitespace-nowrap"
            >
              —
            </motion.span>
            <span className="inline-block overflow-hidden leading-[1.05]">
              <motion.span
                initial={{ y: reduce ? 0 : '100%', x: reduce ? 0 : '5%' }}
                animate={{ y: 0, x: 0 }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
              >
                <ShimmerText delay={0.4}>
                  Developer
                </ShimmerText>
              </motion.span>
            </span>
          </span>
        </h1>

        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="block md:hidden w-full max-w-[70vw] mx-auto mt-8"
        >
          <img
            src="/about-portrait.jpg"
            alt=""
            className="w-full h-auto block"
          />
        </motion.div>
      </div>
      </motion.div>
    </section>
  );
};

export default AboutHero;
