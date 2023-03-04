import { Players } from "@prisma/client";
import { Command } from "src/interfaces/command.interface";
import { PrismaService } from "src/prisma/prisma.service";
import { PlayerType } from "../enums/player-type.enum";

export class UpdatePlayerCommand implements Command {
  public id: number;
  public defaultType: PlayerType;
  public emoji: string;
  public name: string;

  constructor(private prisma: PrismaService) {}

  async executeAsync(): Promise<Players> {
    const result = await this.prisma.players.update({
      data: {
        defaultType: this.defaultType,
        emoji: this.emoji,
        name: this.name,
      },
      where: { id: this.id },
    });

    return result;
  }
}
