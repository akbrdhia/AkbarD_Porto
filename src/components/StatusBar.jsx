import React from "react";
import { Loader } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

const StatusBar = () => {
  const { gradleSyncing, cursorPosition, buildStatus } = usePortfolio();

  return (
    <div className="status-bar">
      {gradleSyncing ? (
        <div className="status-gradle">
          <Loader size={12} className="gradle-spinner" />
          <span>Syncing Gradle...</span>
        </div>
      ) : (
        <>
          <div className="status-item">
            Ln {cursorPosition.line}, Col {cursorPosition.column}
          </div>
          <div className="status-item">UTF-8</div>
          <div className="status-item">Kotlin</div>
          <div className="status-item">
            <span style={{ color: "#6A8759" }}>⎇</span> main
          </div>
          <div className="status-item" style={{ marginLeft: "auto" }}>
            {buildStatus}
          </div>
        </>
      )}
    </div>
  );
};

export default StatusBar;