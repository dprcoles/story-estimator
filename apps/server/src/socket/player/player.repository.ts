import { Injectable } from "@nestjs/common";
import { PlayerType } from "src/domain/enums/player.enums";
import { RoomPlayer } from "./interfaces/room-player.interface";

@Injectable()
export class PlayerRepository {
  private playerStore: RoomPlayer[] = [];

  async createAsync(player: RoomPlayer) {
    if (this.playerStore.find((p) => p.id === player.id)) {
      this.playerStore = this.playerStore.map((p) => (p.id === player.id ? player : p));
      return;
    }

    this.playerStore.push(player);
  }

  async getByIdAsync(id: number) {
    const player = this.playerStore.find((p) => p.id === id);

    if (!player) return null;

    return {
      emoji: player.emoji,
      id: player.id,
      name: player.name,
      roomId: player.roomId,
      defaultType: player.defaultType === "voter" ? PlayerType.Voter : PlayerType.Spectator,
      vote: player.vote,
    };
  }

  async getByRoomIdAsync(roomId: number) {
    const players = this.playerStore.filter((p) => p.roomId === roomId);

    return players.map((player) => ({
      emoji: player.emoji,
      id: player.id,
      name: player.name,
      roomId: player.roomId,
      defaultType: player.defaultType === "voter" ? PlayerType.Voter : PlayerType.Spectator,
      vote: player.vote,
    }));
  }

  async updateAsync(player: RoomPlayer) {
    await this.createAsync(player);
  }

  async resetRoomVotesAsync(roomId: number) {
    this.playerStore.filter((p) => p.roomId === roomId).forEach((p) => (p.vote = null));
  }

  async deleteAsync(id: number) {
    this.playerStore = this.playerStore.filter((p) => p.id !== id);
  }
}
