const fs = require('fs');
let code = fs.readFileSync('src/components/web/WebCursor.jsx', 'utf8');

// modify component signature
code = code.replace(/const WebCursor = \(\{ mousePosition = \{ x: 0, y: 0 \}, interactiveLabel \}\) => \{/, 'const WebCursor = ({ interactiveLabel }) => {\n  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });');

// Add mouse tracking logic
const trackingCode = `  // Mouse tracking
  useEffect(() => {
    const handlePointerMove = (e) => {
      requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);
`;
code = code.replace(/  const \{ x, y \} = mousePosition;/, `${trackingCode}\n  const { x, y } = mousePosition;`);

fs.writeFileSync('src/components/web/WebCursor.jsx', code);
