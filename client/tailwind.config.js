/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: "#1a1a2e",
          darker: "#16213e",
          darkest: "#0f172a",
        },
        text: {
          light: "#e6f1ff",
          lighter: "#f8fafc",
        },
        accent: "#4f46e5",
      },
    },
  },
  plugins: [],
};
