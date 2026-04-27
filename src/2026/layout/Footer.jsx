import React, { useState, useEffect, useRef } from 'react';
import { motion as Motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CONFIG_2026 } from '../constants/config';

gsap.registerPlugin(ScrollTrigger);

const MagneticLetter = ({ char, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const translateX = useSpring(mouseX, springConfig);
  const translateY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    
    // Magnetic pull: move slightly towards mouse
    mouseX.set(x * 0.15);
    mouseY.set(y * 0.15);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <Motion.span
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        x: translateX, 
        y: translateY,
        display: 'inline-block',
        willChange: 'transform'
      }}
      className="footer-char cursor-default"
    >
      {char}
    </Motion.span>
  );
};

const Footer = () => {
  const [time, setTime] = useState('');
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      const cleanTime = timeString.replace(/ [A-Z]{3,4}$/, ''); 
      setTime(cleanTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    const chars = textRef.current.querySelectorAll('.footer-char');
    
    // Cinematic Staggered Entrance
    gsap.fromTo(chars, 
      { y: '100%', opacity: 0 },
      { 
        y: '0%', 
        opacity: 1, 
        duration: 1.5, 
        stagger: 0.05, 
        ease: 'expo.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Subtle Parallax on Scroll
    gsap.to(textRef.current, {
      y: 50,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: true
      }
    });
  }, { scope: containerRef });

  const nameChars = "AkbarD".split("");

  return (
    <footer 
      ref={containerRef}
      className="relative w-screen h-screen left-1/2 -translate-x-1/2 bg-black text-white select-none overflow-hidden"
    >
      
      {/* PARENT 1: THE BLACK CURTAIN */}
      <div className="relative z-20 bg-black px-[4vw] pr-[10vw] pt-24 pb-4 min-h-[68vh] flex flex-col justify-between">
        
        {/* Middle: Social Links */}
        <div className="flex justify-end mt-12">
          <div className="w-full max-w-2xl">
            <p className="text-[0.7rem] uppercase tracking-[0.3em] font-bold text-white/30 mb-8 text-right">(Social)</p>
            <div className="grid grid-cols-1 gap-y-2 md:gap-y-4 justify-items-end">
              {CONFIG_2026.social.map((link) => (
                <a 
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[clamp(2rem,4vw,3.5rem)] font-black leading-none tracking-tighter hover:text-white/50 transition-colors duration-300 uppercase"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: Metadata */}
        <div className="mt-auto">
          <div className="flex justify-between items-end text-[0.7rem] uppercase tracking-[0.2em] font-bold">
            <div className="flex gap-12 md:gap-24">
              <div>
                <p>{CONFIG_2026.location}</p>
              </div>
              <div>
                <p>{time}<br />{CONFIG_2026.timezone}</p>
              </div>
            </div>
            <div className="text-right">
              <p>© 2026,</p>
              <p>All Rights Reserved</p>
            </div>
          </div>
        </div>
      </div>

      {/* PARENT 2: THE PEEKING TEXT (AkbarD) with Animations */}
      <div className="relative z-10 w-screen h-[32vh] overflow-hidden bg-black left-1/2 -translate-x-1/2">
        <h1 
          ref={textRef}
          className="absolute bottom-0 left-0 w-full text-left text-[30vw] font-black tracking-[-0.1em] text-white leading-[0.7] whitespace-nowrap ml-[-1.5vw] mb-8 flex justify-start"
        >
          {nameChars.map((char, i) => (
            <MagneticLetter key={i} char={char} index={i} />
          ))}
        </h1>
      </div>

    </footer>
  );
};

export default Footer;
