import React from "react";
import { ArrowUpRight, Github, Play } from "lucide-react";
import { PERSONAL_INFO } from "../../../constants/portfolioData";

const HeroSection = ({ scrollY, glitchActive }) => {
  return (
    <section 
      id="hero-section"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0px 8vw 80px",
        position: "relative",
        overflow: "hidden",
        background: "#0a0a0a",
      }}
    >
      {/* Giant background text */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) translateY(${scrollY * 0.5}px)`,
        fontSize: "clamp(200px, 50vw, 600px)",
        fontWeight: "900",
        color: "#111",
        whiteSpace: "nowrap",
        pointerEvents: "none",
        letterSpacing: "-0.05em",
        zIndex: 0,
        userSelect: "none",
      }}>
        DEV
      </div>

      {/* Animated horizontal lines */}
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: `${10 + i * 12}%`,
          height: "1px",
          background: `linear-gradient(90deg, transparent, rgba(139, 195, 74, ${0.08 + i * 0.015}) 50%, transparent)`,
          transform: `translateX(${Math.sin(scrollY * 0.005 + i) * 100}px)`,
          transition: "transform 0.3s ease-out",
        }} />
      ))}

      {/* Status badge */}
      <div className="reveal-left delay-1" style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "30px",
        position: "relative",
        zIndex: 2,
      }}>
        <div style={{
          width: "10px",
          height: "10px",
          background: "#8BC34A",
          animation: "pulse 1.5s ease-in-out infinite",
          boxShadow: "0 0 20px #8BC34A",
        }} />
        <span style={{
          fontSize: "11px",
          color: "#8BC34A",
          letterSpacing: "4px",
          fontFamily: "'Space Mono', monospace",
          textTransform: "uppercase",
        }}>
          Available for freelance & collaboration
        </span>
      </div>

      {/* Main name - BRUTAL with glitch */}
      <h1 className="reveal delay-2" style={{
        fontSize: "clamp(50px, 14vw, 180px)",
        fontWeight: "900",
        lineHeight: "0.9",
        marginBottom: "20px",
        position: "relative",
        zIndex: 2,
        letterSpacing: "-0.04em",
      }}>
        <span style={{ 
          display: "block",
          transform: glitchActive ? `translate(${Math.random() * 8 - 4}px, ${Math.random() * 4}px)` : "none",
          textShadow: glitchActive ? "3px 0 #ff0040, -3px 0 #00ffff" : "none",
          transition: glitchActive ? "none" : "all 0.1s",
        }}>
          {PERSONAL_INFO.name?.split(" ")[0]?.toUpperCase() || "AKBAR"}
        </span>
        <span style={{ 
          display: "block",
          color: "transparent",
          WebkitTextStroke: "2px #8BC34A",
          transform: `translateX(${scrollY * 0.15}px)`,
          transition: "transform 0.3s ease-out",
        }}>
          {PERSONAL_INFO.name?.split(" ")[1]?.toUpperCase() || "DEVELOPER"}
        </span>
      </h1>

      {/* Role with terminal style */}
      <div className="reveal-left delay-3" style={{
        fontSize: "clamp(14px, 2vw, 22px)",
        color: "#888",
        marginBottom: "50px",
        position: "relative",
        zIndex: 2,
        fontFamily: "'Space Mono', monospace",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}>
        <span style={{ color: "#8BC34A" }}>~/akbard $</span> 
        <span>{PERSONAL_INFO.role}</span>
        <span style={{ 
          animation: "blink 1s step-end infinite",
          background: "#8BC34A",
          width: "10px",
          height: "20px",
          display: "inline-block",
        }} />
      </div>

      {/* CTA Buttons */}
      <div className="reveal delay-4" style={{ 
        display: "flex", 
        gap: "20px", 
        flexWrap: "wrap",
        position: "relative",
        zIndex: 2,
      }}>
        <a 
          href={`mailto:${PERSONAL_INFO.email}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            padding: "20px 40px",
            background: "#8BC34A",
            color: "#000",
            textDecoration: "none",
            fontSize: "13px",
            fontWeight: "800",
            letterSpacing: "2px",
            transition: "all 0.2s ease",
            fontFamily: "'Space Mono', monospace",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "skewX(-5deg) scale(1.02)";
            e.currentTarget.style.boxShadow = "0 0 40px rgba(139, 195, 74, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "skewX(0) scale(1)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <Play size={16} fill="#000" />
          LET'S TALK
          <ArrowUpRight size={18} strokeWidth={3} />
        </a>
        
        <a 
          href="https://github.com/akbrdhia"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            padding: "20px 40px",
            background: "transparent",
            color: "#fff",
            textDecoration: "none",
            fontSize: "13px",
            fontWeight: "800",
            letterSpacing: "2px",
            border: "2px solid #222",
            transition: "all 0.2s ease",
            fontFamily: "'Space Mono', monospace",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#8BC34A";
            e.currentTarget.style.color = "#8BC34A";
            e.currentTarget.style.transform = "skewX(-5deg)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#333";
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.transform = "skewX(0)";
          }}
        >
          <Github size={18} strokeWidth={2} />
          VIEW GITHUB
        </a>
      </div>

      {/* Scroll line */}
      <div style={{
        position: "absolute",
        bottom: "60px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}>
        <span style={{ 
          fontSize: "9px", 
          letterSpacing: "3px", 
          color: "#555",
          fontFamily: "'Space Mono', monospace",
        }}>
          SCROLL
        </span>
        <div style={{
          width: "1px",
          height: "60px",
          background: "linear-gradient(to bottom, #8BC34A, transparent)",
          animation: "scrollLine 2s ease-in-out infinite",
        }} />
      </div>
    </section>
  );
};

export default HeroSection;
