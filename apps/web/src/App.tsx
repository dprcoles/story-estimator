import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";
import Team from "./pages/Team";
import Summary from "./pages/Summary";
import { useThemeStore } from "./stores/themeStore";
import "./styles/globals.css";
import { useEffect } from "react";
import { useSocketStore } from "./stores/socketStore";
import { usePlayerStore } from "./stores/playerStore";
import { StorageItem } from "./types/storage";
import { getPlayer } from "./api/player";
import { io } from "socket.io-client";
import { API_URL } from "./utils/constants";
import PlayerProvider from "providers/PlayerProvider";
import Layout from "./components/Layout";

const App = () => {
  const { theme, setTheme } = useThemeStore();
  const { socket, setSocket, loading, setLoading } = useSocketStore();
  const { player, setPlayer, isPlayerModalOpen, setIsPlayerModalOpen } =
    usePlayerStore();

  const fetchPlayer = async (id: number) => {
    const playerInfo = await getPlayer(id);

    if (playerInfo) {
      setPlayer(playerInfo);
      return;
    }

    setLoading(false);
  };

  useEffect(() => {
    const storedPlayerId = parseInt(
      localStorage.getItem(StorageItem.PlayerId) || "0",
      10,
    );

    if (storedPlayerId) {
      fetchPlayer(storedPlayerId);
      return;
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (!socket && player.id) {
      const socket = io(API_URL, {
        query: { playerId: player.id },
      });
      setSocket(socket);
    }
  }, [player]);

  return (
    <BrowserRouter>
      <PlayerProvider>
        <Layout>
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
              path="team/:alias"
              element={<Team theme={theme} setTheme={setTheme} />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </PlayerProvider>
    </BrowserRouter>
  );
};

export default App;
