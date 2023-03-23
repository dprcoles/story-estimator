import { Socket } from "socket.io";

export interface SocketInfo {
  playerId: number;
  roomId?: number;
}

export const getSocketInfo = (client: Socket): SocketInfo => {
  const playerIdString = client.handshake.query["playerId"] as string;
  const rooms = Array.from(client.rooms);

  let roomId = undefined;

  if (rooms.length > 1) {
    roomId = parseInt(rooms[1], 10);
  }

  return {
    playerId: parseInt(playerIdString || "0", 10),
    roomId,
  };
};
