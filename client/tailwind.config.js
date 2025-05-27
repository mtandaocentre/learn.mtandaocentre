/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: "#1e293b",       // Neutral dark (similar to gray-800)
          darker: "#0f172a",     // Darker neutral (similar to gray-900)
          darkest: "#020617",    // Near-black (similar to gray-950)
        },
        text: {
          light: "#e2e8f0",      // Light gray (similar to gray-200)
          lighter: "#f8fafc",     // Off-white (similar to gray-50)
        },
        accent: "#4b5563",       // Medium neutral (similar to gray-600)
      },
    },
  },
  plugins: [],
};