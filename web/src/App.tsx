import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";
import Team from "./pages/Team";
import Summary from "./pages/Summary";
import { useThemeStore } from "./stores/themeStore";
import "./styles/globals.css";

const App = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="room/:id"
          element={<Room theme={theme} setTheme={setTheme} />}
        />
        <Route
          path="summary/:id"
          element={<Summary theme={theme} setTheme={setTheme} />}
        />
        <Route
          path="team/:id"
          element={<Team theme={theme} setTheme={setTheme} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

