const defaultTheme = require("tailwindcss/defaultTheme");
const { join } = require("path");

module.exports = {
  content: [join(__dirname, "src/**/*.{js,ts,jsx,tsx}")],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Sora", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        dark: {
          background: "#000",
          main: "#FFFB00",
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
          main: "#0004FF",
          panels: "#ECEDEC",
          text: "#3A3B3B",
          buttons: "#E7E6E6",
          hover: "#D7D7D7",
          scrollbar: "#959595",
          border: {
            color: "#585858",
            hover: "#000",
          },
        },
        danger: {
          base: "#f44336",
          border: "#b71c1c",
          hover: "#ef5350",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
