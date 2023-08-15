import { Injectable } from "@nestjs/common";
import { SocketStore } from "../socket.store";
import { RoomPlayer } from "./interfaces/room-player.interface";

@Injectable()
export class PlayerRepository {
  constructor(private store: SocketStore) {}

  async createAsync(player: RoomPlayer) {
    const existing = await this.getByIdAsync(player.id);

    if (!existing) {
      await this.store.addPlayer(player);
    }
  }

  async getAsync() {
    return await this.store.getPlayers();
  }

  async getByIdAsync(id: number) {
    return await this.store.getPlayerById(id);
  }

  async getByRoomIdAsync(roomId: number) {
    const players = await this.getAsync();
    return players.filter((p) => p.roomId === roomId);
  }

  async updateAsync(player: RoomPlayer) {
    await this.store.updatePlayer(player);
  }

  async deleteAsync(id: number) {
    await this.store.removePlayer(id);
  }
}
