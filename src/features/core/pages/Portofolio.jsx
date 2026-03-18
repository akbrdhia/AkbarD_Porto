import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PortfolioProvider } from "../../../shared/context/PortfolioContext";

// Pages
import ModeSelectionPage from "./ModeSelectionPage";
import WebModePage from "../../web/pages/WebModePage";
import IDEModePage from "../../ide/pages/IDEModePage";

const Portfolio = () => {
  return (
    <PortfolioProvider>
      <Routes>
        <Route path="/" element={<ModeSelectionPage />} />
        <Route path="/web" element={<WebModePage />} />
        <Route path="/ide" element={<IDEModePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PortfolioProvider>
  );
};

export default Portfolio;
