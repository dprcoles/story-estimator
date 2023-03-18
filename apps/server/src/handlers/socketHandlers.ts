import { BaseHandlerParams } from ".";
import { handleUpdateRoom } from "./globalHandlers";

const registerSocketHandlers = ({
  io,
  socket,
  roomId,
  playerId,
  rooms,
  roomPlayers,
}: BaseHandlerParams) => {
  const handlePong = () => {
    roomPlayers.find((p) => p.id === playerId);
  };

  const handleDisconnect = () => {
    roomPlayers = [...roomPlayers].filter((player) => player.id !== playerId);
    handleUpdateRoom({ io, socket, roomId, playerId, rooms, roomPlayers });
  };

  socket.on("pong", handlePong);
  socket.on("disconnect", handleDisconnect);
};

export default registerSocketHandlers;
