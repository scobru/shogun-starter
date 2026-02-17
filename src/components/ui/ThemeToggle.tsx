import React, { useState, useEffect } from 'react';

export const ThemeToggle: React.FC = () => {
  // List of available themes
  const themes = ["light", "dark"] as const;
  type Theme = typeof themes[number];
  
  // Initialize theme state from localStorage
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme && themes.includes(savedTheme as Theme)) ? (savedTheme as Theme) : "dark";
  });

  // Update theme in localStorage and apply to document
  const setTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.remove(...themes);
    document.documentElement.classList.add(theme);
  };

  // Initialize theme on component mount
  useEffect(() => {
    setTheme(currentTheme);
  }, []);

  const toggleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <div className="tooltip tooltip-bottom" data-tip={currentTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}>
      <button
        onClick={toggleTheme}
        className="btn btn-ghost btn-circle"
        aria-label="Toggle theme"
      >
        {currentTheme === "dark" ? (
          // Sun icon for Light mode switch
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          // Moon icon for Dark mode switch
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;
