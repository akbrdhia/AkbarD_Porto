import React from "react";
import { Minus, Square, X, Play, Loader, Bug, Hammer, Settings, Search, RotateCcw, Monitor } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import { PERSONAL_INFO } from "../constants/portfolioData";

const Toolbar = ({ onBuild }) => {
  const { isBuilding, gradleSyncing } = usePortfolio();

  const handleModeSwitch = () => {
    // Clear session and reload to show mode selector
    sessionStorage.removeItem("portfolio_visited");
    localStorage.removeItem("portfolio_mode");
    window.location.reload();
  };

  return (
    <div className="toolbar">
      {/* Left section - Logo & Title */}
      <div className="toolbar-left">
        <div className="toolbar-logo">
          <img src="/logo.png" alt="logo" width={24} height={24} />
        </div>
        <span className="toolbar-title">
          {PERSONAL_INFO.username} Portfolio
        </span>
        <span className="toolbar-separator">|</span>
        <span className="toolbar-project">app</span>
      </div>

      {/* Center section - Action buttons */}
      <div className="toolbar-center">
        <button
          className="toolbar-action-btn"
          onClick={onBuild}
          disabled={isBuilding}
          title="Build Project (Ctrl+F9)"
        >
          <Hammer size={16} />
        </button>
        
        <button
          className={`toolbar-run-btn ${isBuilding ? 'building' : ''}`}
          onClick={onBuild}
          disabled={isBuilding}
          title="Run 'app' (Shift+F10)"
        >
          {isBuilding ? (
            <Loader size={16} className="gradle-spinner" />
          ) : (
            <Play size={16} fill="currentColor" />
          )}
        </button>

        <button
          className="toolbar-action-btn"
          title="Debug 'app' (Shift+F9)"
          disabled={isBuilding}
        >
          <Bug size={16} />
        </button>

        <div className="toolbar-divider" />

        <button
          className="toolbar-action-btn"
          title="Sync Project with Gradle Files"
          disabled={gradleSyncing}
        >
          <RotateCcw size={16} className={gradleSyncing ? 'gradle-spinner' : ''} />
        </button>

        <div className="toolbar-divider" />

        {/* Mode Switch Button */}
        <button
          className="toolbar-mode-switch"
          onClick={handleModeSwitch}
          title="Switch Mode"
        >
          <Monitor size={14} />
          <span>Switch Mode</span>
        </button>
      </div>

      {/* Right section - Search & Window controls */}
      <div className="toolbar-right">
        <button className="toolbar-action-btn" title="Search Everywhere (Double Shift)">
          <Search size={16} />
        </button>
        <button className="toolbar-action-btn" title="Settings">
          <Settings size={16} />
        </button>

        <div className="toolbar-divider" />

        <div className="window-controls">
          <div className="window-btn" title="Minimize">
            <Minus size={14} />
          </div>
          <div className="window-btn" title="Maximize">
            <Square size={12} />
          </div>
          <div className="window-btn close" title="Close">
            <X size={14} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;