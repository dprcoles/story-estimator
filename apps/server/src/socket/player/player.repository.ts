import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";
import { PlayerType } from "src/domain/enums/player.enums";
import { RoomPlayer } from "./interfaces/room-player.interface";

@Injectable()
export class PlayerRepository {
  constructor(private prisma: PrismaService) {}

  async createAsync(player: RoomPlayer) {
    await this.prisma.roomPlayer.upsert({
      create: {
        id: player.id,
        emoji: player.emoji,
        name: player.name,
        roomId: null,
        defaultType: player.defaultType,
        vote: null,
      },
      update: {
        emoji: player.emoji,
        name: player.name,
        defaultType: player.defaultType,
      },
      where: { id: player.id },
    });
  }

  async getByIdAsync(id: number) {
    const player = await this.prisma.roomPlayer.findFirst({ where: { id } });

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
    const players = await this.prisma.roomPlayer.findMany({ where: { roomId } });

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
    await this.prisma.roomPlayer.update({ where: { id: player.id }, data: player });
  }

  async resetRoomVotesAsync(roomId: number) {
    await this.prisma.roomPlayer.updateMany({ where: { roomId }, data: { vote: null } });
  }

  async deleteAsync(id: number) {
    await this.prisma.roomPlayer.delete({ where: { id } }).catch(() => {
      console.warn(`Can't find player with id ${id}`);
    });
  }
}
