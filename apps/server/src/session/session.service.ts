import { Injectable } from "@nestjs/common";
import { Sessions } from "@prisma/client";
import { GetSessionQuery } from "src/session/queries/get-session.query";
import { CreateSessionCommand } from "src/session/commands/create-session.command";
import { PrismaService } from "../prisma/prisma.service";
import { Session } from "./interfaces/session.interface";
import { CreateSessionDto } from "./dto/create-session.dto";
import { AddSessionPlayerCommand } from "./commands/add-session-player.command";
import { CompleteSessionCommand } from "./commands/complete-session.command";

@Injectable()
export class SessionService {
  constructor(private prisma: PrismaService) {}

  async createAsync(data: CreateSessionDto): Promise<Sessions> {
    const command = new CreateSessionCommand(this.prisma);
    command.name = data.name;
    command.teamId = data.teamId;

    return await command.executeAsync();
  }

  async getAsync(id: number): Promise<Session> {
    const query = new GetSessionQuery(this.prisma);
    query.id = id;

    return await query.executeAsync();
  }

  async addPlayerAsync(id: number, playerId: number) {
    const command = new AddSessionPlayerCommand(this.prisma);
    command.id = id;
    command.playerId = playerId;

    await command.executeAsync();
  }

  async completeAsync(id: number) {
    const command = new CompleteSessionCommand(this.prisma);
    command.id = id;

    await command.executeAsync();
  }
}
