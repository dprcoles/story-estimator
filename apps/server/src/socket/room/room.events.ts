import { Injectable } from "@nestjs/common";
import { Server, Socket } from "socket.io";
import { PlayerType } from "src/player/enums/player-type.enum";
import { ShowType } from "src/session/enums/show-type.enum";
import { Story } from "src/story/interfaces/story.interface";
import { PlayerGatewayService } from "../player/player.service";
import { RoomClientEvent, RoomServerEvent } from "./enums/room-events.enum";
import { Settings } from "./interfaces/room.interface";
import { RoomGatewayService } from "./room.service";

@Injectable()
export class RoomEventsHandler {
  constructor(
    private roomGatewayService: RoomGatewayService,
    private playerGatewayService: PlayerGatewayService,
  ) {}

  public server: Server = null;

  async connectAsync(id: number, playerId: number, client: Socket) {
    try {
      await this.roomGatewayService.connectAsync(id, playerId);

      client.join(id.toString());
      client.emit(RoomClientEvent.Connected);
    } catch (e) {
      client.emit(RoomClientEvent.Error, e);
    }

    await this.updateAsync(id);
  }

  async disconnectAsync(playerId: number) {
    await this.playerGatewayService.leaveRoomAsync(playerId);
  }

  async updateAsync(id: number) {
    const data = await this.roomGatewayService.getStateAsync(id);

    this.server.to(id.toString()).emit(RoomServerEvent.Update, data);
  }

  async resetAsync(id: number) {
    await this.roomGatewayService.resetAsync(id);

    this.server.to(id.toString()).emit(RoomServerEvent.Reset);
    await this.updateAsync(id);
  }

  async showAsync(id: number, type?: ShowType) {
    this.server.to(id.toString()).emit(RoomServerEvent.Show, type);
  }

  async voteAsync(id: number, playerId: number, vote: string) {
    await this.playerGatewayService.voteAsync(playerId, vote);

    const players = await this.playerGatewayService.getByRoomIdAsync(id);
    const voters = players.filter((p) => p.defaultType === PlayerType.Voter);

    if (voters.every((p) => p.vote)) {
      await this.showAsync(id);
    }

    this.updateAsync(id);
  }

  async settingsAsync(id: number, settings: Settings) {
    const room = await this.roomGatewayService.getAsync(id);

    room.settings = settings;

    await this.roomGatewayService.updateAsync(room);
  }

  async completeAsync(id: number) {
    await this.roomGatewayService.completeAsync(id);

    this.updateAsync(id);
  }

  async createStoriesAsync(roomId: number, stories: string[]) {
    stories.forEach(async (story) => {
      await this.roomGatewayService.createStoryAsync(roomId, story);
    });

    await this.updateAsync(roomId);
  }

  async updateStoryAsync(story: Story) {
    await this.roomGatewayService.updateStoryAsync(story);

    await this.updateAsync(story.roomId);
  }

  async deleteStoryAsync(roomId: number, id: number) {
    await this.roomGatewayService.deleteStoryAsync(roomId, id);

    await this.updateAsync(roomId);
  }

  async completeStoryAsync(roomId: number, id: number, vote: string) {
    await this.roomGatewayService.completeStoryAsync(roomId, id, vote);

    await this.resetAsync(roomId);
  }

  async setActiveStoryAsync(roomId: number, id: number) {
    await this.roomGatewayService.setActiveStoryAsync(roomId, id);

    await this.resetAsync(roomId);
  }
}
