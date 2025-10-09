import React, { createContext, useContext, useState, useRef } from "react";

const PortfolioContext = createContext();

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within PortfolioProvider");
  }
  return context;
};

export const PortfolioProvider = ({ children }) => {
  // Loading & Mobile
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Folders & Files
  const [openFolders, setOpenFolders] = useState({ Portfolio: true, app: true });
  const [activeFile, setActiveFile] = useState("README.md");
  const [openTabs, setOpenTabs] = useState(["README.md"]);
  const [typedFiles, setTypedFiles] = useState({});

  // Terminal
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentPath] = useState("~/AkbarD");
  const [autoTypingIndex, setAutoTypingIndex] = useState(0);

  // Layout
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [terminalHeight, setTerminalHeight] = useState(200);
  const [isDraggingSidebar, setIsDraggingSidebar] = useState(false);
  const [isDraggingTerminal, setIsDraggingTerminal] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [terminalCollapsed, setTerminalCollapsed] = useState(false);

  // Typing Animation
  const [currentTypingLine, setCurrentTypingLine] = useState(0);
  const [currentTypingChar, setCurrentTypingChar] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Build & Status
  const [notifications, setNotifications] = useState([]);
  const [isBuilding, setIsBuilding] = useState(false);
  const [gradleSyncing, setGradleSyncing] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
  const [buildStatus, setBuildStatus] = useState("Ready");

  // Refs
  const terminalEndRef = useRef(null);
  const terminalInputRef = useRef(null);
  const editorContentRef = useRef(null);

  const value = {
    // State
    loading,
    setLoading,
    isMobile,
    setIsMobile,
    openFolders,
    setOpenFolders,
    activeFile,
    setActiveFile,
    openTabs,
    setOpenTabs,
    typedFiles,
    setTypedFiles,
    terminalInput,
    setTerminalInput,
    terminalHistory,
    setTerminalHistory,
    commandHistory,
    setCommandHistory,
    historyIndex,
    setHistoryIndex,
    currentPath,
    autoTypingIndex,
    setAutoTypingIndex,
    sidebarWidth,
    setSidebarWidth,
    terminalHeight,
    setTerminalHeight,
    isDraggingSidebar,
    setIsDraggingSidebar,
    isDraggingTerminal,
    setIsDraggingTerminal,
    sidebarCollapsed,
    setSidebarCollapsed,
    terminalCollapsed,
    setTerminalCollapsed,
    currentTypingLine,
    setCurrentTypingLine,
    currentTypingChar,
    setCurrentTypingChar,
    isTyping,
    setIsTyping,
    showCursor,
    setShowCursor,
    notifications,
    setNotifications,
    isBuilding,
    setIsBuilding,
    gradleSyncing,
    setGradleSyncing,
    cursorPosition,
    setCursorPosition,
    buildStatus,
    setBuildStatus,
    // Refs
    terminalEndRef,
    terminalInputRef,
    editorContentRef,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};