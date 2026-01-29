import React from "react";

const ExperienceSection = () => {
  const experiences = [
    {
      role: "Software Engineering Intern",
      company: "Kementrian Koperasi",
      period: "Oct 2024 – Feb 2025",
      tag: "Internship",
      summary: "Building internal tools to streamline cooperative management.",
      bullets: [
        "Make Reports API reducing manual work by 40%.",
        "Developed Form ODS a dynamic form builder tool.",
        "Developed SAKO assistant for cooperative management.",
      ],
    },
    {
      role: "Android Developer",
      company: "Garuda Hacks 6.0",
      period: "June 2024",
      tag: "Competition",
      summary: "Developed Cogito, an AI debate companion app.",
      bullets: [
        "Integrated Qwen-VL model for real-time counter-argument generation.",
        "Implemented natural language processing for argument analysis.",
        "Realtime argument analysis and feedback system.",
      ],
    },
    {
      role: "Student",
      company: "SMKN 1 Cibinong",
      period: "Jun 2022 – Present",
      tag: "School Lab",
      summary: "Full-stack experiments across Android, backend, and immersive web.",
      bullets: [
        "Led mobile capstone projects from design to release.",
        "Prototyped Kotlin + Laravel stack for business apps.",
        "Shared internal tooling with classes as knowledge base.",
      ],
    },
  ];

  const stats = [
    { label: "Platforms handled", value: "4" },
    { label: "Releases shipped", value: "12" },
    { label: "Average sprint", value: "10d" },
  ];

  return (
    <section
      id="experience-section"
      style={{
        padding: "140px 0",
        borderTop: "1px solid #151515",
        background: "#030303",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "140px 140px",
          opacity: 0.25,
        }}
      />

      <div style={{ position: "relative", zIndex: 2, padding: "0 8vw 60px" }}>
        <div
          className="reveal-left delay-1"
          style={{
            fontSize: "11px",
            letterSpacing: "0.4em",
            color: "#7CB663",
            marginBottom: "20px",
            fontFamily: "'Space Mono', monospace",
          }}
        >
          04 · EXPERIENCE
        </div>
        <div
          className="reveal-left delay-2"
          style={{
            fontSize: "clamp(36px, 5vw, 82px)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            color: "#f6ffe7",
          }}
        >
          Building systems that graduate with me.
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "40px",
          position: "relative",
          zIndex: 2,
          padding: "0 8vw",
        }}
      >
        {experiences.map((exp, idx) => (
          <div
            key={exp.company}
            className={`reveal-right delay-${Math.min(idx + 2, 8)}`}
            style={{
              border: "1px solid rgba(255,255,255,0.05)",
              padding: "30px 32px",
              display: "grid",
              gridTemplateColumns: "220px 1fr",
              gap: "30px",
              background: "rgba(0,0,0,0.75)",
              boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
            }}
          >
            <div
              style={{
                borderRight: "1px solid rgba(255,255,255,0.05)",
                paddingRight: "20px",
                letterSpacing: "0.35em",
                fontSize: "11px",
                color: "#959595",
              }}
            >
              {exp.period}
              <div style={{ marginTop: "14px", color: "#7CB663", letterSpacing: "0.25em" }}>{exp.tag}</div>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: "8px",
                }}
              >
                <h3
                  style={{
                    fontSize: "26px",
                    letterSpacing: "-0.02em",
                    color: "#fff",
                  }}
                >
                  {exp.role}
                </h3>
                <span style={{ color: "#7CB663", letterSpacing: "0.2em", fontSize: "12px" }}>
                  {exp.company}
                </span>
              </div>
              <p style={{ color: "#d0d0d0", fontSize: "15px", marginBottom: "16px" }}>{exp.summary}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "#9a9a9a", lineHeight: 1.9 }}>
                {exp.bullets.map((point) => (
                  <li key={point} style={{ display: "flex", gap: "10px", fontSize: "13px" }}>
                    <span style={{ color: "#7CB663" }}>—</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "60px",
          position: "relative",
          zIndex: 2,
          padding: "0 8vw",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "20px",
          }}
        >
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`reveal delay-${idx + 4}`}
              style={{
                border: "1px solid rgba(255,255,255,0.05)",
                padding: "18px 20px",
                background: "rgba(8,8,8,0.8)",
              }}
            >
              <div style={{ letterSpacing: "0.35em", fontSize: "10px", color: "#7CB663" }}>{stat.label}</div>
              <div style={{ fontSize: "28px", fontWeight: 800, color: "#f4ffe9" }}>{stat.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;

