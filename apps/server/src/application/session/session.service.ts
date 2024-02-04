import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateSessionCommand } from "src/application/session/commands/create-session.command";
import { GetSessionQuery } from "src/application/session/queries/get-session.query";
import { Session } from "src/domain/models/session.model";
import { TeamEventsHandler } from "src/socket/team/team.events";
import { AddSessionPlayerCommand } from "../session/commands/add-session-player.command";
import { CompleteSessionCommand } from "../session/commands/complete-session.command";
import { SessionDto } from "./dtos/session.dto";
import { SessionMap } from "./mappings/session.mappings";

@Injectable()
export class SessionService {
  constructor(
    private queryBus: QueryBus,
    private commandBus: CommandBus,
    private teamEventsHandler: TeamEventsHandler,
  ) {}

  async createAsync(data: CreateSessionCommand): Promise<number> {
    const command = new CreateSessionCommand(data.name, data.teamId);

    const result = await this.commandBus.execute<CreateSessionCommand, number>(command);

    await this.handleTeamUpdateAsync(result);

    return result;
  }

  async getAsync(id: number): Promise<Session> {
    const query = new GetSessionQuery(id);

    const data = await this.queryBus.execute<GetSessionQuery, SessionDto>(query);

    return SessionMap.toDomain(data);
  }

  async addPlayerAsync(data: AddSessionPlayerCommand) {
    const command = new AddSessionPlayerCommand(data.id, data.playerId);

    const result = await this.commandBus.execute<AddSessionPlayerCommand, number>(command);

    await this.handleTeamUpdateAsync(result);
  }

  async completeAsync(id: number) {
    const command = new CompleteSessionCommand(id);

    const result = await this.commandBus.execute<CompleteSessionCommand, number>(command);

    await this.handleTeamUpdateAsync(result);
  }

  private async handleTeamUpdateAsync(id: number) {
    const session = await this.getAsync(id);

    if (session.team.id) {
      await this.teamEventsHandler.updateAsync(session.team.id);
    }
  }
}
