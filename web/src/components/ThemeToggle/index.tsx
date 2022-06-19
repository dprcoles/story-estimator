import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaMoon, FaSun } from "react-icons/fa";
import { DARK_THEME, LIGHT_THEME } from "@/utils/constants";

interface ThemeToggleProps {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, setTheme }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = theme === DARK_THEME;

  return (
    <AnimatePresence exitBeforeEnter initial>
      <motion.span
        key={theme}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          className="align-middle items-center p-2 bg-light-primary hover:bg-light-secondary dark:bg-dark-primary dark:hover:bg-dark-secondary rounded-md shadow-sm ease-linear transition-all duration-150"
          onClick={e => {
            e.preventDefault();
            setTheme(isDark ? LIGHT_THEME : DARK_THEME);
          }}
        >
          {mounted && isDark ? <FaSun /> : <FaMoon />}
        </button>
      </motion.span>
    </AnimatePresence>
  );
};

export default ThemeToggle;

