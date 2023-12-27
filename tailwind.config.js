// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: {
          100: "#000000",
          50: "#232631"
        },
        grey: "#7B7B7B",
        violet: {
          DEFAULT: "#3258E8",
          light: "rgba(50, 88, 232, 0.10)"
        },
        white: {
          DEFAULT: "#FFFFFF",
          dark: "#E0E7FA"
        }
      }
    }
  },
  darkMode: "class",
  plugins: [nextui()],
};
