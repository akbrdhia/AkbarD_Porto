import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronDown, ChevronLeft,ChevronUp, Folder, FileText, Terminal, X, Minus, Square, Menu, Maximize2 } from 'lucide-react';


const Portfolio = () => {
  const [loading, setLoading] = useState(true);
  const [openFolders, setOpenFolders] = useState({ 'Portfolio': true, 'app': true });
  const [activeFile, setActiveFile] = useState('About.kt');
  const [openTabs, setOpenTabs] = useState(['About.kt']);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentPath, setCurrentPath] = useState('~/Portfolio');
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [terminalHeight, setTerminalHeight] = useState(200);
  const [isDraggingSidebar, setIsDraggingSidebar] = useState(false);
  const [isDraggingTerminal, setIsDraggingTerminal] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [terminalCollapsed, setTerminalCollapsed] = useState(false);
  const [autoTypingIndex, setAutoTypingIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const terminalEndRef = useRef(null);
  const terminalInputRef = useRef(null);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

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
        setTerminalHistory(prev => [...prev, { 
          type: 'output', 
          text: welcomeMessages[autoTypingIndex] 
        }]);
        setAutoTypingIndex(autoTypingIndex + 1);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [loading, autoTypingIndex]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

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
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
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
          setTerminalHeight(Math.min(newHeight, window.innerHeight - 100));
        }
      }
    };

    const handleMouseUp = () => {
      setIsDraggingTerminal(false);
    };

    if (isDraggingTerminal) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingTerminal]);

  // ============= FILE STRUCTURE & CONTENTS =============
  const fileStructure = {
    'Portfolio': {
      type: 'folder',
      children: {
        'app': {
          type: 'folder',
          children: {
            'About.kt': { type: 'file' },
            'Skills.kt': { type: 'file' },
            'Projects.kt': { type: 'file' },
            'Experience.kt': { type: 'file' },
            'Contact.kt': { type: 'file' },
          }
        },
        'README.md': { type: 'file' }
      }
    }
  };

  // ============= UPDATE THESE VALUES =============
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
      For me, coding isn’t just problem-solving — it’s storytelling through logic and design.`
  };
  

  const fileContents = {
    'About.kt': `package com.${PERSONAL_INFO.username.toLowerCase()}.portfolio

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

    'Skills.kt': `package com.${PERSONAL_INFO.username.toLowerCase()}.portfolio

/**
 * Technical Skills & Technologies
 * UPDATE: Add or modify your tech stack here
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

    'Projects.kt': `package com.${PERSONAL_INFO.username.toLowerCase()}.portfolio

/**
 * Featured Projects
 * UPDATE: Replace with your actual projects
 */

data class Project(
    val name: String,
    val description: String,
    val tech: List<String>,
    val status: String,
    val githubUrl: String = "https://github.com/${PERSONAL_INFO.github}/PROJECT_NAME",
    val demoUrl: String = "https://YOUR_DEMO_URL.com"
)

class MyProjects {
    
    val projects = listOf(
        Project(
            name = "PROJECT_NAME_1",
            description = "PROJECT_DESCRIPTION_HERE",
            tech = listOf("Kotlin", "Jetpack Compose", "Firebase", "MVVM"),
            status = "In Development",
            githubUrl = "https://github.com/${PERSONAL_INFO.github}/project-1",
            demoUrl = "https://demo1.com"
        ),
        
        Project(
            name = "PROJECT_NAME_2",
            description = "PROJECT_DESCRIPTION_HERE",
            tech = listOf("Kotlin", "Room DB", "WorkManager", "Material 3"),
            status = "Beta",
            githubUrl = "https://github.com/${PERSONAL_INFO.github}/project-2",
            demoUrl = "https://demo2.com"
        ),
        
        Project(
            name = "PROJECT_NAME_3",
            description = "PROJECT_DESCRIPTION_HERE",
            tech = listOf("Laravel", "MySQL", "Redis", "JWT Auth"),
            status = "Production",
            githubUrl = "https://github.com/${PERSONAL_INFO.github}/project-3",
            demoUrl = "https://demo3.com"
        ),
        
        Project(
            name = "PROJECT_NAME_4",
            description = "PROJECT_DESCRIPTION_HERE",
            tech = listOf("React", "JavaScript", "CSS3", "Vercel"),
            status = "Live",
            githubUrl = "https://github.com/${PERSONAL_INFO.github}/project-4",
            demoUrl = "https://demo4.com"
        )
    )
    
