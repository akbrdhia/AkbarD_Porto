import React from "react";
import { Sparkles } from "lucide-react";

const WebLoadingScreen = ({ loadProgress }) => {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "#000",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'Space Mono', monospace",
      zIndex: 9999,
      overflow: "hidden",
    }}>
      {/* Animated background grid */}
      <div style={{
        position: "absolute",
        inset: "-50%",
        backgroundImage: `
          linear-gradient(rgba(106, 135, 89, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(106, 135, 89, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
        transform: `rotate(${loadProgress * 0.5}deg) scale(${1 + loadProgress * 0.01})`,
        transition: "transform 0.1s",
      }} />
      
      <div style={{
        fontSize: "clamp(80px, 20vw, 200px)",
        fontWeight: "900",
        color: "#fff",
        letterSpacing: "-10px",
        marginBottom: "40px",
        fontFamily: "'Space Grotesk', sans-serif",
        position: "relative",
        zIndex: 2,
      }}>
        {Math.min(Math.floor(loadProgress), 100)}
        <span style={{ 
          fontSize: "0.3em", 
          color: "#7CB663",
          verticalAlign: "super",
        }}>%</span>
      </div>
      
      <div style={{
        width: "300px",
        height: "4px",
        background: "#111",
        position: "relative",
        overflow: "hidden",
        zIndex: 2,
      }}>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          height: "100%",
          width: `${loadProgress}%`,
          background: "linear-gradient(90deg, #7CB663, #8BC34A)",
          transition: "width 0.1s",
          boxShadow: "0 0 20px #7CB663",
        }} />
      </div>
      
      <div style={{
        marginTop: "30px",
        fontSize: "11px",
        color: "#333",
        letterSpacing: "4px",
        zIndex: 2,
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}>
        <Sparkles size={14} color="#7CB663" style={{ animation: "spin 2s linear infinite" }} />
        LOADING BRUTALIST EXPERIENCE
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default WebLoadingScreen;
