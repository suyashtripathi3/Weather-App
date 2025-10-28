// src/hooks/useTheme.js
import { useState, useEffect } from "react";

export function useTheme() {
  // Load the saved theme or fallback to light mode
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Apply theme and persist to localStorage
  useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [darkMode]);

  // Toggle function
  const toggleTheme = () => setDarkMode((prev) => !prev);

  return { darkMode, toggleTheme };
}
