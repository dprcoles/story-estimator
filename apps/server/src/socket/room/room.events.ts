import { Injectable } from "@nestjs/common";
import { Server, Socket } from "socket.io";
import { PlayerType } from "src/domain/enums/player.enums";
import { ShowType } from "src/domain/enums/session.enums";
import { Story } from "src/domain/models/story.model";
import { SocketRoomPrefix } from "../enums/socket.enums";
import { PlayerGatewayService } from "../player/player.service";
import { RoomClientEvent, RoomServerEvent, RoomNotificationEvent } from "./enums/room-events.enum";
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

      await client.join(this.getRoom(id));
      client.emit(RoomClientEvent.Connected);
    } catch (e) {
      client.emit(RoomClientEvent.Error, e);
    }

    await this.updateAsync(id, {
      type: RoomNotificationEvent.PlayerJoin,
      data: { id: playerId },
    });
  }

  async disconnectAsync(playerId: number, roomId?: number) {
    await this.playerGatewayService.leaveRoomAsync(playerId);

    if (!roomId) return;

    const activePlayers = await this.playerGatewayService.getByRoomIdAsync(roomId);

    if (activePlayers.length === 0) {
      return;
    }

    await this.updateAsync(roomId, {
      type: RoomNotificationEvent.PlayerLeave,
      data: { id: playerId },
    });
  }

  async updateAsync(
    id: number,
    event?: { type: RoomNotificationEvent; data: any },
    isComplete?: boolean,
  ) {
    const data = await this.roomGatewayService.getStateAsync(id);

    this.server.to(this.getRoom(id)).emit(RoomServerEvent.Update, { ...data, event });

    if (isComplete) {
      await this.roomGatewayService.deleteAsync(id);
    }
  }

  async resetAsync(id: number, event?: { type: RoomNotificationEvent; data: any }) {
    const defaultReset = { type: RoomNotificationEvent.VoteReset, data: {} };
    await this.roomGatewayService.resetAsync(id);

    this.server.to(this.getRoom(id)).emit(RoomServerEvent.Reset);

    await this.updateAsync(id, event || defaultReset);
  }

  async showAsync(id: number, type?: ShowType) {
    this.server.to(this.getRoom(id)).emit(RoomServerEvent.Show, type);
  }

  async voteAsync(id: number, playerId: number, vote: string) {
    await this.playerGatewayService.voteAsync(playerId, vote);

    const players = await this.playerGatewayService.getByRoomIdAsync(id);
    const voters = players.filter((p) => p.defaultType === PlayerType.Voter);

    if (voters.every((p) => p.vote)) {
      await this.showAsync(id);
    }

    this.updateAsync(id, {
      type: RoomNotificationEvent.PlayerVote,
      data: { id: playerId },
    });
  }

  async settingsAsync(id: number, settings: Settings) {
    const room = await this.roomGatewayService.getAsync(id);

    room.settings = settings;

    await this.roomGatewayService.updateAsync(room);
    await this.updateAsync(id, {
      type: RoomNotificationEvent.Settings,
      data: settings,
    });
  }

  async completeAsync(id: number) {
    await this.roomGatewayService.completeAsync(id);

    await this.updateAsync(id);
  }

  async createStoriesAsync(roomId: number, stories: string[]) {
    stories.forEach(async (story) => {
      await this.roomGatewayService.createStoryAsync(roomId, story);
    });

    await this.updateAsync(roomId, {
      type: RoomNotificationEvent.StoryCreate,
      data: { stories },
    });
  }

  async updateStoryAsync(story: Story) {
    await this.roomGatewayService.updateStoryAsync(story);

    await this.updateAsync(story.roomId);
  }

  async updateStoriesAsync(stories: Story[]) {
    stories.forEach(async (story) => {
      await this.roomGatewayService.updateStoryAsync(story);
    });

    await this.updateAsync(stories[0].roomId);
  }

  async deleteStoryAsync(roomId: number, id: number) {
    const state = await this.roomGatewayService.getAsync(roomId);
    const story = state.stories.find((s) => s.id === id);

    await this.roomGatewayService.deleteStoryAsync(roomId, id);

    await this.updateAsync(roomId, {
      type: RoomNotificationEvent.StoryDelete,
      data: { description: story?.description },
    });
  }

  async completeStoryAsync(roomId: number, id: number, vote: string) {
    await this.roomGatewayService.completeStoryAsync(roomId, id, vote);

    await this.resetAsync(roomId, {
      type: vote === "?" ? RoomNotificationEvent.StorySkipped : RoomNotificationEvent.StoryComplete,
      data: { id, vote },
    });
  }

  async setActiveStoryAsync(roomId: number, id: number) {
    await this.roomGatewayService.setActiveStoryAsync(roomId, id);

    await this.resetAsync(roomId, {
      type: RoomNotificationEvent.StoryActive,
      data: { id },
    });
  }

  async getPlayersAsync(id: number) {
    const players = await this.playerGatewayService.getByRoomIdAsync(id);

    return players;
  }

  private getRoom(id: number) {
    return `${SocketRoomPrefix.Room}${id.toString()}`;
  }
}
