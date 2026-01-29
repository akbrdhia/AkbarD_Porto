import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { animate, createTimeline, stagger } from "animejs";
import { PERSONAL_INFO } from "../constants/portfolioData";
import { usePortfolio } from "../context/PortfolioContext";
import { Monitor, Code2, ArrowRight } from "lucide-react";

const ModeSelectionPage = () => {
  const { setLoading, setViewMode } = usePortfolio();
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Refs for anime.js targets
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const subtitleRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef(null);
  const buttonRef = useRef(null);
  const hintRef = useRef(null);
  const bgBlocksRef = useRef([]);
  const lampsRef = useRef([]);

  console.log("------------------------------------------------------------");
  console.log(">>> Android Studio Terminal [Version 1.9.0]");
  console.log(">>> © 2025 AkbarD Interactive Environment");
  console.log("============================================================");
  console.log(">>> Hey there 👋 Another Developer spotted!");
  console.log(">>> I see you exploring the console 😎 Check out my GitHub → github.com/akbrdhia");
  console.log("============================================================");

  // Main entrance animation sequence using anime.js v4
  useEffect(() => {
    const timeline = createTimeline({
      defaults: { ease: "outExpo" },
      onComplete: () => setAnimationComplete(true),
    });

    // Background elements fade in
    timeline
      .add(containerRef.current, {
        opacity: [0, 1],
        duration: 600,
      })
      // Floating blocks slide in from sides
      .add(bgBlocksRef.current, {
        translateX: (_, i) => [i === 0 ? -100 : 100, 0],
        translateY: [-50, 0],
        opacity: [0, 0.9],
        duration: 1000,
        delay: stagger(150),
      }, "-=400")
      // Lamps glow in with scale
      .add(lampsRef.current, {
        scale: [0.5, 1],
        opacity: [0, 1],
        duration: 800,
        delay: stagger(100),
      }, "-=600")
      // Logo drops in with elastic bounce
      .add(logoRef.current, {
        translateY: [-80, 0],
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 1000,
        ease: "outElastic(1, 0.6)",
      }, "-=400")
      // Subtitle slides up
      .add(subtitleRef.current, {
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 600,
      }, "-=600")
      // Heading fades in
      .add(headingRef.current, {
        translateY: [40, 0],
        opacity: [0, 1],
        duration: 800,
      }, "-=400")
      // Cards stagger in from sides with bounce
      .add(".mode-card", {
        translateX: (_, i) => [i === 0 ? -60 : 60, 0],
        translateY: [30, 0],
        opacity: [0, 1],
        scale: [0.9, 1],
        duration: 800,
        delay: stagger(150),
        ease: "outBack",
      }, "-=400")
      // Button slides up
      .add(buttonRef.current, {
        translateY: [40, 0],
        opacity: [0, 1],
        scale: [0.9, 1],
        duration: 600,
        ease: "outBack",
      }, "-=300")
      // Hint fades in
      .add(hintRef.current, {
        opacity: [0, 1],
        duration: 400,
      }, "-=200");

    return () => timeline.pause();
  }, []);

  // Card hover animation
  const handleCardHover = (cardEl, isEntering) => {
    if (!animationComplete) return;
    
    animate(cardEl, {
      scale: isEntering ? 1.03 : 1,
      translateY: isEntering ? -8 : 0,
      duration: 300,
      ease: "outCubic",
    });
  };

  // Card selection animation with pulse
  const handleCardSelect = (mode, cardEl) => {
    setSelectedMode(mode);
    
    // Pulse animation on select
    animate(cardEl, {
      scale: [1, 1.05, 1.02],
      duration: 400,
      ease: "outElastic(1, 0.5)",
    });

    // Glow effect on button
    animate(buttonRef.current, {
      scale: [1, 1.05, 1],
      duration: 300,
      ease: "outCubic",
    });
  };

  // Enter animation with EPIC exit sequence
  const handleEnter = () => {
    if (!selectedMode) return;

    // Get the selected card for special animation
    const cards = document.querySelectorAll('.mode-card');
    const selectedCard = selectedMode === 'web' ? cards[0] : cards[1];
    const otherCard = selectedMode === 'web' ? cards[1] : cards[0];

    // Exit animation timeline - DRAMATIC version
    const exitTimeline = createTimeline({
      defaults: { ease: "inExpo" },
      onComplete: () => {
        console.log("=== Entering Portfolio ===");
        console.log("Selected mode:", selectedMode);
        
        sessionStorage.setItem("portfolio_visited", "true");
        localStorage.setItem("portfolio_mode", selectedMode);
        
        setViewMode(selectedMode);
        setLoading(false);

        // Navigate to the appropriate route after the exit animation
        if (selectedMode === 'web') navigate('/web');
        else if (selectedMode === 'ide') navigate('/ide');
      },
    });

    exitTimeline
      // Step 1: Button flies down and fades
      .add(buttonRef.current, {
        translateY: [0, 60],
        opacity: [1, 0],
        scale: [1, 0.8],
        duration: 250,
        ease: "inBack",
      })
      // Step 2: Hint text dissolves
      .add(hintRef.current, {
        opacity: [1, 0],
        filter: ['blur(0px)', 'blur(8px)'],
        duration: 200,
      }, "-=150")
      // Step 3: Selected card ZOOMS in dramatically (like entering a portal)
      .add(selectedCard, {
        scale: [1, 2.5],
        opacity: [1, 0],
        rotate: [0, 3],
        duration: 600,
        ease: "inQuart",
      }, "-=100")
      // Step 4: Other card flies away to the side
      .add(otherCard, {
        translateX: selectedMode === 'web' ? [0, 200] : [0, -200],
        translateY: [0, -50],
        opacity: [1, 0],
        scale: [1, 0.6],
        rotate: selectedMode === 'web' ? [0, 15] : [0, -15],
        duration: 500,
        ease: "inQuart",
      }, "-=550")
      // Step 5: Heading explodes upward
      .add(headingRef.current, {
        translateY: [0, -100],
        opacity: [1, 0],
        scale: [1, 1.3],
        filter: ['blur(0px)', 'blur(6px)'],
        duration: 400,
        ease: "inQuart",
      }, "-=400")
      // Step 6: Subtitle follows
      .add(subtitleRef.current, {
        translateY: [0, -60],
        opacity: [1, 0],
        filter: ['blur(0px)', 'blur(4px)'],
        duration: 300,
      }, "-=350")
      // Step 7: Logo does a dramatic zoom-in with glow burst
      .add(logoRef.current, {
        scale: [1, 3],
        opacity: [1, 0],
        filter: ['blur(0px)', `drop-shadow(0 0 40px rgba(124,182,99,1))`],
        duration: 500,
        ease: "inQuart",
      }, "-=300")
      // Step 8: Floating blocks explode outward
      .add(bgBlocksRef.current, {
        translateX: (_, i) => [0, i === 0 ? -300 : 300],
        translateY: (_, i) => [0, i === 0 ? -100 : 100],
        opacity: [0.9, 0],
        scale: [1, 0.5],
        rotate: (_, i) => [0, i === 0 ? -20 : 20],
        duration: 500,
        delay: stagger(50),
      }, "-=450")
      // Step 9: Lamps fade with glow burst
      .add(lampsRef.current, {
        scale: [1, 2],
        opacity: [1, 0],
        duration: 400,
        delay: stagger(50),
      }, "-=400")
      // Step 10: Final container fade to black
      .add(containerRef.current, {
        opacity: [1, 0],
        scale: [1, 1.1],
        duration: 300,
        ease: "linear",
      }, "-=150");
  };

  // Dynamic accent colors
  const accentRgb = "124,182,99";
  const accentSolid = `rgba(${accentRgb}, 0.94)`;
  const accentBorder = `rgba(${accentRgb}, 0.55)`;
  // Removed unused accentGlow variable

  return (
    <div
      ref={containerRef}
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
        opacity: 0,
      }}
    >
      {/* Background Elements */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {/* Grid */}
        <div 
          className="grid-animated"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(rgba(${accentRgb}, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(${accentRgb}, 0.06) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
            mixBlendMode: "overlay",
            opacity: 0.9,
          }} 
        />

        {/* Diagonal stripes */}
        <div 
          className="stripes-animated"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `repeating-linear-gradient(135deg, rgba(${accentRgb}, 0.03) 0 2px, transparent 2px 18px)`,
          }} 
        />

        {/* Scan line */}
        <div className="scan-line" />

        {/* Floating blocks */}
        <div
          ref={el => bgBlocksRef.current[0] = el}
          className="bg-block-1"
          style={{
            position: "absolute",
            width: "42vw",
            height: "30vh",
            left: "-12vw",
            top: "10vh",
            background: "linear-gradient(180deg, rgba(18,18,18,0.95), rgba(14,14,14,0.7))",
            border: `2px solid ${accentBorder}`,
            opacity: 0,
          }}
        />
        <div
          ref={el => bgBlocksRef.current[1] = el}
          className="bg-block-2"
          style={{
            position: "absolute",
            width: "34vw",
            height: "26vh",
            right: "-10vw",
            bottom: "5vh",
            background: "linear-gradient(180deg, rgba(12,12,12,0.95), rgba(8,8,8,0.7))",
            border: `2px solid ${accentBorder}`,
            opacity: 0,
          }}
        />

        {/* Ambient lamps */}
        <div
          ref={el => lampsRef.current[0] = el}
          className="lamp-1"
          style={{
            position: "absolute",
            left: "8%",
            top: "12%",
            width: "340px",
            height: "340px",
            borderRadius: "50%",
            background: `radial-gradient(circle at 30% 30%, rgba(${accentRgb}, 0.5), rgba(${accentRgb}, 0.15) 40%, transparent 70%)`,
            filter: "blur(40px)",
            mixBlendMode: "screen",
            opacity: 0,
          }}
        />
        <div
          ref={el => lampsRef.current[1] = el}
          className="lamp-2"
          style={{
            position: "absolute",
            right: "12%",
            top: "22%",
            width: "260px",
            height: "260px",
            borderRadius: "50%",
            background: `radial-gradient(circle at 50% 40%, rgba(255,160,60,0.4), rgba(255,140,40,0.12) 45%, transparent 75%)`,
            filter: "blur(36px)",
            mixBlendMode: "screen",
            opacity: 0,
          }}
        />
        <div
          ref={el => lampsRef.current[2] = el}
          className="lamp-3"
          style={{
            position: "absolute",
            left: "40%",
            bottom: "8%",
            width: "420px",
            height: "300px",
            borderRadius: "50%",
            background: `radial-gradient(circle at 40% 60%, rgba(100,160,255,0.25), rgba(100,160,255,0.08) 45%, transparent 80%)`,
            filter: "blur(48px)",
            mixBlendMode: "overlay",
            opacity: 0,
          }}
        />

        {/* Vignette */}
        <div style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 120px 220px rgba(0,0,0,0.6), inset 0 -80px 180px rgba(0,0,0,0.5)",
        }} />
      </div>

      {/* Content */}
      <div style={{ textAlign: "center", position: "relative", zIndex: 1, maxWidth: "600px", padding: "0 20px" }}>
        {/* Logo */}
        <div
          ref={logoRef}
          className={animationComplete ? "logo-animated" : ""}
          style={{
            fontSize: "48px",
            fontWeight: "900",
            color: "#6A8759",
            marginBottom: "8px",
            letterSpacing: "-2px",
            textShadow: "0 0 40px rgba(106, 135, 89, 0.5)",
            opacity: 0,
          }}
        >
          {PERSONAL_INFO.username}
        </div>

        {/* Subtitle */}
        <div
          ref={subtitleRef}
          style={{
            color: "#606366",
            fontSize: "14px",
            marginBottom: "40px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            opacity: 0,
          }}
        >
          {PERSONAL_INFO.role}
        </div>

        {/* Heading */}
        <div ref={headingRef} style={{ opacity: 0 }}>
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
        </div>

        {/* Mode Cards */}
        <div
          ref={cardsRef}
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            marginBottom: "40px",
            flexWrap: "wrap",
          }}
        >
          {/* IDE Mode Card */}
          <div
            className={`mode-card ${selectedMode === "ide" ? "mode-card-selected" : ""}`}
            onClick={(e) => handleCardSelect("ide", e.currentTarget)}
            onMouseEnter={(e) => handleCardHover(e.currentTarget, true)}
            onMouseLeave={(e) => handleCardHover(e.currentTarget, false)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleCardSelect("ide", e.currentTarget);
              }
            }}
            aria-pressed={selectedMode === "ide"}
            style={{
              width: "220px",
              padding: "30px 24px",
              background: selectedMode === "ide"
                ? "linear-gradient(135deg, #1a2f1a 0%, #0f1f0f 100%)"
                : "#111",
              border: selectedMode === "ide"
                ? `2px solid ${accentBorder}`
                : "2px solid #2a2a2a",
              borderRadius: "0",
              cursor: "pointer",
              transition: "background 0.3s ease, border 0.3s ease",
              opacity: 0,
            }}
          >
            <Code2
              size={40}
              color={selectedMode === "ide" ? accentSolid : "#606366"}
              style={{ marginBottom: "16px", transition: "color 0.3s ease" }}
            />
            <div style={{
              fontSize: "18px",
              fontWeight: "700",
              color: selectedMode === "ide" ? accentSolid : "#fff",
              marginBottom: "8px",
              transition: "color 0.3s ease",
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
            className={`mode-card ${selectedMode === "web" ? "mode-card-selected" : ""}`}
            onClick={(e) => handleCardSelect("web", e.currentTarget)}
            onMouseEnter={(e) => handleCardHover(e.currentTarget, true)}
            onMouseLeave={(e) => handleCardHover(e.currentTarget, false)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleCardSelect("web", e.currentTarget);
              }
            }}
            aria-pressed={selectedMode === "web"}
            style={{
              width: "220px",
              padding: "30px 24px",
              background: selectedMode === "web"
                ? "linear-gradient(135deg, #1a2f1a 0%, #0f1f0f 100%)"
                : "#111",
              border: selectedMode === "web"
                ? `2px solid ${accentBorder}`
                : "2px solid #2a2a2a",
              borderRadius: "0",
              cursor: "pointer",
              transition: "background 0.3s ease, border 0.3s ease",
              opacity: 0,
            }}
          >
            <Monitor
              size={40}
              color={selectedMode === "web" ? accentSolid : "#606366"}
              style={{ marginBottom: "16px", transition: "color 0.3s ease" }}
            />
            <div style={{
              fontSize: "18px",
              fontWeight: "700",
              color: selectedMode === "web" ? accentSolid : "#fff",
              marginBottom: "8px",
              transition: "color 0.3s ease",
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
          ref={buttonRef}
          onClick={handleEnter}
          disabled={!selectedMode}
          aria-label="Enter portfolio in selected mode"
          aria-disabled={!selectedMode}
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
            transition: "background 0.3s ease, color 0.3s ease",
            fontFamily: "inherit",
            opacity: 0,
          }}
          onMouseEnter={(e) => {
            if (selectedMode && animationComplete) {
              animate(e.currentTarget, {
                scale: 1.05,
                translateX: 4,
                duration: 200,
                ease: "outCubic",
              });
            }
          }}
          onMouseLeave={(e) => {
            if (selectedMode && animationComplete) {
              animate(e.currentTarget, {
                scale: 1,
                translateX: 0,
                duration: 200,
                ease: "outCubic",
              });
            }
          }}
        >
          Enter Portfolio
          <ArrowRight size={18} />
        </button>

        {/* Hint */}
        <div
          ref={hintRef}
          style={{
            marginTop: "24px",
            fontSize: "11px",
            color: selectedMode ? "#eee" : "#3a3a3a",
            transition: "color 0.3s ease",
            opacity: 0,
          }}
        >
          You can switch modes anytime from the toolbar
        </div>
      </div>

      {/* CSS Animations for continuous movement */}
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: rotate(-6deg) translateY(0) translateX(0); }
          25% { transform: rotate(-5deg) translateY(-15px) translateX(10px); }
          50% { transform: rotate(-7deg) translateY(-8px) translateX(-5px); }
          75% { transform: rotate(-5.5deg) translateY(-20px) translateX(8px); }
        }
        
        @keyframes float2 {
          0%, 100% { transform: rotate(4deg) translateY(0) translateX(0); }
          25% { transform: rotate(5deg) translateY(-12px) translateX(-8px); }
          50% { transform: rotate(3deg) translateY(-18px) translateX(5px); }
          75% { transform: rotate(4.5deg) translateY(-6px) translateX(-10px); }
        }
        
        @keyframes lampPulse1 {
          0%, 100% { transform: scale(1); opacity: 0.9; filter: blur(40px); }
          50% { transform: scale(1.15); opacity: 1; filter: blur(50px); }
        }
        
        @keyframes lampPulse2 {
          0%, 100% { transform: scale(1); opacity: 0.85; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        
        @keyframes lampPulse3 {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.2); opacity: 0.9; }
        }
        
        @keyframes lampDrift1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -15px) scale(1.1); }
          66% { transform: translate(-10px, 10px) scale(0.95); }
        }
        
        @keyframes lampDrift2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-15px, 20px) scale(1.05); }
          66% { transform: translate(25px, -10px) scale(1.1); }
        }
        
        @keyframes lampDrift3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, 15px) scale(1.15); }
          66% { transform: translate(-20px, -20px) scale(0.9); }
        }
        
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 48px 48px; }
        }
        
        @keyframes stripeShift {
          0% { background-position: 0 0; }
          100% { background-position: 100px 100px; }
        }
        
        @keyframes scanLine {
          0% { transform: translateX(-100%); opacity: 0; }
          10% { opacity: 0.3; }
          50% { opacity: 0.15; }
          90% { opacity: 0.3; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes logoGlow {
          0%, 100% { text-shadow: 0 0 40px rgba(106, 135, 89, 0.5); }
          50% { text-shadow: 0 0 60px rgba(106, 135, 89, 0.8), 0 0 100px rgba(106, 135, 89, 0.4); }
        }
        
        @keyframes subtleBreathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        
        @keyframes cardGlow {
          0%, 100% { box-shadow: 0 0 30px rgba(124,182,99, 0.4); }
          50% { box-shadow: 0 0 50px rgba(124,182,99, 0.7), 0 0 80px rgba(124,182,99, 0.3); }
        }
        
        .bg-block-1 {
          animation: float1 12s ease-in-out infinite;
        }
        
        .bg-block-2 {
          animation: float2 15s ease-in-out infinite;
        }
        
        .lamp-1 {
          animation: lampPulse1 4s ease-in-out infinite, lampDrift1 20s ease-in-out infinite;
        }
        
        .lamp-2 {
          animation: lampPulse2 5s ease-in-out infinite, lampDrift2 25s ease-in-out infinite;
        }
        
        .lamp-3 {
          animation: lampPulse3 6s ease-in-out infinite, lampDrift3 22s ease-in-out infinite;
        }
        
        .grid-animated {
          animation: gridMove 20s linear infinite;
        }
        
        .stripes-animated {
          animation: stripeShift 15s linear infinite;
        }
        
        .logo-animated {
          animation: logoGlow 3s ease-in-out infinite, subtleBreathe 4s ease-in-out infinite;
        }
        
        .mode-card-selected {
          animation: cardGlow 2s ease-in-out infinite;
        }
        
        .scan-line {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(124,182,99, 0.1), transparent);
          animation: scanLine 8s linear infinite;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default ModeSelectionPage;
