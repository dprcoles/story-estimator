const { join } = require("path");
const config = require("ui/tailwind.config.js");

module.exports = {
  ...config,
  content: [
    join(__dirname, "src/**/*.{js,ts,jsx,tsx}"),
    join(__dirname, "../../packages/ui/src/**/*.{js,ts,jsx,tsx}"),
  ],
};
