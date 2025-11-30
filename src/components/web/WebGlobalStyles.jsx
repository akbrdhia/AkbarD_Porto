import React from "react";

const WebGlobalStyles = () => {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
      
      * {
        cursor: none !important;
      }

      /* ========== SCROLL REVEAL ANIMATIONS ========== */
      .reveal {
        opacity: 0;
        transform: translateY(60px);
        transition: all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1);
      }

      .reveal.active {
        opacity: 1;
        transform: translateY(0);
      }

      .reveal-left {
        opacity: 0;
        transform: translateX(-80px);
        transition: all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1);
      }

      .reveal-left.active {
        opacity: 1;
        transform: translateX(0);
      }

      .reveal-right {
        opacity: 0;
        transform: translateX(80px);
        transition: all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1);
      }

      .reveal-right.active {
        opacity: 1;
        transform: translateX(0);
      }

      .reveal-scale {
        opacity: 0;
        transform: scale(0.8);
        transition: all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1);
      }

      .reveal-scale.active {
        opacity: 1;
        transform: scale(1);
      }

      .reveal-rotate {
        opacity: 0;
        transform: rotate(-5deg) translateY(40px);
        transition: all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1);
      }

      .reveal-rotate.active {
        opacity: 1;
        transform: rotate(0) translateY(0);
      }

      /* Stagger delays */
      .delay-1 { transition-delay: 0.1s; }
      .delay-2 { transition-delay: 0.2s; }
      .delay-3 { transition-delay: 0.3s; }
      .delay-4 { transition-delay: 0.4s; }
      .delay-5 { transition-delay: 0.5s; }
      .delay-6 { transition-delay: 0.6s; }
      .delay-7 { transition-delay: 0.7s; }
      .delay-8 { transition-delay: 0.8s; }

      /* ========== KEYFRAMES ========== */
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

      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
      }

      @keyframes glowPulse {
        0%, 100% { box-shadow: 0 0 20px rgba(124, 182, 99, 0.3); }
        50% { box-shadow: 0 0 40px rgba(124, 182, 99, 0.6); }
      }

      @keyframes textShimmer {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
      }

      @keyframes cursorNoiseDrift {
        0% { transform: translate3d(0,0,0) scale(0.9) rotate(-2deg); opacity: 0.35; }
        50% { transform: translate3d(0,0,0) scale(1.05) rotate(3deg); opacity: 0.55; }
        100% { transform: translate3d(0,0,0) scale(0.92) rotate(-1deg); opacity: 0.4; }
      }

      @keyframes heroGlowDrift {
        0% { transform: translate3d(0, 0, 0) scale(0.95); opacity: 0.4; }
        50% { transform: translate3d(20px, -20px, 0) scale(1.05); opacity: 0.6; }
        100% { transform: translate3d(-15px, 15px, 0) scale(0.9); opacity: 0.35; }
      }

      @keyframes heroScan {
        0% { transform: translateX(-40%) skewX(-8deg); }
        50% { transform: translateX(20%) skewX(-8deg); }
        100% { transform: translateX(-40%) skewX(-8deg); }
      }

      @keyframes cursorCrosshairBlink {
        0%, 100% { opacity: 0.2; }
        50% { opacity: 1; }
      }

      @keyframes cursorPixelPulse {
        0%, 100% { transform: translate3d(0,0,0) scale(0.8); opacity: 0.6; }
        50% { transform: translate3d(0,-4px,0) scale(1.25); opacity: 1; }
      }

      @keyframes cursorLabelShimmer {
        0% { background-position: -150% center; }
        100% { background-position: 150% center; }
      }

      @keyframes borderDance {
        0%, 100% { border-color: #222; }
        50% { border-color: #7CB663; }
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
