import { Socket } from "socket.io";
import { SocketRoomPrefix } from "../enums/socket.enums";

export interface SocketInfo {
  playerId: number;
  roomId?: number;
  teamId?: number;
}

export const getSocketInfo = (client: Socket): SocketInfo => {
  const playerIdString = client.handshake.query["playerId"] as string;
  const rooms = Array.from(client.rooms);

  let roomId = undefined;
  let teamId = undefined;

  const room = rooms.find((r) => r.match(`(^${SocketRoomPrefix.Room})`));
  const team = rooms.find((r) => r.match(`(^${SocketRoomPrefix.Team})`));

  if (room) {
    roomId = parseInt(room.replace(SocketRoomPrefix.Room, ""), 10);
  }

  if (team) {
    teamId = parseInt(team.replace(SocketRoomPrefix.Team, ""), 10);
  }

  return {
    playerId: parseInt(playerIdString || "0", 10),
    roomId,
    teamId,
  };
};
