import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { PERSONAL_INFO } from '../../../../2025/constants/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const Manifesto = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    const words = textRef.current.querySelectorAll('.word');
    
    gsap.from(words, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: true,
      },
      opacity: 0.1,
      stagger: 0.1,
      ease: 'none',
    });
  }, { scope: containerRef });

  const bioWords = PERSONAL_INFO.bio.split(' ');

  return (
    <section ref={containerRef} className="bg-black py-32 md:py-64 px-[8vw]">
      <div className="max-w-[1400px]">
        <h2 className="text-white/30 text-xs uppercase tracking-[0.5em] mb-16 md:mb-24">
          (THE STORY)
        </h2>
        
        <div ref={textRef} className="flex flex-wrap gap-x-[0.3em] gap-y-[0.1em]">
          {bioWords.map((word, i) => (
            <span 
              key={i} 
              className="word text-[clamp(2rem,5vw,5rem)] font-medium leading-[1.1] tracking-tight text-white"
            >
              {word}
            </span>
          ))}
        </div>

        <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
          <div className="space-y-8">
            <p className="text-white/60 text-xl leading-relaxed">
              I architect stacks that scale across platforms without losing coherence. 
              Iteration speed and human signal are my core dependencies.
            </p>
          </div>
          <div className="space-y-8">
            <p className="text-white/60 text-xl leading-relaxed">
              Most sessions start with headphones on—music is the metronome that keeps
              me iterating fast. I care about launching things that feel intentional.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;