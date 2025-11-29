import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { FileText, X } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import { FILE_CONTENTS } from "../constants/portfolioData";
import { highlightKotlin } from "../utils/highlightSyntax";

// Markdown components with custom styling
const markdownComponents = {
  h1: ({ children }) => (
    <h1 style={{ color: "#CC7832", fontSize: "28px", marginBottom: "16px", borderBottom: "1px solid #3C3F41", paddingBottom: "8px" }}>
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 style={{ color: "#6A8759", fontSize: "22px", marginTop: "24px", marginBottom: "12px" }}>
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 style={{ color: "#FFC66D", fontSize: "18px", marginTop: "20px", marginBottom: "10px" }}>
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p style={{ color: "#A9B7C6", lineHeight: "1.8", marginBottom: "12px" }}>
      {children}
    </p>
  ),
  li: ({ children }) => (
    <li style={{ color: "#A9B7C6", marginBottom: "6px", marginLeft: "20px" }}>
      {children}
    </li>
  ),
  ul: ({ children }) => (
    <ul style={{ marginBottom: "16px", listStyleType: "disc" }}>
      {children}
    </ul>
  ),
  hr: () => (
    <hr style={{ border: "none", borderTop: "1px solid #3C3F41", margin: "24px 0" }} />
  ),
  code: ({ children }) => (
    <code style={{ background: "#1E1E1E", padding: "2px 6px", borderRadius: "4px", color: "#6A8759", fontSize: "14px" }}>
      {children}
    </code>
  ),
  a: ({ href, children }) => (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      style={{ 
        color: "#6A8759", 
        textDecoration: "underline", 
        transition: "color 0.2s ease",
        cursor: "pointer"
      }}
      onMouseEnter={(e) => e.target.style.color = "#8BC34A"}
      onMouseLeave={(e) => e.target.style.color = "#6A8759"}
    >
      {children}
    </a>
  ),
};

const Editor = () => {
  const {
    activeFile,
    setActiveFile,
    openTabs,
    setOpenTabs,
    typedFiles,
    setTypedFiles,
    currentTypingLine,
    setCurrentTypingLine,
    currentTypingChar,
    setCurrentTypingChar,
    isTyping,
    setIsTyping,
    showCursor,
    setCursorPosition,
    editorContentRef,
  } = usePortfolio();

  // Auto-typing logic
  useEffect(() => {
    if (!typedFiles[activeFile] && FILE_CONTENTS[activeFile]) {
      setIsTyping(true);
      setCurrentTypingLine(0);
      setCurrentTypingChar(0);

      if (editorContentRef.current) {
        editorContentRef.current.scrollTop = 0;
      }
    } else {
      setIsTyping(false);
    }
  }, [activeFile]);

  useEffect(() => {
    if (isTyping && FILE_CONTENTS[activeFile]) {
      const lines = FILE_CONTENTS[activeFile].split("\n");

      if (currentTypingLine < lines.length) {
        const currentLine = lines[currentTypingLine];

        if (currentTypingChar < currentLine.length) {
          const timeout = setTimeout(() => {
            setCurrentTypingChar(currentTypingChar + 1);
            setCursorPosition({
              line: currentTypingLine + 1,
              column: currentTypingChar + 2,
            });
          }, 2); // Faster typing speed
          return () => clearTimeout(timeout);
        } else {
          const timeout = setTimeout(() => {
            setCurrentTypingLine(currentTypingLine + 1);
            setCurrentTypingChar(0);
          }, 8); // Faster line transition
          return () => clearTimeout(timeout);
        }
      } else {
        setIsTyping(false);
        setTypedFiles((prev) => ({ ...prev, [activeFile]: true }));
      }
    }
  }, [isTyping, currentTypingLine, currentTypingChar, activeFile]);

  const getDisplayedContent = () => {
    if (!FILE_CONTENTS[activeFile]) return "";

    if (typedFiles[activeFile]) {
      return FILE_CONTENTS[activeFile];
    }

    if (isTyping) {
      const lines = FILE_CONTENTS[activeFile].split("\n");
      const displayedLines = lines.slice(0, currentTypingLine + 1);
      if (displayedLines.length > 0) {
        const lastLineIndex = displayedLines.length - 1;
        displayedLines[lastLineIndex] = displayedLines[lastLineIndex].substring(
          0,
          currentTypingChar
        );
      }
      return displayedLines.join("\n");
    }

    return "";
  };

  const closeTab = (fileName, e) => {
    e.stopPropagation();
    const newTabs = openTabs.filter((tab) => tab !== fileName);
    setOpenTabs(newTabs);

    setTypedFiles((prev) => {
      const updated = { ...prev };
      delete updated[fileName];
      return updated;
    });

    if (activeFile === fileName && newTabs.length > 0) {
      setActiveFile(newTabs[newTabs.length - 1]);
    }
  };

  const getBreadcrumb = () => {
    if (activeFile === "README.md") {
      return "Portfolio > README.md";
    }
    return `Portfolio > app > ${activeFile}`;
  };

  return (
    <div className="editor-area">
      <div className="breadcrumb">{getBreadcrumb()}</div>

      <div className="tabs-container">
        {openTabs.map((tab) => (
          <div
            key={tab}
            className={`tab ${activeFile === tab ? "active" : ""}`}
            onClick={() => setActiveFile(tab)}
          >
            <FileText size={14} />
            <span>{tab}</span>
            {openTabs.length > 1 && (
              <div className="tab-close" onClick={(e) => closeTab(tab, e)}>
                <X size={14} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="editor-wrapper">
        <div className="editor-content" ref={editorContentRef}>
          {activeFile && FILE_CONTENTS[activeFile] && (
            <>
              {/* If markdown file is fully typed, render it */}
              {activeFile.endsWith(".md") && typedFiles[activeFile] ? (
                <div className="markdown-content" style={{ animation: "fadeIn 0.5s ease-out" }}>
                  <ReactMarkdown components={markdownComponents}>
                    {FILE_CONTENTS[activeFile]}
                  </ReactMarkdown>
                </div>
              ) : (
                /* Show typing animation for all files (including .md before complete) */
                <div>
                  {getDisplayedContent()
                    .split("\n")
                    .map((line, index) => {
                      const isLastLine = isTyping && index === currentTypingLine;
                      return (
                        <div key={index} className="code-line">
                          <div className="line-number">{index + 1}</div>
                          <div className="line-content">
                            <span
                              dangerouslySetInnerHTML={{
                                __html: activeFile.endsWith(".kt")
                                  ? highlightKotlin(line)
                                  : line || "&nbsp;",
                              }}
                            />
                            {isLastLine && showCursor && (
                              <span className="typing-cursor"></span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </>
          )}
        </div>

        {/* Minimap - only show for code files, not markdown */}
        {activeFile && 
         typedFiles[activeFile] && 
         !activeFile.endsWith(".md") && (
          <div className="minimap">
            <div className="minimap-content">
              {FILE_CONTENTS[activeFile]
                ?.split("\n")
                .map((line, i) => (
                  <div key={i} style={{ 
                    height: "3px", 
                    background: line.trim() ? "#4B5052" : "transparent",
                    marginBottom: "1px",
                    width: `${Math.min(line.length * 0.8, 100)}%`,
                    borderRadius: "1px"
                  }} />
                ))}
            </div>
            <div
              className="minimap-viewport"
              style={{
                top: "10%",
                height: "20%",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Editor;