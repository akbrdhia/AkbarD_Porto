import React from "react";
import { Smartphone, Server, Code2, Palette } from "lucide-react";

const SkillsSection = () => {
  const skills = {
    mobile: ["Kotlin", "Jetpack Compose", "Flutter", "Android SDK", "Firebase"],
    backend: ["Laravel", "Express.js", "PostgreSQL", "MySQL", "RESTful APIs"],
    frontend: ["React", "TypeScript", "Tailwind CSS", "JavaScript"],
    design: ["Figma", "UI/UX Design", "Prototyping"],
  };

  const categories = [
    { icon: Smartphone, title: "MOBILE", items: skills.mobile, accent: "#8BC34A" },
    { icon: Server, title: "BACKEND", items: skills.backend, accent: "#9CCC65" },
    { icon: Code2, title: "FRONTEND", items: skills.frontend, accent: "#AED581" },
    { icon: Palette, title: "DESIGN", items: skills.design, accent: "#C5E1A5" },
  ];

  return (
    <section 
      id="skills-section"
      style={{
        padding: "120px 0",
        borderTop: "1px solid #1a1a1a",
        overflow: "visible",
        background: "#0a0a0a",
      }}
    >
      <div style={{ padding: "0 8vw", marginBottom: "80px" }}>
        <div style={{
          fontSize: "11px",
          color: "#8BC34A",
          letterSpacing: "4px",
          marginBottom: "20px",
          fontFamily: "'Space Mono', monospace",
        }}>
          // EXPERTISE
        </div>
        <h2 style={{
          fontSize: "clamp(32px, 7vw, 90px)",
          fontWeight: "900",
          color: "#f0f0f0",
        }}>
          TECH STACK<span style={{ color: "#8BC34A" }}>_</span>
        </h2>
      </div>

      <div style={{
        display: "flex",
        gap: "25px",
        padding: "20px 8vw 40px",
        overflowX: "auto",
        scrollbarWidth: "thin",
      }}>
        {categories.map((category, idx) => (
          <div key={idx} style={{
            minWidth: "300px",
            padding: "60px 35px 50px",
            background: "#111",
            border: "1px solid #222",
            position: "relative",
            overflow: "hidden",
            transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
            borderRadius: "4px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = category.accent;
            e.currentTarget.style.transform = "translateY(-15px)";
            e.currentTarget.style.boxShadow = `0 25px 50px rgba(139, 195, 74, 0.15)`;
            e.currentTarget.style.background = "#151515";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#222";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.background = "#111";
          }}
          >
            <div style={{
              position: "absolute",
              top: "15px",
              right: "15px",
              fontSize: "100px",
              fontWeight: "900",
              color: "#1a1a1a",
              lineHeight: "1",
              pointerEvents: "none",
            }}>
              0{idx + 1}
            </div>
            
            <category.icon size={36} color={category.accent} style={{ marginBottom: "25px", position: "relative", zIndex: 2 }} />
            <h3 style={{
              fontSize: "20px",
              fontWeight: "900",
              marginBottom: "25px",
              letterSpacing: "3px",
              color: "#e0e0e0",
              position: "relative",
              zIndex: 2,
            }}>
              {category.title}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", position: "relative", zIndex: 2 }}>
              {category.items.map((skill, i) => (
                <div key={i} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "13px",
                  color: "#888",
                  fontFamily: "'Space Mono', monospace",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = category.accent;
                  e.currentTarget.style.transform = "translateX(10px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#888";
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
  );
};

export default SkillsSection;
