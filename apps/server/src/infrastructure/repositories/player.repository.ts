import { Injectable } from "@nestjs/common";
import { PlayerDto } from "src/application/player/dtos/player.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PlayerRepository {
  constructor(private prisma: PrismaService) {}

  async createAsync(player: PlayerDto) {
    const result = this.prisma.players.create({
      data: {
        defaultType: player.defaultType,
        emoji: player.emoji,
        name: player.name,
      },
    });

    return result;
  }

  async getByIdAsync(id: number) {
    const result = this.prisma.players.findFirstOrThrow({
      where: { id: id },
    });

    return result;
  }

  async getAllAsync() {
    const result = this.prisma.players.findMany();

    return result;
  }

  async updateAsync(player: PlayerDto) {
    const result = this.prisma.players.update({
      where: { id: player.id },
      data: {
        defaultType: player.defaultType,
        emoji: player.emoji,
        name: player.name,
      },
    });

    return result;
  }
}
