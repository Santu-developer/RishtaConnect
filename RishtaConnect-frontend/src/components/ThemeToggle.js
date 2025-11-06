import React, { useEffect, useState } from "react";

// Simple theme toggle using data-theme attribute on <html>
// Persists choice to localStorage and respects system preference on first load
const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored || (systemPrefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
      {theme === "dark" ? <i className="bi bi-sun"></i> : <i className="bi bi-moon"></i>}
    </button>
  );
};

export default ThemeToggle;
