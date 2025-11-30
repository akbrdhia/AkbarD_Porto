import React, { useState, useEffect, useRef } from "react";
import { PERSONAL_INFO } from "../constants/portfolioData";
import { usePortfolio } from "../context/PortfolioContext";
import { Monitor, Code2, ArrowRight } from "lucide-react";

const LoadingScreen = () => {
  const { setLoading, setViewMode } = usePortfolio();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [selectedMode, setSelectedMode] = useState(null);
  const [hoveredMode, setHoveredMode] = useState(null);
  const [visibleMessages, setVisibleMessages] = useState([]);
  const shownMessagesRef = useRef(new Set());

  console.log("------------------------------------------------------------");
  console.log(">>> Android Studio Terminal [Version 1.9.0]");
  console.log(">>> © 2025 AkbarD Interactive Environment");
  console.log("============================================================");
  console.log(">>> Hey there 👋 Another Developer spotted!");
  console.log(">>> I see you exploring the console 😎 Check out my GitHub → github.com/akbrdhia");
  console.log("============================================================");

  const loadingMessages = [
    { threshold: 5, text: "Initializing environment variables..." },
    { threshold: 20, text: "Linking Android toolchains + Kotlin runtime." },
    { threshold: 40, text: "Syncing backend endpoints with mock data." },
    { threshold: 60, text: "Bootstrapping web surface + typography grid." },
    { threshold: 80, text: "Verifying animations + custom cursor layers." },
    { threshold: 95, text: "Final QA sweep before launch." },
  ];

  // Loading progress animation
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoadingComplete(true), 300);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    loadingMessages.forEach((msg) => {
      if (
        loadingProgress >= msg.threshold &&
        !shownMessagesRef.current.has(msg.text)
      ) {
        shownMessagesRef.current.add(msg.text);
        setVisibleMessages((prev) => [...prev, msg.text]);
      }
    });
  }, [loadingProgress]);

  // Dynamic accent driven by loading progress
  const progressRatio = Math.min(1, loadingProgress / 100);
  const accentRgb = "124,182,99";
  const gridAlpha = 0.03 + progressRatio * 0.06; // 0.03..0.09
  const stripeAlpha = 0.015 + progressRatio * 0.035; // 0.015..0.05
  const borderAlpha = 0.05 + progressRatio * 0.5; // 0.05..0.55
  const shadowAlpha = 0.15 + progressRatio * 0.5; // 0.15..0.65
  const lampAlpha1 = 0.12 + progressRatio * 0.4;
  const lampAlpha2 = 0.08 + progressRatio * 0.35;
  const lampAlpha3 = 0.04 + progressRatio * 0.25;
  const scanAlpha = 0.015 + progressRatio * 0.02;
  const accentSolid = `rgba(${accentRgb}, ${0.58 + progressRatio * 0.36})`;
  const accentBorder = `rgba(${accentRgb}, ${borderAlpha})`;
  const accentGlow = `rgba(${accentRgb}, ${shadowAlpha})`;

  // Handle mode selection and enter
  const handleEnter = () => {
    if (!selectedMode) return;
    
    console.log("=== Entering Portfolio ===");
    console.log("Selected mode:", selectedMode);
    
    // Save to storage
    sessionStorage.setItem("portfolio_visited", "true");
    localStorage.setItem("portfolio_mode", selectedMode);
    
    // Update state
    setViewMode(selectedMode);
    setLoading(false);
    
    console.log("→ Mode set, loading disabled");
  };

  const statusLabel =
    loadingProgress < 30
      ? "Bootstrapping"
      : loadingProgress < 60
      ? "Linking assets"
      : loadingProgress < 90
      ? "Preflight checks"
      : "Ready";

  const latestMessages = visibleMessages.slice(-4);
  const progressDegrees = Math.min(100, loadingProgress) * 3.6;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Space Mono', Consolas, Monaco, monospace",
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      {/* Brutalist layered background: grid, stripes, blocks, noise, vignette */}
      <div style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}>
        {/* base grid (slightly more visible) */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(${accentRgb}, ${gridAlpha}) 1px, transparent 1px), linear-gradient(90deg, rgba(${accentRgb}, ${gridAlpha}) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          mixBlendMode: "overlay",
          opacity: 0.9,
          animation: "gridMove 24s linear infinite",
        }} />

        {/* diagonal stripes for raw texture */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `repeating-linear-gradient(135deg, rgba(${accentRgb}, ${stripeAlpha}) 0 2px, transparent 2px 18px)`,
          transform: "translateZ(0)",
          animation: "stripeShift 12s linear infinite",
        }} />

        {/* floating concrete blocks */}
        <div style={{
          position: "absolute",
          width: "42vw",
          height: "30vh",
          left: "-12vw",
          top: "10vh",
          background: "linear-gradient(180deg, rgba(18,18,18,0.95), rgba(14,14,14,0.7))",
          border: `2px solid ${accentBorder}`,
          transform: "rotate(-6deg)",
          filter: "blur(0.2px)",
          animation: "blockFloat 18s ease-in-out infinite",
          opacity: 0.9,
        }} />

        <div style={{
          position: "absolute",
          width: "34vw",
          height: "26vh",
          right: "-10vw",
          bottom: "5vh",
          background: "linear-gradient(180deg, rgba(12,12,12,0.95), rgba(8,8,8,0.7))",
          border: `2px solid ${accentBorder}`,
          transform: "rotate(4deg)",
          animation: "blockFloat 22s ease-in-out infinite",
          opacity: 0.85,
        }} />

        {/* subtle scan / highlight */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(90deg, rgba(255,255,255,0.02), rgba(${accentRgb}, ${scanAlpha}) 30%, rgba(255,255,255,0.02))`,
          mixBlendMode: "screen",
          animation: "scan 8s linear infinite",
        }} />

        {/* noise overlay via SVG data URI (very subtle) */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/><feComponentTransfer><feFuncA type='table' tableValues='0 0.06'/></feComponentTransfer></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
          opacity: 0.06,
          mixBlendMode: "overlay",
        }} />

        {/* vignette to focus center */}
        <div style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 120px 220px rgba(0,0,0,0.6), inset 0 -80px 180px rgba(0,0,0,0.5)",
          pointerEvents: "none",
        }} />

        {/* dim ambient lamps (remang-remang) */}
        <div style={{
          position: "absolute",
          left: "8%",
          top: "12%",
          width: "340px",
          height: "340px",
          borderRadius: "50%",
          background: `radial-gradient(circle at 30% 30%, rgba(${accentRgb}, ${lampAlpha1}), rgba(${accentRgb}, ${Math.max(0.02, lampAlpha1 * 0.45)}) 40%, transparent 70%)`,
          filter: "blur(40px)",
          opacity: 0.9,
          mixBlendMode: "screen",
          animation: "lampPulse 6s ease-in-out infinite, lampDrift1 18s linear infinite",
        }} />

        <div style={{
          position: "absolute",
          right: "12%",
          top: "22%",
          width: "260px",
          height: "260px",
          borderRadius: "50%",
          background: `radial-gradient(circle at 50% 40%, rgba(255,160,60,${lampAlpha2}), rgba(255,140,40,${Math.max(0.01, lampAlpha2 * 0.4)}) 45%, transparent 75%)`,
          filter: "blur(36px)",
          opacity: 0.85,
          mixBlendMode: "screen",
          animation: "lampPulse 7.2s ease-in-out infinite, lampDrift2 20s linear infinite",
        }} />

        <div style={{
          position: "absolute",
          left: "40%",
          bottom: "8%",
          width: "420px",
          height: "300px",
          borderRadius: "50%",
          background: `radial-gradient(circle at 40% 60%, rgba(100,160,255,${lampAlpha3}), rgba(100,160,255,${Math.max(0.01, lampAlpha3 * 0.4)}) 45%, transparent 80%)`,
          filter: "blur(48px)",
          opacity: 0.7,
          mixBlendMode: "overlay",
          animation: "lampPulse 9s ease-in-out infinite, lampDrift3 22s linear infinite",
        }} />
      </div>

      <div style={{ textAlign: "center", position: "relative", zIndex: 1, maxWidth: "600px", padding: "0 20px" }}>
        
        {!loadingComplete ? (
          <>
            {/* Logo */}
            <div style={{
              fontSize: "48px",
              fontWeight: "900",
              color: "#6A8759",
              marginBottom: "8px",
              letterSpacing: "-2px",
              textShadow: "0 0 40px rgba(106, 135, 89, 0.5)",
            }}>
              {PERSONAL_INFO.username}
            </div>
            <div style={{
              color: "#606366",
              fontSize: "14px",
              marginBottom: "40px",
              letterSpacing: "4px",
              textTransform: "uppercase",
            }}>
              {PERSONAL_INFO.role}
            </div>

            {/* Loading Dial */}
            <div
              style={{
                width: "240px",
                height: "240px",
                margin: "0 auto 30px",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: `conic-gradient(${accentSolid} ${progressDegrees}deg, rgba(255,255,255,0.08) 0deg)`,
                  filter: "drop-shadow(0 0 30px rgba(124,182,99,0.4))",
                  animation: "ringSpin 20s linear infinite",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: "18px",
                  borderRadius: "50%",
                  background: "#050505",
                  border: "1px solid rgba(255,255,255,0.05)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                }}
              >
                <div style={{ fontSize: "42px", fontWeight: 800, color: "#f4ffe7" }}>
                  {loadingProgress}%
                </div>
                <div
                  style={{
                    letterSpacing: "0.4em",
                    fontSize: "11px",
                    color: "#7CB663",
                  }}
                >
                  {statusLabel}
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  inset: "6px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.08)",
                  animation: "ringPulse 2.8s ease-in-out infinite",
                }}
              />
            </div>

            {/* Log feed */}
            <div
              style={{
                margin: "0 auto",
                width: "340px",
                background: "rgba(0,0,0,0.6)",
                border: "1px solid rgba(255,255,255,0.05)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
                padding: "16px 18px",
                textAlign: "left",
                borderRadius: "12px",
              }}
            >
              <div
                style={{
                  letterSpacing: "0.35em",
                  fontSize: "10px",
                  color: "#7CB663",
                  marginBottom: "10px",
                }}
              >
                STATUS LOG
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  fontSize: "12px",
                  color: "#a0a0a0",
                  minHeight: "72px",
                }}
              >
                {latestMessages.map((msg, idx) => (
                  <div
                    key={`${msg}-${idx}`}
                    style={{
                      opacity: idx === latestMessages.length - 1 ? 1 : 0.6,
                      animation: "fadeInUp 0.4s ease",
                    }}
                  >
                    {msg}
                  </div>
                ))}
                {latestMessages.length === 0 && (
                  <div style={{ opacity: 0.6 }}>Boot sequence initiated...</div>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Mode Selection */}
            <div style={{
              animation: "fadeIn 0.5s ease-out",
            }}>
              <div style={{
                fontSize: "14px",
                color: "#606366",
                marginBottom: "12px",
                letterSpacing: "3px",
                textTransform: "uppercase",
              }}>
                Choose Your Experience
              </div>
              
              <div style={{
                fontSize: "32px",
                fontWeight: "900",
                color: "#fff",
                marginBottom: "40px",
                letterSpacing: "-1px",
              }}>
                How do you want to explore?
              </div>

              {/* Mode Cards */}
              <div style={{
                display: "flex",
                gap: "20px",
                justifyContent: "center",
                marginBottom: "40px",
                flexWrap: "wrap",
              }}>
                {/* IDE Mode Card */}
                <div
                  onClick={() => setSelectedMode("ide")}
                  onMouseEnter={() => setHoveredMode("ide")}
                  onMouseLeave={() => setHoveredMode(null)}
                  style={{
                    width: "220px",
                    padding: "30px 24px",
                    background: selectedMode === "ide" 
                      ? "linear-gradient(135deg, #1a2f1a 0%, #0f1f0f 100%)" 
                      : hoveredMode === "ide" 
                        ? "#1a1a1a" 
                        : "#111",
                    border: selectedMode === "ide" 
                      ? `2px solid ${accentBorder}` 
                      : "2px solid #2a2a2a",
                    borderRadius: "0",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    transform: hoveredMode === "ide" ? "translateY(-4px)" : "translateY(0)",
                    boxShadow: selectedMode === "ide" 
                      ? `0 0 30px ${accentGlow}` 
                      : "none",
                  }}
                >
                  <Code2 
                    size={40} 
                    color={selectedMode === "ide" ? accentSolid : "#606366"}
                    style={{ marginBottom: "16px" }}
                  />
                  <div style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: selectedMode === "ide" ? accentSolid : "#fff",
                    marginBottom: "8px",
                  }}>
                    IDE Mode
                  </div>
                  <div style={{
                    fontSize: "12px",
                    color: "#606366",
                    lineHeight: "1.6",
                  }}>
                    Android Studio experience with terminal, file tree, and code editor
                  </div>
                </div>

                {/* Web Mode Card */}
                <div
                  onClick={() => setSelectedMode("web")}
                  onMouseEnter={() => setHoveredMode("web")}
                  onMouseLeave={() => setHoveredMode(null)}
                  style={{
                    width: "220px",
                    padding: "30px 24px",
                    background: selectedMode === "web" 
                      ? "linear-gradient(135deg, #1a2f1a 0%, #0f1f0f 100%)" 
                      : hoveredMode === "web" 
                        ? "#1a1a1a" 
                        : "#111",
                    border: selectedMode === "web" 
                      ? `2px solid ${accentBorder}` 
                      : "2px solid #2a2a2a",
                    borderRadius: "0",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    transform: hoveredMode === "web" ? "translateY(-4px)" : "translateY(0)",
                    boxShadow: selectedMode === "web" 
                      ? `0 0 30px ${accentGlow}` 
                      : "none",
                  }}
                >
                  <Monitor 
                    size={40} 
                    color={selectedMode === "web" ? accentSolid : "#606366"}
                    style={{ marginBottom: "16px" }}
                  />
                  <div style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: selectedMode === "web" ? accentSolid : "#fff",
                    marginBottom: "8px",
                  }}>
                    Web Mode
                  </div>
                  <div style={{
                    fontSize: "12px",
                    color: "#606366",
                    lineHeight: "1.6",
                  }}>
                    Brutalist portfolio with bold typography and dynamic animations
                  </div>
                </div>
              </div>

              {/* Enter Button */}
              <button
                onClick={handleEnter}
                disabled={!selectedMode}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "16px 40px",
                  background: selectedMode ? accentSolid : "#2a2a2a",
                  color: selectedMode ? "#000" : "#4a4a4a",
                  border: "none",
                  fontSize: "14px",
                  fontWeight: "700",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  cursor: selectedMode ? "pointer" : "not-allowed",
                  transition: "all 0.3s ease",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) => {
                  if (selectedMode) {
                    e.target.style.background = "#8BC34A";
                    e.target.style.transform = "translateX(4px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedMode) {
                    e.target.style.background = accentSolid;
                    e.target.style.transform = "translateX(0)";
                  }
                }}
              >
                Enter Portfolio
                <ArrowRight size={18} />
              </button>

              <div style={{
                marginTop: "24px",
                fontSize: "11px",
                color: selectedMode ? "#eee" : "#3a3a3a",
                opacity: selectedMode ? 0.95 : 0.9,
                transition: "color 180ms ease, transform 180ms ease, opacity 180ms",
                transform: selectedMode ? "translateY(-2px)" : "none",
              }}>
                You can switch modes anytime from the toolbar
              </div>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }

        @keyframes stripeShift {
          0% { background-position: 0 0; }
          100% { background-position: 200px 200px; }
        }

        @keyframes blockFloat {
          0% { transform: translateY(0) rotate(-6deg); }
          50% { transform: translateY(-8px) rotate(-5deg); }
          100% { transform: translateY(0) rotate(-6deg); }
        }

        @keyframes scan {
          0% { transform: translateX(-30%); opacity: 0.08; }
          50% { transform: translateX(30%); opacity: 0.12; }
          100% { transform: translateX(-30%); opacity: 0.08; }
        }

        /* ambient lamp pulse and drift */
        @keyframes lampPulse {
          0% { transform: scale(0.98); opacity: 0.75; }
          50% { transform: scale(1.02); opacity: 1; }
          100% { transform: scale(0.98); opacity: 0.75; }
        }

        @keyframes lampDrift1 {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-6px) translateX(8px); }
          100% { transform: translateY(0) translateX(0); }
        }

        @keyframes lampDrift2 {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(6px) translateX(-6px); }
          100% { transform: translateY(0) translateX(0); }
        }

        @keyframes lampDrift3 {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-10px) translateX(4px); }
          100% { transform: translateY(0) translateX(0); }
        }

        @keyframes ringSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes ringPulse {
          0% { opacity: 0.4; transform: scale(0.98); }
          50% { opacity: 0.8; transform: scale(1); }
          100% { opacity: 0.4; transform: scale(0.98); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
