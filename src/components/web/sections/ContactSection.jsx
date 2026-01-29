import React from "react";
import { Mail, Github, Linkedin, Instagram, ArrowUpRight } from "lucide-react";
import { PERSONAL_INFO } from "../../../constants/portfolioData";

const ContactSection = () => {
  const links = [
    { icon: Mail, label: "Email", value: PERSONAL_INFO.email, href: `mailto:${PERSONAL_INFO.email}` },
    { icon: Github, label: "GitHub", value: "@akbrdhia", href: "https://github.com/akbrdhia" },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: PERSONAL_INFO.linkedin || "akbardh",
      href: `https://linkedin.com/in/${PERSONAL_INFO.linkedin || "akbardh"}`,
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@bukan__akbarr",
      href: "https://instagram.com/bukan__akbarr",
    },
  ];

  return (
    <section
      id="contact-section"
      style={{
        padding: "140px 0",
        borderTop: "1px solid #151515",
        background: "#040404",
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
          opacity: 0.2,
        }}
      />

      <div style={{ position: "relative", zIndex: 2, padding: "0 8vw 80px" }}>
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
          05 · LET'S CONNECT
        </div>
        <div
          className="reveal-left delay-2"
          style={{
            fontSize: "clamp(34px, 6vw, 100px)",
            fontWeight: 900,
            color: "#f6ffe7",
            letterSpacing: "-0.05em",
          }}
        >
          Tell me what you want to build, and let's get it off the ground.
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "22px",
          padding: "0 8vw",
          position: "relative",
          zIndex: 2,
        }}
      >
        {links.map((link, idx) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            data-cursor-interactive="true"
            data-cursor-label={link.label}
            className={`reveal delay-${idx + 2}`}
            style={{
              border: "1px solid rgba(255,255,255,0.05)",
              padding: "24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "rgba(0,0,0,0.75)",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 600,
              letterSpacing: "0.1em",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={{ fontSize: "12px", color: "#7CB663" }}>{link.label.toUpperCase()}</span>
              <span style={{ fontSize: "18px" }}>{link.value}</span>
            </div>
            <link.icon size={24} color="#7CB663" />
          </a>
        ))}
      </div>

      <div
        style={{
          marginTop: "80px",
          position: "relative",
          zIndex: 2,
          padding: "0 8vw",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          paddingTop: "30px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "18px",
          fontFamily: "'Space Mono', monospace",
          fontSize: "11px",
          color: "#8f8f8f",
        }}
      >
        <div>© {new Date().getFullYear()} {PERSONAL_INFO.username || "AkbarD"}</div>
        <div>React</div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#7CB663" }}>
          <ArrowUpRight size={14} />
          DM for availability
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

