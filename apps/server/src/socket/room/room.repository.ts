import { Injectable } from "@nestjs/common";
import { Story } from "src/domain/models/story.model";
import { SocketStore } from "../socket.store";
import { Room } from "./interfaces/room.interface";

@Injectable()
export class RoomRepository {
  constructor(private store: SocketStore) {}

  async createAsync(room: Room) {
    await this.store.addRoom(room);
  }

  async getAsync() {
    return await this.store.getRooms();
  }

  async getByIdAsync(id: number) {
    return await this.store.getRoomById(id);
  }

  async updateAsync(room: Room) {
    await this.store.updateRoom(room);
  }

  async getStoryByIdAsync(roomId: number, id: number) {
    const rooms = await this.store.getRooms();
    return rooms.find((r) => r.id === roomId).stories.find((s) => s.id === id);
  }

  async getStoriesByRoomIdAsync(roomId: number) {
    const rooms = await this.store.getRooms();
    return rooms.find((r) => r.id === roomId).stories;
  }

  async createStoryAsync(id: number, story: Story) {
    const current = await this.store.getRoomById(id);
    current.stories.push(story);

    await this.store.updateRoom(current);
  }

  async updateStoryAsync(story: Story) {
    const currentRoom = await this.store.getRoomById(story.roomId);
    const storyIndex = currentRoom.stories.findIndex((s) => s.id === story.id);

    currentRoom.stories[storyIndex] = story;

    await this.store.updateRoom(currentRoom);
  }

  async deleteStoryAsync(roomId: number, id: number) {
    const currentRoom = await this.store.getRoomById(roomId);

    currentRoom.stories = currentRoom.stories.filter((rs) => rs.id !== id);

    await this.store.updateRoom(currentRoom);
  }
}
