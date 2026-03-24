import React, { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const ProjectsSection = () => {
  const projects = [
    {
      name: "KosKu",
      description: "Boarding house platform with live booking, payments, and caretaker dashboards.",
      tech: ["Kotlin", "Laravel", "Room DB"],
      status: "DEV",
      year: "2024",
      color: "#8BC34A",
      preview: "/assets/projects/kosku.jpg",
      link: "",
    },
    {
      name: "Manager Usaha V2",
      description: "Business metrics & inventory automation with on-device AI classification.",
      tech: ["Kotlin", "Laravel", "ML Kit"],
      status: "BETA",
      year: "2024",
      color: "#9CCC65",
      preview: "/Manager_usahav2.png",
      link: "",
    },
    {
      name: "Cogito",
      description: "AI debate companion that generates counter-arguments in real time.",
      tech: ["Express", "PostgreSQL", "Kotlin", "Qwen"],
      status: "BETA",
      year: "2024",
      color: "#AED581",
      preview: "/assets/projects/cogito.jpg",
      link: "https://github.com/LazyPota/Cogito/tree/main",
    },
    {
      name: "Sako",
      description: "Simpan-pinjam assistant for cooperatives—payments, analytics, plus reporting.",
      tech: ["React", "Laravel"],
      status: "BETA",
      year: "2023",
      color: "#C5E1A5",
      preview: "/Sako-login.png",
      link: "",
    },
  ];

  const [previewUrl, setPreviewUrl] = useState(projects[0].preview);
  const [previewLoaded, setPreviewLoaded] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setPreviewLoaded(false);
  }, [previewUrl]);

  return (
    <section
      id="projects-section"
      style={{
        padding: "140px 0",
        borderTop: "1px solid #111",
        background: "#050505",
        position: "relative",
      }}
    >
      <div style={{ padding: "0 8vw 60px", position: "relative", zIndex: 2 }}>
        <div
          className="reveal-left delay-1"
          style={{
            fontSize: "11px",
            letterSpacing: "0.4em",
            color: "#7CB663",
            marginBottom: "16px",
            fontFamily: "'Space Mono', monospace",
          }}
        >
          03 · PROJECT WORK
        </div>
        <div
          className="reveal-left delay-2"
          style={{
            fontSize: "clamp(36px, 6vw, 96px)",
            fontWeight: 900,
            color: "#f6ffe7",
            letterSpacing: "-0.04em",
          }}
        >
          Good software feels calm even under load.
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.1fr",
          gap: "40px",
          padding: "0 8vw",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "relative",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(0,0,0,0.85)",
            borderRadius: "18px",
            minHeight: "520px",
            overflow: "hidden",
            boxShadow: "0 35px 60px rgba(0,0,0,0.4)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle at 30% 20%, rgba(124,182,99,0.25), transparent 55%)",
              pointerEvents: "none",
            }}
          />
          {previewUrl && (
            <>
              <img
                key={`${previewUrl}-bg`}
                src={previewUrl}
                alt=""
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "blur(18px) saturate(120%)",
                  opacity: 0.5,
                }}
                aria-hidden="true"
              />
              <img
                key={`${previewUrl}-fg`}
                src={previewUrl}
                alt="Project preview"
                onLoad={() => setPreviewLoaded(true)}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  maxWidth: "82%",
                  maxHeight: "82%",
                  objectFit: "contain",
                  filter: previewLoaded ? "none" : "blur(12px)",
                  opacity: previewLoaded ? 1 : 0.3,
                  transition: "filter 0.6s ease, opacity 0.6s ease",
                borderRadius: "12px",
                boxShadow: "0 30px 60px rgba(0,0,0,0.45)",
              }}
            />
          </>
        )}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(120deg, rgba(255,255,255,0.2), transparent 70%)",
              mixBlendMode: "screen",
              animation: "projectScan 10s linear infinite",
              opacity: 0.4,
              pointerEvents: "none",
            }}
          />
          {!previewLoaded && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#7CB663",
                letterSpacing: "0.4em",
                fontSize: "12px",
              }}
            >
              LOADING PREVIEW...
            </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "26px" }}>
          {projects.map((project, idx) => (
            <div
              key={project.name}
              className={`reveal-right delay-${Math.min(idx + 2, 8)}`}
              onMouseEnter={() => {
                setPreviewUrl(project.preview);
                setActiveIndex(idx);
              }}
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                paddingBottom: "26px",
                cursor: "pointer",
                transform: activeIndex === idx ? "translateX(8px)" : "none",
                transition: "transform 0.3s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  marginBottom: "12px",
                  color: "#7CB663",
                  letterSpacing: "0.3em",
                  fontSize: "11px",
                }}
              >
                {project.year} · {project.status}
              </div>
              <h3
                style={{
                  fontSize: "clamp(32px, 3vw, 52px)",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: activeIndex === idx ? "#7CB663" : "#fff",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  transition: "color 0.3s ease",
                }}
              >
                {project.name}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-interactive="true"
                    data-cursor-label="VIEW PROJECT"
                    style={{ color: "#fff", display: "inline-flex", alignItems: "center" }}
                  >
                    <ArrowUpRight size={28} />
                  </a>
                )}
              </h3>
              <p style={{ color: "#c7c7c7", fontSize: "15px", lineHeight: 1.6, margin: "8px 0 14px" }}>
                {project.description}
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      padding: "6px 10px",
                      borderRadius: "999px",
                      border: "1px solid rgba(255,255,255,0.08)",
                      fontSize: "11px",
                      color: "#dcdcdc",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes projectScan {
          0% { transform: translateX(-40%) skewX(-8deg); }
          50% { transform: translateX(30%) skewX(-8deg); }
          100% { transform: translateX(-40%) skewX(-8deg); }
        }
        @keyframes projectGlowDrift {
          0% { transform: translate3d(0,0,0) scale(0.95); opacity: 0.45; }
          50% { transform: translate3d(20px,-20px,0) scale(1.05); opacity: 0.7; }
          100% { transform: translate3d(-15px,15px,0) scale(0.95); opacity: 0.45; }
        }
      `}</style>
    </section>
  );
};

export default ProjectsSection;
