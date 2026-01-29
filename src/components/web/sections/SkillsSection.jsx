import React from "react";
import { Smartphone, Server, Code2, Palette } from "lucide-react";

const SkillsSection = () => {
  const stackColumns = [
    {
      title: "MOBILE CORE",
      accent: "#7CB663",
      description: "Native builds, Compose-first, Kotlin coroutines, Firebase for realtime.",
      items: ["Kotlin", "Jetpack Compose", "Android SDK", "Firebase", "Flutter"],
      icon: Smartphone,
    },
    {
      title: "BACKEND SYSTEMS",
      accent: "#9CCC65",
      description: "Laravel + Express APIs, SQL orchestration, auth, queueing.",
      items: ["Laravel", "Express.js", "PostgreSQL", "MySQL", "REST APIs"],
      icon: Server,
    },
    {
      title: "WEB SURFACE",
      accent: "#C5E1A5",
      description: "React/Tailwind stacks mirroring mobile flows and animations.",
      items: ["React", "TypeScript", "Tailwind", "JavaScript", "Framer Motion"],
      icon: Code2,
    },
    {
      title: "DESIGN OPS",
      accent: "#E6EE9C",
      description: "Figma prototyping, interaction design, motion experiments.",
      items: ["Figma", "UI/UX Strategy", "Prototyping", "Motion Design"],
      icon: Palette,
    },
  ];

  const tickerItems = [
    "ANDROID",
    "JETPACK",
    "KOTLIN",
    "LARAVEL",
    "REACT",
    "TAILWIND",
    "FIGMA",
    "POSTGRESQL",
  ];

  const highlightStats = [
    { title: "SHIPPED MODULES", value: "120+", detail: "Android features delivered across products" },
    { title: "STACK SHARED", value: "4", detail: "Platforms handled end-to-end (Android, backend, web, design)" },
    { title: "TOOLCHAIN", value: "10", detail: "Key frameworks & tools in active rotation" },
  ];

  return (
    <section
      id="skills-section"
      style={{
        padding: "140px 0",
        borderTop: "1px solid #151515",
        position: "relative",
        overflow: "hidden",
        background: "#050505",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
          opacity: 0.25,
        }}
      />

      <div style={{ position: "relative", zIndex: 2, padding: "0 8vw 60px" }}>
        <div
          className="reveal-left delay-1"
          style={{
            fontSize: "11px",
            color: "#7CB663",
            letterSpacing: "0.4em",
            marginBottom: "18px",
            fontFamily: "'Space Mono', monospace",
          }}
        >
          02 · TECH STACK
        </div>
        <div
          className="reveal-left delay-2"
          style={{
            fontSize: "clamp(36px, 6vw, 92px)",
            fontWeight: 900,
            letterSpacing: "-0.05em",
            color: "#f8ffe9",
          }}
        >
          Systems that talk to each other.
        </div>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "0 8vw 20px",
          overflow: "hidden",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            height: "64px",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, #050505, transparent 20%, transparent 80%, #050505)",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />
          <div
            style={{
              display: "flex",
              gap: "30px",
              animation: "stackTicker 14s linear infinite",
              whiteSpace: "nowrap",
              textTransform: "uppercase",
              fontSize: "14px",
              letterSpacing: "0.5em",
              color: "#a0ffa0",
              textShadow: "0 0 18px rgba(124,182,99,0.4)",
              willChange: "transform",
            }}
          >
            {tickerItems.concat(tickerItems).map((item, idx) => (
              <span key={idx} style={{ padding: "14px 0" }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "22px",
          padding: "20px 8vw",
          position: "relative",
          zIndex: 2,
        }}
      >
        {stackColumns.map((col, idx) => (
          <div
            key={col.title}
            className={`reveal delay-${idx + 2}`}
            style={{
              position: "relative",
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(0,0,0,0.7)",
              padding: "32px 30px",
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              minHeight: "340px",
              overflow: "hidden",
              transition: "transform 0.3s ease, border-color 0.3s ease",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `radial-gradient(circle at top, ${col.accent}08, transparent 70%)`,
                pointerEvents: "none",
              }}
            />
            <col.icon size={32} color={col.accent} />
            <div
              style={{
                fontSize: "20px",
                fontWeight: 800,
                letterSpacing: "0.3em",
                color: "#f8ffe9",
              }}
            >
              {col.title}
            </div>
            <div style={{ color: "#bdbdbd", fontSize: "13px", lineHeight: 1.6 }}>
              {col.description}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {col.items.map((skill) => (
                <span
                  key={skill}
                  style={{
                    padding: "6px 10px",
                    borderRadius: "999px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    color: "#dcdcdc",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          padding: "20px 8vw 0",
          position: "relative",
          zIndex: 2,
        }}
      >
        {highlightStats.map((stat, idx) => (
          <div
            key={stat.title}
            className={`reveal delay-${idx + 5}`}
            style={{
              padding: "20px",
              border: "1px solid rgba(255,255,255,0.05)",
              background: "rgba(8,8,8,0.8)",
              boxShadow: "0 20px 30px rgba(0,0,0,0.35)",
            }}
          >
            <div
              style={{
                letterSpacing: "0.35em",
                fontSize: "10px",
                color: "#7CB663",
              }}
            >
              {stat.title}
            </div>
            <div style={{ fontSize: "32px", fontWeight: 800, color: "#f0ffe5" }}>{stat.value}</div>
            <div style={{ color: "#9e9e9e", fontSize: "13px" }}>{stat.detail}</div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes stackTicker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;
