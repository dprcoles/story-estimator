import "./styles/globals.css";

import AppProvider from "providers/AppProvider";
import PlayerProvider from "providers/PlayerProvider";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Organisation from "./pages/Organisation";
import Room from "./pages/Room";
import Summary from "./pages/Summary";
import Team from "./pages/Team";

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
              <Route path="organisation/:alias" element={<Organisation />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </PlayerProvider>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
