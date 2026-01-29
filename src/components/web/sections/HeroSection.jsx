import React, { useEffect, useState } from "react";
import { ArrowUpRight, Github, Play } from "lucide-react";
import { PERSONAL_INFO } from "../../../constants/portfolioData";

const HeroSection = ({ scrollY, glitchActive }) => {
  const heroStats = [
    {
      label: "PLATFORMS",
      value: "Android & Web",
      detail: "Native mobile plus responsive web builds.",
    },
    {
      label: "STACK",
      value: "Kotlin · Laravel · React",
      detail: "One pipeline from backend to front.",
    },
    {
      label: "MODE",
      value: "Remote · GMT+7",
      detail: "Available for product work worldwide.",
    },
  ];

  const setupImage = "/setup.jpg"; // place your setup photo at public/setup.jpg
  const glowOrbs = [
    { left: "20%", top: "25%", size: 260, color: "rgba(124,182,99,0.32)", delay: "0s" },
    { left: "65%", top: "15%", size: 200, color: "rgba(255,0,77,0.25)", delay: "2s" },
    { left: "40%", top: "60%", size: 280, color: "rgba(124,182,99,0.2)", delay: "4s" },
  ];

  const [firstName = "AKBAR", lastName = "DHIA"] =
    PERSONAL_INFO.name?.split(" ") ?? [];
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroReady(true), 60);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero-section"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px 8vw 90px",
        position: "relative",
        overflow: "hidden",
        background: "#050505",
        borderBottom: "1px solid #111",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 30% 30%, rgba(124,182,99,0.2), transparent 45%), radial-gradient(circle at 80% 20%, rgba(255,0,77,0.1), transparent 40%)",
          opacity: 0.85,
          pointerEvents: "none",
          zIndex: 0,
          transform: `translateY(${scrollY * 0.05}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
          opacity: 0.4,
          pointerEvents: "none",
          transform: `translateY(${scrollY * -0.03}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: "30% auto auto 35%",
          width: "320px",
          height: "320px",
          background:
            "radial-gradient(circle, rgba(124,182,99,0.3), rgba(124,182,99,0))",
          filter: "blur(60px)",
          opacity: 0.6,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(120deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 60%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: "10% 10%",
          background:
            "radial-gradient(circle, rgba(0,0,0,0.6), transparent 60%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: "-15% -10% 35% -10%",
          background: "linear-gradient(125deg, rgba(124,182,99,0.45), rgba(255,0,77,0.15), transparent 75%)",
          transform: heroReady ? "translateX(140%) skewX(-10deg)" : "translateX(0) skewX(-10deg)",
          opacity: heroReady ? 0 : 0.85,
          transition: "transform 1.4s cubic-bezier(0.77, 0, 0.18, 1), opacity 1.1s ease",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(120deg, rgba(255,255,255,0.08), transparent 70%)",
          mixBlendMode: "screen",
          animation: "heroScan 7s linear infinite",
          opacity: heroReady ? 0.25 : 0.45,
          transition: "opacity 1.2s ease",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      {glowOrbs.map((orb, idx) => (
        <div
          key={idx}
          style={{
            position: "absolute",
            left: orb.left,
            top: orb.top,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            filter: "blur(50px)",
            opacity: 0.5,
            pointerEvents: "none",
            animation: `heroGlowDrift 9s ease-in-out infinite`,
            animationDelay: orb.delay,
            zIndex: 0,
          }}
        />
      ))}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          position: "relative",
          zIndex: 2,
          transform: heroReady ? "none" : "translateY(80px) skewY(3deg) scale(0.98)",
          opacity: heroReady ? 1 : 0,
          filter: heroReady ? "blur(0)" : "blur(12px)",
          transition: "transform 1.05s cubic-bezier(0.77, 0, 0.18, 1), opacity 0.9s ease, filter 0.9s ease",
        }}
      >
        <div
          className="reveal-left delay-1"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "14px",
            padding: "12px 18px",
            borderRadius: "999px",
            border: "1px solid rgba(124,182,99,0.5)",
            background: "rgba(5,5,5,0.85)",
            boxShadow: "0 0 25px rgba(124,182,99,0.25)",
            width: "fit-content",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#baf36a",
              boxShadow: "0 0 16px rgba(186,243,106,0.9)",
              animation: "pulse 1.6s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontSize: "11px",
              letterSpacing: "0.35em",
              color: "#d6ffd3",
              fontFamily: "'Space Mono', monospace",
            }}
          >
            LIVE BUILD / AVAILABLE
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 0.8fr)",
            gap: "40px",
            alignItems: "stretch",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            <h1
              className="reveal delay-2"
              style={{
                fontSize: "clamp(48px, 13vw, 170px)",
                fontWeight: 900,
                letterSpacing: "-0.05em",
                lineHeight: 0.85,
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  display: "block",
                  color: "#f7fff1",
                  transform: glitchActive
                    ? `translate(${Math.random() * 10 - 5}px, ${
                        Math.random() * 4
                      }px)`
                    : "none",
                  textShadow: glitchActive
                    ? "3px 0 #ff004d, -3px 0 #00ffe5"
                    : "0 0 20px rgba(0,0,0,0.35)",
                }}
              >
                {firstName}
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "16px",
                  color: "transparent",
                  WebkitTextStroke: "2px #7CB663",
                  transform: `translateX(${scrollY * 0.1}px)`,
                  transition: "transform 0.3s ease-out",
                }}
              >
                {lastName || "D"}
                <span
                  style={{
                    fontSize: "clamp(18px, 2vw, 28px)",
                    letterSpacing: "0.35em",
                    color: "#7CB663",
                    WebkitTextStroke: "initial",
                  }}
                >
                  Developer
                </span>
              </span>
            </h1>

            <div
              className="reveal-left delay-3"
              style={{
                fontFamily: "'Space Mono', monospace",
                color: "#bfbfbf",
                fontSize: "clamp(15px, 2vw, 24px)",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                background: "rgba(0,0,0,0.6)",
                padding: "16px 22px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
              }}
            >
              <span style={{ color: "#baf36a" }}>~/akbard</span>
              <span style={{ color: "#666" }}>build</span>
              <span>{PERSONAL_INFO.role}</span>
              <span
                style={{
                  width: "12px",
                  height: "24px",
                  background: "#baf36a",
                  animation: "blink 1s step-end infinite",
                }}
              />
            </div>

            <div
              className="reveal delay-4"
              style={{ display: "flex", gap: "18px", flexWrap: "wrap" }}
            >
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                data-cursor-interactive="true"
                data-cursor-label="SEND BRIEF"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "22px 42px",
                  background: "#baf36a",
                  color: "#050505",
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: 800,
                  letterSpacing: "0.4em",
                  fontFamily: "'Space Mono', monospace",
                  borderRadius: "10px",
                  boxShadow: "0 20px 40px rgba(186,243,106,0.35)",
                  transition: "transform 0.2s ease",
                }}
              >
                <Play size={16} fill="#050505" />
                DEPLOY REQUEST
                <ArrowUpRight size={18} strokeWidth={3} />
              </a>

              <a
                href="https://github.com/akbrdhia"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-interactive="true"
                data-cursor-label="OPEN GITHUB"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "22px 36px",
                  borderRadius: "10px",
                  border: "1.5px solid rgba(255,255,255,0.2)",
                  color: "#eaeaea",
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.3em",
                  fontFamily: "'Space Mono', monospace",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Github size={18} />
                CODE ARCHIVE
                <ArrowUpRight size={18} strokeWidth={3} />
                <span
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(120deg, rgba(255,255,255,0.05), transparent)",
                    mixBlendMode: "screen",
                    opacity: 0.6,
                    pointerEvents: "none",
                  }}
                />
              </a>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: "18px",
              }}
            >
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  data-cursor-interactive="true"
                  data-cursor-label={stat.label}
                  style={{
                    padding: "18px",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 12px 24px rgba(0,0,0,0.4)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      letterSpacing: "0.4em",
                      color: "#7CB663",
                    }}
                  >
                    {stat.label}
                  </span>
                  <span
                    style={{
                      fontSize: "32px",
                      fontWeight: 800,
                      color: "#f6ffe7",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    style={{
                      fontSize: "13px",
                      color: "#a0a0a0",
                      lineHeight: 1.4,
                    }}
                  >
                    {stat.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>

        <div
          className="reveal-right delay-3"
          style={{ display: "flex", flexDirection: "column", gap: "24px" }}
        >
          <div
            style={{
              borderRadius: "22px",
              border: "1px solid rgba(255,255,255,0.05)",
              background: "rgba(0,0,0,0.7)",
              boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
              padding: "30px",
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                letterSpacing: "0.35em",
                fontSize: "11px",
                color: "#7CB663",
              }}
            >
              WORKSPACE
              <span style={{ color: "#8f8f8f", letterSpacing: "0.2em" }}>LIVE</span>
            </div>
            <div
              style={{
                width: "100%",
                height: "260px",
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.08)",
                backgroundImage: `linear-gradient(120deg, rgba(0,0,0,0.5), rgba(0,0,0,0.1)), url(${setupImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                boxShadow: "0 25px 40px rgba(0,0,0,0.45)",
              }}
            />
            <div>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#f6ffe7",
                }}
              >
                {PERSONAL_INFO.location}
              </div>
              <div
                style={{
                  color: "#8d8d8d",
                  letterSpacing: "0.2em",
                  fontSize: "11px",
                  marginTop: "4px",
                }}
              >
                BASE · GMT+7 · REMOTE
              </div>
              <div
                style={{
                  marginTop: "12px",
                  fontSize: "14px",
                  color: "#bfbfbf",
                  lineHeight: 1.6,
                }}
              >
                Available for product work worldwide. Studio lights on, setup dialed in,
                and every sprint starts with a playlist.
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "12px",
                  flexWrap: "wrap",
                }}
              >
                {["Android", "Backend", "Web"].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "999px",
                      border: "1px solid rgba(255,255,255,0.08)",
                      fontSize: "11px",
                      letterSpacing: "0.2em",
                      color: "#dcdcdc",
                    }}
                  >
                    {tag.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div
            className="reveal-right delay-4"
            style={{
              borderRadius: "20px",
              border: "1px solid rgba(255,255,255,0.05)",
              background: "rgba(5,5,5,0.78)",
              boxShadow: "0 25px 45px rgba(0,0,0,0.45)",
              padding: "26px 28px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                letterSpacing: "0.35em",
                color: "#7CB663",
              }}
            >
              CONTACT
            </div>
            <div style={{ color: "#dadada", lineHeight: 1.7 }}>
              Open for Android/mobile-focused product collaborations. Prefer tight feedback loops and
              keeping backend + web in sync with the app experience.
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "12px",
              }}
            >
              <div>
                <div style={{ letterSpacing: "0.3em", fontSize: "11px", color: "#8d8d8d" }}>
                  AVAILABILITY
                </div>
                <div style={{ fontSize: "18px", color: "#f5ffea" }}>Remote · GMT+7</div>
              </div>
              <div>
                <div style={{ letterSpacing: "0.3em", fontSize: "11px", color: "#8d8d8d" }}>
                  EMAIL
                </div>
                <div style={{ fontSize: "16px", color: "#cfcfcf" }}>{PERSONAL_INFO.email}</div>
              </div>
            </div>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              data-cursor-interactive="true"
              data-cursor-label="SEND EMAIL"
              style={{
                marginTop: "8px",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 16px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.1)",
                letterSpacing: "0.25em",
                fontSize: "11px",
                textDecoration: "none",
                color: "#f5f5f5",
              }}
            >
              EMAIL · BRIEF
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div
            style={{
              borderRadius: "18px",
              border: "1px solid rgba(255,255,255,0.05)",
              background: "linear-gradient(120deg, rgba(0,0,0,0.85), rgba(0,0,0,0.6))",
              boxShadow: "0 25px 40px rgba(0,0,0,0.45)",
              padding: "22px 26px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "18px",
            }}
          >
            <div>
              <div style={{ letterSpacing: "0.35em", color: "#666", fontSize: "11px" }}>
                BASE
              </div>
              <div style={{ fontSize: "18px", color: "#f6ffe7" }}>{PERSONAL_INFO.location}</div>
            </div>
            <div>
              <div style={{ letterSpacing: "0.35em", color: "#666", fontSize: "11px" }}>
                AVAILABILITY
              </div>
              <div style={{ fontSize: "18px", color: "#7CB663" }}>Open for new work</div>
            </div>
            <div>
              <div style={{ letterSpacing: "0.35em", color: "#666", fontSize: "11px" }}>
                CONTACT
              </div>
              <div style={{ fontSize: "16px", color: "#dcdcdc" }}>{PERSONAL_INFO.email}</div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "30px",
            fontSize: "11px",
            letterSpacing: "0.5em",
            color: "#555",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "1px",
                background: "rgba(255,255,255,0.15)",
              }}
            />
            CONTROL SYSTEM
          </div>
          <div
            data-cursor-interactive="true"
            data-cursor-label="SCROLL"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#7CB663",
            }}
          >
            01
            <div
              style={{
                width: "6px",
                height: "40px",
                background: "rgba(255,255,255,0.1)",
                position: "relative",
                borderRadius: "999px",
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, #7CB663, transparent)",
                  animation: "scrollLine 1.6s ease-in-out infinite",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
};

export default HeroSection;
