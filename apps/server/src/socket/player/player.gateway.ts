import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { __prod__ } from "src/constants/app.constants";
import { getSocketInfo } from "../utils/get-socket-info.utils";
import { PlayerClientEvent } from "./enums/player-events.enum";
import { PlayerMessage } from "./enums/player-messages.enum";
import { RoomPlayer } from "./interfaces/room-player.interface";
import { PlayerEventsHandler } from "./player.events";

@WebSocketGateway({
  cors: {
    origin: __prod__ ? process.env.WEB_URL : "*",
  },
})
export class PlayerGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private playerEventsHandler: PlayerEventsHandler) {}

  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    this.playerEventsHandler.server = server;
  }

  async handleConnection(@ConnectedSocket() client: Socket) {
    const { playerId } = getSocketInfo(client);

    await this.playerEventsHandler.connectAsync(playerId, client);
  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    const { playerId } = getSocketInfo(client);

    await this.playerEventsHandler.disconnectAsync(playerId);
  }

  @SubscribeMessage(PlayerMessage.Update)
  async complete(@ConnectedSocket() client: Socket, @MessageBody() data: { player: RoomPlayer }) {
    await this.playerEventsHandler.updateAsync(data.player);
    client.emit(PlayerClientEvent.UpdateSuccess);
  }
}
