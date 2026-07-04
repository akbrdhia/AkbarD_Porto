import React, { useEffect } from "react";
import {
  Terminal as TerminalIcon,
  ChevronUp,
  ChevronDown,
  Maximize2,
} from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import { WELCOME_MESSAGES } from "../constants/portfolioData";
import { processCommand } from "../utils/terminalCommands";

const Terminal = ({ onFileOpen, onBuild }) => {
  const {
    terminalInput,
    setTerminalInput,
    terminalHistory,
    setTerminalHistory,
    commandHistory,
    setCommandHistory,
    historyIndex,
    setHistoryIndex,
    currentPath,
    terminalCollapsed,
    setTerminalCollapsed,
    terminalHeight,
    setTerminalHeight,
    isDraggingTerminal,
    setIsDraggingTerminal,
    terminalEndRef,
    terminalInputRef,
    autoTypingIndex,
    setAutoTypingIndex,
    loading,
  } = usePortfolio();
  

  // Auto-typing welcome message
  useEffect(() => {
    if (!loading && autoTypingIndex < WELCOME_MESSAGES.length) {
      const timer = setTimeout(() => {
        setTerminalHistory((prev) => [
          ...prev,
          {
            type: "output",
            text: WELCOME_MESSAGES[autoTypingIndex],
          },
        ]);
        setAutoTypingIndex(autoTypingIndex + 1);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [loading, autoTypingIndex]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalHistory]);

  const handleTerminalCommand = (e) => {
    if (e.key === "Enter") {
      const command = terminalInput.trim();
      if (command) {
        setCommandHistory((prev) => [...prev.slice(-9), command]);
        setTerminalHistory((prev) => [
          ...prev,
          { type: "input", text: `${currentPath} $ ${command}` },
        ]);
        processCommand(
          command,
          setTerminalHistory,
          onFileOpen,
          onBuild,
          setCommandHistory,
          setHistoryIndex,
          currentPath
        );
      }
      setTerminalInput("");
      setHistoryIndex(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex < commandHistory.length - 1
            ? historyIndex + 1
            : historyIndex;
        setHistoryIndex(newIndex);
        setTerminalInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setTerminalInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setTerminalInput("");
      }
    }
  };

  return (
    <>
      <div
        className={`resize-handle-horizontal ${
          isDraggingTerminal ? "dragging" : ""
        }`}
        onMouseDown={() => setIsDraggingTerminal(true)}
      />

      <div className="terminal">
        <div
          className="terminal-header"
          onClick={() => setTerminalCollapsed(!terminalCollapsed)}
        >
          <TerminalIcon size={14} />
          <span>Terminal</span>
          <div className="terminal-controls">
            <div
              className="terminal-btn"
              onClick={(e) => {
                e.stopPropagation();
                setTerminalHeight(window.innerHeight - 150);
              }}
              title="Maximize"
            >
              <Maximize2 size={14} />
            </div>
            <div
              className="terminal-btn"
              onClick={(e) => {
                e.stopPropagation();
                setTerminalCollapsed(!terminalCollapsed);
              }}
              title="Collapse/Expand"
            >
              {terminalCollapsed ? (
                <ChevronUp size={14} />
              ) : (
                <ChevronDown size={14} />
              )}
            </div>
          </div>
        </div>
        <div className="terminal-content">
          {terminalHistory.map((entry, index) => (
            <div key={index} className={`terminal-line ${entry.type}`}>
              {entry.text}
            </div>
          ))}
          <div className="terminal-input-line">
            <span className="terminal-prompt">{currentPath} $</span>
            <input
              ref={terminalInputRef}
              type="text"
              className="terminal-input"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              onKeyDown={handleTerminalCommand}
              placeholder="Type 'help' for commands..."
              autoFocus
            />
          </div>
          <div ref={terminalEndRef} />
        </div>
      </div>
    </>
  );
};

export default Terminal;