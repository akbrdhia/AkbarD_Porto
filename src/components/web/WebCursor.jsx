import React from "react";

const WebCursor = ({ mousePosition, isHovering }) => {
  return (
    <>
      {/* Mouse blob - follows with delay */}
      <div style={{
        position: "fixed",
        left: mousePosition.x - 150,
        top: mousePosition.y - 150,
        width: "300px",
        height: "300px",
        background: `radial-gradient(circle, rgba(124, 182, 99, 0.15) 0%, transparent 70%)`,
        pointerEvents: "none",
        zIndex: 1,
        filter: "blur(30px)",
        willChange: "transform",
        transform: "translate3d(0, 0, 0)",
      }} />

      {/* Cursor ring */}
      <div style={{
        position: "fixed",
        left: mousePosition.x - 20,
        top: mousePosition.y - 20,
        width: "40px",
        height: "40px",
        border: "1px solid rgba(124, 182, 99, 0.5)",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 9998,
        willChange: "transform",
        transform: `translate3d(0, 0, 0) scale(${isHovering ? 1.5 : 1})`,
        transition: "transform 0.15s ease-out",
      }} />

      {/* Cursor dot */}
      <div style={{
        position: "fixed",
        left: mousePosition.x - 4,
        top: mousePosition.y - 4,
        width: "8px",
        height: "8px",
        background: "#7CB663",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 9999,
        willChange: "transform",
        transform: "translate3d(0, 0, 0)",
      }} />
    </>
  );
};

export default WebCursor;