    fun showProjects() {
        projects.forEachIndexed { index, project ->
            println("\${index + 1}. \${project.name}")
            println("   \${project.description}")
            println("   Tech: \${project.tech.joinToString(", ")}")
            println("   Status: \${project.status}")
            println("   GitHub: \${project.githubUrl}")
            println("   Demo: \${project.demoUrl}")
            println()
        }
    }
}`,

    'Experience.kt': `package com.${PERSONAL_INFO.username.toLowerCase()}.portfolio

/**
 * Work Experience & Background
 * UPDATE: Replace with your actual experience
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
            description = "Ive been building queue system in here, and also make an app for them",
            achievements = listOf(
                "ACHIEVEMENT_1",
                "ACHIEVEMENT_2",
                "ACHIEVEMENT_3",
                "ACHIEVEMENT_4"
            )
        ),
        
        Experience(
            role = "YOUR_JOB_TITLE_2",
            company = "COMPANY_NAME_2",
            period = "START_DATE - END_DATE",
            description = "YOUR_JOB_DESCRIPTION",
            achievements = listOf(
                "ACHIEVEMENT_1",
                "ACHIEVEMENT_2",
                "ACHIEVEMENT_3",
                "ACHIEVEMENT_4"
            )
        )
    )
    
    val education = """
        🎓 SMK Negeri 1 Cibinong
        🏫 -----
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

    'Contact.kt': `package com.${PERSONAL_INFO.username.toLowerCase()}.portfolio

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
    
    fun downloadCV(): String {
        return "cv_${PERSONAL_INFO.username.toLowerCase()}.pdf"
    }
}

fun main() {
    ContactInfo.reachOut()
}`,

    'README.md': `# ${PERSONAL_INFO.username} Portfolio

## 👨‍💻 ${PERSONAL_INFO.role}

Welcome to my interactive portfolio! This site is designed to look like Android Studio. This Site Now is Still Under Development

### 🚀 Navigation
- Click files in the sidebar to explore different sections
- Use the terminal below for command-line navigation
- Try typing 'help' in the terminal for available commands
- Drag the sidebar edge to resize or collapse it
- Drag the terminal edge to resize it

### 💼 About Me
${PERSONAL_INFO.bio}

### 🛠️ Tech Stack
- Mobile: Kotlin, FLutter
- Backend: Laravel
- Frontend: React
- Design: Figma, Framer

### 📫 Get In Touch
- Email: ${PERSONAL_INFO.email}
- GitHub: @${PERSONAL_INFO.github}
- LinkedIn: ${PERSONAL_INFO.linkedin}

---
Built with React | Styled like Android Studio
`
  };

  // ============= SYNTAX HIGHLIGHTING =============
  const highlightKotlin = (code) => {
    const keywords = ['package', 'class', 'object', 'val', 'var', 'fun', 'const', 'data', 'listOf', 'mapOf', 'println', 'forEach', 'forEachIndexed', 'import', 'return'];
    const types = ['String', 'List', 'Map', 'Int', 'Boolean'];
    const annotations = ['@'];
    
    let highlighted = code;
    
    // Comments
    highlighted = highlighted.replace(/\/\*\*[\s\S]*?\*\//g, (match) => `<span style="color: #808080; font-style: italic;">${match}</span>`);
    highlighted = highlighted.replace(/\/\/.*/g, (match) => `<span style="color: #808080; font-style: italic;">${match}</span>`);
    
    // Strings
    highlighted = highlighted.replace(/"([^"]*)"/g, '<span style="color: #6A8759;">\"$1\"</span>');
    highlighted = highlighted.replace(/"""[\s\S]*?"""/g, (match) => `<span style="color: #6A8759;">${match}</span>`);
    
    // Keywords
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      highlighted = highlighted.replace(regex, `<span style="color: #CC7832;">${keyword}</span>`);
    });
    
    // Types
    types.forEach(type => {
      const regex = new RegExp(`\\b${type}\\b`, 'g');
      highlighted = highlighted.replace(regex, `<span style="color: #A9B7C6; font-weight: bold;">${type}</span>`);
    });
    
    // Functions
    highlighted = highlighted.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, '<span style="color: #FFC66D;">$1</span>(');
    
    return highlighted;
  };

  // ============= FILE OPERATIONS =============
  const toggleFolder = (folderName) => {
    setOpenFolders(prev => ({
      ...prev,
      [folderName]: !prev[folderName]
    }));
  };

  const openFile = (fileName) => {
    if (!openTabs.includes(fileName)) {
      setOpenTabs([...openTabs, fileName]);
    }
    setActiveFile(fileName);
  };

  const closeTab = (fileName, e) => {
    e.stopPropagation();
    const newTabs = openTabs.filter(tab => tab !== fileName);
    setOpenTabs(newTabs);
    if (activeFile === fileName && newTabs.length > 0) {
      setActiveFile(newTabs[newTabs.length - 1]);
    }
  };

  // ============= TERMINAL COMMANDS =============
  const handleTerminalCommand = (e) => {
    if (e.key === 'Enter') {
      const command = terminalInput.trim();
      if (command) {
        setCommandHistory(prev => [...prev.slice(-9), command]);
        setTerminalHistory(prev => [...prev, { type: 'input', text: `${currentPath} $ ${command}` }]);
        processCommand(command);
      }
      setTerminalInput('');
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setTerminalInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setTerminalInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setTerminalInput('');
      }
    }
  };

  const processCommand = (command) => {
    const args = command.split(' ');
    const cmd = args[0].toLowerCase();

    switch(cmd) {
      case 'help':
        setTerminalHistory(prev => [...prev, 
          { type: 'output', text: '' },
          { type: 'output', text: '📚 Available commands:' },
          { type: 'output', text: '  help           - Show this help message' },
          { type: 'output', text: '  ls             - List files' },
          { type: 'output', text: '  cd <file>      - Open file (e.g., cd about)' },
          { type: 'output', text: '  clear          - Clear terminal' },
          { type: 'output', text: '  whoami         - Display user info' },
          { type: 'output', text: '  pwd            - Print working directory' },
          { type: 'output', text: '  cat <file>     - Display file info' },
          { type: 'output', text: '  contact        - Show contact information' },
          { type: 'output', text: '  projects       - List all projects' },
          { type: 'output', text: '' },
          { type: 'output', text: '🎉 Easter eggs: Try "matrix" or "coffee"!' },
        ]);
        break;

      case 'ls':
        setTerminalHistory(prev => [...prev,
          { type: 'output', text: '' },
          { type: 'output', text: 'About.kt  Skills.kt  Projects.kt  Experience.kt  Contact.kt  README.md' }
        ]);
        break;

      case 'cd':
        if (args[1]) {
          const fileName = args[1].toLowerCase();
          const fileMap = {
            'about': 'About.kt',
            'skills': 'Skills.kt',
            'projects': 'Projects.kt',
            'experience': 'Experience.kt',
            'contact': 'Contact.kt',
            'readme': 'README.md'
          };
          if (fileMap[fileName]) {
            openFile(fileMap[fileName]);
            setTerminalHistory(prev => [...prev,
              { type: 'output', text: '' },
              { type: 'output', text: `✓ Opened ${fileMap[fileName]}` }
            ]);
          } else {
            setTerminalHistory(prev => [...prev,
              { type: 'output', text: '' },
              { type: 'error', text: `✗ File not found: ${args[1]}` }
            ]);
          }
        } else {
          setTerminalHistory(prev => [...prev,
            { type: 'output', text: '' },
            { type: 'error', text: '✗ Usage: cd <filename>' }
          ]);
        }
        break;

      case 'clear':
        setTerminalHistory([]);
        setCommandHistory([]);
        setHistoryIndex(-1);
        break;

      case 'whoami':
        setTerminalHistory(prev => [...prev,
          { type: 'output', text: `👤 ${PERSONAL_INFO.name} (${PERSONAL_INFO.username})` },
          { type: 'output', text: `🤖 ${PERSONAL_INFO.role}` },
          { type: 'output', text: `📍 ${PERSONAL_INFO.location}` },
          { type: 'output', text: `💼 github.com/${PERSONAL_INFO.github}` },
        ]);
        break;

      case 'pwd':
        setTerminalHistory(prev => [...prev,
          { type: 'output', text: currentPath }
        ]);
        break;

      case 'contact':
        setTerminalHistory(prev => [...prev,
          { type: 'output', text: '' },
          { type: 'output', text: '📧 Contact Information:' },
          { type: 'output', text: `   Email: ${PERSONAL_INFO.email}` },
          { type: 'output', text: `   GitHub: github.com/${PERSONAL_INFO.github}` },
          { type: 'output', text: `   LinkedIn: linkedin.com/in/${PERSONAL_INFO.linkedin}` },
          { type: 'output', text: `   Location: ${PERSONAL_INFO.location}` },
        ]);
        break;

      case 'projects':
        setTerminalHistory(prev => [...prev,
          { type: 'output', text: '' },
          { type: 'output', text: '🚀 Featured Projects:' },
          { type: 'output', text: '   1. KosKu - Status: In Development' },
          { type: 'output', text: '   2. Manager Usaha V2 - Status: Beta' },
          { type: 'output', text: '   3. Cogito - Status: Production' },
          { type: 'output', text: '   4. Festivaloka - Status: Live' },
          { type: 'output', text: '' },
          { type: 'output', text: '   Type "cd projects" to view details' },
        ]);
        break;

      case 'cat':
        if (args[1]) {
          const fileName = args[1];
          if (fileContents[fileName]) {
            setTerminalHistory(prev => [...prev,
              { type: 'output', text: `--- ${fileName} ---` },
              { type: 'output', text: 'Use file explorer to view formatted content' }
            ]);
          } else {
            setTerminalHistory(prev => [...prev,
              { type: 'error', text: `✗ File not found: ${fileName}` }
            ]);
          }
        } else {
          setTerminalHistory(prev => [...prev,
            { type: 'error', text: '✗ Usage: cat <filename>' }
          ]);
        }
        break;

      // Easter Egg 1: Matrix
      case 'matrix':
        setTerminalHistory(prev => [...prev,
          { type: 'output', text: '01010111 01100001 01101011 01100101 00100000' },
          { type: 'output', text: '01110101 01110000 00101100 00100000 01001110' },
          { type: 'output', text: '01100101 01101111 00101110 00101110 00101110' },
          { type: 'output', text: '' },
          { type: 'output', text: '🟢 The Matrix has you... Follow the white rabbit 🐰' },
          { type: 'output', text: '   (Translation: Wake up, Neo...)' },
        ]);
        break;

      // Easter Egg 2: Coffee
      case 'coffee':
        setTerminalHistory(prev => [...prev,
          { type: 'output', text: '      )  (' },
          { type: 'output', text: '     (   ) )' },
          { type: 'output', text: '      ) ( (' },
          { type: 'output', text: '    _______)_' },
          { type: 'output', text: ' .-\'---------|  ' },
          { type: 'output', text: '( C|/\\/\\/\\/\\/|' },
          { type: 'output', text: ' \'-./\\/\\/\\/\\/|' },
          { type: 'output', text: '   \'_________\'' },
          { type: 'output', text: '    \'-------\'' },
          { type: 'output', text: '' },
          { type: 'output', text: '☕ Coffee break! Here\'s some fresh code fuel.' },
          { type: 'output', text: '   Keep coding, keep creating! 💻' },
        ]);
        break;

      case '':
        break;

      default:
        setTerminalHistory(prev => [...prev,
          { type: 'error', text: `✗ Command not found: ${command}` },
          { type: 'error', text: '  Type "help" for available commands.' }
        ]);
    }
  };

  // ============= FILE TREE RENDERING =============
  const renderFileTree = (structure, path = '') => {
    return Object.entries(structure).map(([name, item]) => {
      const fullPath = path ? `${path}/${name}` : name;
      
      if (item.type === 'folder') {
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
        return (
          <div 
            key={fullPath}
            className={`file-tree-item file ${activeFile === name ? 'active' : ''}`}
            onClick={() => openFile(name)}
          >
            <FileText size={16} className="file-icon" />
            <span>{name}</span>
          </div>
        );
      }
    });
  };

  // Mobile blocker
  if (isMobile) {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        background: '#2B2B2B',
        color: '#A9B7C6',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        textAlign: 'center',
        fontFamily: 'Consolas, Monaco, Courier New, monospace'
      }}>
        <Terminal size={64} style={{ marginBottom: '20px', color: '#6A8759' }} />
        <h1 style={{ fontSize: '24px', marginBottom: '16px', color: '#CC7832' }}>Desktop Experience Required</h1>
        <p style={{ fontSize: '16px', lineHeight: '1.6', maxWidth: '400px', color: '#A9B7C6' }}>
          This portfolio is designed to replicate the Android Studio experience and works best on desktop devices.
        </p>
        <p style={{ fontSize: '14px', marginTop: '16px', color: '#808080' }}>
          Please visit on a desktop or laptop for the full interactive experience.
        </p>
      </div>
    );
  }

  // Loading screen
  if (loading) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0, // ganti top, left, right, bottom jadi satu baris
        background: '#2B2B2B',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Consolas, Monaco, Courier New, monospace',
        zIndex: 9999,
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '80px',
            height: '80px',
            border: '4px solid #3C3F41',
            borderTop: '4px solid #6A8759',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '20px',
          }}></div>
          <div style={{ color: '#A9B7C6', fontSize: '18px', marginBottom: '8px' }}>
            Android Studio
          </div>
          <div style={{ color: '#808080', fontSize: '14px' }}>
            Loading Portfolio...
          </div>
        </div>
  
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
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
          gap: 8px;
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
          width: ${sidebarCollapsed ? '0' : `${sidebarWidth}px`};
          background: #313335;
          border-right: 1px solid #232525;
          overflow-y: auto;
          overflow-x: hidden;
          padding: ${sidebarCollapsed ? '0' : '8px 0'};
          transition: width 0.3s ease, padding 0.3s ease;
          position: relative;
        }

        .sidebar-toggle {
          position: absolute;
          top: 8px;
          right: ${sidebarCollapsed ? '-32px' : '8px'};
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

        .editor-content {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          line-height: 1.6;
          animation: fadeIn 0.4s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .code-line {
          display: flex;
          gap: 16px;
          transition: background 0.15s ease;
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
        }

        .terminal {
          height: ${terminalCollapsed ? '30px' : `${terminalHeight}px`};
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
          font-size: 13px;
          display: ${terminalCollapsed ? 'none' : 'block'};
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
          font-size: inherit;
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
        <span style={{color: '#6A8759', fontSize: '14px', fontWeight: 'bold'}}>
          {PERSONAL_INFO.username} Portfolio
        </span>
        <div className="window-controls">
          <div className="window-btn"><Minus size={16} /></div>
          <div className="window-btn"><Square size={14} /></div>
          <div className="window-btn"><X size={16} /></div>
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
            {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </div>
          {!sidebarCollapsed && (
            <>
              <div className="sidebar-title">Project</div>
              {renderFileTree(fileStructure)}
            </>
          )}
        </div>

        <div 
          className={`resize-handle-vertical ${isDraggingSidebar ? 'dragging' : ''}`}
          onMouseDown={() => setIsDraggingSidebar(true)}
        />

        <div className="editor-area">
          <div className="tabs-container">
            {openTabs.map(tab => (
              <div 
                key={tab}
                className={`tab ${activeFile === tab ? 'active' : ''}`}
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

          <div className="editor-content">
            {activeFile && fileContents[activeFile] && (
              <div>
                {fileContents[activeFile].split('\n').map((line, index) => (
                  <div key={index} className="code-line">
                    <div className="line-number">{index + 1}</div>
                    <div 
                      className="line-content" 
                      style={{whiteSpace: 'pre-wrap', wordBreak: 'break-word'}}
                      dangerouslySetInnerHTML={{
                        __html: activeFile.endsWith('.kt') ? highlightKotlin(line) : line
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div 
        className={`resize-handle-horizontal ${isDraggingTerminal ? 'dragging' : ''}`}
        onMouseDown={() => setIsDraggingTerminal(true)}
      />

      <div className="terminal">
        <div className="terminal-header" onClick={() => setTerminalCollapsed(!terminalCollapsed)}>
          <Terminal size={14} />
          <span>Terminal</span>
          <div className="terminal-controls">
            <div 
              className="terminal-btn" 
              onClick={(e) => {
                e.stopPropagation();
                setTerminalHeight(window.innerHeight - 100);
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
              {terminalCollapsed ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
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