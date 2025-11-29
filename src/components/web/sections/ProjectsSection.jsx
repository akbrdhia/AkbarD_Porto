import React from "react";
import { ArrowUpRight } from "lucide-react";

const ProjectsSection = ({ hoveredProject, setHoveredProject }) => {
  const projects = [
    { name: "KosKu", description: "Modern boarding house management with real-time booking & payments", tech: ["Kotlin", "Laravel", "Room DB"], status: "DEV", year: "2024", color: "#8BC34A" },
    { name: "Manager Usaha V2", description: "AI-powered business analytics & inventory management", tech: ["Kotlin", "Laravel", "ML Kit"], status: "BETA", year: "2024", color: "#9CCC65" },
    { name: "Cogito", description: "Smart Debate companion with AI argumentation engine", tech: ["Express", "PostgreSQL", "Kotlin", "Qwen"], status: "LIVE", year: "2024", color: "#AED581" },
    { name: "Festivaloka", description: "Immersive festival & event discovery experience", tech: ["Roblox Studio", "LUA"], status: "LIVE", year: "2023", color: "#C5E1A5" },
  ];

  return (
    <section 
      id="projects-section"
      style={{
        padding: "120px 0",
        borderTop: "1px solid #1a1a1a",
        background: "#0a0a0a",
      }}
    >
      <div className="reveal-left delay-1" style={{ padding: "0 8vw", marginBottom: "80px" }}>
        <div className="reveal-left delay-2" style={{
          fontSize: "11px",
          color: "#8BC34A",
          letterSpacing: "4px",
          marginBottom: "20px",
          fontFamily: "'Space Mono', monospace",
        }}>
          // SELECTED WORK
        </div>
        <h2 className="reveal-left delay-3" style={{
          fontSize: "clamp(32px, 7vw, 90px)",
          fontWeight: "900",
          color: "#f0f0f0",
        }}>
          PROJECTS<span style={{ color: "#8BC34A" }}>_</span>
        </h2>
      </div>

      {projects.map((project, idx) => (
        <div
          key={idx}
          className={`reveal-right delay-${Math.min(idx + 2, 8)}`}
          onMouseEnter={() => setHoveredProject(idx)}
          onMouseLeave={() => setHoveredProject(null)}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "center",
            padding: "70px 8vw",
            borderBottom: "1px solid #111",
            cursor: "pointer",
            transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
            background: hoveredProject === idx ? "#050505" : "transparent",
            transform: hoveredProject === idx ? "skewX(-1deg)" : "skewX(0)",
          }}
        >
          <div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginBottom: "20px",
            }}>
              <span style={{
                fontSize: "12px",
                color: "#333",
                fontFamily: "'Space Mono', monospace",
              }}>
                [{project.year}]
              </span>
              <span style={{
                padding: "6px 16px",
                background: project.status === "LIVE" ? project.color : "#111",
                color: project.status === "LIVE" ? "#000" : "#555",
                fontSize: "10px",
                fontWeight: "800",
                letterSpacing: "2px",
              }}>
                {project.status}
              </span>
            </div>
            
            <h3 style={{
              fontSize: "clamp(36px, 7vw, 80px)",
              fontWeight: "900",
              marginBottom: "20px",
              transition: "all 0.3s",
              color: hoveredProject === idx ? project.color : "#fff",
              letterSpacing: "-0.02em",
            }}>
              {project.name}
            </h3>
            
            <p style={{ 
              color: "#555", 
              marginBottom: "20px",
              fontSize: "16px",
              maxWidth: "600px",
              lineHeight: "1.6",
            }}>
              {project.description}
            </p>
            
            <div style={{ 
              display: "flex", 
              gap: "20px", 
              flexWrap: "wrap",
              fontFamily: "'Space Mono', monospace",
            }}>
              {project.tech.map((t, i) => (
                <span key={i} style={{
                  fontSize: "12px",
                  color: "#444",
                  transition: "color 0.2s",
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
          
          <div style={{
            width: "100px",
            height: "100px",
            border: `2px solid ${hoveredProject === idx ? project.color : "#222"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
            transform: hoveredProject === idx ? "rotate(45deg) scale(1.1)" : "rotate(0) scale(1)",
          }}>
            <ArrowUpRight 
              size={36} 
              color={hoveredProject === idx ? project.color : "#333"}
              style={{
                transition: "all 0.3s",
                transform: hoveredProject === idx ? "rotate(-45deg)" : "rotate(0)",
              }}
            />
          </div>
        </div>
      ))}
    </section>
  );
};

export default ProjectsSection;
