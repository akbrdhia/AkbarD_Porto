import React, { useState, useRef } from 'react';
import { useSpring, useTransform, motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MotionDiv = motion.div;
const MotionImg = motion.img;

const ProjectCard = ({ project, index }) => {
  const isLarge = index === 0 || index === 3;
  const cardRef = useRef(null);
  const [, setHovered] = useState(false);

  const rawX = useSpring(0, { stiffness: 300, damping: 30 });
  const rawY = useSpring(0, { stiffness: 300, damping: 30 });
  const opacity = useSpring(0, { stiffness: 300, damping: 30 });
  const scale = useTransform(opacity, [0, 1], [0.7, 1]);

  const onMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(e.clientX - rect.left);
    rawY.set(e.clientY - rect.top);
  };

  const onMouseEnter = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(e.clientX - rect.left);
    rawY.set(e.clientY - rect.top);
    opacity.set(1);
    setHovered(true);
  };

  const onMouseLeave = () => {
    opacity.set(0);
    setHovered(false);
  };

  return (
    <Link to={`/2026/project/${project.id}`} viewTransition className="block">
      <MotionDiv
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={`relative group cursor-pointer overflow-hidden bg-black ${
          isLarge ? 'aspect-[16/10] md:col-span-1' : 'aspect-square md:col-span-1'
        }`}
      >
        <MotionImg
          src={project.preview}
          alt={project.name}
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/1a1a1a/666666?text=unavailable'; }}
          style={{ viewTransitionName: `project-image-${project.id.replace(/[^a-zA-Z0-9]/g, '-')}` }}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out scale-110 group-hover:scale-100"
        />

        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

        <div className="absolute inset-0 p-8 flex flex-col justify-end">
          <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: project.accentColor || '#F5C842' }}>
            {project.year} — {project.status}
          </p>
          <h3 className="text-white text-3xl md:text-4xl font-black tracking-tighter leading-none mb-4">
            {project.name}
          </h3>
          <div className="flex gap-2 flex-wrap">
            {project.tech.map((t) => (
              <span key={t} className="text-[10px] text-white/60 border border-white/20 px-2 py-1 uppercase tracking-widest">
                {t}
              </span>
            ))}
          </div>
        </div>

        <MotionDiv
          style={{
            x: rawX,
            y: rawY,
            opacity,
            scale,
            translateX: '-50%',
            translateY: '-50%',
          }}
          className="absolute top-0 left-0 z-20 pointer-events-none px-3 py-1.5 border border-white/70 bg-black/60"
        >
          <span className="text-[0.6rem] font-mono tracking-[0.22em] uppercase text-white">
            VIEW
          </span>
        </MotionDiv>
      </MotionDiv>
    </Link>
  );
};

export default ProjectCard;
