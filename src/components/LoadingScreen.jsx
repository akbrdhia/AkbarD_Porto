import React, { useState, useEffect } from "react";
import { PERSONAL_INFO } from "../constants/portfolioData";
import { usePortfolio } from "../context/PortfolioContext";
import { Monitor, Code2, ArrowRight } from "lucide-react";

const LoadingScreen = () => {
  const { setLoading, setViewMode, setHasVisited, viewMode } = usePortfolio();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [selectedMode, setSelectedMode] = useState(viewMode || null);
  const [hoveredMode, setHoveredMode] = useState(null);

  console.log("------------------------------------------------------------");
  console.log(">>> Android Studio Terminal [Version 1.9.0]");
  console.log(">>> © 2025 AkbarD Interactive Environment");
  console.log("============================================================");
  console.log(">>> Hey there 👋 Another Developer spotted!");
  console.log(">>> I see you exploring the console 😎 Check out my GitHub → github.com/akbrdhia");
  console.log("============================================================");

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

  // Handle mode selection and enter
  const handleEnter = () => {
    if (!selectedMode) return;
    
    // Save to storage
    sessionStorage.setItem("portfolio_visited", "true");
    localStorage.setItem("portfolio_mode", selectedMode);
    setViewMode(selectedMode);
    setHasVisited(true);
    setLoading(false);
  };

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
      {/* Background Grid */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(106, 135, 89, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(106, 135, 89, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
        animation: "gridMove 20s linear infinite",
      }} />

      {/* Glowing orbs */}
      <div style={{
        position: "absolute",
        width: "400px",
        height: "400px",
        background: "radial-gradient(circle, rgba(106, 135, 89, 0.15) 0%, transparent 70%)",
        top: "-100px",
        right: "-100px",
        animation: "pulse 4s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute",
        width: "300px",
        height: "300px",
        background: "radial-gradient(circle, rgba(106, 135, 89, 0.1) 0%, transparent 70%)",
        bottom: "-50px",
        left: "-50px",
        animation: "pulse 4s ease-in-out infinite 2s",
      }} />

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

            {/* Loading Bar */}
            <div style={{
              width: "300px",
              height: "2px",
              background: "#2a2a2a",
              margin: "0 auto 20px",
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                width: `${loadingProgress}%`,
                background: "#6A8759",
                transition: "width 0.1s ease-out",
                boxShadow: "0 0 20px rgba(106, 135, 89, 0.8)",
              }} />
            </div>

            <div style={{
              color: "#4a4a4a",
              fontSize: "12px",
              fontFamily: "monospace",
            }}>
              {loadingProgress < 30 && "Initializing environment..."}
              {loadingProgress >= 30 && loadingProgress < 60 && "Loading assets..."}
              {loadingProgress >= 60 && loadingProgress < 90 && "Preparing experience..."}
              {loadingProgress >= 90 && "Almost ready..."}
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
                      ? "2px solid #6A8759" 
                      : "2px solid #2a2a2a",
                    borderRadius: "0",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    transform: hoveredMode === "ide" ? "translateY(-4px)" : "translateY(0)",
                    boxShadow: selectedMode === "ide" 
                      ? "0 0 30px rgba(106, 135, 89, 0.3)" 
                      : "none",
                  }}
                >
                  <Code2 
                    size={40} 
                    color={selectedMode === "ide" ? "#6A8759" : "#606366"}
                    style={{ marginBottom: "16px" }}
                  />
                  <div style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: selectedMode === "ide" ? "#6A8759" : "#fff",
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
                      ? "2px solid #6A8759" 
                      : "2px solid #2a2a2a",
                    borderRadius: "0",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    transform: hoveredMode === "web" ? "translateY(-4px)" : "translateY(0)",
                    boxShadow: selectedMode === "web" 
                      ? "0 0 30px rgba(106, 135, 89, 0.3)" 
                      : "none",
                  }}
                >
                  <Monitor 
                    size={40} 
                    color={selectedMode === "web" ? "#6A8759" : "#606366"}
                    style={{ marginBottom: "16px" }}
                  />
                  <div style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: selectedMode === "web" ? "#6A8759" : "#fff",
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
                  background: selectedMode ? "#6A8759" : "#2a2a2a",
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
                    e.target.style.background = "#6A8759";
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
                color: "#3a3a3a",
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

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;