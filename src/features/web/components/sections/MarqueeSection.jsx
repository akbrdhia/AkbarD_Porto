import React from "react";

const MarqueeSection = () => {
  const marqueeText = "ANDROID DEVELOPER • FULL STACK ENTHUSIAST • UI/UX DESIGNER • PROBLEM SOLVER • CLEAN CODE ADVOCATE • ";

  return (
    <div style={{
      overflow: "hidden",
      borderTop: "1px solid #111",
      borderBottom: "1px solid #111",
      padding: "25px 0",
      background: "#030303",
    }}>
      <div style={{
        display: "flex",
        animation: "marquee 25s linear infinite",
        whiteSpace: "nowrap",
      }}>
        {[...Array(4)].map((_, i) => (
          <span key={i} style={{
            fontSize: "clamp(20px, 3.5vw, 40px)",
            fontWeight: "900",
            color: i % 2 === 0 ? "#fff" : "#222",
            letterSpacing: "0.15em",
            paddingRight: "80px",
          }}>
            {marqueeText}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeSection;
