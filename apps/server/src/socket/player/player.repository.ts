import { Injectable, OnApplicationBootstrap, OnApplicationShutdown } from "@nestjs/common";
import { PlayerType } from "src/domain/enums/player.enums";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";
import { RoomPlayer } from "./interfaces/room-player.interface";

@Injectable()
export class PlayerRepository implements OnApplicationShutdown, OnApplicationBootstrap {
  constructor(private prisma: PrismaService) {}

  private playerStore: RoomPlayer[] = [];

  async onApplicationBootstrap() {
    console.log("⌛️ Loading player state...");

    const loadedState = await this.prisma.applicationState.findMany({
      select: {
        id: true,
        payload: true,
      },
      where: {
        type: "playerStore",
      },
      orderBy: {
        timestamp: "desc",
      },
      take: 1,
    });

    if (loadedState.length > 0) {
      const state = JSON.parse(loadedState[0].payload);
      this.playerStore = state;
    }

    console.log("✅ Player state loaded");
  }

  async onApplicationShutdown() {
    console.log("💾 Saving player state...");

    const payload = JSON.stringify(this.playerStore);

    await this.prisma.applicationState.create({
      data: {
        payload,
        type: "playerStore",
      },
    });

    console.log("✅ Player state saved");
  }

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
