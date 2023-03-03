import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { PrismaClient, Sessions } from "@prisma/client";
import { Player, Room } from "src/types";
import registerSocketHandlers from "./socketHandlers";
import registerPlayerHandlers from "./playerHandlers";
import registerRoomHandlers from "./roomHandlers";
import registerStoryHandlers from "./storyHandlers";
import handleOnConnection from "./connectionHandler";

export interface BaseHandlerParams {
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
  prisma: PrismaClient;
  roomId: number;
  playerId: number;
  rooms: Room[];
  roomPlayers: Player[];
  session: Sessions | null;
}

const registerHandlers = (params: BaseHandlerParams) => {
  registerSocketHandlers(params);
  registerPlayerHandlers(params);
  registerRoomHandlers(params);
  registerStoryHandlers(params);
};

export { handleOnConnection, registerHandlers };

