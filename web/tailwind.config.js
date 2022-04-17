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
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        dark: {
          background: "#212325",
          primary: "#303339",
          secondary: "#272A2F",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

