import { Players } from "@prisma/client";
import { Query } from "src/interfaces/query.interface";
import { PrismaService } from "src/prisma/prisma.service";

export class GetPlayerQuery implements Query {
  public id: number;

  constructor(private prisma: PrismaService) {}

  async executeAsync(): Promise<Players> {
    const player = await this.prisma.players.findFirstOrThrow({
      where: { id: this.id },
    });

    return player;
  }
}
