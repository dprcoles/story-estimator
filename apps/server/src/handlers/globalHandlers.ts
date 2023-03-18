import { BaseHandlerParams } from ".";

type GlobalHelperParams = Omit<BaseHandlerParams, "prisma" | "session">;

const handleUpdateRoom = ({
  io,
  roomId,
  rooms,
  roomPlayers,
}: GlobalHelperParams) => {
  io.to(roomId.toString()).emit("room:update", {
    players: roomPlayers.filter((p) => p.roomId === roomId),
    room: rooms.find((r) => r.id === roomId),
  });
};

const handleResetRoom = ({
  io,
  roomId,
  rooms,
  roomPlayers,
}: GlobalHelperParams) => {
  const playersInRoom = [...roomPlayers].filter((p) => p.roomId === roomId);
  playersInRoom.forEach((p) => (p.vote = undefined));

  io.to(roomId.toString()).emit("room:reset");
  io.to(roomId.toString()).emit("room:update", {
    players: playersInRoom,
    room: rooms.find((r) => r.id === roomId),
  });
};

export { handleUpdateRoom, handleResetRoom };
