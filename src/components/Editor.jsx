import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { FileText, X } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import { FILE_CONTENTS } from "../constants/portfolioData";
import { highlightKotlin } from "../utils/highlightSyntax";
import { markdownComponents } from "./MarkdownComponents";

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

  // Instant rendering logic (no auto-typing)
  useEffect(() => {
    if (!typedFiles[activeFile] && FILE_CONTENTS[activeFile]) {
      setTypedFiles((prev) => ({ ...prev, [activeFile]: true }));
      setIsTyping(false);
      if (editorContentRef.current) {
        editorContentRef.current.scrollTop = 0;
      }
    }
  }, [activeFile, typedFiles, setTypedFiles, setIsTyping, editorContentRef]);

  const getDisplayedContent = () => {
    if (!FILE_CONTENTS[activeFile]) return "";
    return FILE_CONTENTS[activeFile];
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
                  <ReactMarkdown 
                    components={markdownComponents}
                    rehypePlugins={[rehypeRaw]}
                  >
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