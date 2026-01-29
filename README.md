# AkbarD Portfolio

[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> An interactive developer portfolio website designed to replicate the Android Studio IDE experience. Built with React and styled with the iconic Darcula theme.

![Portfolio Preview](https://github.com/user-attachments/assets/4bc5cf73-cba7-494d-ab78-9a73f76b8989)

## Features

### **Android Studio Theme**
- **Authentic Darcula Theme** - Pixel-perfect recreation of Android Studio's dark theme
- **Syntax Highlighting** - Real Kotlin syntax highlighting with proper color coding
- **File Tree Navigation** - Interactive sidebar with folder structure
- **Tab Management** - Multi-tab editor with close functionality (max 5 tabs)

### **Interactive Elements**
- **Auto-typing Animation** - Code files type themselves with smooth animations
- **Blinking Cursor** - Realistic typing cursor during animations
- **Drag & Resize Panels** - Resizable sidebar and terminal (just like a real IDE!)
- **Build Simulation** - Fake Gradle build with realistic output logs
- **Minimap** - Code minimap with viewport indicator

### **Terminal Experience**
- **Functional Terminal** - Working command-line interface
- **Command History** - Navigate with ↑/↓ arrow keys
- **Custom Commands** - `help`, `ls`, `cd`, `whoami`, `build`, and more
- **Easter Eggs** - Hidden surprises (try `matrix` or `coffee`!)

### **Professional Touch**
- **Status Bar** - Shows line/column, encoding, git branch, and build status
- **Breadcrumb Navigation** - Current file path display
- **Toast Notifications** - Beautiful notifications for user actions
- **Loading Screen** - Animated Android Studio splash screen
- **Mobile Blocker** - Friendly message for mobile users

## Quick Start

### Prerequisites

- Node.js 14+ and npm/yarn
- Basic knowledge of React

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/android-studio-portfolio.git
cd android-studio-portfolio
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Start development server**
```bash
npm start
# or
yarn start
```

4. **Open in browser**
```
http://localhost:3000
```

## Project Structure

```
src/
├── constants/
│   └── portfolioData.js          # Your personal info & content
├── utils/
│   ├── highlightSyntax.js        # Kotlin syntax highlighter
│   └── terminalCommands.js       # Terminal command processor
├── styles/
│   └── globalStyles.js           # All CSS styles
├── context/
│   └── PortfolioContext.jsx      # State management (Context API)
├── components/
│   ├── LoadingScreen.jsx         # Animated loading screen
│   ├── MobileBlocker.jsx         # Mobile warning screen
│   ├── MenuBar.jsx               # Top menu bar
│   ├── Toolbar.jsx               # Toolbar with build button
│   ├── Sidebar.jsx               # File tree sidebar
│   ├── Editor.jsx                # Code editor with animations
│   ├── Terminal.jsx              # Terminal component
│   ├── StatusBar.jsx             # Bottom status bar
│   └── Notifications.jsx         # Toast notifications
├── App.jsx                       # Main app component
└── index.js                      # Entry point
```

# Customization

### Update Your Information

Edit `src/constants/portfolioData.js`:

```javascript
export const PERSONAL_INFO = {
  name: "Your Name",
  username: "YourUsername",
  email: "your.email@example.com",
  github: "your-github-username",
  linkedin: "your-linkedin-username",
  location: "Your City, Your Country",
  role: "Your Role",
  bio: "Your bio here..."
};
```

### Update Projects

In the same file, update the `FILE_CONTENTS` object:

```javascript
export const FILE_CONTENTS = {
  'Projects.kt': `
    // Add your projects here
    Project(
      name = "Your Project",
      description = "Project description",
      tech = listOf("Tech1", "Tech2"),
      status = "Live",
      githubUrl = "https://github.com/username/project",
      demoUrl = "https://demo.com"
    )
  `
}
```

## 🎮 Terminal Commands

| Command | Description |
|---------|-------------|
| `help` | Show all available commands |
| `ls` | List all files |
| `cd <file>` | Open a file (e.g., `cd about`) |
| `clear` | Clear terminal history |
| `whoami` | Display user information |
| `pwd` | Print working directory |
| `contact` | Show contact information |
| `projects` | List all projects |
| `build` | Run fake Gradle build |
| `matrix` | Easter egg! |
| `coffee` | Easter egg! |

## Tech Stack

- **React 19** - UI framework
- **Context API** - State management (no Redux!)
- **Lucide React** - Beautiful icons
- **CSS-in-JS** - Dynamic styling
- **Tailwind CSS** - inline styling

## Dependencies

```json
{
  "react": "^19.0.0",
  "react-dom": "^18.0.0",
  "lucide-react": "^0.263.1"
}
```

# Features Breakdown

### Auto-typing Animation
- Types at 5ms per character (super fast!)
- 20ms delay between lines
- Re-types when tab is closed and reopened
- Shows full content when switching between existing tabs

### Drag & Resize
- **Sidebar**: Drag right edge, auto-collapse at <50px
- **Terminal**: Drag top edge, can maximize to full height
- Visual indicator (green line) when dragging

### Build System
- Simulates Gradle build process
- Shows realistic task output
- 3-second build duration
- Updates status bar on completion

## Color Palette (Darcula Theme)

```css
Background:     #2B2B2B
Panel:          #3C3F41
Border:         #232525
Text:           #A9B7C6
Accent:         #6A8759 (Green)
Keywords:       #CC7832 (Orange)
Strings:        #6A8759 (Green)
Comments:       #808080 (Gray)
Functions:      #FFC66D (Yellow)
```

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ❌ Mobile (intentionally blocked for desktop experience)

## Contributing

Contributions are welcome! Feel free to:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- Inspired by [Android Studio](https://developer.android.com/studio) IDE
- Icons by [Lucide](https://lucide.dev/)
- Font: Consolas, Monaco, Courier New

## Screenshots

### Desktop View
![Desktop](https://via.placeholder.com/800x400/2B2B2B/6A8759?text=Add+Desktop+Screenshot)

### Terminal Commands
![Terminal](https://via.placeholder.com/800x400/2B2B2B/6A8759?text=Add+Terminal+Screenshot)

### Build Process
![Build](https://via.placeholder.com/800x400/2B2B2B/6A8759?text=Add+Build+Screenshot)

## Links

- **Live Demo**: [https://akbarddev.vercel.app/](https://akbarddev.vercel.app/)
- **GitHub**: [https://github.com/akbrdhia/AkbarD_Porto/](https://github.com/akbrdhia/AkbarD_Porto/)

## Contact

**Akbar Dhia** - [akbardhia19@gmail.com](mailto:akbardhia19@gmail.com)

---

<div align="center">

**>_ Akbar D**

</div>
