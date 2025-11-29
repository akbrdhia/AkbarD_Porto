/**
 * Global CSS Styles for Portfolio
 * Android Studio Darcula Theme
 */
export const getGlobalStyles = (
    sidebarCollapsed,
    sidebarWidth,
    terminalCollapsed,
    terminalHeight
  ) => `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
  
    .portfolio-container {
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      background: #2B2B2B;
      color: #A9B7C6;
      font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
      overflow: hidden;
    }
  
    .menu-bar {
      background: #3C3F41;
      height: 28px;
      display: flex;
      align-items: center;
      padding: 0 10px;
      border-bottom: 1px solid #232525;
      font-size: 12px;
    }
  
    .menu-item {
      padding: 4px 12px;
      cursor: pointer;
      transition: background 0.2s ease;
    }
  
    .menu-item:hover {
      background: #4B4F52;
    }
  
    .toolbar {
      background: #3C3F41;
      height: 36px;
      display: flex;
      align-items: center;
      padding: 0 10px;
      border-bottom: 1px solid #232525;
      gap: 12px;
    }
  
    .build-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      font-family: inherit;
      transition: all 0.2s ease;
    }
  
    .build-btn:hover:not(:disabled) {
      background: #45a049;
      transform: translateY(-1px);
    }
  
    .build-btn:disabled {
      background: #666;
      cursor: not-allowed;
    }
  
    .window-controls {
      display: flex;
      gap: 8px;
      margin-left: auto;
    }
  
    .window-btn {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-radius: 4px;
      transition: background 0.2s ease;
    }
  
    .window-btn:hover {
      background: #4B4F52;
    }
  
    .main-content {
      display: flex;
      flex: 1;
      overflow: hidden;
    }
  
    .sidebar {
      width: ${sidebarCollapsed ? "0" : `${sidebarWidth}px`};
      background: #313335;
      border-right: 1px solid #232525;
      overflow-y: auto;
      overflow-x: hidden;
      padding: ${sidebarCollapsed ? "0" : "8px 0"};
      transition: width 0.3s ease, padding 0.3s ease;
      position: relative;
    }
  
    .sidebar-toggle {
      position: absolute;
      top: 8px;
      right: ${sidebarCollapsed ? "-32px" : "8px"};
      width: 24px;
      height: 24px;
      background: #3C3F41;
      border: 1px solid #232525;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
      z-index: 10;
    }
  
    .sidebar-toggle:hover {
      background: #4B4F52;
    }
  
    .resize-handle-vertical {
      width: 4px;
      cursor: ew-resize;
      background: transparent;
      transition: background 0.2s ease;
      position: relative;
    }
  
    .resize-handle-vertical:hover,
    .resize-handle-vertical.dragging {
      background: #6A8759;
    }
  
    .resize-handle-vertical.dragging::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 2px;
      background: #6A8759;
      animation: pulse 0.8s ease-in-out infinite;
    }
  
    .resize-handle-horizontal {
      height: 4px;
      cursor: ns-resize;
      background: transparent;
      transition: background 0.2s ease;
      position: relative;
    }
  
    .resize-handle-horizontal:hover,
    .resize-handle-horizontal.dragging {
      background: #6A8759;
    }
  
    .resize-handle-horizontal.dragging::before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 2px;
      background: #6A8759;
      animation: pulse 0.8s ease-in-out infinite;
    }
  
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  
    .sidebar-title {
      padding: 8px 12px;
      font-size: 11px;
      color: #787878;
      font-weight: bold;
      text-transform: uppercase;
    }
  
    .file-tree-item {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      cursor: pointer;
      font-size: 13px;
      transition: background 0.15s ease;
      user-select: none;
      animation: fadeInLeft 0.3s ease;
    }
  
    @keyframes fadeInLeft {
      from {
        opacity: 0;
        transform: translateX(-10px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  
    .file-tree-item:hover {
      background: #4B4F52;
    }
  
    .file-tree-item.active {
      background: #4B6EAF;
    }
  
    .folder-icon {
      color: #8AB4F8;
    }
  
    .file-icon {
      color: #A9B7C6;
      transition: all 0.3s ease;
    }
  
    .active-file-icon {
      animation: breathe 2s ease-in-out infinite;
    }
  
    @keyframes breathe {
      0%, 100% { 
        filter: drop-shadow(0 0 2px #6A8759);
        opacity: 1;
      }
      50% { 
        filter: drop-shadow(0 0 8px #6A8759);
        opacity: 0.7;
      }
    }
  
    .folder-content {
      padding-left: 20px;
    }
  
    .editor-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      background: #2B2B2B;
      overflow: hidden;
      position: relative;
    }
  
    .breadcrumb {
      background: #313335;
      padding: 6px 12px;
      font-size: 11px;
      color: #808080;
      border-bottom: 1px solid #232525;
    }
  
    .tabs-container {
      display: flex;
      background: #313335;
      border-bottom: 1px solid #232525;
      overflow-x: auto;
    }
  
    .tab {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border-right: 1px solid #232525;
      cursor: pointer;
      font-size: 13px;
      background: #313335;
      transition: all 0.2s ease;
      white-space: nowrap;
      animation: slideInDown 0.3s ease;
    }
  
    @keyframes slideInDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  
    .tab:hover {
      background: #4B4F52;
    }
  
    .tab.active {
      background: #2B2B2B;
      border-bottom: 2px solid #6A8759;
    }
  
    .tab-close {
      display: flex;
      padding: 2px;
      border-radius: 2px;
      transition: background 0.15s ease;
    }
  
    .tab-close:hover {
      background: #5C6164;
    }
  
    .editor-wrapper {
      flex: 1;
      display: flex;
      overflow: hidden;
    }
  
    .editor-content {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      line-height: 1.6;
      position: relative;
    }
  
    .code-line {
      display: flex;
      gap: 16px;
      padding: 2px 0;
      border-bottom: 1px solid rgba(60, 63, 65, 0.3);
      transition: background 0.15s ease;
    }
  
    .code-line:nth-child(even) {
      background: rgba(60, 63, 65, 0.15);
    }
  
    .code-line:hover {
      background: rgba(75, 79, 82, 0.3);
    }
  
    .line-number {
      color: #606366;
      user-select: none;
      text-align: right;
      min-width: 40px;
    }
  
    .line-content {
      flex: 1;
      position: relative;
      white-space: pre;
    }
  
    .typing-cursor {
      display: inline-block;
      width: 2px;
      height: 1em;
      background: #6A8759;
      margin-left: 2px;
      animation: blink 0.5s step-end infinite;
    }
  
    @keyframes blink {
      50% { opacity: 0; }
    }
  
    .minimap {
      width: 100px;
      background: #313335;
      border-left: 1px solid #232525;
      overflow: hidden;
      position: relative;
      cursor: pointer;
    }
  
    .minimap-content {
      font-size: 2px;
      line-height: 3px;
      padding: 4px;
      color: #606366;
      word-break: break-all;
    }
  
    .minimap-viewport {
      position: absolute;
      left: 0;
      right: 0;
      background: rgba(106, 135, 89, 0.2);
      border: 1px solid #6A8759;
      pointer-events: none;
    }
  
    .status-bar {
      background: #3C3F41;
      height: 24px;
      display: flex;
      align-items: center;
      padding: 0 12px;
      border-top: 1px solid #232525;
      font-size: 11px;
      gap: 16px;
    }
  
    .status-item {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #A9B7C6;
    }
  
    .status-gradle {
      display: flex;
      align-items: center;
      gap: 6px;
      color: #6A8759;
    }
  
    .gradle-spinner {
      animation: spin 1s linear infinite;
    }
  
    .terminal {
      height: ${terminalCollapsed ? "30px" : `${terminalHeight}px`};
      background: #1E1E1E;
      border-top: 1px solid #232525;
      display: flex;
      flex-direction: column;
      transition: height 0.3s ease;
    }
  
    .terminal-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      background: #313335;
      border-bottom: 1px solid #232525;
      font-size: 12px;
      cursor: pointer;
    }
  
    .terminal-header:hover {
      background: #3C3F41;
    }
  
    .terminal-controls {
      margin-left: auto;
      display: flex;
      gap: 8px;
    }
  
    .terminal-btn {
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-radius: 3px;
      transition: background 0.2s ease;
    }
  
    .terminal-btn:hover {
      background: #4B4F52;
    }
  
    .terminal-content {
      flex: 1;
      padding: 12px;
      overflow-y: auto;
      font-size: 14px;
      line-height: 1.6;
      display: ${terminalCollapsed ? "none" : "block"};
    }
  
    .terminal-line {
      margin-bottom: 4px;
      animation: terminalFadeIn 0.2s ease;
    }
  
    @keyframes terminalFadeIn {
      from {
        opacity: 0;
        transform: translateY(-5px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  
    .terminal-line.input {
      color: #A9B7C6;
    }
  
    .terminal-line.output {
      color: #A9B7C6;
    }
  
    .terminal-line.error {
      color: #FF6B68;
    }
  
    .terminal-input-line {
      display: flex;
      gap: 8px;
      align-items: center;
    }
  
    .terminal-prompt {
      color: #6A8759;
    }
  
    .terminal-input {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      color: #A9B7C6;
      font-family: inherit;
      font-size: 14px;
    }
  
    .notification-container {
      position: fixed;
      bottom: 50px;
      right: 20px;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  
    .notification {
      background: #3C3F41;
      border: 1px solid #232525;
      border-left: 3px solid #6A8759;
      padding: 12px 16px;
      border-radius: 4px;
      min-width: 300px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      animation: slideInRight 0.3s ease;
    }
  
    .notification.error {
      border-left-color: #FF6B68;
    }
  
    .notification.success {
      border-left-color: #6A8759;
    }
  
    .notification.info {
      border-left-color: #4B6EAF;
    }
  
    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(100%);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  
    ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }
  
    ::-webkit-scrollbar-track {
      background: #2B2B2B;
    }
  
    ::-webkit-scrollbar-thumb {
      background: #4B4F52;
      border-radius: 5px;
    }
  
    ::-webkit-scrollbar-thumb:hover {
      background: #5C6164;
    }
  
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;