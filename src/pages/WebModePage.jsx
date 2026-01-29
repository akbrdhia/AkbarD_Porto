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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredProject, setHoveredProject] = useState(null);
  const [cursorLinkLabel, setCursorLinkLabel] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [glitchActive, setGlitchActive] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const containerRef = useRef(null);

  // Set view mode to web when this page mounts
  useEffect(() => {
    setViewMode && setViewMode("web");
  }, [setViewMode]);

  // Intro animation - slower for dramatic effect
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoaded(true);
            // Trigger content animation after a small delay
            setTimeout(() => setShowContent(true), 100);
          }, 500);
          return 100;
        }
        // Slower progress with variable speed
        const increment = prev < 30 ? Math.random() * 8 : 
                         prev < 70 ? Math.random() * 5 : 
                         Math.random() * 3;
        return Math.min(prev + increment, 100);
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  // Mouse tracking - use clientX/Y for fixed positioned cursor
  useEffect(() => {
    const handlePointerMove = (e) => {
      requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  useEffect(() => {
    const interactiveSelector =
      'a[href], button, [role="button"], input[type="button"], input[type="submit"], [data-cursor-interactive="true"]';

    const deriveLabel = (el) => {
      if (!el) return null;
      const rawLabel =
        el.getAttribute("data-cursor-label") ||
        el.getAttribute("aria-label") ||
        el.innerText ||
        el.textContent ||
        el.getAttribute("href");
      if (!rawLabel) return null;
      return rawLabel.replace(/\s+/g, " ").trim();
    };

    const handlePointerMove = (event) => {
      const interactiveEl = event.target.closest(interactiveSelector);
      if (!interactiveEl) {
        setCursorLinkLabel((prev) => (prev === null ? prev : null));
        return;
      }

      const label = deriveLabel(interactiveEl) || "LINK";

      setCursorLinkLabel((prev) => (prev === label ? prev : label));
    };

    document.addEventListener("pointermove", handlePointerMove);
    return () => document.removeEventListener("pointermove", handlePointerMove);
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
          setScrollY(window.scrollY);
          
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

  // Clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Random glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.92) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 100 + Math.random() * 100);
      }
    }, 100);
    return () => clearInterval(glitchInterval);
  }, []);

  // Scroll reveal animation observer
  useEffect(() => {
    if (!showContent) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Observe all reveal elements
    const revealElements = document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate"
    );
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, [showContent]);

  // Loading screen
  if (!isLoaded) {
    return <WebLoadingScreen loadProgress={loadProgress} />;
  }

  return (
    <>
      {/* Fixed elements - OUTSIDE animated container */}
      <WebCursor mousePosition={mousePosition} interactiveLabel={cursorLinkLabel} />
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
        <HeroSection scrollY={scrollY} glitchActive={glitchActive} />
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
