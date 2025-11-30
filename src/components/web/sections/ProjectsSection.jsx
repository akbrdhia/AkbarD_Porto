import React, { useEffect, useState, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const ProjectsSection = ({ hoveredProject, setHoveredProject }) => {
  const projects = [
    { name: "KosKu", description: "Modern boarding house management with real-time booking & payments", tech: ["Kotlin", "Laravel", "Room DB"], status: "DEV", year: "2024", color: "#8BC34A", preview: "/assets/projects/kosku.jpg", link: "" },
    { name: "Manager Usaha V2", description: "AI-powered business analytics & inventory management", tech: ["Kotlin", "Laravel", "ML Kit"], status: "BETA", year: "2024", color: "#9CCC65", preview: "/Manager_usahav2.png", link: "" },
    { name: "Cogito", description: "Smart Debate companion with AI argumentation engine", tech: ["Express", "PostgreSQL", "Kotlin", "Qwen"], status: "BETA", year: "2024", color: "#AED581", preview: "/assets/projects/cogito.jpg", link: "https://github.com/LazyPota/Cogito/tree/main" },
    { name: "Sako (Sahabat Koperasi)", description: "A Plattform to help Koperasi Simpan Pinjam", tech: ["React", "Laravel"], status: "BETA", year: "2023", color: "#C5E1A5", preview: "/Sako-login.png", link: "" },
  ];

  const currentPreview = hoveredProject != null && projects[hoveredProject] ? projects[hoveredProject].preview : null;
  const currentPreviewColor = hoveredProject != null && projects[hoveredProject] ? projects[hoveredProject].color : "#7CB663";

  // preview loading state (supports external URLs, fallback on error)
  const [previewState, setPreviewState] = useState({ loading: false, success: false, url: null });
  const [previewCandidates, setPreviewCandidates] = useState([]);
  const [activeCandidateIndex, setActiveCandidateIndex] = useState(0);
  const [localBlobPath, setLocalBlobPath] = useState(null);
  const [triedCandidates, setTriedCandidates] = useState([]);
  const candidatesRef = useRef([]);
  const isMountedRef = useRef(true);
  const [hoveredTitle, setHoveredTitle] = useState(null);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    candidatesRef.current = previewCandidates;
  }, [previewCandidates]);

  useEffect(() => {
    if (!currentPreview) {
      setPreviewState({ loading: false, success: false, url: null });
      setLocalBlobPath(null);
      setTriedCandidates([]);
      setPreviewCandidates([]);
      setActiveCandidateIndex(0);
      return;
    }

    let candidate = currentPreview;
    try {
      const u = new URL(candidate, window.location.href);
      if (u.hostname.includes("github.com") && u.pathname.includes("/blob/")) {
        const parts = u.pathname.split("/").filter(Boolean);
        if (parts.length >= 5 && parts[2] === "blob") {
          const user = parts[0];
          const repo = parts[1];
          const branch = parts[3];
          const path = parts.slice(4).join("/");
          candidate = `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${path}`;
        }
      }
    } catch (e) {
      // ignore malformed URLs
    }

    if (typeof candidate === "string" && candidate.startsWith("blob:")) {
      const proj = projects[hoveredProject];
      const baseName = proj && proj.name ? proj.name : `project-${hoveredProject}`;
      const slug = baseName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const localPath = `/assets/projects/${slug}.jpg`;
      candidate = localPath;
      setLocalBlobPath(localPath);
    } else {
      setLocalBlobPath(null);
    }

    const candidates = candidate ? [candidate] : [];
    if (candidate && candidate.startsWith("/assets/projects/")) {
      const base = candidate.replace(/\.jpe?g$|\.png$|\.webp$/i, "");
      candidates.push(`${base}.png`, `${base}.jpg`, `${base}.webp`);
    }

    const seen = new Set();
    const unique = candidates.filter((c) => {
      if (!c || seen.has(c)) return false;
      seen.add(c);
      return true;
    });

    console.debug("[ProjectsSection] trying preview candidates", unique);
    setTriedCandidates(unique);
    setPreviewCandidates(unique);
    setActiveCandidateIndex(0);

    if (!unique.length) {
      setPreviewState({ loading: false, success: false, url: null });
    }
  }, [currentPreview, hoveredProject]);

  useEffect(() => {
    if (!previewCandidates.length) return;
    if (activeCandidateIndex >= previewCandidates.length) {
      setPreviewState({ loading: false, success: false, url: null });
      return;
    }
    const nextUrl = previewCandidates[activeCandidateIndex];
    setPreviewState({ loading: true, success: false, url: nextUrl });
  }, [previewCandidates, activeCandidateIndex]);

  const handlePreviewLoad = (event) => {
    if (!isMountedRef.current) return;
    if (event?.currentTarget?.src) {
      console.debug("[ProjectsSection] preview loaded ->", event.currentTarget.src);
    }
    setPreviewState((prev) => ({ ...prev, loading: false, success: true }));
  };

  const handlePreviewError = (event) => {
    if (!isMountedRef.current) return;
    if (event?.currentTarget?.src) {
      console.debug("[ProjectsSection] preview candidate failed ->", event.currentTarget.src);
    }
    setActiveCandidateIndex((idx) => {
      const list = candidatesRef.current;
      const nextIdx = idx + 1;
      if (nextIdx < list.length) {
        return nextIdx;
      }
      console.debug("[ProjectsSection] all preview candidates failed", list);
      setPreviewState({ loading: false, success: false, url: null });
      return idx;
    });
  };

  return (
    <section
      id="projects-section"
      style={{
        padding: "120px 0",
        borderTop: "1px solid #1a1a1a",
        background: "#050505",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {previewState.url && (
        <img
          key={previewState.url}
          src={previewState.url}
          alt=""
          onLoad={handlePreviewLoad}
          onError={handlePreviewError}
          style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
          aria-hidden="true"
        />
      )}

      {/* Status badges / fallback prompts */}
      {hoveredProject != null &&
        projects[hoveredProject] &&
        projects[hoveredProject].preview &&
        projects[hoveredProject].preview.startsWith("blob:") &&
        !previewState.success &&
        localBlobPath && (
          <div
            style={{
              position: "absolute",
              right: "4vw",
              top: "110px",
              zIndex: 2,
              padding: "14px 16px",
              background: "rgba(5,5,5,0.85)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "8px",
              width: "240px",
              color: "#fff",
              fontFamily: "'Space Mono', monospace",
              fontSize: "12px",
              lineHeight: 1.4,
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Preview unavailable locally</div>
            <div>Save the image to:</div>
            <div style={{ marginTop: 6, padding: "6px 8px", borderRadius: 6, background: "rgba(255,255,255,0.05)" }}>{localBlobPath}</div>
            <div style={{ marginTop: 8, color: "rgba(255,255,255,0.6)", fontSize: 11 }}>Refresh or re-hover after saving.</div>
          </div>
        )}

      {hoveredProject != null &&
        projects[hoveredProject] &&
        !previewState.success &&
        triedCandidates &&
        triedCandidates.length > 0 &&
        !projects[hoveredProject].preview.startsWith("blob:") && (
          <div
            style={{
              position: "absolute",
              right: "4vw",
              top: "110px",
              zIndex: 2,
              display: "flex",
              gap: 8,
            }}
          >
            {triedCandidates.slice(0, 3).map((c, i) => (
              <a
                key={i}
                href={c}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "6px 10px",
                  background: "rgba(0,0,0,0.6)",
                  color: "#fff",
                  borderRadius: 6,
                  textDecoration: "none",
                  fontSize: 12,
                  fontFamily: "'Space Mono', monospace",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                Open
              </a>
            ))}
          </div>
        )}

      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="reveal-left delay-1" style={{ padding: "0 8vw", marginBottom: "80px" }}>
          <div
            className="reveal-left delay-2"
            style={{
              fontSize: "11px",
              color: "#8BC34A",
              letterSpacing: "4px",
              marginBottom: "20px",
              fontFamily: "'Space Mono', monospace",
            }}
          >
            // SELECTED WORK
          </div>
          <h2
            className="reveal-left delay-3"
            style={{
              fontSize: "clamp(32px, 7vw, 90px)",
              fontWeight: "900",
              color: "#f0f0f0",
            }}
          >
            PROJECTS<span style={{ color: "#8BC34A" }}>_</span>
          </h2>
        </div>
        <div style={{ width: "100%" }}>
        {projects.map((project, idx) => {
          const isHovered = hoveredProject === idx;
          const projectImage = project.preview && project.preview.trim() !== "" ? project.preview : null;
          const fallbackRegionColor = `${project.color}22`;
          const [titleHovered, setTitleHovered] = useState(false);
          return (
            <div
              key={idx}
              className={`reveal-right delay-${Math.min(idx + 2, 8)}`}
              onMouseEnter={() => setHoveredProject(idx)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: 0,
                alignItems: "stretch",
                minHeight: "420px",
                padding: "60px 0",
                marginBottom: "40px",
                borderBottom: isHovered ? `1px solid ${project.color}66` : "1px solid #111",
                cursor: "pointer",
                transition: "all 0.45s cubic-bezier(0.23, 1, 0.32, 1)",
                transform: isHovered ? "skewX(-1deg)" : "skewX(0)",
                position: "relative",
                zIndex: 1,
                overflow: "hidden",
                background: "transparent",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `radial-gradient(circle at ${isHovered ? "30% 40%" : "60% 50%"}, ${project.color}33, transparent 60%)`,
                  opacity: isHovered ? 0.65 : 0,
                  transition: "opacity 0.4s ease",
                  pointerEvents: "none",
                  mixBlendMode: "screen",
                }}
              />
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  padding: "0 3vw 0 calc(8vw)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#444",
                      fontFamily: "'Space Mono', monospace",
                    }}
                  >
                    [{project.year}]
                  </span>
                  <span
                    style={{
                      padding: "6px 16px",
                      background: project.status === "LIVE" ? project.color : "#111",
                      color: project.status === "LIVE" ? "#000" : "#bbb",
                      fontSize: "10px",
                      fontWeight: "800",
                      letterSpacing: "2px",
                    }}
                  >
                    {project.status}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: "clamp(36px, 7vw, 80px)",
                    fontWeight: "900",
                    marginBottom: "20px",
                    letterSpacing: "-0.02em",
                    transition: "color 0.3s",
                    color: project.link && project.link.trim() !== "" && hoveredTitle === idx ? project.color : "#fff",
                  }}
                >
                  {project.link && project.link.trim() !== "" ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        color: project.link && project.link.trim() !== "" && hoveredTitle === idx ? project.color : "#fff",
                        textDecoration: "none",
                      }}
                      onMouseEnter={() => setHoveredTitle(idx)}
                      onMouseLeave={() => setHoveredTitle(null)}
                    >
                      <span
                        style={{
                          position: "relative",
                          display: "inline-block",
                          paddingBottom: "6px",
                          color: project.link && project.link.trim() !== "" && hoveredTitle === idx ? project.color : "#fff",
                        }}
                      >
                        {project.name}
                        <span
                          style={{
                            position: "absolute",
                            left: 0,
                            bottom: 0,
                            height: "2px",
                            width: hoveredTitle === idx ? "100%" : "0%",
                            background: project.link && project.link.trim() !== "" && hoveredTitle === idx ? project.color : "#fff",
                            transition: "width 0.35s ease",
                          }}
                        />
                      </span>
                      <ArrowUpRight
                        size={32}
                        color={project.link && project.link.trim() !== "" && hoveredTitle === idx ? project.color : "#fff"}
                        style={{
                          transition: "transform 0.3s ease, color 0.3s ease",
                          transform: hoveredTitle === idx ? "translate(3px, -2px)" : "none",
                        }}
                      />
                    </a>
                  ) : (
                    project.name
                  )}
                </h3>

                <p
                  style={{
                    color: "#c7c7c7",
                    marginBottom: "20px",
                    fontSize: "16px",
                    maxWidth: "600px",
                    lineHeight: "1.6",
                  }}
                >
                  {project.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap",
                    fontFamily: "'Space Mono', monospace",
                  }}
                >
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: "12px",
                        color: isHovered ? project.color : "#888",
                        transition: "color 0.2s",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div
                style={{
                  position: "relative",
                  minHeight: "100%",
                  height: "100%",
                  alignSelf: "stretch",
                  borderRadius: "18px",
                  overflow: "hidden",
                  background: projectImage ? "#000" : fallbackRegionColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderLeft: `1px solid ${isHovered ? `${project.color}55` : "rgba(255,255,255,0.05)"}`,
                  transition: "border-color 300ms ease",
                }}
              >
                {projectImage ? (
                  <img
                    src={projectImage}
                    alt={project.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      borderRadius: "18px",
                      filter: isHovered ? "blur(0)" : "blur(14px)",
                      opacity: isHovered ? 0.9 : 0.35,
                      transition: "opacity 350ms ease, filter 600ms ease",
                      backgroundColor: "#030303",
                    }}
                  />
                ) : (
                  <span style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Space Mono', monospace", fontSize: 12 }}>
                    No preview available
                  </span>
                )}
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
