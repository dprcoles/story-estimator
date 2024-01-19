const defaultTheme = require("tailwindcss/defaultTheme");
const { join } = require("path");

module.exports = {
  content: [join(__dirname, "src/**/*.{js,ts,jsx,tsx}")],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        heading: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        dark: {
          background: "#000",
          main: "#04E762",
          panels: "#131213",
          text: "#C5C4C4",
          buttons: "#181919",
          hover: "#282828",
          scrollbar: "#6A6A6A",
          border: {
            color: "#A7A7A7",
            hover: "#FFF",
          },
        },
        light: {
          background: "#FFF",
          main: "#8447FF",
          panels: "#F8F8F8",
          text: "#3A3B3B",
          buttons: "#F4F4F4",
          hover: "#F1F1F1",
          scrollbar: "#959595",
          border: {
            color: "#A7A7A7",
            hover: "#000",
          },
        },
        danger: {
          base: "#F44336",
          border: "#B71C1C",
          hover: "#EF5350",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
