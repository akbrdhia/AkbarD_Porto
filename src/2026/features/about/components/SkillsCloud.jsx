import React, { useRef, useState, useEffect } from 'react';
import { motion as Motion, useSpring, useMotionValue } from 'framer-motion';

const skills = [
  "Kotlin", "Flutter", "Jetpack Compose", "Android Jetpack", "Retrofit", 
  "Firebase SDK", "Android Studio", "Gradle", "ML Kit", "CameraX",
  "Laravel", "Express.js", "PHP", "JavaScript", "MySQL", "PostgreSQL",
  "React", "TypeScript", "CSS", "Tailwind CSS", "Figma", "UI Design", 
  "UX Research", "Prototyping", "Git & GitHub", "RESTful APIs", 
  "WebSocket", "Firebase", "IoT (ESP32)", "Basic Cybersecurity"
];

const SkillPill = ({ skill, initialPos, floatConfig, mouseX: globalMouseX, mouseY: globalMouseY }) => {
  const pillRef = useRef(null);
  const [rect, setRect] = useState(null);

  const localMouseX = useMotionValue(0);
  const localMouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const translateX = useSpring(localMouseX, springConfig);
  const translateY = useSpring(localMouseY, springConfig);

  useEffect(() => {
    const updateRect = () => {
      if (pillRef.current) {
        setRect(pillRef.current.getBoundingClientRect());
      }
    };

    updateRect();
    window.addEventListener('resize', updateRect);
    return () => window.removeEventListener('resize', updateRect);
  }, []);

  useEffect(() => {
    if (!rect) return;

    const unsubscribeX = globalMouseX.on("change", (latestX) => {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const latestY = globalMouseY.get();
      
      const distanceX = latestX - centerX;
      const distanceY = latestY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      const maxDistance = 200;
      if (distance < maxDistance) {
        const power = (maxDistance - distance) / maxDistance;
        localMouseX.set(-distanceX * power * 0.5);
        localMouseY.set(-distanceY * power * 0.5);
      } else {
        localMouseX.set(0);
        localMouseY.set(0);
      }
    });

    return () => unsubscribeX();
  }, [rect, globalMouseX, globalMouseY, localMouseX, localMouseY]);

  return (
    <Motion.div
      ref={pillRef}
      style={{
        x: translateX,
        y: translateY,
        left: `${50 + initialPos.x}%`,
        top: `${50 + initialPos.y}%`,
      }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
    >
      <Motion.div
        animate={{
          x: [0, floatConfig.xOffset, 0, -floatConfig.xOffset, 0],
          y: [0, -floatConfig.yOffset, 0, floatConfig.yOffset, 0],
        }}
        transition={{
          duration: floatConfig.duration,
          repeat: Infinity,
          ease: "linear"
        }}
        className="px-4 py-2 md:px-6 md:py-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-colors cursor-default"
      >
        <span className="text-white font-bold text-xs md:text-base whitespace-nowrap">
          {skill}
        </span>
      </Motion.div>
    </Motion.div>
  );
};

const SkillsCloud = () => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Pre-calculate configs to avoid re-renders and keep positions stable
  const [pillConfigs] = useState(() => skills.map(() => ({
    initialPos: {
      x: Math.random() * 90 - 45, // Wider spread
      y: Math.random() * 90 - 45,
    },
    floatConfig: {
      duration: 3 + Math.random() * 4,
      xOffset: 10 + Math.random() * 20,
      yOffset: 10 + Math.random() * 20,
    }
  })));

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="bg-black py-24 md:py-32 px-[6vw] md:px-[8vw] overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-white/30 text-xs uppercase tracking-[0.5em] mb-12 md:mb-16">
          (TECH STACK)
        </h2>
        
        <div 
          ref={containerRef} 
          className="relative h-[70vh] md:h-[80vh] w-full border border-white/5 rounded-3xl overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent"
        >
          {skills.map((skill, index) => (
            <SkillPill 
              key={index} 
              skill={skill} 
              initialPos={pillConfigs[index].initialPos}
              floatConfig={pillConfigs[index].floatConfig}
              mouseX={mouseX}
              mouseY={mouseY}
            />
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
