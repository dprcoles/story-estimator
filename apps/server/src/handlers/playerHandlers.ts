import { BaseHandlerParams } from ".";
import { Player } from "../types/player";
import { handleUpdateRoom } from "./globalHandlers";

const registerPlayerHandlers = ({
  io,
  socket,
  roomId,
  playerId,
  rooms,
  roomPlayers,
}: BaseHandlerParams) => {
  const handleUpdate = (data: Player) => {
    const player = [...roomPlayers].find((p) => p.id === data.id);
    if (player) {
      const playerIndex = roomPlayers.findIndex((x) => x.id === data.id);
      roomPlayers[playerIndex] = {
        ...player,
        ...data,
        vote: data.type !== player.type ? undefined : player.vote,
      };
    }
    handleUpdateRoom({ io, socket, roomId, playerId, rooms, roomPlayers });
  };

  socket.on("player:update", handleUpdate);
};

export default registerPlayerHandlers;
