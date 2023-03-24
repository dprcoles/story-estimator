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
import { ShowType } from "src/domain/enums/session.enums";
import { Story } from "src/domain/models/story.model";
import { getSocketInfo } from "../utils/get-socket-info.utils";
import { RoomMessage } from "./enums/room-messages.enum";
import { Settings } from "./interfaces/room.interface";
import { RoomEventsHandler } from "./room.events";

@WebSocketGateway({
  cors: {
    origin: __prod__ ? process.env.WEB_URL : "*",
  },
})
export class RoomGateway implements OnGatewayInit {
  constructor(private roomEventsHandler: RoomEventsHandler) {}

  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    this.roomEventsHandler.server = server;
  }

  @SubscribeMessage(RoomMessage.Join)
  async connect(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { id: number },
  ) {
    const { playerId } = getSocketInfo(client);

    await this.roomEventsHandler.connectAsync(data.id, playerId, client);
  }

  @SubscribeMessage(RoomMessage.Disconnect)
  disconnect(@ConnectedSocket() client: Socket) {
    const { playerId } = getSocketInfo(client);

    this.roomEventsHandler.disconnectAsync(playerId);
  }

  @SubscribeMessage(RoomMessage.Update)
  async update(@ConnectedSocket() client: Socket) {
    const { roomId } = getSocketInfo(client);

    await this.roomEventsHandler.updateAsync(roomId);
  }

  @SubscribeMessage(RoomMessage.Reset)
  async reset(@ConnectedSocket() client: Socket) {
    const { roomId } = getSocketInfo(client);

    await this.roomEventsHandler.resetAsync(roomId);
  }

  @SubscribeMessage(RoomMessage.Vote)
  async vote(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { vote: string },
  ) {
    const { playerId, roomId } = getSocketInfo(client);

    await this.roomEventsHandler.voteAsync(roomId, playerId, data.vote);
  }

  @SubscribeMessage(RoomMessage.Settings)
  async setting(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { settings: Settings },
  ) {
    const { roomId } = getSocketInfo(client);

    await this.roomEventsHandler.settingsAsync(roomId, data.settings);
  }

  @SubscribeMessage(RoomMessage.Show)
  async show(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { type: ShowType },
  ) {
    const { roomId } = getSocketInfo(client);

    await this.roomEventsHandler.showAsync(roomId, data.type);
  }

  @SubscribeMessage(RoomMessage.Complete)
  async complete(@ConnectedSocket() client: Socket) {
    const { roomId } = getSocketInfo(client);

    await this.roomEventsHandler.completeAsync(roomId);
  }

  @SubscribeMessage(RoomMessage.StoryCreate)
  async createStories(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { stories: string[] },
  ) {
    const { roomId } = getSocketInfo(client);

    await this.roomEventsHandler.createStoriesAsync(roomId, data.stories);
  }

  @SubscribeMessage(RoomMessage.StoryEdit)
  async updateStory(@MessageBody() data: { story: Story }) {
    await this.roomEventsHandler.updateStoryAsync(data.story);
  }

  @SubscribeMessage(RoomMessage.StoryDelete)
  async deleteStory(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { id: number },
  ) {
    const { roomId } = getSocketInfo(client);

    await this.roomEventsHandler.deleteStoryAsync(roomId, data.id);
  }

  @SubscribeMessage(RoomMessage.StoryComplete)
  async completeStory(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { id: number; vote: string },
  ) {
    const { roomId } = getSocketInfo(client);

    await this.roomEventsHandler.completeStoryAsync(roomId, data.id, data.vote);
  }

  @SubscribeMessage(RoomMessage.StorySetActive)
  async setActiveStory(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { id: number },
  ) {
    const { roomId } = getSocketInfo(client);

    await this.roomEventsHandler.setActiveStoryAsync(roomId, data.id);
  }
}
