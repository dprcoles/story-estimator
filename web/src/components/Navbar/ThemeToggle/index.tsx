import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { DARK_THEME, LIGHT_THEME } from "@/utils/constants";

interface ThemeToggleProps {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, setTheme }) => {
  const isDark = theme === DARK_THEME;

  return (
    <div className="flex space-x-2 bg-light-hover dark:bg-dark-hover rounded-full p-1">
      <button
        className={`text-sm font-medium px-4 py-2 rounded-full border ease-linear transition-all duration-150 ${
          !isDark
            ? "border-light-border-color dark:border-dark-border-color bg-light-buttons dark:bg-dark-buttons"
            : "border-transparent hover:bg-light-buttons dark:hover:bg-dark-buttons"
        }`}
        disabled={!isDark}
        onClick={() => setTheme(LIGHT_THEME)}
      >
        <FaSun />
      </button>
      <button
        className={`text-sm font-medium px-4 py-2 rounded-full border ease-linear transition-all duration-150 ${
          isDark
            ? "border-light-border-color dark:border-dark-border-color bg-light-buttons dark:bg-dark-buttons"
            : "border-transparent hover:bg-light-buttons dark:hover:bg-dark-buttons"
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

