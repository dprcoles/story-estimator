const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/utils/**/*.{js,ts}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
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
            hover: "#fff",
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

