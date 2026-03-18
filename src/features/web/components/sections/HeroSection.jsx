import React, { useEffect, useState } from "react";
import HeroBackground from "./hero/HeroBackground";
import HeroContent from "./hero/HeroContent";
import HeroStats from "./hero/HeroStats";
import HeroWorkspace from "./hero/HeroWorkspace";
import HeroContact from "./hero/HeroContact";
import HeroControlSystem from "./hero/HeroControlSystem";

const HeroSection = ({ glitchActive }) => {
  const [scrollY, setScrollY] = useState(0);
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setHeroReady(true), 60);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero-section"
      className="min-h-screen flex flex-col justify-center px-[8vw] pt-[80px] pb-[90px] relative overflow-hidden bg-[#050505] border-b border-[#111]"
    >
      <HeroBackground scrollY={scrollY} heroReady={heroReady} />

      <div
        className="flex flex-col gap-6 relative z-10 transition-all duration-[1050ms] ease-[cubic-bezier(0.77,0,0.18,1)]"
        style={{
          transform: heroReady ? "none" : "translateY(80px) skewY(3deg) scale(0.98)",
          opacity: heroReady ? 1 : 0,
          filter: heroReady ? "blur(0)" : "blur(12px)",
        }}
      >
        <div className="reveal-left delay-1 inline-flex items-center gap-3.5 px-[18px] py-3 rounded-full border border-[#7CB663]/50 bg-[#050505]/85 shadow-[0_0_25px_rgba(124,182,99,0.25)] w-fit">
          <div className="w-2.5 h-2.5 rounded-full bg-[#baf36a] shadow-[0_0_16px_rgba(186,243,106,0.9)] animate-pulse" />
          <span className="text-[11px] tracking-[0.35em] text-[#d6ffd3] font-mono">
            LIVE BUILD / AVAILABLE
          </span>
        </div>

        <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] gap-10 items-stretch">
          <div className="flex flex-col gap-[30px]">
            <HeroContent glitchActive={glitchActive} scrollY={scrollY} />
            <HeroStats />
          </div>

          <div className="flex flex-col gap-6">
            <HeroWorkspace />
            <HeroContact />
          </div>
        </div>

        <HeroControlSystem />
      </div>
    </section>
  );
};

export default HeroSection;
