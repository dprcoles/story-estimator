import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useTheme } from "./hooks";
import Home from "./pages/Home";
import Room from "./pages/Room";
import "./styles/globals.css";
import { DARK_THEME, LIGHT_THEME } from "./utils/constants";

const App = () => {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (theme === DARK_THEME) {
      document.querySelector("html")?.classList.add(DARK_THEME);
      document.querySelector("html")?.classList.remove(LIGHT_THEME);
    } else {
      document.querySelector("html")?.classList.add(LIGHT_THEME);
      document.querySelector("html")?.classList.remove(DARK_THEME);
    }
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home theme={theme} setTheme={setTheme} />} />
        <Route
          path="/room/:id"
          element={<Room theme={theme} setTheme={setTheme} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

