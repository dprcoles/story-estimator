import { Sessions } from "@prisma/client";
import { Command } from "src/interfaces/command.interface";
import { PrismaService } from "src/prisma/prisma.service";

export class CreateSessionCommand implements Command {
  public name: string;
  public teamId: number;

  constructor(private prisma: PrismaService) {}

  async executeAsync(): Promise<Sessions> {
    const session = await this.prisma.sessions.create({
      data: {
        name: this.name,
        playerIds: [],
        teamId: this.teamId,
        active: true,
      },
    });

    return session;
  }
}
