import React, { useState, useEffect, useRef } from "react";
import { 
  ArrowUpRight, 
  Github, 
  Linkedin, 
  Mail, 
  Code2, 
  Smartphone,
  Palette,
  Server,
  Terminal,
  ExternalLink,
  Play,
  Sparkles
} from "lucide-react";
import { PERSONAL_INFO } from "../constants/portfolioData";
import { usePortfolio } from "../context/PortfolioContext";

const WebPortfolio = () => {
  const { setViewMode } = usePortfolio();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredProject, setHoveredProject] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [glitchActive, setGlitchActive] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef(null);

  // Intro animation - slower for dramatic effect
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoaded(true), 500);
          return 100;
        }
        // Slower progress with variable speed
        const increment = prev < 30 ? Math.random() * 8 : 
                         prev < 70 ? Math.random() * 5 : 
                         Math.random() * 3;
        return Math.min(prev + increment, 100);
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      // Determine active section
      const sections = document.querySelectorAll('section');
      sections.forEach((section, idx) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
          setActiveSection(idx);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Random glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.92) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 100 + Math.random() * 100);
      }
    }, 100);
    return () => clearInterval(glitchInterval);
  }, []);

  const projects = [
    { name: "KosKu", description: "Modern boarding house management with real-time booking & payments", tech: ["Kotlin", "Laravel", "Room DB"], status: "DEV", year: "2024", color: "#6A8759" },
    { name: "Manager Usaha V2", description: "AI-powered business analytics & inventory management", tech: ["Kotlin", "Laravel", "ML Kit"], status: "BETA", year: "2024", color: "#8BC34A" },
    { name: "Cogito", description: "Smart Debate companion with AI argumentation engine", tech: ["Express", "PostgreSQL", "Kotlin", "Qwen"], status: "LIVE", year: "2024", color: "#A4D36F" },
    { name: "Festivaloka", description: "Immersive festival & event discovery experience", tech: ["Roblox Studio", "LUA"], status: "LIVE", year: "2023", color: "#C5E1A5" },
  ];

  const skills = {
    mobile: ["Kotlin", "Jetpack Compose", "Flutter", "Android SDK", "Firebase"],
    backend: ["Laravel", "Express.js", "PostgreSQL", "MySQL", "RESTful APIs"],
    frontend: ["React", "TypeScript", "Tailwind CSS", "JavaScript"],
    design: ["Figma", "UI/UX Design", "Prototyping"],
  };

  const marqueeText = "ANDROID DEVELOPER • FULL STACK ENTHUSIAST • UI/UX DESIGNER • PROBLEM SOLVER • CLEAN CODE ADVOCATE • ";

  // Loading screen
  if (!isLoaded) {
    return (
      <div style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Space Mono', monospace",
        zIndex: 9999,
        overflow: "hidden",
      }}>
        {/* Animated background grid */}
        <div style={{
          position: "absolute",
          inset: "-50%",
          backgroundImage: `
            linear-gradient(rgba(106, 135, 89, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(106, 135, 89, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          transform: `rotate(${loadProgress * 0.5}deg) scale(${1 + loadProgress * 0.01})`,
          transition: "transform 0.1s",
        }} />
        
        <div style={{
          fontSize: "clamp(80px, 20vw, 200px)",
          fontWeight: "900",
          color: "#fff",
          letterSpacing: "-10px",
          marginBottom: "40px",
          fontFamily: "'Space Grotesk', sans-serif",
          position: "relative",
          zIndex: 2,
        }}>
          {Math.min(Math.floor(loadProgress), 100)}
          <span style={{ 
            fontSize: "0.3em", 
            color: "#6A8759",
            verticalAlign: "super",
          }}>%</span>
        </div>
        
        <div style={{
          width: "300px",
          height: "4px",
          background: "#111",
          position: "relative",
          overflow: "hidden",
          zIndex: 2,
        }}>
          <div style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: `${loadProgress}%`,
            background: "linear-gradient(90deg, #6A8759, #8BC34A)",
            transition: "width 0.1s",
            boxShadow: "0 0 20px #6A8759",
          }} />
        </div>
        
        <div style={{
          marginTop: "30px",
          fontSize: "11px",
          color: "#333",
          letterSpacing: "4px",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}>
          <Sparkles size={14} color="#6A8759" style={{ animation: "spin 2s linear infinite" }} />
          LOADING BRUTALIST EXPERIENCE
        </div>

        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      style={{
        width: "100%",
        minHeight: "100vh",
        overflowX: "hidden",
        overflowY: "auto",
        background: "#000",
        color: "#fff",
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      {/* Noise overlay */}
      <div style={{
        position: "fixed",
        inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        opacity: 0.04,
        pointerEvents: "none",
        zIndex: 1000,
        mixBlendMode: "overlay",
      }} />

      {/* Mouse blob */}
      <div style={{
        position: "fixed",
        left: mousePosition.x - 150,
        top: mousePosition.y - 150,
        width: "300px",
        height: "300px",
        background: `radial-gradient(circle, rgba(106, 135, 89, 0.2) 0%, transparent 70%)`,
        pointerEvents: "none",
        zIndex: 1,
        transition: "left 0.1s ease-out, top 0.1s ease-out",
        filter: "blur(30px)",
      }} />

      {/* Cursor ring */}
      <div style={{
        position: "fixed",
        left: mousePosition.x - 20,
        top: mousePosition.y - 20,
        width: "40px",
        height: "40px",
        border: "1px solid rgba(106, 135, 89, 0.5)",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 9998,
        transition: "left 0.08s ease-out, top 0.08s ease-out, transform 0.2s",
        transform: hoveredProject !== null ? "scale(1.5)" : "scale(1)",
      }} />

      {/* Cursor dot */}
      <div style={{
        position: "fixed",
        left: mousePosition.x - 4,
        top: mousePosition.y - 4,
        width: "8px",
        height: "8px",
        background: "#6A8759",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 9999,
      }} />

      {/* Side navigation dots */}
      <div style={{
        position: "fixed",
        right: "30px",
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        zIndex: 100,
      }}>
        {["HERO", "ABOUT", "SKILLS", "WORK", "EXP", "CONTACT"].map((label, idx) => (
          <div 
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
            }}
          >
            <span style={{
              fontSize: "9px",
              color: activeSection === idx ? "#6A8759" : "#333",
              letterSpacing: "2px",
              opacity: activeSection === idx ? 1 : 0,
              transition: "all 0.3s",
              fontFamily: "'Space Mono', monospace",
            }}>
              {label}
            </span>
            <div style={{
              width: activeSection === idx ? "30px" : "10px",
              height: "2px",
              background: activeSection === idx ? "#6A8759" : "#222",
              transition: "all 0.3s",
            }} />
          </div>
        ))}
      </div>

      {/* Top bar */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "50px",
        background: "rgba(0,0,0,0.8)",
        borderBottom: "1px solid #111",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
        zIndex: 100,
        backdropFilter: "blur(20px)",
        fontFamily: "'Space Mono', monospace",
        fontSize: "11px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
          <div style={{ 
            fontWeight: "900", 
            fontSize: "16px",
            color: "#6A8759",
            letterSpacing: "-1px",
          }}>
            AD_
          </div>
          <div style={{ color: "#333", display: "flex", gap: "20px" }}>
            <span>{PERSONAL_INFO.location?.split(",")[0] || "BOGOR"}</span>
            <span style={{ color: "#6A8759" }}>●</span>
            <span>{currentTime.toLocaleTimeString('en-US', { hour12: false })}</span>
          </div>
        </div>
        <button
          onClick={() => {
            localStorage.setItem("portfolio_mode", "ide");
            setViewMode("ide");
          }}
          style={{
            padding: "8px 20px",
            background: "#6A8759",
            border: "none",
            color: "#000",
            fontSize: "10px",
            fontWeight: "700",
            letterSpacing: "1px",
            cursor: "pointer",
            fontFamily: "'Space Mono', monospace",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "skewX(-5deg)";
            e.currentTarget.style.background = "#8BC34A";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "skewX(0)";
            e.currentTarget.style.background = "#6A8759";
          }}
        >
          <Terminal size={12} />
          IDE MODE
        </button>
      </div>

      {/* ==================== HERO ==================== */}
      <section style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "120px 8vw 80px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Giant background text */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) translateY(${scrollY * 0.5}px)`,
          fontSize: "clamp(200px, 50vw, 600px)",
          fontWeight: "900",
          color: "#050505",
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
            background: `linear-gradient(90deg, transparent, rgba(106, 135, 89, ${0.05 + i * 0.01}) 50%, transparent)`,
            transform: `translateX(${Math.sin(scrollY * 0.005 + i) * 100}px)`,
            transition: "transform 0.3s ease-out",
          }} />
        ))}

        {/* Status badge */}
        <div style={{
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
            background: "#6A8759",
            animation: "pulse 1.5s ease-in-out infinite",
            boxShadow: "0 0 20px #6A8759",
          }} />
          <span style={{
            fontSize: "11px",
            color: "#6A8759",
            letterSpacing: "4px",
            fontFamily: "'Space Mono', monospace",
            textTransform: "uppercase",
          }}>
            Available for freelance & collaboration
          </span>
        </div>

        {/* Main name - BRUTAL with glitch */}
        <h1 style={{
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
            WebkitTextStroke: "2px #6A8759",
            transform: `translateX(${scrollY * 0.15}px)`,
            transition: "transform 0.3s ease-out",
          }}>
            {PERSONAL_INFO.name?.split(" ")[1]?.toUpperCase() || "DEVELOPER"}
          </span>
        </h1>

        {/* Role with terminal style */}
        <div style={{
          fontSize: "clamp(14px, 2vw, 22px)",
          color: "#666",
          marginBottom: "50px",
          position: "relative",
          zIndex: 2,
          fontFamily: "'Space Mono', monospace",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}>
          <span style={{ color: "#6A8759" }}>~/akbard $</span> 
          <span>{PERSONAL_INFO.role}</span>
          <span style={{ 
            animation: "blink 1s step-end infinite",
            background: "#6A8759",
            width: "10px",
            height: "20px",
            display: "inline-block",
          }} />
        </div>

        {/* CTA Buttons */}
        <div style={{ 
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
              background: "#6A8759",
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
              e.currentTarget.style.boxShadow = "0 0 40px rgba(106, 135, 89, 0.5)";
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
              e.currentTarget.style.borderColor = "#6A8759";
              e.currentTarget.style.color = "#6A8759";
              e.currentTarget.style.transform = "skewX(-5deg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#222";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.transform = "skewX(0)";
            }}
          >
            <Github size={18} strokeWidth={2} />
            VIEW CODE
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
            color: "#333",
            fontFamily: "'Space Mono', monospace",
          }}>
            SCROLL
          </span>
          <div style={{
            width: "1px",
            height: "60px",
            background: "linear-gradient(to bottom, #6A8759, transparent)",
            animation: "scrollLine 2s ease-in-out infinite",
          }} />
        </div>
      </section>

      {/* ==================== MARQUEE ==================== */}
      <div style={{
        overflow: "hidden",
        borderTop: "1px solid #111",
        borderBottom: "1px solid #111",
        padding: "25px 0",
        background: "#030303",
      }}>
        <div style={{
          display: "flex",
          animation: "marquee 25s linear infinite",
          whiteSpace: "nowrap",
        }}>
          {[...Array(4)].map((_, i) => (
            <span key={i} style={{
              fontSize: "clamp(20px, 3.5vw, 40px)",
              fontWeight: "900",
              color: i % 2 === 0 ? "#fff" : "#222",
              letterSpacing: "0.15em",
              paddingRight: "80px",
            }}>
              {marqueeText}
            </span>
          ))}
        </div>
      </div>

      {/* ==================== ABOUT ==================== */}
      <section style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        position: "relative",
      }}>
        <div style={{
          background: "#000",
          padding: "clamp(60px, 10vw, 120px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          borderRight: "1px solid #111",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Big number */}
          <div style={{
            position: "absolute",
            top: "10%",
            left: "5%",
            fontSize: "clamp(150px, 25vw, 300px)",
            fontWeight: "900",
            color: "#0a0a0a",
            lineHeight: "0.8",
            pointerEvents: "none",
          }}>
            01
          </div>
          
          <div style={{
            fontSize: "11px",
            color: "#6A8759",
            letterSpacing: "4px",
            marginBottom: "20px",
            fontFamily: "'Space Mono', monospace",
            position: "relative",
            zIndex: 2,
          }}>
            // ABOUT ME
          </div>
          <h2 style={{
            fontSize: "clamp(28px, 5vw, 60px)",
            fontWeight: "900",
            lineHeight: "1.05",
            marginBottom: "30px",
            position: "relative",
            zIndex: 2,
          }}>
            CRAFTING
            <br />
            <span style={{ color: "#6A8759" }}>DIGITAL</span>
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
          <p style={{
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
            {[
              { num: "3+", label: "YEARS CODING" },
              { num: "10+", label: "PROJECTS BUILT" },
              { num: "∞", label: "COFFEE CONSUMED" },
              { num: "24/7", label: "LEARNING MODE" },
            ].map((stat, idx) => (
              <div key={idx}>
                <div style={{ 
                  fontSize: "clamp(36px, 5vw, 56px)", 
                  fontWeight: "900", 
                  color: "#6A8759",
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

      {/* ==================== SKILLS ==================== */}
      <section style={{
        padding: "120px 0",
        borderTop: "1px solid #111",
        overflow: "hidden",
        background: "#000",
      }}>
        <div style={{ padding: "0 8vw", marginBottom: "80px" }}>
          <div style={{
            fontSize: "11px",
            color: "#6A8759",
            letterSpacing: "4px",
            marginBottom: "20px",
            fontFamily: "'Space Mono', monospace",
          }}>
            // EXPERTISE
          </div>
          <h2 style={{
            fontSize: "clamp(32px, 7vw, 90px)",
            fontWeight: "900",
          }}>
            TECH STACK<span style={{ color: "#6A8759" }}>_</span>
          </h2>
        </div>

        <div style={{
          display: "flex",
          gap: "20px",
          padding: "0 8vw",
          overflowX: "auto",
          paddingBottom: "30px",
        }}>
          {[
            { icon: Smartphone, title: "MOBILE", items: skills.mobile, accent: "#6A8759" },
            { icon: Server, title: "BACKEND", items: skills.backend, accent: "#8BC34A" },
            { icon: Code2, title: "FRONTEND", items: skills.frontend, accent: "#A4D36F" },
            { icon: Palette, title: "DESIGN", items: skills.design, accent: "#C5E1A5" },
          ].map((category, idx) => (
            <div key={idx} style={{
              minWidth: "320px",
              padding: "50px 40px",
              background: "#050505",
              border: "1px solid #111",
              position: "relative",
              overflow: "hidden",
              transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = category.accent;
              e.currentTarget.style.transform = "translateY(-15px)";
              e.currentTarget.style.boxShadow = `0 20px 40px rgba(106, 135, 89, 0.1)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#111";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
            >
              <div style={{
                position: "absolute",
                top: "-30px",
                right: "10px",
                fontSize: "140px",
                fontWeight: "900",
                color: "#0a0a0a",
                lineHeight: "1",
                pointerEvents: "none",
              }}>
                0{idx + 1}
              </div>
              
              <category.icon size={40} color={category.accent} style={{ marginBottom: "25px" }} />
              <h3 style={{
                fontSize: "22px",
                fontWeight: "900",
                marginBottom: "25px",
                letterSpacing: "3px",
              }}>
                {category.title}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {category.items.map((skill, i) => (
                  <div key={i} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "13px",
                    color: "#555",
                    fontFamily: "'Space Mono', monospace",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = category.accent;
                    e.currentTarget.style.transform = "translateX(10px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#555";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                  >
                    <span style={{ color: category.accent }}>→</span>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== PROJECTS ==================== */}
      <section style={{
        padding: "120px 0",
        borderTop: "1px solid #111",
      }}>
        <div style={{ padding: "0 8vw", marginBottom: "80px" }}>
          <div style={{
            fontSize: "11px",
            color: "#6A8759",
            letterSpacing: "4px",
            marginBottom: "20px",
            fontFamily: "'Space Mono', monospace",
          }}>
            // SELECTED WORK
          </div>
          <h2 style={{
            fontSize: "clamp(32px, 7vw, 90px)",
            fontWeight: "900",
          }}>
            PROJECTS<span style={{ color: "#6A8759" }}>_</span>
          </h2>
        </div>

        {projects.map((project, idx) => (
          <div
            key={idx}
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

      {/* ==================== EXPERIENCE ==================== */}
      <section style={{
        padding: "120px 8vw",
        borderTop: "1px solid #111",
        background: "#030303",
      }}>
        <div style={{
          fontSize: "11px",
          color: "#6A8759",
          letterSpacing: "4px",
          marginBottom: "80px",
          fontFamily: "'Space Mono', monospace",
        }}>
          // EXPERIENCE
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
          gap: "40px",
        }}>
          {[
            {
              num: "01",
              date: "OCT 2024 — FEB 2025",
              title: "FRONTEND DEVELOPER",
              company: "@ Kementrian Koperasi",
              points: ["Queue management system", "Responsive web apps", "UX improvements +40%"],
            },
            {
              num: "02",
              date: "JUN 2022 — PRESENT",
              title: "SOFTWARE ENGINEERING",
              company: "@ SMKN 1 Cibinong",
              points: ["Full-stack development", "Mobile app development", "Graduating soon"],
            },
          ].map((exp, idx) => (
            <div key={idx} style={{
              padding: "60px 50px",
              background: "#000",
              border: "1px solid #111",
              position: "relative",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#6A8759";
              e.currentTarget.style.transform = "translateY(-10px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#111";
              e.currentTarget.style.transform = "translateY(0)";
            }}
            >
              <div style={{
                position: "absolute",
                top: "25px",
                right: "25px",
                fontSize: "80px",
                fontWeight: "900",
                color: "#0a0a0a",
              }}>
                {exp.num}
              </div>
              <div style={{
                fontSize: "10px",
                color: "#6A8759",
                letterSpacing: "3px",
                marginBottom: "25px",
                fontFamily: "'Space Mono', monospace",
              }}>
                {exp.date}
              </div>
              <h3 style={{ 
                fontSize: "26px", 
                fontWeight: "900", 
                marginBottom: "10px",
                letterSpacing: "-0.02em",
              }}>
                {exp.title}
              </h3>
              <div style={{ 
                color: "#6A8759", 
                marginBottom: "30px",
                fontFamily: "'Space Mono', monospace",
                fontSize: "13px",
              }}>
                {exp.company}
              </div>
              <ul style={{ 
                color: "#555", 
                lineHeight: "2.2", 
                listStyle: "none",
                padding: 0,
                fontFamily: "'Space Mono', monospace",
                fontSize: "13px",
              }}>
                {exp.points.map((point, i) => (
                  <li key={i}>→ {point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== CONTACT ==================== */}
      <section style={{
        minHeight: "100vh",
        padding: "120px 8vw",
        borderTop: "1px solid #111",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Giant background */}
        <div style={{
          position: "absolute",
          bottom: "-20%",
          right: "-10%",
          fontSize: "clamp(200px, 40vw, 500px)",
          fontWeight: "900",
          color: "#050505",
          lineHeight: "0.8",
          pointerEvents: "none",
        }}>
          HI!
        </div>

        <div style={{
          fontSize: "11px",
          color: "#6A8759",
          letterSpacing: "4px",
          marginBottom: "50px",
          fontFamily: "'Space Mono', monospace",
          position: "relative",
          zIndex: 2,
        }}>
          // LET'S CONNECT
        </div>

        <h2 style={{
          fontSize: "clamp(36px, 10vw, 120px)",
          fontWeight: "900",
          lineHeight: "1.05",
          marginBottom: "80px",
          position: "relative",
          zIndex: 2,
        }}>
          GOT A PROJECT?
          <br />
          <span style={{ color: "#6A8759" }}>LET'S TALK</span>
        </h2>

        <div style={{
          display: "flex",
          gap: "30px",
          flexWrap: "wrap",
          marginBottom: "120px",
          position: "relative",
          zIndex: 2,
        }}>
          {[
            { icon: Mail, label: "EMAIL", value: PERSONAL_INFO.email, href: `mailto:${PERSONAL_INFO.email}` },
            { icon: Github, label: "GITHUB", value: "@akbrdhia", href: "https://github.com/akbrdhia" },
            { icon: Linkedin, label: "LINKEDIN", value: PERSONAL_INFO.linkedin || "akbardh", href: `https://linkedin.com/in/${PERSONAL_INFO.linkedin || "akbardh"}` },
          ].map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              target={item.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                padding: "25px 35px",
                background: "#050505",
                border: "1px solid #111",
                textDecoration: "none",
                transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#6A8759";
                e.currentTarget.style.transform = "translateY(-8px) skewX(-2deg)";
                e.currentTarget.style.boxShadow = "0 15px 30px rgba(106, 135, 89, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#111";
                e.currentTarget.style.transform = "translateY(0) skewX(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <item.icon size={28} color="#6A8759" />
              <div>
                <div style={{
                  fontSize: "10px",
                  color: "#444",
                  letterSpacing: "3px",
                  marginBottom: "6px",
                  fontFamily: "'Space Mono', monospace",
                }}>
                  {item.label}
                </div>
                <div style={{
                  fontSize: "15px",
                  color: "#fff",
                  fontWeight: "600",
                }}>
                  {item.value}
                </div>
              </div>
              <ExternalLink size={18} color="#333" style={{ marginLeft: "10px" }} />
            </a>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "50px",
          borderTop: "1px solid #111",
          flexWrap: "wrap",
          gap: "25px",
          fontFamily: "'Space Mono', monospace",
          fontSize: "11px",
          position: "relative",
          zIndex: 2,
        }}>
          <div style={{ color: "#333" }}>
            © {new Date().getFullYear()} {PERSONAL_INFO.username?.toUpperCase() || "AKBARD"}
          </div>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "10px",
            color: "#333",
          }}>
            <span>CRAFTED WITH</span>
            <Terminal size={14} color="#6A8759" />
            <span style={{ color: "#6A8759" }}>REACT + VITE</span>
          </div>
          <div style={{ color: "#6A8759", letterSpacing: "3px" }}>
            BRUTALIST MODE
          </div>
        </div>
      </section>

      {/* ==================== GLOBAL STYLES ==================== */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
        
        * {
          cursor: none !important;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes scrollLine {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.2); }
        }

        ::selection {
          background: #6A8759;
          color: #000;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #000;
        }

        ::-webkit-scrollbar-thumb {
          background: #111;
          transition: background 0.3s;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #6A8759;
        }

        html {
          scroll-behavior: smooth;
        }

        @media (max-width: 900px) {
          section > div[style*="gridTemplateColumns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default WebPortfolio;
