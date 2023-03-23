import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { __prod__ } from "src/constants/app.constants";
import { getSocketInfo } from "../utils/get-socket-info.utils";
import { TeamMessage } from "./enums/team-message.enum";
import { TeamEventsHandler } from "./team.events";

@WebSocketGateway({
  cors: {
    origin: __prod__ ? process.env.WEB_URL : "*",
  },
})
export class TeamsGateway implements OnGatewayInit {
  constructor(private teamEventsHandler: TeamEventsHandler) {}

  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    this.teamEventsHandler.server = server;
  }

  @SubscribeMessage(TeamMessage.Join)
  async connect(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { id: number },
  ) {
    const { playerId } = getSocketInfo(client);

    await this.teamEventsHandler.connectAsync(data.id, playerId, client);
  }
}
