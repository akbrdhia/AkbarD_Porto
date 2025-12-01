// ============= UPDATE THESE VALUES =============
export const PERSONAL_INFO = {
    name: "Akbar Dhia",
    username: "{ AkbarD }",
    email: "akbardhia19@gmail.com",
    github: "akbrdhia | Akbardhia",
    linkedin: "Akbardhia",
    location: "Bogor, Indonesia",
    role: "Mobile & Full-Stack Developer",
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
    "About.kt": `package com.akbard.portfolio

/*
 * =========================================
 * About.kt
 * Author: Akbar Dhia
 * Last modified: 2025-12-01
 * =========================================
 * 
 * TODO: Add more mass interests
 * FIXME: Why do I mass space so much?
 */

import android.util.Log

/**
 * About Me - The main character of this portfolio
 * @author akbrdhia
 */
class AboutMe : Human(), Developer {

    companion object {
        private const val TAG = "AboutMe"
    }

    override val name = "${PERSONAL_INFO.name}"
    override val alias = "${PERSONAL_INFO.username}"
    override val title = "${PERSONAL_INFO.role}"
    
    // Yeah, I wrote this at 2 AM
    val bio = """
        I'm an Android Developer and UI/UX enthusiast 
        driven by the art of crafting smooth, meaningful 
        digital experiences.
        
        I specialize in building modern Android apps with 
        Kotlin, designing clean human-centered interfaces, 
        and connecting everything through powerful backends.
        
        For me, coding isn't just problem-solving
        it's storytelling through logic and design.
    """.trimIndent()
    
    val mass = listOf(
        "Android Development",    // Main quest
        "UI/UX Design",           // Making things pretty
        "Backend Engineering",    // The dark arts
        "Web Development",        // Side quest
        "Cats"                    // Obviously
    )
    
    val currentStatus = "Building the next big thing... probably"
    
    // This function runs every morning (or afternoon, let's be real)
    fun startDay() {
        Log.d(TAG, "Booting up...")
        drinkCoffee()
        openAndroidStudio()
        // TODO: Actually be productive
        pretendToWork()
    }
    
    private fun drinkCoffee() = repeat(999) { /* never enough */ }
    
    override fun greet(): String {
        return "Hey! Thanks for checking out my portfolio"
    }
}`,

    "Skills.kt": `package com.akbard.portfolio

/*
 * =========================================
 * Skills.kt - Tech Arsenal
 * =========================================
 * 
 * WARNING: May contain mass skills
 * that took mass late nights to learn
 * 
 * Last updated: Today (I hope)
 */

/**
 * My tech stack - a.k.a. things I Google daily
 */
object TechStack {
    
    // ============== MOBILE ==============
    // Where I spend most of my time (and sanity)
    
    val mobile = TechCategory(
        name = "Mobile Development",
        primary = listOf(
            "Kotlin",                    // <3
            "Flutter"                    // Still learning, don't judge
        ),
        frameworks = listOf(
            "Jetpack Compose",           // The future
            "Android Jetpack",           // ViewModel, LiveData, Room
            "Retrofit",                  // HTTP goes brrrr
            "Firebase SDK"               // Push notifs at 3 AM
        ),
        tools = listOf(
            "Android Studio",            // Home sweet home
            "Gradle",                    // *cries in build time*
            "ML Kit",                    // When you need AI stuff
            "CameraX"                    // For those camera apps
        )
    )
    
    // ============== BACKEND ==============
    // The mysterious server-side realm
    
    val backend = TechCategory(
        name = "Backend",
        primary = listOf("Laravel", "Express.js"),
        languages = listOf("PHP", "JavaScript"),
        databases = listOf(
            "MySQL",                     // Classic
            "PostgreSQL"                 // Fancy classic
        )
    )
    
    // ============== FRONTEND ==============
    // Making things look nice since 2022
    
    val frontend = TechCategory(
        name = "Frontend",
        primary = listOf("React"),       // This portfolio btw
        languages = listOf("JavaScript", "TypeScript"),
        styling = listOf(
            "CSS",                       // The basics
            "Tailwind CSS"               // Utility class gang
        )
    )
    
    // ============== DESIGN ==============
    // Pixel pushing department
    
    val design = TechCategory(
        name = "Design",
        tools = listOf("Figma"),         // The GOAT
        skills = listOf(
            "UI Design",
            "UX Research", 
            "Prototyping",
            "Complaining about fonts"
        )
    )
    
    // ============== MISC ==============
    // Random things I picked up along the way
    
    val bonusSkills = listOf(
        "Git & GitHub",                  // git push --force (jk don't)
        "RESTful APIs",                  // GET POST PUT DELETE
        "WebSocket",                     // Real-time stuff
        "Firebase",                      // Google's gift to devs
        "IoT (ESP32)",                   // Hardware go beep boop
        "Basic Cybersecurity"            // Enough to be paranoid
    )
    
    fun getRandomSkill(): String {
        // For when someone asks "what can you do?"
        return (mobile.primary + backend.primary + frontend.primary)
            .random()
    }
}`,

    "Projects.kt": `package com.akbard.portfolio

/*
 * =========================================
 * Projects.kt - The Portfolio Highlights
 * =========================================
 * 
 * Stuff I built instead of sleeping
 * 
 * Status meanings:
 * - "Production" = Actually works
 * - "Beta" = Works but don't look too close
 * - "In Development" = It compiles sometimes
 * - "Live" = Pray it doesn't crash
 */

data class Project(
    val name: String,
    val tagline: String,
    val description: String,
    val techStack: List<String>,
    val status: ProjectStatus,
    val lessonsLearned: String
)

enum class ProjectStatus { LIVE, PRODUCTION, BETA, IN_DEV, CONCEPT }

object MyProjects {

    val featured = listOf(
    
        // ============== PROJECT 1 ==============
        Project(
            name = "KosKu",
            tagline = "Find your home away from home",
            description = """
                Modern boarding house management system.
                Helps owners manage rooms, tenants, and payments.
                Helps tenants find affordable housing.
            """.trimIndent(),
            techStack = listOf("Kotlin", "Laravel", "Room DB", "Retrofit"),
            status = ProjectStatus.IN_DEV,
            lessonsLearned = "Database design is harder than it looks"
        ),
        
        // ============== PROJECT 2 ==============
        Project(
            name = "Manager Usaha V2",
            tagline = "Business management, simplified",
            description = """
                Complete business management app for SMEs.
                Track inventory, sales, and expenses.
                Includes ML-powered receipt scanning.
            """.trimIndent(),
            techStack = listOf("Kotlin", "Laravel", "ML Kit", "Material3"),
            status = ProjectStatus.BETA,
            lessonsLearned = "ML Kit is actually pretty cool"
        ),
        
        // ============== PROJECT 3 ==============
        Project(
            name = "Cogito",
            tagline = "Your debate companion",
            description = """
                AI-powered debate preparation tool.
                Generates counterarguments and evidence.
                Built for competitive debaters.
            """.trimIndent(),
            techStack = listOf("Kotlin", "Express.js", "PostgreSQL", "Qwen AI"),
            status = ProjectStatus.PRODUCTION,
            lessonsLearned = "LLM integration is tricky but rewarding"
        ),
        
        // ============== PROJECT 4 ==============
        Project(
            name = "Festivaloka",
            tagline = "Events at your fingertips",
            description = """
                Festival and event discovery platform.
                Started as a Roblox game concept, 
                evolved into something bigger.
            """.trimIndent(),
            techStack = listOf("Roblox Studio", "Lua", "Creative Energy"),
            status = ProjectStatus.LIVE,
            lessonsLearned = "Game dev is a whole different world"
        )
    )
    
    // TODO: Add more projects
    // TODO: Actually finish the projects first lol
    
    fun getByStatus(status: ProjectStatus) = featured.filter { it.status == status }
}`,

    "Experience.kt": `package com.akbard.portfolio

/*
 * Experience.kt - The Journey So Far
 * 
 * Plot twist: I'm still a student
 * But that doesn't mean I haven't done stuff!
 */

data class Experience(
    val role: String,
    val company: String,
    val period: String,
    val tag: String,
    val summary: String,
    val bullets: List<String>
)

enum class ExpType { INTERNSHIP, COMPETITION, SCHOOL_LAB }

object MyJourney {

    val experiences = listOf(
    
        Experience(
            role = "Software Engineering Intern",
            company = "Kementrian Koperasi",
            period = "Oct 2024 - Feb 2025",
            tag = "Internship",
            summary = "Building internal tools to streamline cooperative management.",
            bullets = listOf(
                "Make Reports API reducing manual work by 40%.",
                "Developed Form ODS a dynamic form builder tool.",
                "Developed SAKO assistant for cooperative management."
            )
        ),
        
        Experience(
            role = "Android Developer",
            company = "Garuda Hacks 6.0",
            period = "June 2024",
            tag = "Competition",
            summary = "Developed Cogito, an AI debate companion app.",
            bullets = listOf(
                "Integrated Qwen-VL model for real-time counter-argument generation.",
                "Implemented natural language processing for argument analysis.",
                "Realtime argument analysis and feedback system."
            )
        ),
        
        Experience(
            role = "Student",
            company = "SMKN 1 Cibinong",
            period = "Jun 2022 - Present",
            tag = "School Lab",
            summary = "Full-stack experiments across Android, backend, and immersive web.",
            bullets = listOf(
                "Led mobile capstone projects from design to release.",
                "Prototyped Kotlin + Laravel stack for business apps.",
                "Shared internal tooling with classes as knowledge base."
            )
        )
    )
    
    val stats = mapOf(
        "Platforms handled" to 4,
        "Releases shipped" to 12,
        "Average sprint" to "10d"
    )
    
    fun calculateCodingHours(): Int {
        return 365 * 3 * 4
    }
}`,

    "Contact.kt": `package com.akbard.portfolio

/*
 * =========================================
 * Contact.kt - Let's Connect!
 * =========================================
 * 
 * Seriously, I read all my messages
 * (Eventually)
 */

object Contact {

    // ============== REACH ME AT ==============
    
    const val EMAIL = "${PERSONAL_INFO.email}"
    const val GITHUB = "github.com/akbrdhia"
    const val LINKEDIN = "linkedin.com/in/${PERSONAL_INFO.linkedin}"
    const val LOCATION = "${PERSONAL_INFO.location}"
    
    // ============== AVAILABILITY ==============
    
    val openTo = listOf(
        "Freelance Projects",        // Let's build something cool
        "Full-time Opportunities",   // After graduation!
        "Collaboration",             // Open source? Side project?
        "Tech Discussions",          // I love talking code
        "Coffee"                     // Virtual or IRL
    )
    
    // Response time varies based on:
    val responseFactors = mapOf(
        "weekday_morning" to "Fast",
        "weekday_afternoon" to "Medium",
        "weekend" to "Eventually...",
        "exam_season" to "Pray for me"
    )
    
    // ============== FUN STUFF ==============
    
    fun sendMessage(message: String): Response {
        return when {
            message.contains("job") -> Response.EXCITED
            message.contains("project") -> Response.INTERESTED  
            message.contains("coffee") -> Response.ABSOLUTELY
            else -> Response.WILL_READ
        }
    }
    
    /*
     * Thanks for scrolling this far!
     * 
     * If you're reading this, you're either:
     * a) A recruiter (hi! I'm available!)
     * b) A fellow dev (nice to meet you!)
     * c) Just curious (respect the dedication)
     * 
     * Either way, feel free to reach out.
     * Let's create something amazing together!
     */
}

// Easter egg: You found the end of the file!
// Here's a mass cat:
//
//  /\\_/\\  
// ( o.o ) 
//  > ^ <
//`,

    "README.md":
     `# ${PERSONAL_INFO.username}

## ${PERSONAL_INFO.role}

---

### Quick Start

- Click files in the sidebar to explore
- Use terminal below for commands
- Type \`help\` to see all commands
- Resize panels by dragging edges

---

### About

${PERSONAL_INFO.bio}

---

### Contact

- Email: ${PERSONAL_INFO.email}
- GitHub: github.com/akbrdhia
- LinkedIn: linkedin.com/in/${PERSONAL_INFO.linkedin}

---

Built by AkbarD // 2025
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