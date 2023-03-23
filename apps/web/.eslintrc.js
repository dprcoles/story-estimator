module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      modules: true,
    },
  },
  plugins: [
    "@typescript-eslint/eslint-plugin",
    "prettier",
    "simple-import-sort",
    "import",
  ],
  extends: [
    "react-app",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [
    ".eslintrc.js",
    "vite.config.ts",
    "tailwind.config.js",
    "postcss.config.js",
  ],
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "no-multiple-empty-lines": [
      "error",
      {
        max: 1,
        maxEOF: 1,
      },
    ],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "no-unused-expressions": [
      "error",
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
};
