import { Injectable } from "@nestjs/common";
import { Sessions } from "@prisma/client";
import { GetSessionQuery } from "src/session/queries/get-session.query";
import { CreateSessionCommand } from "src/session/commands/create-session.command";
import { TeamEventsHandler } from "src/socket/team/team.events";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Session } from "./interfaces/session.interface";
import { AddSessionPlayerCommand } from "./commands/add-session-player.command";
import { CompleteSessionCommand } from "./commands/complete-session.command";
import { CreateSessionRequest } from "./models/requests/create-session.request";

@Injectable()
export class SessionService {
  constructor(
    private queryBus: QueryBus,
    private commandBus: CommandBus,
    private teamEventsHandler: TeamEventsHandler,
  ) {}

  async createAsync(data: CreateSessionRequest): Promise<Sessions> {
    const command = new CreateSessionCommand(data.name, data.teamId);

    const result = await this.commandBus.execute(command);

    await this.handleTeamUpdateAsync(result.teamId);

    return result;
  }

  async getAsync(id: number): Promise<Session> {
    const query = new GetSessionQuery(id);

    return await this.queryBus.execute(query);
  }

  async addPlayerAsync(id: number, playerId: number) {
    const command = new AddSessionPlayerCommand(id, playerId);

    const result = await this.commandBus.execute(command);

    await this.handleTeamUpdateAsync(result.teamId);
  }

  async completeAsync(id: number) {
    const command = new CompleteSessionCommand(id);

    const result = await this.commandBus.execute(command);

    await this.handleTeamUpdateAsync(result.teamId);
  }

  private async handleTeamUpdateAsync(id: number) {
    if (id) {
      await this.teamEventsHandler.updateAsync(id);
    }
  }
}
