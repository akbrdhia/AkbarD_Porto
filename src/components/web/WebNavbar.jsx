import React from "react";
import { useNavigate } from "react-router-dom";
import { RefreshCw } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";
import { PERSONAL_INFO } from "../../constants/portfolioData";

const WebNavbar = ({ currentTime }) => {
  const navigate = useNavigate();
  const { setViewMode } = usePortfolio();

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      height: "50px",
      background: "rgba(0,0,0,0.8)",
      borderBottom: "1px solid #111",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 30px",
      zIndex: 100,
      backdropFilter: "blur(20px)",
      fontFamily: "'Space Mono', monospace",
      fontSize: "11px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
        <div 
          onClick={() => navigate("/")}
          style={{ 
            fontWeight: "900", 
            fontSize: "16px",
            color: "#7CB663",
            letterSpacing: "-1px",
            cursor: "pointer"
          }}
        >
          AD_
        </div>
        <div style={{ color: "#ddd", display: "flex", gap: "20px" }}>
          <span style={{ color: "#eee" }}>{PERSONAL_INFO.location?.split(",")[0] || "BOGOR"}</span>
          <span style={{ color: "#7CB663" }}>●</span>
          <span style={{ color: "#eee" }}>{currentTime.toLocaleTimeString('en-US', { hour12: false })}</span>
        </div>
      </div>
      <button
        onClick={() => {
          // Clear session and navigate to mode selector
          sessionStorage.removeItem("portfolio_visited");
          localStorage.removeItem("portfolio_mode");
          if (setViewMode) setViewMode(null);
          navigate("/");
        }}
        style={{
          padding: "8px 20px",
          background: "#7CB663",
          border: "none",
          color: "#000",
          fontSize: "10px",
          fontWeight: "700",
          letterSpacing: "1px",
          cursor: "pointer",
          fontFamily: "'Space Mono', monospace",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "skewX(-5deg)";
          e.currentTarget.style.background = "#8BC34A";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "skewX(0)";
          e.currentTarget.style.background = "#7CB663";
        }}
      >
        <RefreshCw size={12} />
        SWITCH MODE
      </button>
    </div>
  );
};

export default WebNavbar;
