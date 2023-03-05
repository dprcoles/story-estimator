import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { __prod__ } from "src/constants/app.constants";
import { handleOnConnection, registerHandlers } from "src/handlers";
import { PrismaService } from "src/prisma/prisma.service";
import { Player } from "src/types/player";
import { Room } from "src/types/room";

@WebSocketGateway({
  cors: {
    origin: __prod__ ? process.env.WEB_URL : "*",
  },
})
export class RoomGateway implements OnGatewayConnection {
  constructor(private prisma: PrismaService) {}

  @WebSocketServer()
  server: Server;

  private rooms: Room[] = [];
  private roomPlayers: Player[] = [];

  async handleConnection(
    client: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  ) {
    const roomId = parseInt(client.handshake.query["roomId"] as string, 10);
    const playerId = parseInt(client.handshake.query["playerId"] as string, 10);
    const session = null;

    const handlerParams = {
      io: this.server,
      socket: client,
      prisma: this.prisma,
      roomId,
      playerId,
      rooms: this.rooms,
      roomPlayers: this.roomPlayers,
      session,
    };

    setInterval(() => {
      this.server.emit("ping");
    }, 10000);

    await handleOnConnection(handlerParams).then(() =>
      registerHandlers(handlerParams),
    );
  }
}
