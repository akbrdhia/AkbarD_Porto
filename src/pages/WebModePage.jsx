import React, { useState, useEffect, useRef } from "react";

// Components
import WebLoadingScreen from "../components/web/WebLoadingScreen";
import WebCursor from "../components/web/WebCursor";
import WebNavbar from "../components/web/WebNavbar";
import WebSideNav from "../components/web/WebSideNav";
import WebGlobalStyles from "../components/web/WebGlobalStyles";

// Constants
import { PERSONAL_INFO } from "../constants/portfolioData";

// Context
import { usePortfolio } from "../context/PortfolioContext";

// Components
import SEO from "../components/SEO";

// Sections
import HeroSection from "../components/web/sections/HeroSection";
import MarqueeSection from "../components/web/sections/MarqueeSection";
import AboutSection from "../components/web/sections/AboutSection";
import SkillsSection from "../components/web/sections/SkillsSection";
import ProjectsSection from "../components/web/sections/ProjectsSection";
import ExperienceSection from "../components/web/sections/ExperienceSection";
import ContactSection from "../components/web/sections/ContactSection";

const WebModePage = () => {
  const { setViewMode } = usePortfolio();
  const [hoveredProject, setHoveredProject] = useState(null);
  const [cursorLinkLabel, setCursorLinkLabel] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const containerRef = useRef(null);

  // Page Orchestration: Mount, Mode, and Loading Sequence
  useEffect(() => {
    // 1. Set mode
    setViewMode && setViewMode("web");

    // 2. Start loading progress
    const interval = setInterval(() => {
      setLoadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoaded(true);
            setTimeout(() => setShowContent(true), 100);
          }, 500);
          return 100;
        }
        const increment = prev < 30 ? Math.random() * 8 : 
                         prev < 70 ? Math.random() * 5 : 
                         Math.random() * 3;
        return Math.min(prev + increment, 100);
      });
    }, 80);

    return () => clearInterval(interval);
  }, [setViewMode]);

  // Consolidate continuous UI updates: Mouse and Interaction tracking
  useEffect(() => {
    const interactiveSelector = 'a[href], button, [role="button"], input[type="button"], input[type="submit"], [data-cursor-interactive="true"]';
    
    const deriveLabel = (el) => {
      if (!el) return null;
      return (el.getAttribute("data-cursor-label") || el.getAttribute("aria-label") || el.innerText || el.textContent || el.getAttribute("href"))?.replace(/\s+/g, " ").trim() || null;
    };

    const handlePointerMove = (e) => {
      // 1. Update mouse position via CSS variables to avoid React re-renders
      const root = document.documentElement;
      root.style.setProperty('--mouse-x', `${e.clientX}px`);
      root.style.setProperty('--mouse-y', `${e.clientY}px`);

      // 2. Detect interactive elements
      const interactiveEl = e.target.closest(interactiveSelector);
      if (!interactiveEl) {
        setCursorLinkLabel(prev => prev === null ? prev : null);
        return;
      }
      const label = deriveLabel(interactiveEl) || "LINK";
      setCursorLinkLabel(prev => prev === label ? prev : label);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  // Scroll tracking with section detection
  useEffect(() => {
    const sectionIds = [
      "hero-section",
      "about-section", 
      "skills-section",
      "projects-section",
      "experience-section",
      "contact-section"
    ];
    
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Update scroll CSS variable for smooth parallax without re-renders
          document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
          
          // Find which section is most visible
          let closestSection = 0;
          let minDistance = Infinity;
          
          sectionIds.forEach((id, idx) => {
            const element = document.getElementById(id);
            if (element) {
              const rect = element.getBoundingClientRect();
              const distance = Math.abs(rect.top - window.innerHeight / 3);
              if (distance < minDistance) {
                minDistance = distance;
                closestSection = idx;
              }
            }
          });
          
          setActiveSection(closestSection);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Consolidate Heartbeats: Clock and Random Glitches
  useEffect(() => {
    const heartbeat = setInterval(() => {
      // Update clock every second
      const now = new Date();
      setCurrentTime(prev => {
        if (prev.getSeconds() !== now.getSeconds()) return now;
        return prev;
      });

      // Random glitch logic (approx 8% chance every 100ms)
      // Pure CSS variable toggle to avoid React tree re-renders
      if (Math.random() > 0.92) {
        document.documentElement.style.setProperty('--glitch-active', '1');
        setTimeout(() => {
          document.documentElement.style.setProperty('--glitch-active', '0');
        }, 100 + Math.random() * 100);
      }
    }, 100);

    return () => clearInterval(heartbeat);
  }, []);

  // Scroll reveal animation observer
  useEffect(() => {
    if (!showContent) return;
    
    // Give a small delay to ensure DOM is fully ready before querying
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("active");
            }
          });
        },
        {
          threshold: 0.01,
          rootMargin: "0px 0px 50px 0px", // Trigger slightly before it enters
        }
      );

      // Observe all reveal elements
      const revealElements = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate"
      );
      
      revealElements.forEach((el) => {
        // If element is already in viewport, trigger it immediately
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add("active");
        }
        observer.observe(el);
      });

      return () => {
        revealElements.forEach((el) => observer.unobserve(el));
      };
    }, 150);

    return () => clearTimeout(timer);
  }, [showContent]);

  // Loading screen
  if (!isLoaded) {
    return <WebLoadingScreen loadProgress={loadProgress} />;
  }

  return (
    <>
      <SEO 
        title="Professional Web Portfolio" 
        description="Explore Akbar Dhia's professional work and projects through a modern, responsive web interface. Specializing in Full-Stack Development, UI/UX Design, and innovative web solutions."
        url="/web"
      />
      {/* Fixed elements - OUTSIDE animated container */}
      <WebCursor interactiveLabel={cursorLinkLabel} />
      <WebSideNav activeSection={activeSection} />
      <WebNavbar currentTime={currentTime} />
      
      {/* Noise overlay */}
      <div style={{
        position: "fixed",
        inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        opacity: 0.03,
        pointerEvents: "none",
        zIndex: 1000,
        mixBlendMode: "overlay",
      }} />

      {/* Main content container - this one gets animated */}
      <div 
        ref={containerRef}
        style={{
          width: "100%",
          minHeight: "100vh",
          overflowX: "hidden",
          background: "#0a0a0a",
          color: "#fff",
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          position: "relative",
          opacity: showContent ? 1 : 0,
          transform: showContent ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
        }}
      >
        {/* ==================== SECTIONS ==================== */}
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection 
          hoveredProject={hoveredProject} 
          setHoveredProject={setHoveredProject} 
        />
        <ExperienceSection />
        <ContactSection />
      </div>

      {/* Global Styles */}
      <WebGlobalStyles />
    </>
  );
};

export default WebModePage;
