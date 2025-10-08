import React, { useEffect } from "react";
import { FileText, X } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import { FILE_CONTENTS } from "../constants/portfolioData";
import { highlightKotlin } from "../utils/highlightSyntax";

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
          }, 5);
          return () => clearTimeout(timeout);
        } else {
          const timeout = setTimeout(() => {
            setCurrentTypingLine(currentTypingLine + 1);
            setCurrentTypingChar(0);
          }, 20);
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
        </div>

        {/* Minimap */}
        {activeFile && typedFiles[activeFile] && (
          <div className="minimap">
            <div className="minimap-content">
              {FILE_CONTENTS[activeFile]?.substring(0, 2000)}
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