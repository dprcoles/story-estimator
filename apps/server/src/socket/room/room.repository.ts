import { Injectable } from "@nestjs/common";
import { Story } from "src/story/interfaces/story.interface";
import { SocketStore } from "../socket.store";
import { Room } from "./interfaces/room.interface";

@Injectable()
export class RoomRepository {
  constructor(private store: SocketStore) {}

  async createAsync(room: Room) {
    this.store.rooms.push(room);
  }

  async getAsync() {
    return this.store.rooms;
  }

  async getByIdAsync(id: number) {
    return this.store.rooms.find((r) => r.id === id);
  }

  async updateAsync(room: Room) {
    const index = this.getRoomIndexById(room.id);

    this.store.rooms[index] = room;
  }

  async getStoryByIdAsync(roomId: number, id: number) {
    const roomIndex = this.getRoomIndexById(roomId);

    return this.store.rooms[roomIndex].stories.find((s) => s.id === id);
  }

  async getStoriesByRoomIdAsync(roomId: number) {
    const index = this.getRoomIndexById(roomId);

    return this.store.rooms[index].stories;
  }

  async createStoryAsync(id: number, story: Story) {
    const index = this.getRoomIndexById(id);

    this.store.rooms[index].stories.push(story);
  }

  async updateStoryAsync(story: Story) {
    const roomIndex = this.getRoomIndexById(story.roomId);
    const storyIndex = this.store.rooms[roomIndex].stories.findIndex(
      (s) => s.id === story.id,
    );

    this.store.rooms[roomIndex].stories[storyIndex] = story;
  }

  async deleteStoryAsync(roomId: number, id: number) {
    const roomIndex = this.getRoomIndexById(roomId);
    const roomStories = this.store.rooms[roomIndex].stories;

    this.store.rooms[roomIndex].stories = roomStories.filter(
      (rs) => rs.id !== id,
    );
  }

  private getRoomIndexById(id: number) {
    return this.store.rooms.findIndex((r) => r.id === id);
  }
}
