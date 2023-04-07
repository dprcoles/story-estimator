import { Injectable } from "@nestjs/common";
import retry = require("async-retry");
import { PlayerType } from "src/domain/enums/player.enums";
import { Session } from "src/domain/models/session.model";
import { SessionService } from "src/application/session/session.service";
import { Story } from "src/domain/models/story.model";
import { StoryService } from "src/application/story/story.service";
import { TeamService } from "src/application/team/team.service";
import { PlayerGatewayService } from "../player/player.service";
import { Room, RoomIntegrations } from "./interfaces/room.interface";
import { RoomRepository } from "./room.repository";
import { generateId } from "./utils/generate-id.utils";
import { getTimeInSeconds, getTotalTimeSpent } from "./utils/time.utils";

@Injectable()
export class RoomGatewayService {
  constructor(
    private sessionService: SessionService,
    private roomRepository: RoomRepository,
    private playerGatewayService: PlayerGatewayService,
    private teamService: TeamService,
    private storyService: StoryService,
  ) {}

  async connectAsync(id?: number, playerId?: number) {
    if (!id) throw Error("No room id was provided");
    if (!playerId) throw Error("No player id was provided");

    const player = await this.playerGatewayService.getByIdAsync(playerId);

    if (!player) {
      await this.playerGatewayService.connectAsync(playerId);
    }

    const session = await retry(
      async () => {
        return await this.sessionService.getAsync(id);
      },
      {
        retries: 5,
      },
    );
    if (!session) throw Error(`Session with id ${id} not found`);

    const room = await this.roomRepository.getByIdAsync(session.id);

    if (!room) {
      await this.createFromSessionAsync(playerId, session);
    }

    if (!session.players.find((p) => p.id === playerId)) {
      await this.sessionService.addPlayerAsync({
        id: session.id,
        playerId,
      });
    }

    const players = await this.playerGatewayService.getByRoomIdAsync(id);

    if (room && players.filter((p) => p.id !== playerId).length === 0) {
      await this.roomRepository.updateAsync({
        ...room,
        settings: { ...room.settings, admin: playerId },
      });
    }

    await this.playerGatewayService.joinRoomAsync(playerId, id);
  }

  async getAsync(id: number) {
    return await this.roomRepository.getByIdAsync(id);
  }

  async getStateAsync(id: number) {
    const room = await this.roomRepository.getByIdAsync(id);
    const players = await this.playerGatewayService.getByRoomIdAsync(id);

    return { room, players };
  }

  async resetAsync(id: number) {
    await this.playerGatewayService.resetVotesByRoomIdAsync(id);
  }

  async updateAsync(room: Room) {
    await this.roomRepository.updateAsync(room);
  }

  async completeAsync(id: number) {
    const room = await this.getAsync(id);

    room.stories.forEach(async (story) => {
      await this.storyService.createAsync({
        description: story.description,
        endSeconds: story.endSeconds,
        estimate: story.estimate,
        sessionId: id,
        spectatorIds: story.spectatorIds,
        startSeconds: story.startSeconds,
        totalTimeSpent: story.totalTimeSpent,
        votes: story.votes,
      });
    });

    await this.sessionService.completeAsync(id);

    await this.roomRepository.updateAsync({ ...room, active: false });

    await retry(
      async (bail) => {
        const session = await this.sessionService.getAsync(id);

        if (session.stories.length === 0) {
          bail(new Error("Stories not yet created"));
        }

        return;
      },
      { retries: 10 },
    );
  }

  async createStoryAsync(roomId: number, name: string) {
    const stories = await this.roomRepository.getStoriesByRoomIdAsync(roomId);

    const story: Story = {
      id: generateId(roomId),
      order:
        stories.length === 0 ? 0 : Math.max(...stories.map((s) => s.order)) + 1,
      description: name,
      roomId: roomId,
      active: false,
      votes: [],
      voterIds: [],
      spectatorIds: [],
      endSeconds: undefined,
      estimate: undefined,
      startSeconds: undefined,
      totalTimeSpent: undefined,
    };

    await this.roomRepository.createStoryAsync(roomId, story);
  }

  async updateStoryAsync(story: Story) {
    await this.roomRepository.updateStoryAsync(story);
  }

  async deleteStoryAsync(roomId: number, id: number) {
    await this.roomRepository.deleteStoryAsync(roomId, id);
  }

  async completeStoryAsync(roomId: number, id: number, vote: string) {
    const story = await this.roomRepository.getStoryByIdAsync(roomId, id);
    const players = await this.playerGatewayService.getByRoomIdAsync(roomId);
    const voters = players.filter((p) => p.defaultType === PlayerType.Voter);
    const spectators = players.filter(
      (p) => p.defaultType === PlayerType.Spectator,
    );

    const seconds = getTimeInSeconds();

    story.voterIds = voters?.map((v) => v.id);
    story.spectatorIds = spectators?.map((s) => s.id);
    story.votes = voters?.map((v) => ({
      playerId: v.id,
      vote: v.vote,
    }));
    story.estimate = vote;
    story.active = false;
    story.endSeconds = seconds;
    story.totalTimeSpent = getTotalTimeSpent(
      story.totalTimeSpent,
      story.startSeconds,
      seconds,
    );

    await this.roomRepository.updateStoryAsync(story);

    const stories = await this.roomRepository.getStoriesByRoomIdAsync(roomId);

    if (!stories.find((s) => !s.estimate)) return;

    const nextActiveStory = stories
      .filter((s) => !s.estimate)
      .sort((a, b) => a.order - b.order)[0];

    nextActiveStory.active = true;
    nextActiveStory.startSeconds = seconds;
    nextActiveStory.endSeconds = undefined;

    await this.roomRepository.updateStoryAsync(nextActiveStory);
  }

  async setActiveStoryAsync(roomId: number, id: number) {
    const stories = await this.roomRepository.getStoriesByRoomIdAsync(roomId);
    const seconds = getTimeInSeconds();

    if (stories.find((s) => s.active)) {
      const activeStory = stories.find((s) => s.active);

      activeStory.active = false;
      activeStory.endSeconds = seconds;
      activeStory.totalTimeSpent = getTotalTimeSpent(
        activeStory.totalTimeSpent,
        activeStory.startSeconds,
        seconds,
      );

      await this.roomRepository.updateStoryAsync(activeStory);
    }

    const story = stories.find((s) => s.id === id);

    story.active = true;
    story.startSeconds = seconds;
    story.endSeconds = undefined;

    await this.roomRepository.updateStoryAsync(story);
  }

  private async createFromSessionAsync(playerId: number, session: Session) {
    let integrations: RoomIntegrations | null = null;

    if (session.team.id) {
      const team = await this.teamService.getByIdAsync(session.team.id);

      integrations = {
        jira: team.jiraIntegrationId,
      };
    }

    await this.roomRepository.createAsync({
      active: true,
      id: session.id,
      integrations: integrations,
      name: session.name,
      settings: {
        admin: playerId,
        countdown: true,
        fastMode: false,
      },
      stories: [],
      teamId: session.team.id,
    });
  }
}
