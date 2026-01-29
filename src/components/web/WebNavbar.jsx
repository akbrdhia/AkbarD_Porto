import React from "react";
import { useNavigate } from "react-router-dom";
import { RefreshCw } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";
import { PERSONAL_INFO } from "../../constants/portfolioData";

const WebNavbar = ({ currentTime }) => {
  const navigate = useNavigate();
  const { setViewMode } = usePortfolio();

  return (
    <div className="fixed top-0 left-0 right-0 h-[50px] bg-black/80 border-b border-[#111] flex justify-between items-center px-[30px] z-[100] backdrop-blur-md font-mono text-[11px] selection:bg-accent-green selection:text-black">
      <div className="flex items-center gap-[30px]">
        <div 
          onClick={() => navigate("/")}
          className="font-black text-base text-accent-green tracking-tighter cursor-pointer hover:glitch-hover"
        >
          AD_
        </div>
        <div className="text-[#ddd] flex gap-5">
          <span className="text-[#eee] uppercase">{PERSONAL_INFO.location?.split(",")[0] || "BOGOR"}</span>
          <span className="text-accent-green">●</span>
          <span className="text-[#eee]">{currentTime.toLocaleTimeString('en-US', { hour12: false })}</span>
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
        className="px-5 py-2 bg-accent-green hover:bg-[#8BC34A] border-none text-black text-[10px] font-bold tracking-widest cursor-pointer font-mono flex items-center gap-2 transition-all hover:skew-x-[-5deg] active:scale-95 shadow-brutal hover:shadow-none"
      >
        <RefreshCw size={12} className="animate-spin-slow" />
        SWITCH MODE
      </button>
    </div>
  );
};

export default WebNavbar;
