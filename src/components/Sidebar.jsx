import React from "react";
import {
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  Folder,
  FileText,
} from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import { FILE_STRUCTURE } from "../constants/portfolioData";

const Sidebar = ({ onFileOpen }) => {
  const {
    openFolders,
    setOpenFolders,
    activeFile,
    sidebarCollapsed,
    setSidebarCollapsed,
    sidebarWidth,
    setSidebarWidth,
    setIsDraggingSidebar,
    isDraggingSidebar,
  } = usePortfolio();

  const toggleFolder = (folderName) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folderName]: !prev[folderName],
    }));
  };

  const renderFileTree = (structure, path = "") => {
    return Object.entries(structure).map(([name, item]) => {
      const fullPath = path ? `${path}/${name}` : name;

      if (item.type === "folder") {
        const isOpen = openFolders[name];
        return (
          <div key={fullPath}>
            <div
              className="file-tree-item folder"
              onClick={() => toggleFolder(name)}
            >
              {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              <Folder size={16} className="folder-icon" />
              <span>{name}</span>
            </div>
            {isOpen && item.children && (
              <div className="folder-content">
                {renderFileTree(item.children, fullPath)}
              </div>
            )}
          </div>
        );
      } else {
        const isActive = activeFile === name;
        return (
          <div
            key={fullPath}
            className={`file-tree-item file ${isActive ? "active" : ""}`}
            onClick={() => onFileOpen(name)}
          >
            <FileText
              size={16}
              className={`file-icon ${isActive ? "active-file-icon" : ""}`}
            />
            <span>{name}</span>
          </div>
        );
      }
    });
  };

  return (
    <>
      <div className="sidebar">
        <div
          className="sidebar-toggle"
          onClick={() => {
            setSidebarCollapsed(!sidebarCollapsed);
            if (sidebarCollapsed) setSidebarWidth(250);
          }}
        >
          {sidebarCollapsed ? (
            <ChevronRight size={16} />
          ) : (
            <ChevronLeft size={16} />
          )}
        </div>
        {!sidebarCollapsed && (
          <>
            <div className="sidebar-title">Project</div>
            {renderFileTree(FILE_STRUCTURE)}
          </>
        )}
      </div>

      <div
        className={`resize-handle-vertical ${
          isDraggingSidebar ? "dragging" : ""
        }`}
        onMouseDown={() => setIsDraggingSidebar(true)}
      />
    </>
  );
};

export default Sidebar;