import { StorageItem } from "@/types/storage";
import { DARK_THEME, LIGHT_THEME } from "@/utils/constants";
import { useEffect, useState } from "react";

export const useThemeStore = () => {
  const getSystemTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? DARK_THEME
      : LIGHT_THEME;

  const [theme, setThemeState] = useState(
    window.localStorage.getItem(StorageItem.Theme) ?? getSystemTheme()
  );

  const listener = (e: MediaQueryListEvent) => {
    setThemeState(e.matches ? DARK_THEME : LIGHT_THEME);
  };

  useEffect(() => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    darkThemeMq.addListener(listener);
    return () => darkThemeMq.removeListener(listener);
  }, []);

  useEffect(() => {
    if (theme === DARK_THEME) {
      document.querySelector("html")?.classList.add(DARK_THEME);
      document.querySelector("html")?.classList.remove(LIGHT_THEME);
    } else {
      document.querySelector("html")?.classList.add(LIGHT_THEME);
      document.querySelector("html")?.classList.remove(DARK_THEME);
    }
  }, [theme]);

  const setTheme = (newTheme: string) => {
    window.localStorage.setItem(StorageItem.Theme, newTheme);
    setThemeState(newTheme);
  };

  return { theme, setTheme };
};

