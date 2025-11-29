import React from "react";
import { Mail, Github, Linkedin, ExternalLink, Terminal } from "lucide-react";
import { PERSONAL_INFO } from "../../../constants/portfolioData";

const ContactSection = () => {
  const contacts = [
    { icon: Mail, label: "EMAIL", value: PERSONAL_INFO.email, href: `mailto:${PERSONAL_INFO.email}` },
    { icon: Github, label: "GITHUB", value: "@akbrdhia", href: "https://github.com/akbrdhia" },
    { icon: Linkedin, label: "LINKEDIN", value: PERSONAL_INFO.linkedin || "akbardh", href: `https://linkedin.com/in/${PERSONAL_INFO.linkedin || "akbardh"}` },
  ];

  return (
    <section 
      id="contact-section"
      style={{
        minHeight: "100vh",
        padding: "120px 8vw",
        borderTop: "1px solid #1a1a1a",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background: "#0a0a0a",
      }}
    >
      {/* Giant background */}
      <div style={{
        position: "absolute",
        bottom: "-20%",
        right: "-10%",
        fontSize: "clamp(200px, 40vw, 500px)",
        fontWeight: "900",
        color: "#111",
        lineHeight: "0.8",
        pointerEvents: "none",
      }}>
        HI!
      </div>

      <div className="reveal-left delay-1" style={{
        fontSize: "11px",
        color: "#8BC34A",
        letterSpacing: "4px",
        marginBottom: "50px",
        fontFamily: "'Space Mono', monospace",
        position: "relative",
        zIndex: 2,
      }}>
        // LET'S CONNECT
      </div>

      <h2 className="reveal delay-2" style={{
        fontSize: "clamp(36px, 10vw, 120px)",
        fontWeight: "900",
        lineHeight: "1.05",
        marginBottom: "80px",
        position: "relative",
        zIndex: 2,
      }}>
        GOT A PROJECT?
        <br />
        <span style={{ color: "#7CB663" }}>LET'S TALK</span>
      </h2>

      <div style={{
        display: "flex",
        gap: "30px",
        flexWrap: "wrap",
        marginBottom: "120px",
        position: "relative",
        zIndex: 2,
      }}>
        {contacts.map((item, idx) => (
          <a
            key={idx}
            className={`reveal-scale delay-${idx + 3}`}
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
              e.currentTarget.style.borderColor = "#7CB663";
              e.currentTarget.style.transform = "translateY(-8px) skewX(-2deg)";
              e.currentTarget.style.boxShadow = "0 15px 30px rgba(124, 182, 99, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#111";
              e.currentTarget.style.transform = "translateY(0) skewX(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <item.icon size={28} color="#7CB663" />
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
      <div className="reveal delay-6" style={{
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
          <Terminal size={14} color="#7CB663" />
          <span style={{ color: "#7CB663" }}>REACT + VITE</span>
        </div>
        <div style={{ color: "#7CB663", letterSpacing: "3px" }}>
          BRUTALIST MODE
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
