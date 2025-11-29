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
      {sections.map((section, idx) => (
        <div 
          key={idx}
          onClick={() => handleClick(section.id)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
            padding: "5px 0",
          }}
          onMouseEnter={(e) => {
            if (activeSection !== idx) {
              e.currentTarget.querySelector('.nav-label').style.opacity = '0.5';
              e.currentTarget.querySelector('.nav-line').style.width = '20px';
              e.currentTarget.querySelector('.nav-line').style.background = '#444';
            }
          }}
          onMouseLeave={(e) => {
            if (activeSection !== idx) {
              e.currentTarget.querySelector('.nav-label').style.opacity = '0';
              e.currentTarget.querySelector('.nav-line').style.width = '10px';
              e.currentTarget.querySelector('.nav-line').style.background = '#333';
            }
          }}
        >
          <span 
            className="nav-label"
            style={{
              fontSize: "9px",
              color: activeSection === idx ? "#8BC34A" : "#555",
              letterSpacing: "2px",
              opacity: activeSection === idx ? 1 : 0,
              transition: "all 0.3s",
              fontFamily: "'Space Mono', monospace",
              fontWeight: activeSection === idx ? "700" : "400",
            }}
          >
            {section.label}
          </span>
          <div 
            className="nav-line"
            style={{
              width: activeSection === idx ? "35px" : "10px",
              height: activeSection === idx ? "3px" : "2px",
              background: activeSection === idx ? "#8BC34A" : "#333",
              transition: "all 0.3s",
              borderRadius: "2px",
            }} 
          />
        </div>
      ))}
    </div>
  );
};

export default WebSideNav;
