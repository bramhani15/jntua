import React, { useState, useEffect } from "react";

function ThemeToggler() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.className = theme; // Apply theme to body
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div>
      <h1>{theme === "light" ? "Light Mode" : "Dark Mode"}</h1>
      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </div>
  );
}

export default ThemeToggler;

