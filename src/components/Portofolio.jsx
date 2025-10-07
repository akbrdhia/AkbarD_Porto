import React, { useState, useEffect, useRef } from "react";
import {
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Folder,
  FileText,
  Terminal,
  X,
  Minus,
  Square,
  Maximize2,
  Play,
  Loader,
} from "lucide-react";

const Portfolio = () => {
  const [loading, setLoading] = useState(true);
  const [openFolders, setOpenFolders] = useState({
    Portfolio: true,
    app: true,
  });
  const [activeFile, setActiveFile] = useState("About.kt");
  const [openTabs, setOpenTabs] = useState(["About.kt"]);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentPath, setCurrentPath] = useState("~/Portfolio");
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [terminalHeight, setTerminalHeight] = useState(200);
  const [isDraggingSidebar, setIsDraggingSidebar] = useState(false);
  const [isDraggingTerminal, setIsDraggingTerminal] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [terminalCollapsed, setTerminalCollapsed] = useState(false);
  const [autoTypingIndex, setAutoTypingIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [typedFiles, setTypedFiles] = useState({});
  const [currentTypingLine, setCurrentTypingLine] = useState(0);
  const [currentTypingChar, setCurrentTypingChar] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [isBuilding, setIsBuilding] = useState(false);
  const [gradleSyncing, setGradleSyncing] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
  const [buildStatus, setBuildStatus] = useState("Ready");
  const terminalEndRef = useRef(null);
  const terminalInputRef = useRef(null);
  const editorContentRef = useRef(null);

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

  // Auto-typing welcome message
  const welcomeMessages = [
    "------------------------------------------------------------",
    "Android Studio Terminal [Version 1.0.0]",
    "© 2025 AkbarD Interactive Environment",
    "------------------------------------------------------------",
    "\n",
    "> Initializing workspace...",
    "> Loading Android SDK...",
    "> Checking Kotlin runtime environment...",
    "> Syncing Gradle project ':portfolio'...",
    "> Build variant: release (optimized)",
    "> Applying UI theme: Darcula",
    "",
    "✓ Environment ready.",
    "✓ Connected to virtual device: Pixel_8_Pro_API_35",
    "",
    "Welcome, Users.",
    'Type "help" to view available commands.',
    '💡 Tip: Try "matrix", "coffee".',
    "",
  ];

  useEffect(() => {
    if (!loading && autoTypingIndex < welcomeMessages.length) {
      const timer = setTimeout(() => {
        setTerminalHistory((prev) => [
          ...prev,
          {
            type: "output",
            text: welcomeMessages[autoTypingIndex],
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

  // Notification system
  const showNotification = (message, type = "info") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  };

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
          setTerminalCollapsed(true);
          setTerminalHeight(30);
        } else if (newHeight > 100) {
          setTerminalCollapsed(false);
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

  // ============= FILE STRUCTURE & CONTENTS =============
  const fileStructure = {
    Portfolio: {
      type: "folder",
      children: {
        app: {
          type: "folder",
          children: {
            "About.kt": { type: "file" },
            "Skills.kt": { type: "file" },
            "Projects.kt": { type: "file" },
            "Experience.kt": { type: "file" },
            "Contact.kt": { type: "file" },
          },
        },
        "README.md": { type: "file" },
      },
    },
  };

  const PERSONAL_INFO = {
    name: "Akbar Dhia",
    username: "AkbarD",
    email: "akbardhia19@gmail.com",
    github: "akbrdhia | Akbardhia",
    linkedin: "Akbardhia",
    location: "Bogor, Indonesia",
    role: "Android Developer & UI/UX Enthusiast",
    bio: `I'm an Android Developer and UI/UX enthusiast driven by the art of crafting smooth, meaningful digital experiences.
      I specialize in building modern Android apps with Kotlin, designing clean, human-centered interfaces, 
      and connecting everything through powerful backends built with Laravel or Express.
      For me, coding isn't just problem-solving — it's storytelling through logic and design.`,
  };

  const fileContents = {
    "About.kt": `package com.${PERSONAL_INFO.username.toLowerCase()}.portfolio

/**
 * About Me
 * Mobile & Full-Stack Developer
 */

class AboutMe {
    
    val name = "${PERSONAL_INFO.name}"
    val username = "${PERSONAL_INFO.username}"
    val role = "${PERSONAL_INFO.role}"
    
    val bio = """
        ${PERSONAL_INFO.bio}
    """
    
    val interests = listOf(
        "Android Development",
        "UI/UX Design",
        "Backend Engineering",
        "Innovation"
    )
    
    val currentFocus = "Building seamless mobile experiences"
    
    fun greet() {
        println("Hello! Welcome to my portfolio 👋")
        println("Let's build something amazing together!")
    }
}`,

    "Skills.kt": `package com.${PERSONAL_INFO.username.toLowerCase()}.portfolio

/**
 * Technical Skills & Technologies
 */

object TechStack {
    
    val mobile = mapOf(
        "Primary" to listOf("Kotlin"),
        "Framework" to listOf("Android SDK", "Jetpack Compose"),
        "Tools" to listOf("Android Studio", "Gradle")
    )
    
    val backend = mapOf(
        "Framework" to listOf("Laravel"),
        "Language" to listOf("PHP"),
        "Database" to listOf("MySQL", "PostgreSQL")
    )
    
    val frontend = mapOf(
        "Library" to listOf("React"),
        "Language" to listOf("JavaScript", "TypeScript"),
        "Styling" to listOf("CSS", "Tailwind CSS")
    )
    
    val design = mapOf(
        "Tools" to listOf("Figma"),
        "Skills" to listOf("UI Design", "UX Research", "Prototyping")
    )
    
    val other = listOf(
        "Git & GitHub",
        "RESTful APIs",
        "Responsive Design",
        "Problem Solving"
    )
    
    fun displaySkills() {
        println("=== Core Competencies ===")
        println("🤖 Android: Kotlin, Jetpack Compose")
        println("🎨 Design: Figma, UI/UX")
        println("⚙️ Backend: Laravel, PHP")
        println("🌐 Frontend: React, JavaScript")
    }
}`,

    "Projects.kt": `package com.${PERSONAL_INFO.username.toLowerCase()}.portfolio

/**
 * Featured Projects
 */

data class Project(
    val name: String,
    val description: String,
    val tech: List<String>,
    val status: String,
    val githubUrl: String,
    val demoUrl: String
)

class MyProjects {
    
    val projects = listOf(
        Project(
            name = "KosKu",
            description = "Modern boarding house management system",
            tech = listOf("Kotlin", "Jetpack Compose", "Firebase"),
            status = "In Development",
            githubUrl = "https://github.com/${PERSONAL_INFO.github}/kosku",
            demoUrl = "https://kosku-demo.com"
        ),
        
        Project(
            name = "Manager Usaha V2",
            description = "Business management application",
            tech = listOf("Kotlin", "Room DB", "MVVM"),
            status = "Beta",
            githubUrl = "https://github.com/${
              PERSONAL_INFO.github
            }/manager-usaha",
            demoUrl = "https://manager-usaha.com"
        ),
        
        Project(
            name = "Cogito",
            description = "Smart productivity companion",
            tech = listOf("Laravel", "MySQL", "Vue.js"),
            status = "Production",
            githubUrl = "https://github.com/${PERSONAL_INFO.github}/cogito",
            demoUrl = "https://cogito.app"
        ),
        
        Project(
            name = "Festivaloka",
            description = "Festival and event discovery platform",
            tech = listOf("React", "Node.js", "MongoDB"),
            status = "Live",
            githubUrl = "https://github.com/${
              PERSONAL_INFO.github
            }/festivaloka",
            demoUrl = "https://festivaloka.com"
        )
    )
}`,

    "Experience.kt": `package com.${PERSONAL_INFO.username.toLowerCase()}.portfolio

/**
 * Work Experience & Background
 */

data class Experience(
    val role: String,
    val company: String,
    val period: String,
    val description: String,
    val achievements: List<String>
)

class WorkExperience {
    
    val experiences = listOf(
        Experience(
            role = "Frontend Developer",
            company = "Kementrian Koperasi",
            period = "1 October - 28 Februari",
            description = "Building queue system and internal applications",
            achievements = listOf(
                "Developed queue management system",
                "Created responsive web applications",
                "Collaborated with backend team",
                "Improved user experience by 40%"
            )
        )
    )
    
    val education = """
        🎓 SMK Negeri 1 Cibinong
        📅 2026
    """
    
    fun printExperience() {
        experiences.forEach { exp ->
            println("\${exp.role} @ \${exp.company}")
            println("\${exp.period}")
            println(exp.description)
            exp.achievements.forEach { println("• $it") }
            println()
        }
    }
}`,

    "Contact.kt": `package com.${PERSONAL_INFO.username.toLowerCase()}.portfolio

/**
 * Contact Information
 * Let's Connect!
 */

object ContactInfo {
    
    const val email = "${PERSONAL_INFO.email}"
    const val github = "${PERSONAL_INFO.github}"
    const val linkedin = "${PERSONAL_INFO.linkedin}"
    const val location = "${PERSONAL_INFO.location}"
    
    val socialLinks = mapOf(
        "Email" to "${PERSONAL_INFO.email}",
        "GitHub" to "github.com/${PERSONAL_INFO.github}",
        "LinkedIn" to "linkedin.com/in/${PERSONAL_INFO.linkedin}",
        "Portfolio" to "AkbarD_Portofolio.xyz"
    )
    
    val availability = """
        🟢 Available for:
        • Freelance Projects
        • Full-time Opportunities
        • Collaboration
        • Consulting
    """
    
    fun reachOut() {
        println("📧 Email: $email")
        println("💼 GitHub: github.com/$github")
        println("💼 LinkedIn: linkedin.com/in/$linkedin")
        println("📍 Location: $location")
        println()
        println("Feel free to reach out!")
        println("Let's create something amazing together! 🚀")
    }
}

fun main() {
    ContactInfo.reachOut()
}`,

    "README.md": `# ${PERSONAL_INFO.username} Portfolio

## 👨‍💻 ${PERSONAL_INFO.role}

Welcome to my interactive portfolio! This site is designed to look like Android Studio.

### 🚀 Navigation
- Click files in the sidebar to explore different sections
- Use the terminal below for command-line navigation
- Try typing 'help' in the terminal for available commands
- Drag the sidebar edge to resize or collapse it
- Drag the terminal edge to resize it

### 💼 About Me
${PERSONAL_INFO.bio}

### 🛠️ Tech Stack
- Mobile: Kotlin, Flutter
- Backend: Laravel
- Frontend: React
- Design: Figma, Framer

### 📫 Get In Touch
- Email: ${PERSONAL_INFO.email}
- GitHub: @${PERSONAL_INFO.github}
- LinkedIn: ${PERSONAL_INFO.linkedin}

---
Built with React | Styled like Android Studio
`,
  };

  // Auto-typing logic
  useEffect(() => {
    if (!typedFiles[activeFile] && fileContents[activeFile]) {
      setIsTyping(true);
      setCurrentTypingLine(0);
      setCurrentTypingChar(0);

      // Scroll to top
      if (editorContentRef.current) {
        editorContentRef.current.scrollTop = 0;
      }
    } else {
      setIsTyping(false);
    }
  }, [activeFile]);

  useEffect(() => {
    if (isTyping && fileContents[activeFile]) {
      const lines = fileContents[activeFile].split("\n");

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

  // Get displayed content
  const getDisplayedContent = () => {
    if (!fileContents[activeFile]) return "";

    if (typedFiles[activeFile]) {
      return fileContents[activeFile];
    }

    if (isTyping) {
      const lines = fileContents[activeFile].split("\n");
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

  // ============= SYNTAX HIGHLIGHTING =============
  const highlightKotlin = (code) => {
    const keywords = [
      "package",
      "class",
      "object",
      "val",
      "var",
      "fun",
      "const",
      "data",
      "listOf",
      "mapOf",
      "println",
      "forEach",
      "forEachIndexed",
      "import",
      "return",
    ];
    const types = ["String", "List", "Map", "Int", "Boolean"];

    let highlighted = code;

    // Comments
    highlighted = highlighted.replace(
      /\/\*\*[\s\S]*?\*\//g,
      (match) =>
        `<span style="color: #808080; font-style: italic;">${match}</span>`
    );
    highlighted = highlighted.replace(
      /\/\/.*/g,
      (match) =>
        `<span style="color: #808080; font-style: italic;">${match}</span>`
    );

    // Strings
    highlighted = highlighted.replace(
      /"([^"]*)"/g,
      '<span style="color: #6A8759;">"$1"</span>'
    );
    highlighted = highlighted.replace(
      /"""[\s\S]*?"""/g,
      (match) => `<span style="color: #6A8759;">${match}</span>`
    );

    // Keywords
    keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, "g");
      highlighted = highlighted.replace(
        regex,
        `<span style="color: #CC7832;">${keyword}</span>`
      );
    });

    // Types
    types.forEach((type) => {
      const regex = new RegExp(`\\b${type}\\b`, "g");
      highlighted = highlighted.replace(
        regex,
        `<span style="color: #A9B7C6; font-weight: bold;">${type}</span>`
      );
    });

    // Functions
    highlighted = highlighted.replace(
      /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g,
      '<span style="color: #FFC66D;">$1</span>('
    );

    return highlighted;
  };

  // Build functionality
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
            type:
              log.includes("✓") || log.includes("SUCCESSFUL")
                ? "output"
                : "output",
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

  // ============= FILE OPERATIONS =============
  const toggleFolder = (folderName) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folderName]: !prev[folderName],
    }));
  };

  const openFile = (fileName) => {
    if (!openTabs.includes(fileName)) {
      if (openTabs.length >= 5) {
        showNotification("Maximum 5 tabs allowed", "error");
        return;
      }
      setOpenTabs([...openTabs, fileName]);
    }
    setActiveFile(fileName);
    showNotification(`Opened ${fileName}`, "success");

    // Scroll to top
    setTimeout(() => {
      if (editorContentRef.current) {
        editorContentRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 100);
  };

  const closeTab = (fileName, e) => {
    e.stopPropagation();
    const newTabs = openTabs.filter((tab) => tab !== fileName);
    setOpenTabs(newTabs);

    // Remove from typed files so it will re-type when opened again
    setTypedFiles((prev) => {
      const updated = { ...prev };
      delete updated[fileName];
      return updated;
    });

    if (activeFile === fileName && newTabs.length > 0) {
      setActiveFile(newTabs[newTabs.length - 1]);
    }
    showNotification(`Closed ${fileName}`, "info");
  };

  // Get breadcrumb path
  const getBreadcrumb = () => {
    if (activeFile === "README.md") {
      return "Portfolio > README.md";
    }
    return `Portfolio > app > ${activeFile}`;
  };

  // ============= TERMINAL COMMANDS =============
  const handleTerminalCommand = (e) => {
    if (e.key === "Enter") {
      const command = terminalInput.trim();
      if (command) {
        setCommandHistory((prev) => [...prev.slice(-9), command]);
        setTerminalHistory((prev) => [
          ...prev,
          { type: "input", text: `${currentPath} $ ${command}` },
        ]);
        processCommand(command);
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

  const processCommand = (command) => {
    const args = command.split(" ");
    const cmd = args[0].toLowerCase();

    switch (cmd) {
      case "help":
        setTerminalHistory((prev) => [
          ...prev,
          { type: "output", text: "" },
          { type: "output", text: "📚 Available commands:" },
          { type: "output", text: "  help           - Show this help message" },
          { type: "output", text: "  ls             - List files" },
          {
            type: "output",
            text: "  cd <file>      - Open file (e.g., cd about)",
          },
          { type: "output", text: "  clear          - Clear terminal" },
          { type: "output", text: "  whoami         - Display user info" },
          {
            type: "output",
            text: "  pwd            - Print working directory",
          },
          {
            type: "output",
            text: "  contact        - Show contact information",
          },
          { type: "output", text: "  projects       - List all projects" },
          { type: "output", text: "  build          - Run Gradle build" },
          { type: "output", text: "" },
          { type: "output", text: '🎉 Easter eggs: Try "matrix" or "coffee"!' },
        ]);
        break;

      case "ls":
        setTerminalHistory((prev) => [
          ...prev,
          { type: "output", text: "" },
          {
            type: "output",
            text: "About.kt  Skills.kt  Projects.kt  Experience.kt  Contact.kt  README.md",
          },
        ]);
        break;

      case "cd":
        if (args[1]) {
          const fileName = args[1].toLowerCase();
          const fileMap = {
            about: "About.kt",
            skills: "Skills.kt",
            projects: "Projects.kt",
            experience: "Experience.kt",
            contact: "Contact.kt",
            readme: "README.md",
          };
          if (fileMap[fileName]) {
            openFile(fileMap[fileName]);
            setTerminalHistory((prev) => [
              ...prev,
              { type: "output", text: "" },
              { type: "output", text: `✓ Opened ${fileMap[fileName]}` },
            ]);
          } else {
            setTerminalHistory((prev) => [
              ...prev,
              { type: "output", text: "" },
              { type: "error", text: `✗ File not found: ${args[1]}` },
            ]);
          }
        } else {
          setTerminalHistory((prev) => [
            ...prev,
            { type: "output", text: "" },
            { type: "error", text: "✗ Usage: cd <filename>" },
          ]);
        }
        break;

      case "clear":
        setTerminalHistory([]);
        setCommandHistory([]);
        setHistoryIndex(-1);
        break;

      case "whoami":
        setTerminalHistory((prev) => [
          ...prev,
          { type: "output", text: "" },
          {
            type: "output",
            text: `👤 ${PERSONAL_INFO.name} (${PERSONAL_INFO.username})`,
          },
          { type: "output", text: `🤖 ${PERSONAL_INFO.role}` },
          { type: "output", text: `📍 ${PERSONAL_INFO.location}` },
          { type: "output", text: `💼 github.com/${PERSONAL_INFO.github}` },
        ]);
        break;

      case "pwd":
        setTerminalHistory((prev) => [
          ...prev,
          { type: "output", text: "" },
          { type: "output", text: currentPath },
        ]);
        break;

      case "contact":
        setTerminalHistory((prev) => [
          ...prev,
          { type: "output", text: "" },
          { type: "output", text: "📧 Contact Information:" },
          { type: "output", text: `   Email: ${PERSONAL_INFO.email}` },
          {
            type: "output",
            text: `   GitHub: github.com/${PERSONAL_INFO.github}`,
          },
          {
            type: "output",
            text: `   LinkedIn: linkedin.com/in/${PERSONAL_INFO.linkedin}`,
          },
          { type: "output", text: `   Location: ${PERSONAL_INFO.location}` },
        ]);
        break;

      case "projects":
        setTerminalHistory((prev) => [
          ...prev,
          { type: "output", text: "" },
          { type: "output", text: "🚀 Featured Projects:" },
          { type: "output", text: "   1. KosKu - Status: In Development" },
          { type: "output", text: "   2. Manager Usaha V2 - Status: Beta" },
          { type: "output", text: "   3. Cogito - Status: Production" },
          { type: "output", text: "   4. Festivaloka - Status: Live" },
          { type: "output", text: "" },
          { type: "output", text: '   Type "cd projects" to view details' },
        ]);
        break;

      case "build":
        handleBuild();
        break;

      case "matrix":
        setTerminalHistory((prev) => [
          ...prev,
          { type: "output", text: "" },
          {
            type: "output",
            text: "01010111 01100001 01101011 01100101 00100000",
          },
          {
            type: "output",
            text: "01110101 01110000 00101100 00100000 01001110",
          },
          {
            type: "output",
            text: "01100101 01101111 00101110 00101110 00101110",
          },
          { type: "output", text: "" },
          {
            type: "output",
            text: "🟢 The Matrix has you... Follow the white rabbit 🐰",
          },
          { type: "output", text: "   (Translation: Wake up, Neo...)" },
        ]);
        break;

      case "coffee":
        setTerminalHistory((prev) => [
          ...prev,
          { type: "output", text: "" },
          { type: "output", text: "      )  (" },
          { type: "output", text: "     (   ) )" },
          { type: "output", text: "      ) ( (" },
          { type: "output", text: "    _______)_" },
          { type: "output", text: " .-'---------|  " },
          { type: "output", text: "( C|/\\/\\/\\/\\/|" },
          { type: "output", text: " '-./\\/\\/\\/\\/|" },
          { type: "output", text: "   '_________'" },
          { type: "output", text: "    '-------'" },
          { type: "output", text: "" },
          {
            type: "output",
            text: "☕ Coffee break! Here's some fresh code fuel.",
          },
          { type: "output", text: "   Keep coding, keep creating! 💻" },
        ]);
        break;

      case "":
        break;

      default:
        setTerminalHistory((prev) => [
          ...prev,
          { type: "output", text: "" },
          { type: "error", text: `✗ Command not found: ${command}` },
          { type: "error", text: '  Type "help" for available commands.' },
        ]);
    }
  };

  // ============= FILE TREE RENDERING =============
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
            onClick={() => openFile(name)}
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

  // Mobile blocker
  if (isMobile) {
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
        <Terminal
          size={64}
          style={{ marginBottom: "20px", color: "#6A8759" }}
        />
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
          Please visit on a desktop or laptop for the full interactive
          experience.
        </p>
      </div>
    );
  }

  // Loading screen
  if (loading) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "linear-gradient(135deg, #1a1a1a 0%, #2B2B2B 50%, #1a1a1a 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Consolas, Monaco, Courier New, monospace",
          zIndex: 9999,
        }}
      >
        <div style={{ textAlign: "center", position: "relative" }}>
          {/* Android Robot Icon */}
          <div
            style={{
              width: "120px",
              height: "120px",
              margin: "0 auto 30px",
              position: "relative",
              animation: "float 3s ease-in-out infinite",
            }}
          >
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              style={{
                filter: "drop-shadow(0 0 20px rgba(106, 135, 89, 0.5))",
              }}
            >
              {/* Android head */}
              <rect
                x="30"
                y="40"
                width="60"
                height="50"
                rx="5"
                fill="#6A8759"
                opacity="0.9"
              />
              {/* Eyes */}
              <circle cx="45" cy="55" r="4" fill="#2B2B2B" />
              <circle cx="75" cy="55" r="4" fill="#2B2B2B" />
              {/* Antennas */}
              <line
                x1="40"
                y1="35"
                x2="30"
                y2="20"
                stroke="#6A8759"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <line
                x1="80"
                y1="35"
                x2="90"
                y2="20"
                stroke="#6A8759"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Arms */}
              <rect
                x="15"
                y="45"
                width="10"
                height="35"
                rx="5"
                fill="#6A8759"
                opacity="0.9"
              />
              <rect
                x="95"
                y="45"
                width="10"
                height="35"
                rx="5"
                fill="#6A8759"
                opacity="0.9"
              />
              {/* Legs */}
              <rect
                x="40"
                y="92"
                width="12"
                height="25"
                rx="6"
                fill="#6A8759"
                opacity="0.9"
              />
              <rect
                x="68"
                y="92"
                width="12"
                height="25"
                rx="6"
                fill="#6A8759"
                opacity="0.9"
              />
            </svg>
          </div>

          {/* Loading Bar */}
          <div
            style={{
              width: "300px",
              height: "4px",
              background: "#3C3F41",
              borderRadius: "2px",
              overflow: "hidden",
              marginBottom: "20px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
            }}
          >
            <div
              style={{
                height: "100%",
                background: "linear-gradient(90deg, #6A8759, #8BC34A, #6A8759)",
                backgroundSize: "200% 100%",
                animation: "loadingBar 1.5s ease-in-out infinite",
                boxShadow: "0 0 10px rgba(106, 135, 89, 0.5)",
              }}
            ></div>
          </div>

          {/* Text */}
          <div
            style={{
              color: "#6A8759",
              fontSize: "20px",
              marginBottom: "8px",
              fontWeight: "bold",
              letterSpacing: "1px",
              animation: "pulse 2s ease-in-out infinite",
            }}
          >
            Android Studio
          </div>
          <div
            style={{
              color: "#A9B7C6",
              fontSize: "14px",
              marginBottom: "4px",
            }}
          >
            Loading {PERSONAL_INFO.username}'s Portfolio...
          </div>
          <div
            style={{
              color: "#808080",
              fontSize: "12px",
              animation: "fadeInOut 2s ease-in-out infinite",
            }}
          >
            Initializing Kotlin environment
          </div>

          {/* Dots animation */}
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              gap: "8px",
              justifyContent: "center",
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#6A8759",
                  animation: `dotBounce 1.4s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`,
                }}
              ></div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes loadingBar {
            0% { 
              background-position: 0% 0%;
              width: 0%;
            }
            50% {
              width: 70%;
            }
            100% { 
              background-position: 200% 0%;
              width: 100%;
            }
          }

          @keyframes float {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg); 
            }
            25% {
              transform: translateY(-10px) rotate(-2deg);
            }
            50% { 
              transform: translateY(-15px) rotate(0deg); 
            }
            75% {
              transform: translateY(-10px) rotate(2deg);
            }
          }

          @keyframes pulse {
            0%, 100% { 
              opacity: 1;
              transform: scale(1);
            }
            50% { 
              opacity: 0.8;
              transform: scale(1.02);
            }
          }

          @keyframes fadeInOut {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }

          @keyframes dotBounce {
            0%, 80%, 100% { 
              transform: translateY(0) scale(1);
              opacity: 0.5;
            }
            40% { 
              transform: translateY(-15px) scale(1.2);
              opacity: 1;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="portfolio-container">
      <style>{`
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
      `}</style>

      {/* Notifications */}
      <div className="notification-container">
        {notifications.map((notif) => (
          <div key={notif.id} className={`notification ${notif.type}`}>
            {notif.message}
          </div>
        ))}
      </div>

      <div className="menu-bar">
        <div className="menu-item">File</div>
        <div className="menu-item">Edit</div>
        <div className="menu-item">View</div>
        <div className="menu-item">Navigate</div>
        <div className="menu-item">Code</div>
        <div className="menu-item">Refactor</div>
        <div className="menu-item">Build</div>
        <div className="menu-item">Run</div>
        <div className="menu-item">Tools</div>
        <div className="menu-item">Help</div>
      </div>

      <div className="toolbar">
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            color: "#6A8759",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          <img
            src="/logo.png"
            alt="logo"
            style={{ width: "32px", height: "32px" }}
          />
          {PERSONAL_INFO.username} Portfolio
        </span>

        <button
          className="build-btn"
          onClick={handleBuild}
          disabled={isBuilding}
        >
          {isBuilding ? (
            <Loader size={14} className="gradle-spinner" />
          ) : (
            <Play size={14} />
          )}
          {isBuilding ? "Building..." : "Build"}
        </button>
        <div className="window-controls">
          <div className="window-btn">
            <Minus size={16} />
          </div>
          <div className="window-btn">
            <Square size={14} />
          </div>
          <div className="window-btn">
            <X size={16} />
          </div>
        </div>
      </div>

      <div className="main-content">
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
              {renderFileTree(fileStructure)}
            </>
          )}
        </div>

        <div
          className={`resize-handle-vertical ${
            isDraggingSidebar ? "dragging" : ""
          }`}
          onMouseDown={() => setIsDraggingSidebar(true)}
        />

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
              {activeFile && fileContents[activeFile] && (
                <div>
                  {getDisplayedContent()
                    .split("\n")
                    .map((line, index) => {
                      const isLastLine =
                        isTyping && index === currentTypingLine;
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
                  {fileContents[activeFile]?.substring(0, 2000)}
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
      </div>

      {/* Status Bar */}
      <div className="status-bar">
        {gradleSyncing ? (
          <div className="status-gradle">
            <Loader size={12} className="gradle-spinner" />
            <span>Syncing Gradle...</span>
          </div>
        ) : (
          <>
            <div className="status-item">
              Ln {cursorPosition.line}, Col {cursorPosition.column}
            </div>
            <div className="status-item">UTF-8</div>
            <div className="status-item">Kotlin</div>
            <div className="status-item">
              <span style={{ color: "#6A8759" }}>⎇</span> main
            </div>
            <div className="status-item" style={{ marginLeft: "auto" }}>
              {buildStatus}
            </div>
          </>
        )}
      </div>

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
          <Terminal size={14} />
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
    </div>
  );
};

export default Portfolio;
