import React from 'react';
import { motion } from 'framer-motion';
import { Code, Terminal, Smartphone, Database, Zap, Monitor } from 'lucide-react';

const AboutSection = () => {
  const skills = [
    { icon: <Smartphone size={32} />, label: "android" },
    { icon: <Code size={32} />, label: "react" },
    { icon: <Database size={32} />, label: "backend" },
    { icon: <Terminal size={32} />, label: "system" },
    { icon: <Zap size={32} />, label: "motion" },
    { icon: <Monitor size={32} />, label: "web" },
  ];

  return (
    <section className="bg-black text-white px-6 md:px-[3vw] py-16 min-h-[80vh] flex flex-col justify-center font-['Mona_Sans','Sora','Nunito',sans-serif]">
      <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-12 md:gap-16 items-center">
        {/* Bio Column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="order-2 md:order-1"
        >
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-black leading-[0.95] tracking-[-0.02em] mb-8 lowercase">
            engineer + designer.
          </h2>

          <p className="text-[clamp(1.2rem,2vw,1.8rem)] font-semibold leading-snug mb-12">
            I design tactile android flows, sync backend conversations, and ship web touchpoints with uncompromising precision. Industrial builds, without the noise.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                whileHover={{ scale: 1.05, color: '#F5C842' }}
                className="flex flex-col items-start gap-2 cursor-pointer transition-colors"
              >
                {skill.icon}
                <span className="text-sm font-bold tracking-widest lowercase">
                  {skill.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Headshot / Visual Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-[4/5] bg-[#111] overflow-hidden order-1 md:order-2"
        >
          {/* Placeholder Image */}
          <motion.img
            src="https://via.placeholder.com/600x800/222222/FFFFFF?text=PORTRAIT"
            alt="Professional Headshot"
            className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 hover:scale-105"
          />

          {/* Abstract geometric overlay or accent to match maximalist style */}
          <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-[#F5C842] mix-blend-difference rounded-full blur-[40px] opacity-50" />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;