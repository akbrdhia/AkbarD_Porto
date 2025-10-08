import React from "react";
import { Terminal } from "lucide-react";

const MobileBlocker = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#2B2B2B",
        color: "#A9B7C6",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        textAlign: "center",
        fontFamily: "Consolas, Monaco, Courier New, monospace",
      }}
    >
      <Terminal size={64} style={{ marginBottom: "20px", color: "#6A8759" }} />
      <h1
        style={{ fontSize: "24px", marginBottom: "16px", color: "#CC7832" }}
      >
        Desktop Experience Required
      </h1>
      <p
        style={{
          fontSize: "16px",
          lineHeight: "1.6",
          maxWidth: "400px",
          color: "#A9B7C6",
        }}
      >
        This portfolio is designed to replicate the Android Studio experience
        and works best on desktop devices.
      </p>
      <p style={{ fontSize: "14px", marginTop: "16px", color: "#808080" }}>
        Please visit on a desktop or laptop for the full interactive experience.
      </p>
    </div>
  );
};

export default MobileBlocker;