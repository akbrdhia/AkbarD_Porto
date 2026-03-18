import React from "react";

const glowOrbs = [
  { left: "20%", top: "25%", size: 260, color: "rgba(124,182,99,0.32)", delay: "0s" },
  { left: "65%", top: "15%", size: 200, color: "rgba(255,0,77,0.25)", delay: "2s" },
  { left: "40%", top: "60%", size: 280, color: "rgba(124,182,99,0.2)", delay: "4s" },
];

const HeroBackground = ({ scrollY, heroReady }) => {
  return (
    <>
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-85"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 30%, rgba(124,182,99,0.2), transparent 45%), radial-gradient(circle at 80% 20%, rgba(255,0,77,0.1), transparent 40%)",
          transform: `translateY(${scrollY * 0.05}px)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
          transform: `translateY(${scrollY * -0.03}px)`,
        }}
      />
      <div
        className="absolute pointer-events-none blur-[60px] opacity-60 w-[320px] h-[320px] top-[30%] left-[35%]"
        style={{
          background:
            "radial-gradient(circle, rgba(124,182,99,0.3), rgba(124,182,99,0))",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(120deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 60%)",
        }}
      />
      <div
        className="absolute inset-[10%] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(0,0,0,0.6), transparent 60%)",
        }}
      />
      <div
        className="absolute -inset-y-[15%] -inset-x-[10%] pointer-events-none z-10 transition-all duration-[1400ms] ease-[cubic-bezier(0.77,0,0.18,1)]"
        style={{
          background: "linear-gradient(125deg, rgba(124,182,99,0.45), rgba(255,0,77,0.15), transparent 75%)",
          transform: heroReady ? "translateX(140%) skewX(-10deg)" : "translateX(0) skewX(-10deg)",
          opacity: heroReady ? 0 : 0.85,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-10 mix-blend-screen transition-opacity duration-1000 ease-in-out"
        style={{
          background: "linear-gradient(120deg, rgba(255,255,255,0.08), transparent 70%)",
          animation: "heroScan 7s linear infinite",
          opacity: heroReady ? 0.25 : 0.45,
        }}
      />
      {glowOrbs.map((orb, idx) => (
        <div
          key={idx}
          className="absolute pointer-events-none blur-[50px] opacity-50 z-0"
          style={{
            left: orb.left,
            top: orb.top,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            animation: `heroGlowDrift 9s ease-in-out infinite`,
            animationDelay: orb.delay,
          }}
        />
      ))}
    </>
  );
};

export default HeroBackground;
