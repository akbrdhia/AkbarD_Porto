const fs = require('fs');
let code = fs.readFileSync('src/pages/WebModePage.jsx', 'utf8');

// remove mousePosition
code = code.replace(/const \[mousePosition, setMousePosition\] = useState\(\{ x: 0, y: 0 \}\);\n/, '');
code = code.replace(/  \/\/ Mouse tracking - use clientX\/Y for fixed positioned cursor\n  useEffect\(\(\) => \{\n    const handlePointerMove = \(e\) => \{\n      requestAnimationFrame\(\(\) => \{\n        setMousePosition\(\{ x: e.clientX, y: e.clientY \}\);\n      \}\);\n    \};\n    window.addEventListener\("pointermove", handlePointerMove, \{ passive: true \}\);\n    return \(\) => window.removeEventListener\("pointermove", handlePointerMove\);\n  \}, \[\]\);\n/, '');

// remove scrollY
code = code.replace(/const \[scrollY, setScrollY\] = useState\(0\);\n/, '');
code = code.replace(/setScrollY\(window.scrollY\);\n          \n          \/\/ Find which section is most visible/, '// Find which section is most visible');

// change components
code = code.replace(/<WebCursor mousePosition=\{mousePosition\} interactiveLabel=\{cursorLinkLabel\} \/>/, '<WebCursor interactiveLabel={cursorLinkLabel} />');
code = code.replace(/<HeroSection scrollY=\{scrollY\} glitchActive=\{glitchActive\} \/>/, '<HeroSection glitchActive={glitchActive} />');

fs.writeFileSync('src/pages/WebModePage.jsx', code);
