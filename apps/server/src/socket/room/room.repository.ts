import { Injectable } from "@nestjs/common";
import { Story } from "src/domain/models/story.model";
import { Room, Settings } from "./interfaces/room.interface";

@Injectable()
export class RoomRepository {
  private roomStore: Room[] = [];
  private voteStore: { roomId: number; playerId: number; vote: string }[] = [];

  async createAsync(room: Room) {
    this.roomStore.push(room);
  }

  async getByIdAsync(id: number) {
    const room = this.roomStore.find((r) => r.id === id);

    if (!room) return null;

    return {
      id: room.id,
      active: room.active,
      name: room.name,
      integrations: room.integrations,
      settings: room.settings,
      stories: room.stories,
      teamId: room.teamId,
    };
  }

  async updateAsync(room: Room) {
    this.roomStore = this.roomStore.map((r) => (r.id === room.id ? room : r));
  }

  async updateSettingsAsync(id: number, settings: Settings) {
    this.roomStore = this.roomStore.map((r) => (r.id === id ? { ...r, settings } : r));
  }

  async deleteAsync(id: number) {
    this.roomStore = this.roomStore.filter((r) => r.id !== id);
  }

  async getStoryByIdAsync(roomId: number, id: number) {
    const story = this.roomStore.find((r) => r.id === roomId)?.stories?.find((s) => s.id === id);

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
    const stories = this.roomStore.find((r) => r.id === roomId)?.stories;

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
    this.roomStore = this.roomStore.map((r) =>
      r.id === id ? { ...r, stories: r.stories.concat(stories) } : r,
    );
  }

  async updateStoryAsync(story: Story) {
    this.roomStore = this.roomStore.map((r) =>
      r.id === story.roomId
        ? {
            ...r,
            stories: r.stories.map((s) => (s.id === story.id ? story : s)),
          }
        : r,
    );
  }

  async createStoryVotesAsync(storyId: number, votes: { playerId: number; vote: string }[]) {
    this.voteStore = this.voteStore.concat(votes.map((vote) => ({ roomId: storyId, ...vote })));
  }

  async deleteStoryAsync(roomId: number, id: number) {
    this.roomStore = this.roomStore.map((r) =>
      r.id === roomId ? { ...r, stories: r.stories.filter((s) => s.id !== id) } : r,
    );
  }
}
