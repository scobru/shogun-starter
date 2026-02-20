/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html',
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#D0BCFF", // Adapted M3 Dark Primary
        "on-primary": "#381E72",
        "primary-container": "#4F378B",
        "on-primary-container": "#EADDFF",
        "secondary": "#CCC2DC",
        "secondary-container": "#4A4458",
        "background": "#1C1B1F", // M3 Dark Background
        "surface": "#2B2930",    // M3 Dark Surface
        "surface-variant": "#49454F",
        "outline": "#938F99",
        "on-surface": "#E6E1E5",  // High contrast text
        "on-surface-variant": "#CAC4D0",
        "surface-container-low": "#1D1B20",
        "surface-container-high": "#36343B",
      },
      fontFamily: {
        "display": ["Outfit", "sans-serif"],
        "body": ["DM Sans", "sans-serif"],
        "mono": ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        "lg": "16px",
        "xl": "24px",
        "2xl": "28px",
        "3xl": "32px",
        "full": "9999px"
      },
      boxShadow: {
        "elevation-1": "0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)",
        "elevation-2": "0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)",
        "elevation-3": "0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px 0px rgba(0, 0, 0, 0.3)",
      }
    },
  },
  daisyui: {
    themes: [
      {
        dark: {
          "primary": "#D0BCFF",
          "primary-content": "#381E72",
          "secondary": "#CCC2DC",
          "secondary-content": "#2B2930",
          "accent": "#7D5260",
          "neutral": "#938F99",
          "base-100": "#1C1B1F",
          "base-200": "#2B2930",
          "base-300": "#49454F",
          "base-content": "#E6E1E5",
          "info": "#4aa9ff",
          "success": "#52c41a",
          "warning": "#faad14",
          "error": "#ff4d4f",
          "--rounded-btn": "9999px",
        },
      },
      "light",
    ],
    darkTheme: "dark",
  },
}
