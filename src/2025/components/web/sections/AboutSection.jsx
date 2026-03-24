import React from "react";
import { Cpu } from "lucide-react";
import { PERSONAL_INFO } from "../../../constants/portfolioData";

const AboutSection = () => {
  const specSheet = [
    { label: "ROLE", value: "Software Engineer", detail: "Android · Mobile · Backend · Web" },
    { label: "STACK", value: "Kotlin · Laravel · React", detail: "One pipeline from backend to front" },
    { label: "RITUAL", value: "Music + Code", detail: "Playlists power every build" },
  ];

  const focusPoints = [
    "Designing Android flows that feel tactile and fast.",
    "Keeping backend + mobile conversations in sync.",
    "Shipping web touchpoints that mirror the app experience.",
  ];

  const workValues = [
    { title: "Systems thinking", detail: "Architecting stacks that scale across Android, backend, and web without losing coherence." },
    { title: "Iteration speed", detail: "Moving from napkin idea to shipping build in tight loops; feedback is a core dependency." },
    { title: "Human signal", detail: "Every product decision is backed by the way people actually touch the interface." },
  ];

  return (
    <section
      id="about-section"
      style={{
        minHeight: "100vh",
        position: "relative",
        padding: "100px 8vw",
        background: "#030303",
        borderBottom: "1px solid #111",
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
          opacity: 0.35,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
          gap: "55px",
        }}
      >
        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
          <h2
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              fontSize: "12px",
              letterSpacing: "0.4em",
              color: "#9cf17f",
              fontFamily: "'Space Mono', monospace",
              margin: 0,
            }}
          >
            <span
              style={{
                width: "38px",
                height: "1px",
                background: "rgba(156,241,127,0.7)",
              }}
            />
            01 · ABOUT
          </h2>

          <h2
            style={{
              fontSize: "clamp(38px, 6vw, 80px)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#f7fff1",
              lineHeight: 1,
              margin: 0,
            }}
          >
            Industrial builds with
            <span style={{ color: "#7CB663", display: "block" }}>
              unapologetic precision.
            </span>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "18px",
            }}
          >
            {specSheet.map((spec) => (
              <div
                key={spec.label}
                data-cursor-interactive="true"
                data-cursor-label={spec.label}
                style={{
                  padding: "18px",
                  borderRadius: "14px",
                  border: "1px solid rgba(255,255,255,0.05)",
                  background: "rgba(255,255,255,0.015)",
                  boxShadow: "0 16px 30px rgba(0,0,0,0.45)",
                  minHeight: "150px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.35em",
                    color: "#7CB663",
                  }}
                >
                  {spec.label}
                </div>
                <div
                  style={{
                    fontSize: "32px",
                    fontWeight: 800,
                    color: "#f7fff5",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {spec.value}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#9c9c9c",
                  }}
                >
                  {spec.detail}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              borderRadius: "20px",
              padding: "26px 30px",
              border: "1px solid rgba(255,255,255,0.05)",
              background: "rgba(0,0,0,0.7)",
              boxShadow: "0 30px 60px rgba(0,0,0,0.45)",
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >
            {focusPoints.map((line, idx) => (
              <div
                key={line}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  color: "#dcdcdc",
                  lineHeight: 1.6,
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    marginTop: "8px",
                    background: "#7CB663",
                    boxShadow: "0 0 10px rgba(124,182,99,0.5)",
                  }}
                />
                <span style={{ fontSize: "15px" }}>{line}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 0.85fr) minmax(0, 1.15fr)",
              gap: "20px",
            }}
          >
            <div
              style={{
                borderRadius: "20px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(0,0,0,0.75)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.45)",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "3 / 4",
                  borderRadius: "14px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backgroundImage: `linear-gradient(120deg, rgba(0,0,0,0.5), rgba(0,0,0,0.1)), url('/about-portrait.jpg')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  boxShadow: "0 18px 30px rgba(0,0,0,0.45)",
                }}
              />
              <div>
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#f7fff1",
                  }}
                >
                  {PERSONAL_INFO.name}
                </div>
                <div
                  style={{
                    letterSpacing: "0.3em",
                    fontSize: "11px",
                    color: "#919191",
                    marginTop: "6px",
                  }}
                >
                  Software Engineer
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginTop: "10px",
                    color: "#c9c9c9",
                    fontSize: "13px",
                  }}
                >
                  <span>Base</span> · {PERSONAL_INFO.location}
                </div>
              </div>
            </div>
            <div
              style={{
                borderRadius: "22px",
                border: "1px solid rgba(255,255,255,0.05)",
                background: "rgba(0,0,0,0.65)",
                boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                color: "#f7fff5",
              }}
            >
              <div
                style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#7CB663",
                }}
              >
                <Cpu size={22} />
              </div>
              <div>
                <div
                  style={{
                    letterSpacing: "0.35em",
                    fontSize: "11px",
                    color: "#8e8e8e",
                  }}
                >
                  OPERATIONS LOG
                </div>
                <div style={{ fontWeight: 700 }}>Akbar Dhia · System Designer</div>
              </div>
              </div>

              <div
                style={{
                  fontSize: "16px",
                  lineHeight: 1.8,
                  color: "#c5c5c5",
                }}
              >
                <span style={{ display: "block", marginBottom: "16px" }}>
                  I'm a software engineer who likes to keep Android, backend, and web in
                  the same conversation. That usually means prototyping flows on mobile,
                  wiring the data layer, and mirroring the experience on the web so users
                  never feel lost.
                </span>
                <span style={{ display: "block" }}>
                  Most sessions start with headphones on—music is the metronome that keeps
                  me iterating fast. I care about launching things that feel intentional,
                  even when the timeline is aggressive.
                </span>
              </div>
            </div>
          </div>

          <div
            style={{
              borderRadius: "20px",
              padding: "26px 30px",
              border: "1px solid rgba(255,255,255,0.05)",
              background: "rgba(5,5,5,0.78)",
              boxShadow: "0 25px 45px rgba(0,0,0,0.45)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "20px",
            }}
          >
            {workValues.map((value) => (
              <div key={value.title} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div
                  style={{
                    fontSize: "12px",
                    letterSpacing: "0.35em",
                    color: "#7CB663",
                  }}
                >
                  {value.title.toUpperCase()}
                </div>
                <div style={{ color: "#dcdcdc", fontSize: "15px", lineHeight: 1.6 }}>
                  {value.detail}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
