import React, { useEffect } from "react";
import { PortfolioProvider, usePortfolio } from "../context/PortfolioContext";
import { getGlobalStyles } from "../styles/globalStyles";

// Components
import LoadingScreen from "../components/LoadingScreen";
import MobileBlocker from "../components/MobileBlocker";
import MenuBar from "../components/MenuBar";
import Toolbar from "../components/Toolbar";
import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";
import Terminal from "../components/Terminal";
import StatusBar from "../components/StatusBar";
import Notifications from "../components/Notifications";

const PortfolioContent = () => {
  const {
    loading,
    setLoading,
    isMobile,
    setIsMobile,
    openTabs,
    setOpenTabs,
    activeFile,
    setActiveFile,
    sidebarWidth,
    sidebarCollapsed,
    setSidebarWidth,
    setSidebarCollapsed,
    terminalHeight,
    terminalCollapsed,
    setTerminalHeight,
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
  } = usePortfolio();

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

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
  }, [loading]);

  // Cursor blinking
  useEffect(() => {
    if (isTyping) {
      const interval = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, 500);
      return () => clearInterval(interval);
    } else {
      setShowCursor(false);
    }
  }, [isTyping]);

  // Sidebar drag resize
  useEffect(() => {
    const handleMouseMove = (e) => {
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
    };

    const handleMouseUp = () => {
      setIsDraggingSidebar(false);
    };

    if (isDraggingSidebar) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDraggingSidebar]);

  // Terminal drag resize
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDraggingTerminal) {
        const newHeight = window.innerHeight - e.clientY;
        if (newHeight < 30) {
          setTerminalHeight(30);
        } else if (newHeight > 100) {
          setTerminalHeight(Math.min(newHeight, window.innerHeight - 150));
        }
      }
    };

    const handleMouseUp = () => {
      setIsDraggingTerminal(false);
    };

    if (isDraggingTerminal) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDraggingTerminal]);

  // Notification system
  const showNotification = (message, type = "info") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  };

  // Open file handler
  const handleOpenFile = (fileName) => {
    if (!openTabs.includes(fileName)) {
      if (openTabs.length >= 5) {
        showNotification("Maximum 5 tabs allowed", "error");
        return;
      }
      setOpenTabs([...openTabs, fileName]);
    }
    setActiveFile(fileName);
    showNotification(`Opened ${fileName}`, "success");

    setTimeout(() => {
      if (editorContentRef.current) {
        editorContentRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 100);
  };

  // Build handler
  const handleBuild = () => {
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
  };

  // Mobile blocker
  if (isMobile) {
    return <MobileBlocker />;
  }

  // Loading screen
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="portfolio-container">
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

// Main Portfolio component with Provider
const Portfolio = () => {
  return (
    <PortfolioProvider>
      <PortfolioContent />
    </PortfolioProvider>
  );
};

export default Portfolio;
