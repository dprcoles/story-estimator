const defaultTheme = require("tailwindcss/defaultTheme");
const { join } = require("path");
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [join(__dirname, "src/**/*.{js,ts,jsx,tsx}")],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        heading: ["Rethink Sans", ...defaultTheme.fontFamily.sans],
        button: ["Rethink Sans", ...defaultTheme.fontFamily.sans],
      },
      colors: {},
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ addVariant }) {
      addVariant("hocus", ["&:hover", "&:focus"]);
      addVariant("group-hocus", [
        ":merge(.group):hover &",
        ":merge(.group):focus &",
      ]);
    }),
  ],
};
