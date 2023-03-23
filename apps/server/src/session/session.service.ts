import { Injectable } from "@nestjs/common";
import { Sessions } from "@prisma/client";
import { GetSessionQuery } from "src/session/queries/get-session.query";
import { CreateSessionCommand } from "src/session/commands/create-session.command";
import { TeamEventsHandler } from "src/socket/team/team.events";
import { PrismaService } from "../prisma/prisma.service";
import { Session } from "./interfaces/session.interface";
import { CreateSessionDto } from "./dto/create-session.dto";
import { AddSessionPlayerCommand } from "./commands/add-session-player.command";
import { CompleteSessionCommand } from "./commands/complete-session.command";

@Injectable()
export class SessionService {
  constructor(
    private prisma: PrismaService,
    private teamEventsHandler: TeamEventsHandler,
  ) {}

  async createAsync(data: CreateSessionDto): Promise<Sessions> {
    const command = new CreateSessionCommand(this.prisma);
    command.name = data.name;
    command.teamId = data.teamId;

    const result = await command.executeAsync();

    await this.handleTeamUpdateAsync(result.teamId);

    return result;
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

    const result = await command.executeAsync();

    await this.handleTeamUpdateAsync(result.teamId);
  }

  async completeAsync(id: number) {
    const command = new CompleteSessionCommand(this.prisma);
    command.id = id;

    const result = await command.executeAsync();

    await this.handleTeamUpdateAsync(result.teamId);
  }

  private async handleTeamUpdateAsync(id: number) {
    if (id) {
      await this.teamEventsHandler.updateAsync(id);
    }
  }
}
