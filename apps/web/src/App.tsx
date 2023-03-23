import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";
import Team from "./pages/Team";
import Summary from "./pages/Summary";
import "./styles/globals.css";
import PlayerProvider from "providers/PlayerProvider";
import Layout from "./components/Layout";
import AppProvider from "providers/AppProvider";

const App = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <PlayerProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="room/:id" element={<Room />} />
              <Route path="summary/:id" element={<Summary />} />
              <Route path="team/:alias" element={<Team />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </PlayerProvider>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
