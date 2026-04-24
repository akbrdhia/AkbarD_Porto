import React, { useRef, Suspense } from 'react';
import { motion as Motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import LiquidHero from './LiquidHero';

gsap.registerPlugin(ScrollTrigger);

const AboutHero = () => {
  const containerRef = useRef(null);
  const photoRef = useRef(null);
  const textRef = useRef(null);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  const skew = useTransform(smoothVelocity, [-2000, 2000], [-5, 5]);
  const blur = useTransform(smoothVelocity, [-2000, 0, 2000], [2, 0, 2]);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=200%',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    // Cinematic reveal
    tl.fromTo(photoRef.current, 
      { scale: 1.5, opacity: 0, y: 100 },
      { scale: 1, opacity: 1, y: 0, duration: 1.5, ease: 'expo.out' }
    )
    .fromTo('.hero-line', 
      { y: 150, opacity: 0, skewY: 10 },
      { y: 0, opacity: 1, skewY: 0, stagger: 0.1, duration: 1.2, ease: 'power4.out' },
      '-=1'
    )
    // Morphing transition to next section
    .to(photoRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'center top',
        end: 'bottom top',
        scrub: true,
      },
      y: 200,
      scale: 0.8,
      filter: 'blur(20px)',
      opacity: 0,
    });


  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-black overflow-hidden select-none">
      {/* Photo Layer (WebGL) */}
      <div 
        ref={photoRef}
        className="absolute bottom-0 right-0 w-full md:w-1/2 h-[60vh] md:h-[85vh] z-10"
      >
        <Suspense fallback={<div className="w-full h-full bg-black" />}>
          <LiquidHero />
        </Suspense>
      </div>

      {/* Typography Layer */}
      <Motion.div 
        ref={textRef}
        style={{ skewX: skew, filter: useTransform(blur, (v) => `blur(${v}px)`) }}
        className="relative z-20 pt-[15vh] md:pt-[20vh] px-[6vw] md:pl-[8vw] pointer-events-none"
      >
        <div className="flex flex-col gap-0">
          {['HELLO', 'I AM', '— AKBAR.'].map((line, i) => (
            <h1 
              key={line}
              className={`hero-line line-${i} text-[clamp(2.5rem,15vw,16vw)] font-black leading-[0.85] md:leading-[0.8] tracking-tighter text-white`}
            >
              {line}
            </h1>
          ))}
        </div>
      </Motion.div>
    </section>
  );
};

export default AboutHero;
