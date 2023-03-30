const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./screens/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        default: "#000",
        primary: "#2dd4bf",
        secondary: "rgba(34, 197, 94, 1)",
        temperature: "#8EA5B4",
        light: "#F0F9FF",
        humidityLow: "#BCD5AC",
        humidityHigh: "#59CC0E",
        burn: "#F9B145",
        detection: "#C8B4FF",
      },
    },
  },
  plugins: [],
});
