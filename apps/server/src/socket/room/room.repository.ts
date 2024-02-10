import { Injectable } from "@nestjs/common";
import { Story } from "src/domain/models/story.model";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";
import { Room, Settings } from "./interfaces/room.interface";

@Injectable()
export class RoomRepository {
  constructor(private prisma: PrismaService) {}

  async createAsync(room: Room) {
    await this.prisma.room.create({
      data: {
        id: room.id,
        active: room.active,
        name: room.name,
        teamId: room.teamId,
        jiraId: room.integrations?.jira ?? null,
        settings: {
          create: {
            adminId: room.settings.admin,
            countdown: room.settings.countdown,
            fastMode: room.settings.fastMode,
          },
        },
      },
    });
  }

  async getByIdAsync(id: number) {
    const room = await this.prisma.room
      .findFirst({
        where: { id },
        include: { settings: true, stories: { include: { votes: true } } },
      })
      .catch(() => {
        console.warn(`Can't find room with id ${id}`);
      });

    if (!room) return null;

    return {
      id: room.id,
      active: room.active,
      name: room.name,
      integrations: room.jiraId ? { jira: room.jiraId } : null,
      settings: {
        admin: room.settings.adminId,
        countdown: room.settings.countdown,
        fastMode: room.settings.fastMode,
      },
      stories: room.stories,
      teamId: room.teamId,
    };
  }

  async updateAsync(room: Room) {
    await this.prisma.room.update({
      where: { id: room.id },
      data: {
        id: room.id,
        active: room.active,
        name: room.name,
        teamId: room.teamId,
        jiraId: room.integrations?.jira ?? null,
      },
    });
  }

  async updateSettingsAsync(id: number, settings: Settings) {
    await this.prisma.roomSettings.update({
      where: { roomId: id },
      data: {
        adminId: settings.admin,
        countdown: settings.countdown,
        fastMode: settings.fastMode,
      },
    });
  }

  async deleteAsync(id: number) {
    await this.prisma.room.delete({ where: { id } }).catch(() => {
      console.warn(`Can't find room with id ${id}`);
    });
  }

  async getStoryByIdAsync(roomId: number, id: number) {
    const story = await this.prisma.roomStory.findFirst({
      where: { id, roomId },
      include: { votes: true },
    });

    if (!story) return null;

    return {
      id: story.id,
      roomId: story.roomId,
      order: story.order,
      active: story.active,
      description: story.description,
      startSeconds: story.startSeconds,
      endSeconds: story.endSeconds,
      totalTimeSpent: story.totalTimeSpent,
      estimate: story.estimate,
      spectatorIds: story.spectatorIds,
      voterIds: story.voterIds,
      votes: story.votes,
    };
  }

  async getStoriesByRoomIdAsync(roomId: number) {
    const stories = await this.prisma.roomStory.findMany({
      where: { roomId },
      include: { votes: true },
    });

    return stories.map((story) => ({
      id: story.id,
      roomId: story.roomId,
      order: story.order,
      active: story.active,
      description: story.description,
      startSeconds: story.startSeconds,
      endSeconds: story.endSeconds,
      totalTimeSpent: story.totalTimeSpent,
      estimate: story.estimate,
      spectatorIds: story.spectatorIds,
      voterIds: story.voterIds,
      votes: story.votes,
    }));
  }

  async createStoriesAsync(id: number, stories: Story[]) {
    await this.prisma.roomStory.createMany({
      data: stories.map((story) => ({
        roomId: id,
        order: story.order,
        active: story.active,
        description: story.description,
        startSeconds: story.startSeconds,
        endSeconds: story.endSeconds,
        totalTimeSpent: story.totalTimeSpent,
        estimate: story.estimate,
        spectatorIds: story.spectatorIds,
        voterIds: story.voterIds,
      })),
    });
  }

  async updateStoryAsync(story: Story) {
    await this.prisma.roomStory.update({
      where: { id: story.id },
      data: {
        roomId: story.roomId,
        order: story.order,
        active: story.active,
        description: story.description,
        startSeconds: story.startSeconds,
        endSeconds: story.endSeconds,
        totalTimeSpent: story.totalTimeSpent,
        estimate: story.estimate,
        spectatorIds: story.spectatorIds,
        voterIds: story.voterIds,
      },
    });
  }

  async createStoryVotesAsync(storyId: number, votes: { playerId: number; vote: string }[]) {
    await this.prisma.roomVote.createMany({
      data: votes.map((vote) => ({
        roomStoryId: storyId,
        playerId: vote.playerId,
        vote: vote.vote,
      })),
    });
  }

  async deleteStoryAsync(roomId: number, id: number) {
    await this.prisma.roomStory.delete({ where: { id, roomId } }).catch(() => {
      console.warn(`Can't find story with id ${id}`);
    });
  }
}
