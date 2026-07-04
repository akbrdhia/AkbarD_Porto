import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const rows = [
  {
    align: 'left',
    num: '01',
    content: [
      'hello, i\u2019m akbar',
      'a developer',
      'from Indonesia',
    ],
  },
  {
    align: 'right',
    num: '02',
    content: [
      'i ship.',
      'you use it.',
      'simple.',
    ],
  },
  {
    align: 'left',
    num: '03',
    content: [
      'across',
      'every',
      'layer.',
    ],
  },
];

const Row = ({ data, index }) => {
  const ref = useRef(null);
  const offset = index === 2 ? ['start 0.85', 'end 0.8'] : ['start 0.85', 'end 0.5'];
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });
  const y = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0, 1]);

  const isLeft = data.align === 'left';

  return (
    <section
      ref={ref}
      className="relative min-h-[80vh] bg-black text-white font-['Sora',sans-serif] flex items-center px-6 md:px-20 lg:px-32"
    >
      <motion.div
        style={{ y, opacity }}
        className={`w-full max-w-5xl ${isLeft ? 'text-left mr-auto' : 'text-right ml-auto'}`}
      >
        <span className="block overflow-hidden mb-4">
          <motion.span
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block text-[0.65rem] md:text-xs font-mono tracking-[0.15em] text-zinc-600"
          >
            {data.num}
          </motion.span>
        </span>

        {data.content.map((line, i) => (
          <p key={i} className="text-[clamp(1.8rem,5vw,4rem)] font-bold leading-[1.1] tracking-tight mb-2">
            {line}
          </p>
        ))}
      </motion.div>
    </section>
  );
};

const AboutJourney = () => {
  return (
    <div className="bg-black pb-64">
      {rows.map((row, i) => (
        <Row key={i} data={row} index={i} />
      ))}
    </div>
  );
};

export default AboutJourney;
