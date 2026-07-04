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
      "override",
      "companion",
      "private",
      "enum",
      "when",
      "else",
      "to",
      "in",
      "is",
    ];
    const types = ["String", "List", "Map", "Int", "Boolean", "Unit"];
  
    let highlighted = code;
    
    // Use placeholder system to prevent overlapping replacements
    const placeholders = [];
    const addPlaceholder = (content) => {
      const id = `__PH${placeholders.length}__`;
      placeholders.push(content);
      return id;
    };
  
    // Step 1: Extract and protect multi-line comments /* */
    highlighted = highlighted.replace(
      /\/\*[\s\S]*?\*\//g,
      (match) => addPlaceholder(`<span style="color: #629755; font-style: italic;">${match}</span>`)
    );
    
    // Step 2: Extract and protect single-line comments //
    highlighted = highlighted.replace(
      /\/\/.*/g,
      (match) => addPlaceholder(`<span style="color: #629755; font-style: italic;">${match}</span>`)
    );
    
    // Step 3: Extract and protect triple-quoted strings
    highlighted = highlighted.replace(
      /"""[\s\S]*?"""/g,
      (match) => addPlaceholder(`<span style="color: #6A8759;">${match}</span>`)
    );
  
    // Step 4: Extract and protect regular strings
    highlighted = highlighted.replace(
      /"([^"\\]|\\.)*"/g,
      (match) => addPlaceholder(`<span style="color: #6A8759;">${match}</span>`)
    );
  
    // Step 5: Keywords
    keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, "g");
      highlighted = highlighted.replace(
        regex,
        `<span style="color: #CC7832;">${keyword}</span>`
      );
    });
  
    // Step 6: Types
    types.forEach((type) => {
      const regex = new RegExp(`\\b${type}\\b`, "g");
      highlighted = highlighted.replace(
        regex,
        `<span style="color: #A9B7C6; font-weight: bold;">${type}</span>`
      );
    });
  
    // Step 7: Functions
    highlighted = highlighted.replace(
      /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g,
      '<span style="color: #FFC66D;">$1</span>('
    );
    
    // Step 8: Numbers
    highlighted = highlighted.replace(
      /\b(\d+)\b/g,
      '<span style="color: #6897BB;">$1</span>'
    );
    
    // Step 9: Restore placeholders
    placeholders.forEach((content, i) => {
      highlighted = highlighted.replace(`__PH${i}__`, content);
    });
  
    return highlighted;
  };