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
    <div className="flex space-x-2 rounded-full bg-neutral-100 p-1 dark:bg-zinc-800">
      <button
        className={`rounded-full border-2 px-4 py-2 text-sm font-medium transition-all duration-150 ease-linear ${
          !isDark ? "border-blue-400 bg-blue-400/50" : "hocus:bg-zinc-800 border-transparent"
        }`}
        disabled={!isDark}
        onClick={() => setTheme(LIGHT_THEME)}
      >
        <FaSun />
      </button>
      <button
        className={`rounded-full border-2 px-4 py-2 text-sm font-medium transition-all duration-150 ease-linear ${
          isDark ? "border-pink-500 bg-pink-500/50" : "hocus:bg-neutral-200 border-transparent"
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
