import React from "react";

const ExperienceSection = () => {
  const experiences = [
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
  ];

  return (
    <section 
      id="experience-section"
      style={{
        padding: "120px 8vw",
        borderTop: "1px solid #1a1a1a",
        background: "#0d0d0d",
      }}
    >
      <div style={{
        fontSize: "11px",
        color: "#8BC34A",
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
        {experiences.map((exp, idx) => (
          <div key={idx} style={{
            padding: "60px 50px",
            background: "#000",
            border: "1px solid #111",
            position: "relative",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#7CB663";
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
              color: "#7CB663",
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
              color: "#7CB663", 
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
  );
};

export default ExperienceSection;
