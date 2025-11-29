import React, { useState, useEffect, useRef } from "react";
import { 
  ArrowUpRight, 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Code2, 
  Smartphone,
  Palette,
  Server,
  ArrowDown,
  Zap
} from "lucide-react";
import { PERSONAL_INFO } from "../constants/portfolioData";
import { usePortfolio } from "../context/PortfolioContext";

const WebPortfolio = () => {
  const { setViewMode } = usePortfolio();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredProject, setHoveredProject] = useState(null);
  const containerRef = useRef(null);

  // Mouse tracking for effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Parse projects from FILE_CONTENTS
  const projects = [
    { name: "KosKu", description: "Modern boarding house management system", tech: ["Kotlin", "Laravel", "Room DB"], status: "In Development" },
    { name: "Manager Usaha V2", description: "Business management application", tech: ["Kotlin", "Laravel", "ML Kit"], status: "Beta" },
    { name: "Cogito", description: "Smart Debate companion", tech: ["Express", "PostgreSQL", "Kotlin", "Qwen"], status: "Production" },
    { name: "Festivaloka", description: "Festival and event discovery platform", tech: ["Roblox Studio", "LUA"], status: "Live" },
  ];

  const skills = {
    mobile: ["Kotlin", "Jetpack Compose", "Flutter", "Android SDK", "Firebase"],
    backend: ["Laravel", "Express.js", "PostgreSQL", "MySQL", "RESTful APIs"],
    frontend: ["React", "TypeScript", "Tailwind CSS", "JavaScript"],
    design: ["Figma", "UI/UX Design", "Prototyping"],
  };

  return (
    <div 
      ref={containerRef}
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "auto",
        background: "#0a0a0a",
        color: "#fff",
        fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
        cursor: "crosshair",
      }}
    >
      {/* Mouse follower */}
      <div style={{
        position: "fixed",
        left: mousePosition.x - 150,
        top: mousePosition.y - 150,
        width: "300px",
        height: "300px",
        background: "radial-gradient(circle, rgba(106, 135, 89, 0.15) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
        transition: "left 0.3s ease-out, top 0.3s ease-out",
      }} />

      {/* Floating nav */}
      <nav style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 100,
        display: "flex",
        gap: "8px",
      }}>
        <button
          onClick={() => {
            localStorage.setItem("portfolio_mode", "ide");
            setViewMode("ide");
          }}
          style={{
            padding: "12px 20px",
            background: "transparent",
            border: "1px solid #333",
            color: "#666",
            fontSize: "12px",
            fontWeight: "600",
            letterSpacing: "1px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            fontFamily: "monospace",
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = "#6A8759";
            e.target.style.color = "#6A8759";
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = "#333";
            e.target.style.color = "#666";
          }}
        >
          {"<IDE/>"}
        </button>
      </nav>

      {/* HERO SECTION */}
      <section style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 8vw",
        position: "relative",
      }}>
        {/* Grid overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(106, 135, 89, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(106, 135, 89, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
          pointerEvents: "none",
        }} />

        {/* Status badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "24px",
          padding: "8px 16px",
          border: "1px solid #222",
          width: "fit-content",
        }}>
          <div style={{
            width: "8px",
            height: "8px",
            background: "#6A8759",
            borderRadius: "50%",
            animation: "pulse 2s infinite",
          }} />
          <span style={{ fontSize: "12px", color: "#666", letterSpacing: "2px" }}>
            AVAILABLE FOR WORK
          </span>
        </div>

        {/* Main title */}
        <h1 style={{
          fontSize: "clamp(3rem, 12vw, 10rem)",
          fontWeight: "900",
          lineHeight: "0.9",
          marginBottom: "24px",
          letterSpacing: "-0.05em",
        }}>
          <span style={{ color: "#fff" }}>{PERSONAL_INFO.name.split(" ")[0]}</span>
          <br />
          <span style={{ 
            color: "transparent",
            WebkitTextStroke: "2px #6A8759",
            display: "block",
          }}>
            {PERSONAL_INFO.name.split(" ")[1] || "Developer"}
          </span>
        </h1>

        {/* Role */}
        <div style={{
          fontSize: "clamp(1rem, 2vw, 1.5rem)",
          color: "#666",
          marginBottom: "40px",
          maxWidth: "500px",
        }}>
          <span style={{ color: "#6A8759" }}>→</span> {PERSONAL_INFO.role}
        </div>

        {/* CTA buttons */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <a 
            href={`mailto:${PERSONAL_INFO.email}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              padding: "16px 32px",
              background: "#6A8759",
              color: "#000",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "700",
              letterSpacing: "1px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#8BC34A";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#6A8759";
              e.target.style.transform = "translateY(0)";
            }}
          >
            GET IN TOUCH
            <ArrowUpRight size={18} />
          </a>
          
          <a 
            href={`https://github.com/akbrdhia`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              padding: "16px 32px",
              background: "transparent",
              color: "#fff",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "700",
              letterSpacing: "1px",
              border: "1px solid #333",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "#6A8759";
              e.target.style.color = "#6A8759";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "#333";
              e.target.style.color = "#fff";
            }}
          >
            VIEW GITHUB
            <Github size={18} />
          </a>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          color: "#333",
          animation: "bounce 2s infinite",
        }}>
          <span style={{ fontSize: "10px", letterSpacing: "2px" }}>SCROLL</span>
          <ArrowDown size={16} />
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section style={{
        minHeight: "100vh",
        padding: "120px 8vw",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "60px",
        alignItems: "center",
        borderTop: "1px solid #1a1a1a",
      }}>
        <div>
          <div style={{
            fontSize: "12px",
            color: "#6A8759",
            letterSpacing: "4px",
            marginBottom: "24px",
          }}>
            001 — ABOUT
          </div>
          <h2 style={{
            fontSize: "clamp(2rem, 5vw, 4rem)",
            fontWeight: "800",
            lineHeight: "1.1",
            marginBottom: "32px",
          }}>
            Building digital
            <br />
            <span style={{ color: "#6A8759" }}>experiences</span>
            <br />
            that matter
          </h2>
        </div>
        <div>
          <p style={{
            fontSize: "18px",
            lineHeight: "1.8",
            color: "#888",
            marginBottom: "24px",
          }}>
            {PERSONAL_INFO.bio}
          </p>
          <div style={{
            display: "flex",
            gap: "24px",
            flexWrap: "wrap",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#666" }}>
              <MapPin size={16} />
              <span>{PERSONAL_INFO.location}</span>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section style={{
        padding: "120px 8vw",
        borderTop: "1px solid #1a1a1a",
      }}>
        <div style={{
          fontSize: "12px",
          color: "#6A8759",
          letterSpacing: "4px",
          marginBottom: "60px",
        }}>
          002 — SKILLS
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "40px",
        }}>
          {[
            { icon: Smartphone, title: "Mobile", items: skills.mobile },
            { icon: Server, title: "Backend", items: skills.backend },
            { icon: Code2, title: "Frontend", items: skills.frontend },
            { icon: Palette, title: "Design", items: skills.design },
          ].map((category, idx) => (
            <div key={idx} style={{
              padding: "32px",
              border: "1px solid #1a1a1a",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#6A8759";
              e.currentTarget.style.background = "#0f0f0f";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#1a1a1a";
              e.currentTarget.style.background = "transparent";
            }}
            >
              <category.icon size={32} color="#6A8759" style={{ marginBottom: "16px" }} />
              <h3 style={{
                fontSize: "20px",
                fontWeight: "700",
                marginBottom: "16px",
              }}>
                {category.title}
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {category.items.map((skill, i) => (
                  <span key={i} style={{
                    padding: "6px 12px",
                    background: "#1a1a1a",
                    fontSize: "12px",
                    color: "#888",
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section style={{
        padding: "120px 8vw",
        borderTop: "1px solid #1a1a1a",
      }}>
        <div style={{
          fontSize: "12px",
          color: "#6A8759",
          letterSpacing: "4px",
          marginBottom: "60px",
        }}>
          003 — PROJECTS
        </div>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}>
          {projects.map((project, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredProject(idx)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                alignItems: "center",
                padding: "40px 0",
                borderBottom: "1px solid #1a1a1a",
                cursor: "pointer",
                transition: "all 0.3s ease",
                background: hoveredProject === idx ? "#0f0f0f" : "transparent",
              }}
            >
              <div>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "8px",
                }}>
                  <h3 style={{
                    fontSize: "clamp(1.5rem, 4vw, 3rem)",
                    fontWeight: "800",
                    transition: "color 0.3s ease",
                    color: hoveredProject === idx ? "#6A8759" : "#fff",
                  }}>
                    {project.name}
                  </h3>
                  <span style={{
                    padding: "4px 12px",
                    background: project.status === "Live" || project.status === "Production" 
                      ? "rgba(106, 135, 89, 0.2)" 
                      : "#1a1a1a",
                    color: project.status === "Live" || project.status === "Production" 
                      ? "#6A8759" 
                      : "#666",
                    fontSize: "10px",
                    letterSpacing: "1px",
                  }}>
                    {project.status.toUpperCase()}
                  </span>
                </div>
                <p style={{ color: "#666", marginBottom: "12px" }}>
                  {project.description}
                </p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {project.tech.map((t, i) => (
                    <span key={i} style={{
                      fontSize: "11px",
                      color: "#444",
                    }}>
                      {t}{i < project.tech.length - 1 ? " /" : ""}
                    </span>
                  ))}
                </div>
              </div>
              <ArrowUpRight 
                size={32} 
                color={hoveredProject === idx ? "#6A8759" : "#333"}
                style={{
                  transition: "all 0.3s ease",
                  transform: hoveredProject === idx ? "translate(4px, -4px)" : "translate(0, 0)",
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section style={{
        padding: "120px 8vw",
        borderTop: "1px solid #1a1a1a",
      }}>
        <div style={{
          fontSize: "12px",
          color: "#6A8759",
          letterSpacing: "4px",
          marginBottom: "60px",
        }}>
          004 — EXPERIENCE
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "40px",
        }}>
          <div style={{
            padding: "40px",
            border: "1px solid #1a1a1a",
          }}>
            <div style={{
              fontSize: "11px",
              color: "#6A8759",
              letterSpacing: "2px",
              marginBottom: "16px",
            }}>
              OCT 2024 — FEB 2025
            </div>
            <h3 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px" }}>
              Frontend Developer
            </h3>
            <div style={{ color: "#666", marginBottom: "16px" }}>
              Kementrian Koperasi
            </div>
            <ul style={{ color: "#888", lineHeight: "1.8", paddingLeft: "20px" }}>
              <li>Developed queue management system</li>
              <li>Created responsive web applications</li>
              <li>Improved user experience by 40%</li>
            </ul>
          </div>

          <div style={{
            padding: "40px",
            border: "1px solid #1a1a1a",
          }}>
            <div style={{
              fontSize: "11px",
              color: "#6A8759",
              letterSpacing: "2px",
              marginBottom: "16px",
            }}>
              EDUCATION
            </div>
            <h3 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px" }}>
              SMK Negeri 1 Cibinong
            </h3>
            <div style={{ color: "#666", marginBottom: "16px" }}>
              Software Engineering
            </div>
            <p style={{ color: "#888" }}>
              June 2022 — Present (Graduating Soon)
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section style={{
        minHeight: "80vh",
        padding: "120px 8vw",
        borderTop: "1px solid #1a1a1a",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}>
        <div style={{
          fontSize: "12px",
          color: "#6A8759",
          letterSpacing: "4px",
          marginBottom: "40px",
        }}>
          005 — CONTACT
        </div>

        <h2 style={{
          fontSize: "clamp(2rem, 8vw, 6rem)",
          fontWeight: "900",
          lineHeight: "1",
          marginBottom: "60px",
        }}>
          Let's work
          <br />
          <span style={{ color: "#6A8759" }}>together</span>
        </h2>

        <div style={{
          display: "flex",
          gap: "24px",
          flexWrap: "wrap",
          marginBottom: "80px",
        }}>
          <a 
            href={`mailto:${PERSONAL_INFO.email}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "#888",
              textDecoration: "none",
              fontSize: "18px",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => e.target.style.color = "#6A8759"}
            onMouseLeave={(e) => e.target.style.color = "#888"}
          >
            <Mail size={20} />
            {PERSONAL_INFO.email}
          </a>
          <a 
            href="https://github.com/akbrdhia"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "#888",
              textDecoration: "none",
              fontSize: "18px",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => e.target.style.color = "#6A8759"}
            onMouseLeave={(e) => e.target.style.color = "#888"}
          >
            <Github size={20} />
            GitHub
          </a>
          <a 
            href={`https://linkedin.com/in/${PERSONAL_INFO.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "#888",
              textDecoration: "none",
              fontSize: "18px",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => e.target.style.color = "#6A8759"}
            onMouseLeave={(e) => e.target.style.color = "#888"}
          >
            <Linkedin size={20} />
            LinkedIn
          </a>
        </div>

        {/* Footer */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "40px",
          borderTop: "1px solid #1a1a1a",
          color: "#333",
          fontSize: "12px",
          flexWrap: "wrap",
          gap: "20px",
        }}>
          <div>© 2025 {PERSONAL_INFO.username}</div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span>Built with</span>
            <Zap size={14} color="#6A8759" />
            <span>React</span>
          </div>
        </div>
      </section>

      {/* Brutalist styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-10px); }
          60% { transform: translateX(-50%) translateY(-5px); }
        }

        ::selection {
          background: #6A8759;
          color: #000;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #0a0a0a;
        }

        ::-webkit-scrollbar-thumb {
          background: #1a1a1a;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #2a2a2a;
        }
      `}</style>
    </div>
  );
};

export default WebPortfolio;
