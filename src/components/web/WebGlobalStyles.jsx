import React from "react";

const WebGlobalStyles = () => {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
      
      * {
        cursor: none !important;
      }

      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.4; transform: scale(0.8); }
      }

      @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }

      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }

      @keyframes scrollLine {
        0%, 100% { opacity: 0.3; transform: scaleY(1); }
        50% { opacity: 1; transform: scaleY(1.2); }
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(40px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes slideInLeft {
        from {
          opacity: 0;
          transform: translateX(-50px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes slideInRight {
        from {
          opacity: 0;
          transform: translateX(50px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      ::selection {
        background: #8BC34A;
        color: #000;
      }

      ::-webkit-scrollbar {
        width: 8px;
      }

      ::-webkit-scrollbar-track {
        background: #0a0a0a;
      }

      ::-webkit-scrollbar-thumb {
        background: #222;
        border-radius: 4px;
        transition: background 0.3s;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: #8BC34A;
      }

      html {
        scroll-behavior: smooth;
      }

      section {
        scroll-margin-top: 60px;
      }

      @media (max-width: 900px) {
        section > div[style*="gridTemplateColumns: 1fr 1fr"] {
          grid-template-columns: 1fr !important;
        }
      }
    `}</style>
  );
};

export default WebGlobalStyles;
