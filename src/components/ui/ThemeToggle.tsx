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

  // Handle theme change
  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.value as Theme);
  };

  return (
    <div className="dropdown dropdown-end">
      <button
        className="btn btn-circle btn-ghost"
        aria-label={`Change theme, current theme is ${currentTheme}`}
      >
        {currentTheme === "dark" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-sky-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-orange-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41-1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        )}
      </button>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52"
      >
        {themes.map((theme) => (
          <li key={theme} className="form-control">
            <label className="label cursor-pointer justify-between">
              <span className="label-text text-sm capitalize">
                {theme === "dark" ? "Dark" : "Light"}
              </span>
              <input
                type="radio"
                name="theme-dropdown"
                className="radio theme-controller"
                value={theme}
                checked={currentTheme === theme}
                onChange={handleThemeChange}
              />
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeToggle;

