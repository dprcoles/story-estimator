import React, { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

import { getPlayer } from "@/api/player";
import { createSession } from "@/api/session";
import CreateSessionModal from "@/components/Modals/CreateSessionModal";
import { usePlayerStore } from "@/stores/playerStore";
import { useSessionStore } from "@/stores/sessionStore";
import { useSocketStore } from "@/stores/socketStore";
import { useTeamStore } from "@/stores/teamStore";
import { StorageItem } from "@/types/storage";
import { API_URL, ROUTE_ROOM } from "@/utils/constants";

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const { socket, setSocket, setLoading } = useSocketStore();
  const { player, setPlayer } = usePlayerStore();
  const { isSessionModalOpen, setIsSessionModalOpen } = useSessionStore();
  const teamId = useTeamStore((state) => state.team.id);

  useEffect(() => {
    const fetchPlayer = async (id: number) => {
      const playerInfo = await getPlayer(id);

      if (playerInfo) {
        setPlayer(playerInfo);
        return;
      }

      setLoading(false);
    };

    const storedPlayerId = parseInt(
      localStorage.getItem(StorageItem.PlayerId) || "0",
      10,
    );

    if (storedPlayerId) {
      fetchPlayer(storedPlayerId);
      return;
    }

    setLoading(false);
  }, [setLoading, setPlayer]);

  useEffect(() => {
    if (!socket && player.id) {
      const socket = io(API_URL, {
        query: { playerId: player.id },
      });
      setSocket(socket);
    }
  }, [player, setSocket, socket]);

  const handleCreateSession = async (name: string) => {
    const session = await createSession({
      name: name,
      teamId: teamId,
    });

    if (session.id) {
      navigate(`${ROUTE_ROOM}/${session.id}`);
    }
  };

  return (
    <div className="text-black dark:text-white">
      <CreateSessionModal
        isOpen={isSessionModalOpen}
        setIsOpen={setIsSessionModalOpen}
        handleCreateSession={handleCreateSession}
      />
      {children}
    </div>
  );
};

export default AppProvider;
