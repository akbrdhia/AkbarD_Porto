import { PERSONAL_INFO } from "../constants/portfolioData";

/**
 * Process terminal commands
 * @param {string} command - The command to process
 * @param {Function} setTerminalHistory - Function to update terminal history
 * @param {Function} openFile - Function to open a file
 * @param {Function} handleBuild - Function to handle build
 * @param {Function} setCommandHistory - Function to clear command history
 * @param {Function} setHistoryIndex - Function to reset history index
 * @param {string} currentPath - Current directory path
 */
export const processCommand = (
  command,
  setTerminalHistory,
  openFile,
  handleBuild,
  setCommandHistory,
  setHistoryIndex,
  currentPath
) => {
  const args = command.split(" ");
  const cmd = args[0].toLowerCase();

  const addOutput = (lines) => {
    setTerminalHistory((prev) => [...prev, ...lines]);
  };

  switch (cmd) {
    case "help":
      addOutput([
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
      addOutput([
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
          addOutput([
            { type: "output", text: "" },
            { type: "output", text: `✓ Opened ${fileMap[fileName]}` },
          ]);
        } else {
          addOutput([
            { type: "output", text: "" },
            { type: "error", text: `✗ File not found: ${args[1]}` },
          ]);
        }
      } else {
        addOutput([
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
      addOutput([
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
      addOutput([
        { type: "output", text: "" },
        { type: "output", text: currentPath },
      ]);
      break;

    case "contact":
      addOutput([
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
      addOutput([
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
      addOutput([
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
      addOutput([
        { type: "output", text: "" },
        { type: "output", text: ".      )  (" },
        { type: "output", text: ".     (   ) )" },
        { type: "output", text: ".      ) ( (" },
        { type: "output", text: ".    _______)_" },
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
        { type: "output", text: "wake up, coding, coffee, coding, sleep, repeat" },
      ]);
      break;

    case "":
      break;

    default:
      addOutput([
        { type: "output", text: "" },
        { type: "error", text: `✗ Command not found: ${command}` },
        { type: "error", text: '  Type "help" for available commands.' },
      ]);
  }
};