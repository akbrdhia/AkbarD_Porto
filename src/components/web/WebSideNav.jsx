import React from "react";

const WebSideNav = ({ activeSection }) => {
  const sections = [
    { label: "HERO", id: "hero-section" },
    { label: "ABOUT", id: "about-section" },
    { label: "SKILLS", id: "skills-section" },
    { label: "WORK", id: "projects-section" },
    { label: "EXP", id: "experience-section" },
    { label: "CONTACT", id: "contact-section" },
  ];

  const handleClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        right: "40px",
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        padding: "22px 18px 24px",
        width: "160px",
        backgroundImage:
          "linear-gradient(145deg, rgba(6,6,6,0.96), rgba(18,18,18,0.85)), radial-gradient(circle at top, rgba(124,182,99,0.08), transparent 60%)",
        border: "1.5px solid rgba(124,182,99,0.35)",
        borderRadius: "14px",
        boxShadow: "0 20px 50px rgba(0,0,0,0.65), 14px 14px 0 rgba(124,182,99,0.12)",
        backdropFilter: "blur(10px)",
        zIndex: 120,
        fontFamily: "'Space Mono', monospace",
        color: "#E8FFE0",
      }}
    >
      <div
        style={{
          fontSize: "11px",
          letterSpacing: "0.35em",
          color: "#baf36a",
          marginBottom: "6px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#baf36a",
            boxShadow: "0 0 12px rgba(186,243,106,0.8)",
          }}
        ></span>
        NAV PANEL
      </div>
      {sections.map((section, idx) => {
        const isActive = activeSection === idx;
        return (
          <button
            key={section.id}
            onClick={() => handleClick(section.id)}
            data-cursor-interactive="true"
            data-cursor-label={section.label}
            style={{
              all: "unset",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 12px",
              borderRadius: "8px",
              cursor: "pointer",
              background: isActive
                ? "linear-gradient(125deg, rgba(186,243,106,0.2), rgba(124,182,99,0.08))"
                : "rgba(255,255,255,0.02)",
              border: isActive
                ? "1px solid rgba(186,243,106,0.7)"
                : "1px solid rgba(255,255,255,0.08)",
              boxShadow: isActive
                ? "0 10px 18px rgba(124,182,99,0.25), 8px 8px 0 rgba(0,0,0,0.45)"
                : "none",
              transition: "all 0.25s ease",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                border: `1px solid ${
                  isActive ? "rgba(186,243,106,0.9)" : "rgba(255,255,255,0.2)"
                }`,
                background: isActive ? "#baf36a" : "transparent",
                boxShadow: isActive ? "0 0 14px rgba(186,243,106,0.7)" : "none",
              }}
            />
            <span
              style={{
                fontSize: "11px",
                color: isActive ? "#0d0d0d" : "#b0b0b0",
                letterSpacing: "0.35em",
                fontWeight: isActive ? 700 : 400,
                padding: "2px 6px",
                borderRadius: "4px",
                background: isActive ? "#baf36a" : "rgba(255,255,255,0.08)",
              }}
            >
              {String(idx + 1).padStart(2, "0")}
            </span>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.35em",
                  color: isActive ? "#f7f7f7" : "#999",
                  lineHeight: 1.2,
                  textShadow: isActive ? "0 0 12px rgba(186,243,106,0.45)" : "none",
                }}
              >
                {section.label}
              </div>
              <div
                style={{
                  marginTop: "6px",
                  width: "100%",
                  height: "3px",
                  background: "rgba(255,255,255,0.1)",
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "999px",
                }}
              >
                <div
                  style={{
                    width: isActive ? "100%" : "45%",
                    height: "100%",
                    background: isActive
                      ? "linear-gradient(120deg, #baf36a, #7CB663)"
                      : "rgba(255,255,255,0.15)",
                    transition: "width 0.3s ease",
                    boxShadow: isActive ? "0 0 12px rgba(186,243,106,0.5)" : "none",
                  }}
                />
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default WebSideNav;
