import React from "react";
import { Minus, Square, X, Play, Loader } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import { PERSONAL_INFO } from "../constants/portfolioData";

const Toolbar = ({ onBuild }) => {
  const { isBuilding } = usePortfolio();

  return (
    <div className="toolbar">
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          color: "#6A8759",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        {PERSONAL_INFO.username} Portfolio
      </span>

      <button
        className="build-btn"
        onClick={onBuild}
        disabled={isBuilding}
      >
        {isBuilding ? (
          <Loader size={14} className="gradle-spinner" />
        ) : (
          <Play size={14} />
        )}
        {isBuilding ? "Building..." : "Build"}
      </button>

      <div className="window-controls">
        <div className="window-btn">
          <Minus size={16} />
        </div>
        <div className="window-btn">
          <Square size={14} />
        </div>
        <div className="window-btn">
          <X size={16} />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;