import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    year: "2024",
    role: "Software Engineering Intern",
    company: "Kementrian Koperasi",
    period: "Oct 2024 - Feb 2025",
  },
  {
    year: "2024",
    role: "Android Developer",
    company: "Garuda Hacks 6.0",
    period: "June 2024",
  },
  {
    year: "2022",
    role: "Student",
    company: "SMKN 1 Cibinong",
    period: "Jun 2022 - Present",
  }
];

const ExperienceTimeline = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const items = containerRef.current.querySelectorAll('.experience-item');
    
    items.forEach((item, i) => {
      const content = item.querySelector('.experience-content');
      const year = item.querySelector('.year-text');
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 90%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        }
      });

      tl.from(year, {
        x: i % 2 === 0 ? -100 : 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out'
      })
      .from(content, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      }, '-=0.8');
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-black py-32 md:py-64 px-[6vw] overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        <h2 className="text-white text-[0.6rem] font-black uppercase tracking-[0.8em] mb-32">
          THE JOURNEY
        </h2>

        <div className="space-y-32 md:space-y-0 relative">
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              className={`experience-item flex flex-col ${index % 2 === 0 ? 'md:items-start' : 'md:items-end'} relative md:mb-[-5vh]`}
            >
              {/* Massive Year Background - Rule 19: Size over Opacity */}
              <div className="year-text select-none pointer-events-none">
                <span className="text-[clamp(6rem,25vw,20rem)] font-black leading-[0.7] tracking-[calc(-0.05em)] text-white block">
                  {exp.year}
                </span>
              </div>
              
              {/* Content Box - Asymmetric & Overlapping */}
              <div className={`experience-content relative z-20 mt-[-2vh] md:mt-[-8vh] ${index % 2 === 0 ? 'md:ml-[15vw]' : 'md:mr-[15vw]'} max-w-2xl`}>
                <h3 className="text-[clamp(2rem,5vw,4.5rem)] font-black leading-[0.9] text-white mb-6 uppercase italic">
                  {exp.role}
                </h3>
                <div className="space-y-2">
                  <p className="text-white text-xl md:text-3xl font-bold tracking-tight">
                    {exp.company}
                  </p>
                  <p className="text-white text-sm md:text-lg font-medium tracking-widest uppercase">
                    {exp.period}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;
