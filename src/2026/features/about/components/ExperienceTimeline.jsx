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
    
    items.forEach((item) => {
      const year = item.querySelector('.year-text');
      const details = item.querySelectorAll('.reveal-text');
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        }
      });

      tl.from(year, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
      })
      .from(details, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      }, '-=0.5');
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-black py-32 px-[8vw]">
      <div className="max-w-[1400px]">
        <h2 className="text-white/30 text-xs uppercase tracking-[0.5em] mb-24">
          (THE JOURNEY)
        </h2>

        <div className="space-y-32 md:space-y-64">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-item group">
              <div className="overflow-hidden">
                <span className="year-text block text-[clamp(4rem,15vw,12rem)] font-black leading-none tracking-tighter text-white lowercase">
                  {exp.year}
                </span>
              </div>
              
              <div className="mt-8 md:mt-12 ml-2 md:ml-4 space-y-2">
                <div className="overflow-hidden">
                  <h3 className="reveal-text text-[clamp(1.5rem,4vw,3.5rem)] font-bold leading-tight text-white">
                    {exp.role}
                  </h3>
                </div>
                <div className="overflow-hidden">
                  <p className="reveal-text text-[clamp(1rem,2vw,1.5rem)] font-medium text-white/60">
                    {exp.company} <span className="mx-2 text-white/20">//</span> {exp.period}
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
