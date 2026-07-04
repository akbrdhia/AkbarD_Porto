import React, { useEffect, useCallback } from "react";
import { getGlobalStyles } from "../styles/globalStyles";
import { usePortfolio } from "../context/PortfolioContext";

// Components
import MobileBlocker from "../components/MobileBlocker";
import MenuBar from "../components/MenuBar";
import Toolbar from "../components/Toolbar";
import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";
import Terminal from "../components/Terminal";
import StatusBar from "../components/StatusBar";
import Notifications from "../components/Notifications";
import SEO from "../components/SEO";

const IDEModePage = () => {
  const {
    loading,
    initialized,
    isMobile,
    setIsMobile,
    setOpenTabs,
    setActiveFile,
    sidebarWidth,
    sidebarCollapsed,
    setSidebarWidth,
    setSidebarCollapsed,
    terminalHeight,
    terminalCollapsed,
    setTerminalHeight,
    setTerminalCollapsed,
    isDraggingSidebar,
    setIsDraggingSidebar,
    isDraggingTerminal,
    setIsDraggingTerminal,
    setNotifications,
    setIsBuilding,
    setTerminalHistory,
    setGradleSyncing,
    setBuildStatus,
    setShowCursor,
    isTyping,
    editorContentRef,
    setViewMode,
  } = usePortfolio();

  // Set view mode to IDE when this page mounts
  useEffect(() => {
    setViewMode && setViewMode("ide");
  }, [setViewMode]);

  // Notification helper
  const showNotification = useCallback((message, type = "info") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  }, [setNotifications]);

  // Open file handler
  const handleOpenFile = useCallback((fileName) => {
    setOpenTabs((prevTabs) => {
      if (prevTabs.includes(fileName)) return prevTabs;
      if (prevTabs.length >= 5) {
        showNotification("Maximum 5 tabs allowed", "error");
        return prevTabs;
      }
      return [...prevTabs, fileName];
    });

    setActiveFile(fileName);
    showNotification(`Opened ${fileName}`, "success");

    setTimeout(() => {
      if (editorContentRef.current) {
        editorContentRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 100);
  }, [setOpenTabs, setActiveFile, editorContentRef, showNotification]);

  // Build handler
  const handleBuild = useCallback(() => {
    setIsBuilding(true);
    setBuildStatus("Building...");
    showNotification("Build started", "info");

    const buildLogs = [
      "",
      "> Task :app:preBuild UP-TO-DATE",
      "> Task :app:preDebugBuild UP-TO-DATE",
      "> Task :app:compileDebugKotlin",
      "> Task :app:javaPreCompileDebug",
      "> Task :app:compileDebugJavaWithJavac",
      "> Task :app:compileDebugSources",
      "> Task :app:mergeDebugResources",
      "> Task :app:processDebugManifest",
      "> Task :app:processDebugResources",
      "> Task :app:kaptGenerateStubsDebugKotlin",
      "> Task :app:kaptDebugKotlin",
      "> Task :app:mergeDebugAssets",
      "> Task :app:packageDebug",
      "> Task :app:assembleDebug",
      "",
      "BUILD SUCCESSFUL in 3s",
      "42 actionable tasks: 12 executed, 30 up-to-date",
      "",
      "✓ Build completed successfully",
      "📦 APK generated: app-debug.apk (8.4 MB)",
      "🎯 Ready to install on device",
      "",
    ];

    buildLogs.forEach((log, index) => {
      setTimeout(() => {
        setTerminalHistory((prev) => [
          ...prev,
          {
            type: log.includes("✓") || log.includes("SUCCESSFUL") ? "output" : "output",
            text: log,
          },
        ]);

        if (index === buildLogs.length - 1) {
          setIsBuilding(false);
          setBuildStatus("Build successful in 3.2s");
          showNotification("Build completed successfully", "success");
        }
      }, index * 150);
    });
  }, [setIsBuilding, setBuildStatus, setTerminalHistory, showNotification]);

  // Mobile check
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [setIsMobile]);

  // Gradle sync
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setGradleSyncing(false);
        setBuildStatus("Build successful in 3.2s");
        showNotification("Gradle sync completed", "success");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [loading, setGradleSyncing, setBuildStatus, showNotification]);

  // Consolidate Resize Observers
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Sidebar handling
      if (isDraggingSidebar) {
        const newWidth = e.clientX;
        if (newWidth < 50) {
          setSidebarCollapsed(true);
          setSidebarWidth(0);
        } else if (newWidth > 150 && newWidth < 500) {
          setSidebarCollapsed(false);
          setSidebarWidth(newWidth);
        }
      }
      
      // Terminal handling
      if (isDraggingTerminal) {
        const newHeight = window.innerHeight - e.clientY;
        if (newHeight < 30) {
          setTerminalCollapsed(true);
          setTerminalHeight(30);
        } else if (newHeight > 100) {
          setTerminalCollapsed(false);
          setTerminalHeight(Math.min(newHeight, window.innerHeight - 150));
        }
      }
    };

    const handleMouseUp = () => {
      setIsDraggingSidebar(false);
      setIsDraggingTerminal(false);
    };

    if (isDraggingSidebar || isDraggingTerminal) {
      document.addEventListener("mousemove", handleMouseMove, { passive: true });
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDraggingSidebar, isDraggingTerminal, setSidebarCollapsed, setSidebarWidth, setIsDraggingSidebar, setTerminalHeight, setTerminalCollapsed, setIsDraggingTerminal]);

  // Mobile blocker
  if (isMobile) {
    return <MobileBlocker />;
  }

  // Wait for initialization
  if (!initialized) {
    return (
      <div style={{
        position: "fixed",
        inset: 0,
        background: "#0a0a0a",
      }} />
    );
  }

  return (
    <div className="portfolio-container">
      <SEO 
        title="Interactive IDE Portfolio Studio" 
        description="Step into an interactive Android Studio environment to explore Akbar Dhia's mobile development projects. Experience code, architecture, and project simulations first-hand."
        url="/ide"
      />
      <style>
        {getGlobalStyles(
          sidebarCollapsed,
          sidebarWidth,
          terminalCollapsed,
          terminalHeight
        )}
      </style>

      <Notifications />
      <MenuBar />
      <Toolbar onBuild={handleBuild} />

      <div className="main-content">
        <Sidebar onFileOpen={handleOpenFile} />
        <Editor />
      </div>

      <Terminal onFileOpen={handleOpenFile} onBuild={handleBuild} />
      <StatusBar />
    </div>
  );
};

export default IDEModePage;
