// src/context/ThemeContext.js
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // load from localStorage if available

    return localStorage.getItem("theme") || "light";
  });

  // apply theme class to <html> element
  useEffect(() => {
    const root = document.documentElement;

    // remove both classes first
    root.classList.remove("light", "dark");

    // add the current theme
    root.classList.add(theme);

    // persist
    localStorage.setItem("theme", theme);
    console.log("🌗 Theme applied:", theme, root.className);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme; // ← This applies the class globally
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

