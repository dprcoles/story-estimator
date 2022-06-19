import { DARK_THEME, LIGHT_THEME } from "@/utils/constants";
import { useEffect, useRef, useState } from "react";

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export const useTheme = () => {
  const getSystemTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? DARK_THEME
      : LIGHT_THEME;

  const [theme, setThemeState] = useState(
    window.localStorage.getItem("theme") ?? getSystemTheme()
  );

  const listener = e => {
    setThemeState(e.matches ? DARK_THEME : LIGHT_THEME);
  };

  useEffect(() => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    darkThemeMq.addListener(listener);
    return () => darkThemeMq.removeListener(listener);
  }, []);

  const setTheme = newTheme => {
    setThemeState(newTheme);
    localStorage.setItem("theme", theme);
  };

  return { theme, setTheme };
};

