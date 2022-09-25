import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";
import { useThemeStore } from "./stores/themeStore";
import "./styles/globals.css";
import { StorageItem } from "./types/storage";

const App = () => {
  const { theme, setTheme } = useThemeStore();

  const betaEnabled = localStorage.getItem(StorageItem.Beta);

  if (
    betaEnabled &&
    betaEnabled === "true" &&
    process.env.NODE_ENV !== "development"
  ) {
    window.location.href = window.location.href.replace(
      "storyestimator.dev",
      "beta.storyestimator.dev"
    );
  }

  if (typeof window !== "undefined") {
    console.log(
      "%c📖 STORY ESTIMATOR",
      "display:block;padding:0.125em 1em;font-family:courier;font-size:14px;font-weight:bold;line-height:2;background:blue;color:white;"
    );
    console.log(
      "%cA story estimation tool for agile teams.",
      "display:block;font-family:monospace;font-size:12px;font-weight:bold;line-height:1"
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
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

