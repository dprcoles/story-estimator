import { Sessions } from "@prisma/client";
import { Command } from "src/interfaces/command.interface";
import { PrismaService } from "src/prisma/prisma.service";

export class CompleteSessionCommand implements Command {
  public id: number;

  constructor(private prisma: PrismaService) {}

  async executeAsync(): Promise<Sessions> {
    const session = await this.prisma.sessions.update({
      data: { active: false },
      where: { id: this.id },
    });

    return session;
  }
}
