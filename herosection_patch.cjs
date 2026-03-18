const fs = require('fs');
let code = fs.readFileSync('src/components/web/sections/HeroSection.jsx', 'utf8');

code = code.replace(/const HeroSection = \(\{ scrollY, glitchActive \}\) => \{/, 'const HeroSection = ({ glitchActive }) => {\n  const [scrollY, setScrollY] = useState(0);\n\n  useEffect(() => {\n    const handleScroll = () => {\n      requestAnimationFrame(() => {\n        setScrollY(window.scrollY);\n      });\n    };\n    window.addEventListener("scroll", handleScroll, { passive: true });\n    handleScroll();\n    return () => window.removeEventListener("scroll", handleScroll);\n  }, []);\n');

fs.writeFileSync('src/components/web/sections/HeroSection.jsx', code);
