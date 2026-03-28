/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBg: "#0f1115",
        panelBg: "#1a1d24",
        borderDark: "#2d3340",
        accentRed: "#f87171",
        accentTeal: "#2dd4bf",
        accentBlue: "#60a5fa",
        accentIndigo: "#818cf8",
      }
    },
  },
  plugins: [],
}