import React, { useEffect, useState } from "react";

const WebCursor = ({ mousePosition = { x: 0, y: 0 }, interactiveLabel }) => {
  const { x, y } = mousePosition;
  const hasInteractiveTarget = Boolean(interactiveLabel);
  const accentColor = hasInteractiveTarget ? "#FF004D" : "#7CB663";
  const frameSize = hasInteractiveTarget ? 70 : 54;
  const typingText = "Akbar D // Developer";
  const [typedLabel, setTypedLabel] = useState("");
  const [typingComplete, setTypingComplete] = useState(false);
  const [selectionRect, setSelectionRect] = useState(null);
  const [selectionDisplayRect, setSelectionDisplayRect] = useState(null);
  const cursorPositionRef = React.useRef(mousePosition);
  const selectionActiveRef = React.useRef(false);
  const animationFrameRef = React.useRef(null);

  useEffect(() => {
    cursorPositionRef.current = mousePosition;
  }, [mousePosition]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedLabel(typingText.slice(0, index + 1));
      index += 1;

      if (index >= typingText.length) {
        clearInterval(interval);
        setTypingComplete(true);
      }
    }, 130);

    return () => clearInterval(interval);
  }, [typingText]);

  const formatCoordinate = (value) =>
    String(Math.max(0, Math.round(value))).padStart(4, "0");
  const coordinateReadout = `${formatCoordinate(x)} · ${formatCoordinate(y)}`;

  useEffect(() => {
    const updateSelectionRect = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
        selectionActiveRef.current = false;
        setSelectionRect(null);
        setSelectionDisplayRect(null);
        return;
      }

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      if (!rect || rect.width === 0 || rect.height === 0) {
        selectionActiveRef.current = false;
        setSelectionRect(null);
        setSelectionDisplayRect(null);
        return;
      }

      const targetRect = {
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
      };

      setSelectionRect(targetRect);

      if (!selectionActiveRef.current) {
        selectionActiveRef.current = true;
        const { x: cursorX, y: cursorY } = cursorPositionRef.current;
        const startRect = {
          x: cursorX - frameSize / 2,
          y: cursorY - frameSize / 2,
          width: frameSize,
          height: frameSize,
        };

        setSelectionDisplayRect(startRect);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        animationFrameRef.current = requestAnimationFrame(() => {
          setSelectionDisplayRect(targetRect);
        });
      } else {
        setSelectionDisplayRect(targetRect);
      }
    };

    document.addEventListener("selectionchange", updateSelectionRect);
    window.addEventListener("scroll", updateSelectionRect, true);
    window.addEventListener("resize", updateSelectionRect);

    return () => {
      document.removeEventListener("selectionchange", updateSelectionRect);
      window.removeEventListener("scroll", updateSelectionRect, true);
      window.removeEventListener("resize", updateSelectionRect);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [frameSize]);

  const isWrappingSelection = Boolean(selectionDisplayRect);
  const interactiveLabelText = hasInteractiveTarget
    ? (() => {
        const normalized = interactiveLabel.replace(/\s+/g, " ").trim().toUpperCase();
        return normalized.length > 28 ? `${normalized.slice(0, 27)}…` : normalized;
      })()
    : "";

  return (
    <>
      {!isWrappingSelection && (
        <>
          {/* Subtle halo */}
          <div
            style={{
              position: "fixed",
              left: x - 120,
              top: y - 120,
              width: "240px",
              height: "240px",
              borderRadius: "12%",
              background: `radial-gradient(circle, ${accentColor}15 0%, transparent 65%)`,
              border: "1px solid rgba(255,255,255,0.02)",
              pointerEvents: "none",
              zIndex: 1,
              opacity: 0.35,
              filter: "blur(6px)",
              boxShadow: "0 0 60px rgba(0,0,0,0.4)",
              animation: "cursorNoiseDrift 9s ease-in-out infinite",
            }}
          />

          {/* Outer frame */}
          <div
            style={{
              position: "fixed",
              left: x - frameSize / 2,
              top: y - frameSize / 2,
              width: `${frameSize}px`,
              height: `${frameSize}px`,
              border: `2px solid ${accentColor}`,
              borderRadius: "8px",
              background: "rgba(10, 10, 10, 0.65)",
              boxShadow: "6px 6px 0 rgba(0,0,0,0.6)",
              pointerEvents: "none",
              zIndex: 9998,
              willChange: "transform",
              transform: `translate3d(0, 0, 0) rotate(${hasInteractiveTarget ? 6 : 0}deg)`,
              transition: "all 150ms ease-out",
            }}
          />
        </>
      )}

      {/* Crosshair accents */}
      <div
        style={{
          position: "fixed",
          left: x - 1,
          top: y - 18,
          width: "2px",
          height: "36px",
          background: accentColor,
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0.9,
          animation: "cursorCrosshairBlink 1s steps(2, end) infinite",
        }}
      />
      <div
        style={{
          position: "fixed",
          left: x - 5,
          top: y - 5,
          width: "10px",
          height: "10px",
          borderRadius: "2px",
          border: `1px solid ${accentColor}`,
          background: "#050505",
          pointerEvents: "none",
          zIndex: 9999,
          animation: "cursorPixelPulse 1.3s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "fixed",
          left: x - 18,
          top: y - 1,
          width: "36px",
          height: "2px",
          background: accentColor,
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0.9,
          animation: "cursorCrosshairBlink 1s steps(2, end) infinite",
        }}
      />

      {/* Selection wrap */}
      {selectionDisplayRect && (
        <div
          style={{
            position: "fixed",
            left: selectionDisplayRect.x - 8,
            top: selectionDisplayRect.y - 6,
            width: selectionDisplayRect.width + 16,
            height: selectionDisplayRect.height + 12,
            border: `1.5px solid ${accentColor}`,
            borderRadius: "6px",
            background: "rgba(5, 5, 5, 0.4)",
            boxShadow: "4px 4px 0 rgba(0,0,0,0.45)",
            mixBlendMode: "normal",
            pointerEvents: "none",
            zIndex: 9994,
            transition: "all 140ms cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        />
      )}

      {/* Info label */}
      <div
        style={{
          position: "fixed",
          left: x + 26,
          top: y + 24,
          width: "170px",
          backgroundImage: `linear-gradient(145deg, rgba(8,8,8,0.95), rgba(20,20,20,0.8))`,
          color: "#F4F4F0",
          padding: "10px",
          border: `1.5px solid ${accentColor}`,
          borderRadius: "4px",
          fontSize: "10px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          fontWeight: 600,
          fontFamily: "'Space Mono', 'IBM Plex Mono', monospace",
          pointerEvents: "none",
          zIndex: 9997,
          boxShadow: "6px 6px 0 rgba(0,0,0,0.35)",
          transition: "all 150ms ease-out",
          transform: `translate3d(0, 0, 0) translateY(${hasInteractiveTarget ? "-4px" : "0"})`,
          animation: "cursorLabelShimmer 4s linear infinite",
        }}
      >
        <div
          style={{
            opacity: 0.9,
            display: "flex",
            alignItems: "center",
            gap: "6px",
            letterSpacing: "0.3em",
          }}
        >
          {hasInteractiveTarget ? (
            <span>{interactiveLabelText}</span>
          ) : (
            <>
              <span>{typedLabel || "\u00A0"}</span>
              <span
                style={{
                  width: "2px",
                  height: "14px",
                  background: accentColor,
                  animation: typingComplete ? "blink 1s steps(2, start) infinite" : "none",
                }}
              />
            </>
          )}
        </div>
        <div
          style={{
            fontSize: "11px",
            letterSpacing: "0.6em",
            marginTop: "6px",
            color: accentColor,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{hasInteractiveTarget ? "CLICK" : "\u00A0"}</span>
          <span style={{ letterSpacing: "0.1em", color: "#8D8D8D" }}>{coordinateReadout}</span>
        </div>
      </div>
    </>
  );
};

export default WebCursor;
