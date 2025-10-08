import React from "react";
import { PERSONAL_INFO } from "../constants/portfolioData";

const LoadingScreen = () => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background:
          "linear-gradient(135deg, #1a1a1a 0%, #2B2B2B 50%, #1a1a1a 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Consolas, Monaco, Courier New, monospace",
        zIndex: 9999,
      }}
    >
      <div style={{ textAlign: "center", position: "relative" }}>
        {/* Android Robot Icon */}
        <div
          style={{
            width: "120px",
            height: "120px",
            margin: "0 auto 30px",
            position: "relative",
            animation: "float 3s ease-in-out infinite",
          }}
        >
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            style={{
              filter: "drop-shadow(0 0 20px rgba(106, 135, 89, 0.5))",
            }}
          >
            <rect
              x="30"
              y="40"
              width="60"
              height="50"
              rx="5"
              fill="#6A8759"
              opacity="0.9"
            />
            <circle cx="45" cy="55" r="4" fill="#2B2B2B" />
            <circle cx="75" cy="55" r="4" fill="#2B2B2B" />
            <line
              x1="40"
              y1="35"
              x2="30"
              y2="20"
              stroke="#6A8759"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              x1="80"
              y1="35"
              x2="90"
              y2="20"
              stroke="#6A8759"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <rect
              x="15"
              y="45"
              width="10"
              height="35"
              rx="5"
              fill="#6A8759"
              opacity="0.9"
            />
            <rect
              x="95"
              y="45"
              width="10"
              height="35"
              rx="5"
              fill="#6A8759"
              opacity="0.9"
            />
            <rect
              x="40"
              y="92"
              width="12"
              height="25"
              rx="6"
              fill="#6A8759"
              opacity="0.9"
            />
            <rect
              x="68"
              y="92"
              width="12"
              height="25"
              rx="6"
              fill="#6A8759"
              opacity="0.9"
            />
          </svg>
        </div>

        {/* Loading Bar */}
        <div
          style={{
            width: "300px",
            height: "4px",
            background: "#3C3F41",
            borderRadius: "2px",
            overflow: "hidden",
            marginBottom: "20px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
          }}
        >
          <div
            style={{
              height: "100%",
              background: "linear-gradient(90deg, #6A8759, #8BC34A, #6A8759)",
              backgroundSize: "200% 100%",
              animation: "loadingBar 1.5s ease-in-out infinite",
              boxShadow: "0 0 10px rgba(106, 135, 89, 0.5)",
            }}
          ></div>
        </div>

        {/* Text */}
        <div
          style={{
            color: "#6A8759",
            fontSize: "20px",
            marginBottom: "8px",
            fontWeight: "bold",
            letterSpacing: "1px",
            animation: "pulse 2s ease-in-out infinite",
          }}
        >
          AkbarD Studio
        </div>
        <div
          style={{
            color: "#A9B7C6",
            fontSize: "14px",
            marginBottom: "4px",
          }}
        >
          Loading {PERSONAL_INFO.username}'s Portfolio...
        </div>
        <div
          style={{
            color: "#808080",
            fontSize: "12px",
            animation: "fadeInOut 2s ease-in-out infinite",
          }}
        >
          Initializing Kotlin environment
        </div>

        {/* Dots animation */}
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            gap: "8px",
            justifyContent: "center",
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#6A8759",
                animation: `dotBounce 1.4s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes loadingBar {
          0% { 
            background-position: 0% 0%;
            width: 0%;
          }
          50% {
            width: 70%;
          }
          100% { 
            background-position: 200% 0%;
            width: 100%;
          }
        }

        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          25% {
            transform: translateY(-10px) rotate(-2deg);
          }
          50% { 
            transform: translateY(-15px) rotate(0deg); 
          }
          75% {
            transform: translateY(-10px) rotate(2deg);
          }
        }

        @keyframes pulse {
          0%, 100% { 
            opacity: 1;
            transform: scale(1);
          }
          50% { 
            opacity: 0.8;
            transform: scale(1.02);
          }
        }

        @keyframes fadeInOut {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        @keyframes dotBounce {
          0%, 80%, 100% { 
            transform: translateY(0) scale(1);
            opacity: 0.5;
          }
          40% { 
            transform: translateY(-15px) scale(1.2);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;