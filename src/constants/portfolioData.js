// ============= UPDATE THESE VALUES =============
export const PERSONAL_INFO = {
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
  
  export const FILE_STRUCTURE = {
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
  
  export const FILE_CONTENTS = {
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
          "Web Development",
          "Cat"
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
        "Primary" to listOf("Kotlin", "Flutter (in learning)"),
        "Framework / Library" to listOf(
        "Jetpack Compose", 
        "Android Jetpack (ViewModel, LiveData, Room)", 
        "Retrofit", 
        "Firebase SDK"
    ),
        "Tools" to listOf(
        "Android Studio", 
        "Gradle", 
        "Figma", 
        "ML Kit", 
        "CameraX"
    )
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
        "WebSocket",
        "Firebase",
        "Express.js", 
        "IoT Integration (ESP32)",
        "Cybersecurity Basics"
    )   
      
      fun displaySkills() {
          println("=== Core Competencies ===")
          println("🤖 Android: Kotlin, Flutter")
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
              tech = listOf("Kotlin", "Laravel", "Room DB"),
              status = "In Development",
              githubUrl = "Waitttt i need to add it to github realese first",
              demoUrl = "------------"
          ),
          
          Project(
              name = "Manager Usaha V2",
              description = "Business management application",
              tech = listOf("Kotlin", "Laravel", "ML Kit"),
              status = "Beta",
              githubUrl = "for this wait",
              demoUrl = "-----------"
          ),
          
          Project(
              name = "Cogito",
              description = "Smart Debate companion",
              tech = listOf("Express", "Postgres SQL", "Kotlin", "Qwen Model"),
              status = "Production",
              githubUrl = "this also need to add on github realese...",
              demoUrl = "----------"
          ),
          
          Project(
              name = "Festivaloka",
              description = "Festival and event discovery platform",
              tech = listOf("Roblox studio", "LUA"),
              status = "Live",
              githubUrl = "there s no github for roblox game, or is it?, i'll check it",
              demoUrl = "----------"
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

          Experience(
              role = "Android Developer",
              Competition = "Garuda Hacks 6.0 (Hackathon)",
              description = "--- Ehmmmm wait ---",
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
          📅 June 2022 - Present (Im not graduated yet)
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
  
  export const WELCOME_MESSAGES = [
    "------------------------------------------------------------",
    "Android Studio Terminal [Version 1.9.0]",
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
    "ready: Akbar Dhia (Developer)",
    'Type "help" to view available commands.',
    '💡 Tip: Try "matrix", "coffee".',
    "",
  ];