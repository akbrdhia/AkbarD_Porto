import React from "react";
import { PERSONAL_INFO } from "../../../constants/portfolioData";

const AboutSection = () => {
  const stats = [
    { num: "3+", label: "YEARS CODING" },
    { num: "10+", label: "PROJECTS BUILT" },
    { num: "∞", label: "COFFEE CONSUMED" },
    { num: "24/7", label: "LEARNING MODE" },
  ];

  return (
    <section 
      id="about-section"
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        position: "relative",
      }}
    >
      <div style={{
        background: "#0a0a0a",
        padding: "clamp(60px, 10vw, 120px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        borderRight: "1px solid #1a1a1a",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Big number */}
        <div className="reveal-scale" style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          fontSize: "clamp(150px, 25vw, 300px)",
          fontWeight: "900",
          color: "#151515",
          lineHeight: "0.8",
          pointerEvents: "none",
        }}>
          01
        </div>
        
        <div className="reveal-left delay-1" style={{
          fontSize: "11px",
          color: "#8BC34A",
          letterSpacing: "4px",
          marginBottom: "20px",
          fontFamily: "'Space Mono', monospace",
          position: "relative",
          zIndex: 2,
        }}>
          // ABOUT ME
        </div>
        <h2 className="reveal-left delay-2" style={{
          fontSize: "clamp(28px, 5vw, 60px)",
          fontWeight: "900",
          lineHeight: "1.05",
          marginBottom: "30px",
          position: "relative",
          zIndex: 2,
        }}>
          CRAFTING
          <br />
          <span style={{ color: "#7CB663" }}>DIGITAL</span>
          <br />
          EXPERIENCES
        </h2>
      </div>

      <div style={{
        background: "#050505",
        padding: "clamp(60px, 10vw, 120px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}>
        <p className="reveal delay-2" style={{
          fontSize: "clamp(16px, 1.5vw, 20px)",
          lineHeight: "1.9",
          color: "#777",
          marginBottom: "50px",
        }}>
          {PERSONAL_INFO.bio}
        </p>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
        }}>
          {stats.map((stat, idx) => (
            <div key={idx} className={`reveal delay-${idx + 3}`}>
              <div style={{ 
                fontSize: "clamp(36px, 5vw, 56px)", 
                fontWeight: "900", 
                color: "#7CB663",
                lineHeight: "1",
                marginBottom: "8px",
              }}>
                {stat.num}
              </div>
              <div style={{ 
                fontSize: "11px", 
                color: "#444", 
                letterSpacing: "2px",
                fontFamily: "'Space Mono', monospace",
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
