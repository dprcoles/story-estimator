import PlayerModal from "@/components/Modals/PlayerModal";
import { usePlayerStore } from "@/stores/playerStore";
import { useRoomStore } from "@/stores/roomStore";
import { useSocketStore } from "@/stores/socketStore";
import { PlayerInfo } from "@/types/player";
import { EmitEvent } from "@/types/server";
import { REQUIRED_ROUTES } from "@/utils/constants";
import { PropsWithChildren, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PlayerProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [canRender, setCanRender] = useState<boolean>(false);
  const { player, setPlayer, isPlayerModalOpen, setIsPlayerModalOpen } =
    usePlayerStore((state) => state);
  const { room } = useRoomStore((state) => state);
  const { socket, loading, emit } = useSocketStore((state) => state);
  const location = useLocation();

  const isRequiredRoute = REQUIRED_ROUTES.includes(
    `/${location.pathname.split("/")[1]}`,
  );

  useEffect(() => {
    if (!socket && !loading && isRequiredRoute) {
      setIsPlayerModalOpen(true);
    }
  }, [socket, loading]);

  useEffect(() => {
    if (player.id || !isRequiredRoute) {
      setCanRender(true);
    }
  }, [player]);

  const handleSetPlayer = (player: PlayerInfo) => {
    setPlayer(player);

    if (socket) {
      emit(EmitEvent.UpdatePlayer, { player });
    }
  };

  socket?.on(EmitEvent.UpdatePlayerSuccess, () => {
    if (room) {
      emit(EmitEvent.Update);
    }
  });

  return (
    <>
      <PlayerModal
        isOpen={isPlayerModalOpen}
        setIsOpen={setIsPlayerModalOpen}
        player={player}
        setPlayer={handleSetPlayer}
      />
      {canRender && children}
    </>
  );
};

export default PlayerProvider;
