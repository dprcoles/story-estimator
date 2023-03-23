import { Injectable } from "@nestjs/common";
import { SocketStore } from "../socket.store";
import { RoomPlayer } from "./interfaces/room-player.interface";

@Injectable()
export class PlayerRepository {
  constructor(private store: SocketStore) {}

  async createAsync(player: RoomPlayer) {
    const existing = await this.getByIdAsync(player.id);

    if (!existing) {
      this.store.players.push(player);
    }
  }

  async getAsync() {
    return this.store.players;
  }

  async getByIdAsync(id: number) {
    return this.store.players.find((p) => p.id === id);
  }

  async getByRoomIdAsync(roomId: number) {
    return this.store.players.filter((p) => p.roomId === roomId);
  }

  async updateAsync(player: RoomPlayer) {
    const index = this.store.players.findIndex((p) => p.id === player.id);

    this.store.players[index] = player;
  }

  async deleteAsync(id: number) {
    this.store.players.filter((p) => p.id !== id);
  }
}
