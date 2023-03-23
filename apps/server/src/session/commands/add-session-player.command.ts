import { Command } from "src/interfaces/command.interface";
import { PrismaService } from "src/prisma/prisma.service";

export class AddSessionPlayerCommand implements Command {
  public id: number;
  public playerId: number;

  constructor(private prisma: PrismaService) {}

  async executeAsync() {
    await this.prisma.sessions.update({
      data: { playerIds: { push: this.playerId } },
      where: { id: this.id },
    });
  }
}
