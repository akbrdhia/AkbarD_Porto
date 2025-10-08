/**
 * Kotlin Syntax Highlighter
 * Highlights Kotlin code with Darcula theme colors
 */
export const highlightKotlin = (code) => {
    const keywords = [
      "package",
      "class",
      "object",
      "val",
      "var",
      "fun",
      "const",
      "data",
      "listOf",
      "mapOf",
      "println",
      "forEach",
      "forEachIndexed",
      "import",
      "return",
    ];
    const types = ["String", "List", "Map", "Int", "Boolean"];
  
    let highlighted = code;
  
    // Comments
    highlighted = highlighted.replace(
      /\/\*\*[\s\S]*?\*\//g,
      (match) =>
        `<span style="color: #808080; font-style: italic;">${match}</span>`
    );
    highlighted = highlighted.replace(
      /\/\/.*/g,
      (match) =>
        `<span style="color: #808080; font-style: italic;">${match}</span>`
    );
  
    // Strings
    highlighted = highlighted.replace(
      /"([^"]*)"/g,
      '<span style="color: #6A8759;">"$1"</span>'
    );
    highlighted = highlighted.replace(
      /"""[\s\S]*?"""/g,
      (match) => `<span style="color: #6A8759;">${match}</span>`
    );
  
    // Keywords
    keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, "g");
      highlighted = highlighted.replace(
        regex,
        `<span style="color: #CC7832;">${keyword}</span>`
      );
    });
  
    // Types
    types.forEach((type) => {
      const regex = new RegExp(`\\b${type}\\b`, "g");
      highlighted = highlighted.replace(
        regex,
        `<span style="color: #A9B7C6; font-weight: bold;">${type}</span>`
      );
    });
  
    // Functions
    highlighted = highlighted.replace(
      /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g,
      '<span style="color: #FFC66D;">$1</span>('
    );
  
    return highlighted;
  };