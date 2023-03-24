import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePlayerDto } from "./models/dtos/create-player.dto";
import { UpdatePlayerDto } from "./models/dtos/update-player.dto";

@Injectable()
export class PlayerRepository {
  constructor(private prisma: PrismaService) {}

  async createAsync(player: CreatePlayerDto) {
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

  async updateAsync(player: UpdatePlayerDto) {
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
