import React from "react";

const MenuBar = () => {
    
  const menuItems = [
    "File",
    "Edit",
    "View",
    "Navigate",
    "Code",
    "Refactor",
    "Build",
    "Run",
    "Tools",
    "Help",
  ];

  return (
    <div className="menu-bar">
      {menuItems.map((item) => (
        <div key={item} className="menu-item">
          {item}
        </div>
      ))}
    </div>
  );
};

export default MenuBar;