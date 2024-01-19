import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

import { DARK_THEME, LIGHT_THEME } from "@/utils/constants";

interface ThemeToggleProps {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeToggle = ({ theme, setTheme }: ThemeToggleProps) => {
  const isDark = theme === DARK_THEME;

  return (
    <div className="bg-light-hover dark:bg-dark-hover flex space-x-2 rounded-full p-1">
      <button
        className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-150 ease-linear ${
          !isDark
            ? "border-light-border-color dark:border-dark-border-color bg-light-buttons dark:bg-dark-buttons"
            : "hover:bg-light-buttons dark:hover:bg-dark-buttons border-transparent"
        }`}
        disabled={!isDark}
        onClick={() => setTheme(LIGHT_THEME)}
      >
        <FaSun />
      </button>
      <button
        className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-150 ease-linear ${
          isDark
            ? "border-light-border-color dark:border-dark-border-color bg-light-buttons dark:bg-dark-buttons"
            : "hover:bg-light-buttons dark:hover:bg-dark-buttons border-transparent"
        }`}
        disabled={isDark}
        onClick={() => setTheme(DARK_THEME)}
      >
        <FaMoon />
      </button>
    </div>
  );
};

export default ThemeToggle;
