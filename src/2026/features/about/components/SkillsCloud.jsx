import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const skills = [
  "Kotlin", "Flutter", "Jetpack Compose", "Android Jetpack", "Retrofit", 
  "Firebase SDK", "Android Studio", "Gradle", "ML Kit", "CameraX",
  "Laravel", "Express.js", "PHP", "JavaScript", "MySQL", "PostgreSQL",
  "React", "TypeScript", "CSS", "Tailwind CSS", "Figma", "UI Design", 
  "UX Research", "Prototyping", "Git & GitHub", "RESTful APIs", 
  "WebSocket", "Firebase", "IoT (ESP32)", "Basic Cybersecurity"
];

const SkillPill = ({ skill, containerRef }) => {
  const pillRef = useRef(null);
  
  // Random initial position within a reasonable range
  const [initialPos] = useState({
    x: Math.random() * 80 - 40, // -40% to 40%
    y: Math.random() * 80 - 40, // -40% to 40%
  });

  // Random floating duration and offset
  const [floatConfig] = useState({
    duration: 3 + Math.random() * 4,
    xOffset: 10 + Math.random() * 20,
    yOffset: 10 + Math.random() * 20,
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const translateX = useSpring(mouseX, springConfig);
  const translateY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current || !pillRef.current) return;

      const pillRect = pillRef.current.getBoundingClientRect();
      
      const centerX = pillRect.left + pillRect.width / 2;
      const centerY = pillRect.top + pillRect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      const maxDistance = 200;
      if (distance < maxDistance) {
        const power = (maxDistance - distance) / maxDistance;
        mouseX.set(-distanceX * power * 0.5);
        mouseY.set(-distanceY * power * 0.5);
      } else {
        mouseX.set(0);
        mouseY.set(0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [containerRef, mouseX, mouseY]);

  return (
    <motion.div
      ref={pillRef}
      style={{
        x: translateX,
        y: translateY,
        left: `${50 + initialPos.x}%`,
        top: `${50 + initialPos.y}%`,
      }}
      className="absolute"
    >
      <motion.div
        animate={{
          x: [0, floatConfig.xOffset, 0, -floatConfig.xOffset, 0],
          y: [0, -floatConfig.yOffset, 0, floatConfig.yOffset, 0],
        }}
        transition={{
          duration: floatConfig.duration,
          repeat: Infinity,
          ease: "linear"
        }}
        className="px-6 py-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-colors cursor-default"
      >
        <span className="text-white font-bold text-sm md:text-base whitespace-nowrap">
          {skill}
        </span>
      </motion.div>
    </motion.div>
  );
};

const SkillsCloud = () => {
  const containerRef = useRef(null);

  return (
    <section className="bg-black py-32 px-[8vw] overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-white/30 text-xs uppercase tracking-[0.5em] mb-16">
          (TECH STACK)
        </h2>
        
        <div 
          ref={containerRef} 
          className="relative h-[60vh] md:h-[80vh] w-full border border-white/5 rounded-3xl overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent"
        >
          {skills.map((skill, index) => (
            <SkillPill key={index} skill={skill} containerRef={containerRef} />
          ))}
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-white/5 text-[15vw] font-black uppercase select-none">
              Skills
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsCloud;
